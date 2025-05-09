import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import "./Responsive.css";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/config";
import Swal from 'sweetalert2';

function MyOrders() {
  const [product, setProduct] = useState([]);
  const [userId, setUserId] = useState();
  const [sortedOrder,setSortedOrder]=useState([])

    const handleFilterChange = (e) => {
      const selectedValue = e.target.value;
  
      let updatedProducts = [...product];
      if (selectedValue === 'Latest') {
        updatedProducts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      } else if (selectedValue === 'Oldest') {
        updatedProducts.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
      } else {
        updatedProducts = product.filter((obj) => obj.status === selectedValue);
        console.log(product.filter((obj) => obj.status === selectedValue));
        
      }
      setSortedOrder(updatedProducts)
    };
  // Fetch user ID on authentication state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      // Get the references to the nested order and global order documents
      const userOrderDocRef = doc(db, "Users", userId, "Orders", orderId);
      const globalOrderDocRef = doc(db, "Orders", orderId);
  
      // Update the status to "Canceled" in both user-specific and global orders
      await updateDoc(userOrderDocRef, { status: 'Canceled' });
      await updateDoc(globalOrderDocRef, { status: 'Canceled' });
  
      // Optionally, if you need to remove the product from cart as well:
      // const cartDocRef = doc(db, "Users", userId, "Cart", productId);
      // await deleteDoc(cartDocRef); // Uncomment if needed
  
      console.log(`Order with ID ${orderId} has been canceled.`);
      Swal.fire({
        title: 'Order Canceled',
        text: `Your order with ID ${orderId} has been successfully canceled.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error("Error canceling order:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while canceling the order.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };
  
  // Fetch orders from Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.log("User not logged in or ID not available.");
        return;
      }

      try {
        const querySnapshot = await getDocs(
          collection(db, "Users", userId, "Orders")
        );
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Fetched Orders:", newData);
        setProduct(newData);
        setSortedOrder(newData.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds))
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <div className="myOrder-border">
      <div className="d-flex justify-content-between m-0 p-0">
          <h2 className='order-heading m-0 '>My Orders</h2>
          <div>
            <select className="form-selec m-0 p-1 "  onChange={handleFilterChange} >
              <option value="Pending">Pending</option>
              <option value="Ordered">Ordered</option>
              <option value="Canceled" className='text-danger' >Canceled</option>
              <option value="Shipped">Shipped</option>
              <option value="Out-of-Delivery">Out of Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Latest" selected>Latest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
          </div>
        <hr className="order-border-hr" />
        <div className="myOrder-container">
          {sortedOrder.length > 0 ? (
            sortedOrder.map((obj) => (
              <div key={obj.id}>
                <div className="myOrder-box">
                  <div className="order-product">
                    <div className="order-image-box">
                      <img
                        src={obj.imageUrl || "https://via.placeholder.com/150"}
                        alt=""
                        className="order-image"
                      />
                    </div>
                    <div className="order-product-details">
                      <div>
                        <p className="order-orderId text-danger">
                          Order Id: {obj.orderId}
                        </p>
                        <p className="order-productName">{obj.name}</p>
                        <strong>
                          <i className="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i>{" "}
                          {obj.totalPrice}
                        </strong>
                        <div className="details-s-q">
                          <p>Size: {obj.size}</p>
                          <p>Qty: {obj.qty}</p>
                        </div>
                        <div className="details-status-date">
                          <div className="order-status">
                            <p>
                              status:{" "}
                              <span className="text-danger">{obj.status}</span>
                            </p>
                          </div>
                          <div className="order-delivery">
                            <p>
                              Delivery Expected by: <br /><strong>{obj.deliveryExpected}</strong> 
                              <span className="order-delivery-date">
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="deliveryDetails">
                          <p>
                            <strong>Delivery Address: </strong>{" "}
                            {obj.deliveryAddress}
                          </p>
                        </div>
                        {
                          obj.status==='Canceled'?(''):(
                            <p className="text-danger details-cancel cursor-p" onClick={(e)=>handleCancel(obj.orderId)}>
                          Cancel Order
                        </p>
                          )
                        }
                        
                      </div>
                      <div className="order-delivery-status">
                        <div>
                          <div className="order-status">
                            <p
                              className={
                                obj.status === 'Pending' ? 'text-warning' :
                                obj.status === 'Canceled' ? 'text-danger' :
                                  obj.status === 'Ordered' ? 'text-primary' :
                                    obj.status === 'Shipped' ? 'text-info' :
                                      obj.status === 'Out-of-Delivery' ? 'text-secondary' :
                                        obj.status === 'Delivered' ? 'text-success' :
                                          'text-muted'  // Default text color if status is unknown
                              }
                            >
                              {obj.status}
                            </p>
                          </div>
                          <div className="order-delivery">
                            <p>Delivery Expected by</p>
                            <p className="order-delivery-date">
                              {obj.deliveryExpected}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="w-100" />
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center">
              <p>No Orders Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
