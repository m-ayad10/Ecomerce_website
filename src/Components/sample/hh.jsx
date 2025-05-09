import React, { useEffect, useState } from "react";
import "./CheckoutPayment.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase/config";
import {
  arrayRemove,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function CheckoutPayment({ addresses, setAddresses }) {
  const [userId, setUserId] = useState(null); // Track authenticated user ID
  const [totalPrice, setTotalPrice] = useState(0); // Track total price of items in cart
  const [selectedAddressId, setSelectedAddressId] = useState(null); // Track selected address for order
  const [paymentMethod, setPaymentMethod] = useState(null); // Track selected payment method
  const navigate = useNavigate();

  // Fetch cart data for authenticated user
  const fetchCartData = async (user) => {
    if (!user) return;

    try {
      const cartDocRef = doc(db, "Users", user.uid, "Cart", "cart");
      const cartDocSnap = await getDoc(cartDocRef);

      if (cartDocSnap.exists()) {
        const cartData = cartDocSnap.data();
        setTotalPrice(cartData.TotalPrice);
      } else {
        console.log("No cart data found for this user.");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Listen to authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchCartData(user);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Handle deletion of an address
  const handleDeleteAddress = async (addressToDelete) => {
    const userDocRef = doc(db, "Users", userId);

    try {
      await updateDoc(userDocRef, {
        addresses: arrayRemove(addressToDelete),
      });

      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.id !== addressToDelete.id)
      );

      console.log("Address deleted successfully.");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // Clear the cart after successful purchase
  const clearCart = async () => {
    try {
      const cartDocRef = doc(db, "Users", userId, "Cart", "cart");
      await deleteDoc(cartDocRef);
      console.log("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Razorpay payment initiation
  const initiateRazorPayPayment = async (orderDetails, items) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_XJJgwVPxctQ2HT", // Replace with your test/live Razorpay key
      amount: totalPrice * 100,
      currency: "INR",
      name: "Ryme",
      description: "Purchase",
      handler: async function (response) {
        console.log("Payment successful:", response);
        await handleRazorPaySuccess(orderDetails, items);
      },
      prefill: {
        name: addresses.find((addr) => addr.id === selectedAddressId)?.fullName || "User",
        email: "user@example.com",
        contact: addresses.find((addr) => addr.id === selectedAddressId)?.mobileNumber || "1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Handle payment success
  const handleRazorPaySuccess = async (orderDetails, items) => {
    try {
      await createOrder(orderDetails, items);
      await clearCart();
      alert("Payment successful! Order placed.");
      navigate("/orders");
    } catch (error) {
      console.error("Error handling payment success:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Handle purchase action
  const handlePurchase = async () => {
    if (!selectedAddressId) {
      alert("Please select a delivery address.");
      return;
    }
  
    const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
    const deliveryAddress = `${selectedAddress.fullName}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.pincode}, ${selectedAddress.state}, mobile: ${selectedAddress.mobileNumber}`;
    const orderDetails = { deliveryAddress };
  
    // Check if a payment method is selected
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
  
    try {
      const cartDocRef = doc(db, "Users", userId, "Cart", "cart");
      const cartSnap = await getDoc(cartDocRef);
  
      if (!cartSnap.exists()) {
        alert("No cart found.");
        return;
      }
  
      const cartData = cartSnap.data();
      console.log(cartData);
  
      const items = [];
      items.push(...cartData.items); // Add all items from the cart
  
      // Generate a single order ID for the entire order
      const orderId = `ORD-${Date.now()}`;
  
      // Calculate the expected delivery date (7 days from now)
      const currentDate = new Date();
      const deliveryExpectedDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
      const formattedDeliveryExpected = `${deliveryExpectedDate.getDate().toString().padStart(2, "0")}-${(deliveryExpectedDate.getMonth() + 1).toString().padStart(2, "0")}-${deliveryExpectedDate.getFullYear()}`;
  
      console.log('Delivery Expected:', formattedDeliveryExpected);
  
      let allOrdersCreatedSuccessfully = true; // Flag to track if all orders were successfully created
  
      if (paymentMethod === "COD") {
        // Handle Cash on Delivery (COD) case, create the order immediately
        for (const item of items) {
          const itemOrderDetails = {
            deliveryAddress,
            name: item.name,
            imageUrl: item.imageUrl,
            productId: item.productId, // Assuming 'productId' is the correct field name
            size: item.size,
            qty: item.quantity, // Corrected field name here
            totalPrice: item.subTotal, // Price for the individual item
            deliveryExpected: formattedDeliveryExpected,
            orderId, // Use the same orderId for all items in this order
          };
  
          try {
            await createOrder(itemOrderDetails, item, orderId);
          } catch (error) {
            console.error(`Error creating order for item: ${item.name}`, error);
            allOrdersCreatedSuccessfully = false;
          }
        }
  
        if (allOrdersCreatedSuccessfully) {
          await clearCart(); // Clear the cart after successful order creation
          alert("Orders placed successfully!");
          navigate("/orders");
        } else {
          alert("Some items failed to be ordered. The cart remains intact.");
        }
      } else if (paymentMethod === "RazorPay") {
        // Handle RazorPay payment initiation
        const paymentSuccess = await initiateRazorPayPayment(orderDetails, items);
        
        if (paymentSuccess) {
          // If payment is successful, create orders
          for (const item of items) {
            const itemOrderDetails = {
              deliveryAddress,
              name: item.name,
              imageUrl: item.imageUrl,
              productId: item.productId, // Assuming 'productId' is the correct field name
              size: item.size,
              qty: item.quantity, // Corrected field name here
              totalPrice: item.subTotal, // Price for the individual item
              deliveryExpected: formattedDeliveryExpected,
              orderId, // Use the same orderId for all items in this order
            };
  
            try {
              await createOrder(itemOrderDetails, item, orderId);
            } catch (error) {
              console.error(`Error creating order for item: ${item.name}`, error);
              allOrdersCreatedSuccessfully = false;
            }
          }
  
          if (allOrdersCreatedSuccessfully) {
            await clearCart(); // Clear the cart after successful order creation
            alert("Orders placed successfully!");
            navigate("/orders");
          } else {
            alert("Some items failed to be ordered. The cart remains intact.");
          }
        } else {
          alert("Payment failed. Please try again.");
        }
      } else {
        alert("Invalid payment method.");
      }
  
    } catch (error) {
      console.error("Error handling purchase:", error);
    }
  };
  
 // createOrder function definition
 const createOrder = async (orderDetails, item, orderId) => {
  try {
    const ordersCollectionRef = collection(db, "Users", userId, "Orders");
    const globalOrdersCollectionRef = collection(db, "Orders");

    // Prepare the order data
    const orderData = {
      orderId, // Use the same orderId for all items in this order
      name: orderDetails.name,
      imageUrl: orderDetails.imageUrl,
      productId: orderDetails.productId, // Assuming 'productId' is the correct field name
      size: orderDetails.size,
      qty: orderDetails.qty, // Correct field name for quantity
      totalPrice: orderDetails.totalPrice, // Price for this item order
      deliveryAddress: orderDetails.deliveryAddress,
      status: "Pending", // Order status set to "Pending"
      deliveryExpected: orderDetails.deliveryExpected, // Expected delivery date
      createdAt: new Date(), // Date when the order was created
      userId, // User ID for the order
    };

    // Add the individual order to the user's Orders collection
    await addDoc(ordersCollectionRef, orderData);
    // Add the individual order to the global Orders collection
    await addDoc(globalOrdersCollectionRef, orderData);

    console.log("Order added successfully for item:", item.name);
  } catch (error) {
    console.error(`Error creating order for item: ${item.name}`, error);
    throw error; // Re-throw the error so it can be handled in the calling function
  }
};

  return (
    <div className="checkout-border">
      <h2 className="san-font">CheckOut</h2>
      <div>
        <div className="row">
          <div className="col-lg-8 col-md-7">
            <div className="d-flex justify-content-between shipping-detail-cont">
              <p className="shipping-detail-name">Shipping details</p>
              <p
                className="san-font text-primary cursor-p"
                onClick={() => navigate("/addAddress")}
              >
                <strong>+ </strong> Add new address
              </p>
            </div>
            <hr className="w-100 check-header-hr" />
            <div className="shipping-address-cont">
              {addresses.map((address) => (
                <div key={address.id}>
                  {" "}
                  {/* Use unique ID as key */}
                  <div className="shipping-address-box">
                    <input
                      type="radio"
                      name="address"
                      onChange={() => {
                        console.log("Selected Address ID:", address.id); // Debugging line
                        setSelectedAddressId(address.id);
                      }}
                    />{" "}
                    <div>
                      <p>
                        {address.fullName},
                        <br />
                        {address.address},
                        <br />
                        {address.city}, {address.pincode},
                        <br />
                        {address.state}
                      </p>
                      <div className="d-flex">
                        <p className="san-font text-primary cursor-p">
                          Edit Address
                        </p>
                        <p
                          className="san-font text-danger cursor-p ps-3"
                          onClick={() => handleDeleteAddress(address)}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="w-100 check-header-hr" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-md-5 bg-light">
            <div>
              <p className="san-font">Payment Details:</p>
              <input
                type="radio"
                name="payment"
                onChange={() => setPaymentMethod("COD")}
              />
              <label htmlFor="" className="ps-3">
                Cash on Delivery
              </label>
              <br />
              <input
                type="radio"
                name="payment"
                onChange={() => setPaymentMethod("RazorPay")}
              />
              <label htmlFor="" className="ps-3">
                RazorPay
              </label>
            </div>

            <div>
              <br />
              <p className="order-summary">Order Summary:</p>
              <div className="d-flex justify-content-between">
                <p className="san-font pe-5 m-0">Order Total</p>
                <p className="m-0">{totalPrice} </p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="san-font pe-5 m-0">Shipping</p>
                <p className="m-0">0.00</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="san-font pe-5 m-0">
                  <strong className="san-font">Total</strong>
                </p>
                <p className="m-0">{totalPrice}</p>
              </div>
              <button
                type="button"
                className="btn btn-dark w-100 san-font mt-2 shadow-none"
                onClick={handlePurchase}
              >
                Purchase Rs.{totalPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPayment;
