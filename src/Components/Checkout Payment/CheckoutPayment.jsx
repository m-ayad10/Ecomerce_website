import React, { useEffect, useState } from "react";
import "./CheckoutPayment.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase/config";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function
import {
  arrayRemove,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2';
      
function CheckoutPayment({ addresses, setAddresses }) {
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const fetchCartData = async (user) => {
    if (!user) return;

    try {
      const cartDocRef = doc(db, "Users", user.uid, "Cart", "cart");
      const cartDocSnap = await getDoc(cartDocRef);

      if (cartDocSnap.exists()) {
        const cartData = cartDocSnap.data();
        setTotalPrice(cartData.TotalPrice);
      } 
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchCartData(user);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteAddress = async (addressToDelete) => {
    const userDocRef = doc(db, "Users", userId);
    try {
      await updateDoc(userDocRef, {
        addresses: arrayRemove(addressToDelete),
      });

      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.id !== addressToDelete.id)
      );

      Swal.fire({
        title: 'Success!',
        text: 'Address deleted successfully.',
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const clearCart = async () => {
    try {
      const cartDocRef = doc(db, "Users", userId, "Cart", "cart");
      await deleteDoc(cartDocRef);
      
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiateRazorPayPayment = async (items,formattedDeliveryExpected,deliveryAddress) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection."
      );
      return;
    }

    const options = {
      key: "rzp_test_XJJgwVPxctQ2HT",
      amount: totalPrice * 100,
      currency: "INR",
      name: "Ryme",
      description: "Purchase",
      handler: async function (response) {
        await handleRazorPaySuccess(items,formattedDeliveryExpected,deliveryAddress);
      },
      prefill: {
        name:
          addresses.find((addr) => addr.id === selectedAddressId)?.fullName ||
          "User",
        email: "user@example.com",
        contact:
          addresses.find((addr) => addr.id === selectedAddressId)
            ?.mobileNumber || "1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleRazorPaySuccess = async (items,formattedDeliveryExpected,deliveryAddress) => {
    try {
      await createOrder(items,formattedDeliveryExpected,deliveryAddress);
      await clearCart();
      Swal.fire({
        title: 'Success!',
        text: 'Payment successful! Order placed.',
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error handling payment success:", error);
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
      alert("Something went wrong. Please try again.");
    }
  };

  const handlePurchase = async () => {
    if (!selectedAddressId) {
      Swal.fire({
        title: 'Oops!',
        text: 'Please select a delivery address.',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
      return;
    }

    const selectedAddress = addresses.find(
      (addr) => addr.id === selectedAddressId
    );
    const deliveryAddress = `${selectedAddress.fullName}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.pincode}, ${selectedAddress.state}, mobile: ${selectedAddress.mobileNumber}`;
    const orderDetails = { deliveryAddress };

    if (!paymentMethod) {
      Swal.fire({
        title: 'Oops!',
        text: 'Please select a payment method.',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
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
      const items = [...cartData.items];

      const currentDate = new Date();
      const deliveryExpectedDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
      const formattedDeliveryExpected = deliveryExpectedDate.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
      
      if (paymentMethod === "COD") {
        try {
          await createOrder(
            items,
            formattedDeliveryExpected,
            deliveryAddress
          );
          await clearCart();
          Swal.fire({
            title: 'Success!',
            text: 'Orders placed successfully!',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'custom-swal-popup',
            },
          });
          navigate("/orders");
        } catch (error) {
          console.error(`Error creating order for item:`, error);
          allOrdersCreatedSuccessfully = false;
        }
      } else if (paymentMethod === "RazorPay") {
        await initiateRazorPayPayment(
          items,
          formattedDeliveryExpected,
          deliveryAddress
        );
      } else {
        alert("Invalid payment method.");
      }
    } catch (error) {
      console.error("Error handling purchase:", error);
    }
  };

  const createOrder = async (items, deliveryExpected, deliveryAddress) => {
    try {
      for (const item of items) {
        // Generate a unique order ID
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
        // Create Firestore document references
        const userOrderDocRef = doc(db, "Users", userId, "Orders", orderId);
        const globalOrderDocRef = doc(db, "Orders", orderId);
  
        // Order data
        const orderData = {
          orderId,
          name: item.name,
          imageUrl: item.imageUrl,
          productId: item.productId,
          size: item.size,
          qty: item.quantity,
          totalPrice: item.subTotal,
          deliveryAddress,
          status: "Ordered",
          deliveryExpected,
          createdAt: new Date(),
          userId,
        };
  
        // Save order data to Firestore
        await setDoc(userOrderDocRef, orderData);
        await setDoc(globalOrderDocRef, orderData);
  
        console.log("Order added successfully for item:", item.name);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
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
              
              {
              addresses.map((address) => (
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
