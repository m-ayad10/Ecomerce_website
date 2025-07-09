import React, { useEffect, useState } from 'react'
import './AllOrders.css'
import { auth, db } from '../../Firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";

function AllOrders() {
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

  const handleDateChange = async (newDate, product) => {
    try {
      const userOrderDocRef = doc(db, "Users", product.userId, "Orders",product.orderId);
      const globalOrderDocRef = doc(db, "Orders", product.orderId);

      // Update deliveryExpected field in Firestore
      await updateDoc(userOrderDocRef, { deliveryExpected: newDate });
      await updateDoc(globalOrderDocRef, { deliveryExpected: newDate });

      console.log(`Delivery date updated to: ${newDate} for Order ID: ${product.orderId}`);

      // Update the product state in UI to reflect the change
      setProduct((prevProducts) =>
        prevProducts.map((item) =>
          item.orderId === product.orderId
            ? { ...item, deliveryExpected: newDate } // Update only the relevant order
            : item
        )
      );
      setSortedOrder((prevProducts) =>
        prevProducts.map((item) =>
          item.orderId === product.orderId
            ? { ...item, deliveryExpected: newDate } // Update only the relevant order
            : item
        )
      );
    } catch (error) {
      console.error("Error updating delivery date:", error);
    }
  };
  // Fetch user ID on authentication state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (newStatus,product) => {
    try {
      const userOrderDocRef = doc(db, "Users", product.userId, "Orders", product.orderId);
      const globalOrderDocRef = doc(db, "Orders", product.orderId);

      // Update status field in Firestore
      await updateDoc(userOrderDocRef, { status: newStatus });
      await updateDoc(globalOrderDocRef, { status: newStatus });

      console.log(`Status updated to: ${newStatus} for Order ID: ${product.orderId}`);

      // Update the product state in UI to reflect the status change
      setProduct((prevProducts) =>
        prevProducts.map((item) =>
          item.orderId === product.orderId
            ? { ...item, status: newStatus } // Update the relevant order's status
            : item
        )
      );
      setSortedOrder((prevProducts) =>
        prevProducts.map((item) =>
          item.orderId === product.orderId
            ? { ...item, status: newStatus } // Update the relevant order's status
            : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchData = async () => {
     

      try {
        const querySnapshot = await getDocs(
          collection(db,  "Orders")
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
  }, []);

  

  return (
    <div>
      <div className="myOrder-border">
        <div className="d-flex justify-content-between m-0 p-0">
          <h2 className='order-heading m-0 '>All Orders</h2>
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
              <div>
                <div className="myOrder-box">
                  {/* Order Product Container */}
                  <div className="order-product">
                    {/* Product Image */}
                    <div className="order-image-box">
                      <img
                        src={obj.imageUrl || 'placeholder.jpg'}
                        alt={obj.name || 'Product Image'}
                        className="order-image"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="order-product-details">
                      {/* Order Identifiers */}
                      <div>
                        <p className="order-orderId text-danger">Order ID: {obj.orderId}</p>
                        <p className="order-ids"><strong>User ID:</strong> {obj.userId}</p>
                        <p className="order-ids"><strong>Product ID:</strong> {obj.productId}</p>

                        {/* Product Name and Price */}
                        <p className="order-productName">{obj.name}</p>
                        <strong>
                          <i className="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i> {obj.totalPrice}
                        </strong>

                        {/* Size and Quantity */}
                        <div className="details-s-q">
                          <p>Size: {obj.size || "N/A"}</p>
                          <p>Qty: {obj.qty || "N/A"}</p>
                        </div>

                        {/* Delivery Details */}
                        <div>
                          {/* Ordered Date */}
                          <div className="d-flex">
                            <label htmlFor="">Ordered Date:</label>
                            <p className="m">
                              {obj.createdAt ? new Date(obj.createdAt.toDate()).toLocaleDateString() : "N/A"}
                            </p>
                          </div>

                          {/* Delivery Status */}
                          <div className="d-flex align-items-center ">
                            <label htmlFor="">Delivery Status:</label>
                            <select
                              className=""
                              aria-label="Select Status"
                              value={obj.status}
                              disabled={obj.status === 'Canceled'}
                              onChange={(e) => handleStatusChange(e.target.value, obj)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Ordered">Ordered</option>
                              <option value="Canceled" className='text-danger' >Canceled</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out-of-Delivery">Out of Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>

                          {/* Expected Delivery Date */}
                          <div>
                            <label htmlFor="">Delivery Expected by:</label>
                            <input
                              type="date"
                              id="dateInput"
                              className="dateInput"
                              value={
                                obj.deliveryExpected && !isNaN(new Date(obj.deliveryExpected).getTime())
                                  ? new Date(obj.deliveryExpected).toISOString().split('T')[0]
                                  : ''  // Empty string for invalid date
                              }
                              onChange={(e) => handleDateChange(e.target.value, obj)} // Trigger date change
                            />
                          </div>


                          <div className="deliveryDetails ">
                            <p>
                              <strong>Delivery Address:</strong> {obj.deliveryAddress || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Address */}

                    </div>
                  </div>
                </div>

                {/* Divider */}
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
  )
}

export default AllOrders
