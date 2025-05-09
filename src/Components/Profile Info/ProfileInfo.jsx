import React, { useEffect, useState } from 'react';
import './ProfileInfo.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/config';
import { signOut } from 'firebase/auth';

function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Monitor user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      try {
        const docRef = doc(db, 'Users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfile({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phoneNumber || '',
          });
        } else {
          console.error('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const logOut = () => {
    signOut(auth);
  };
  // Save updated profile
  const handleSave = async () => {
    try {
      if (!userId) return;

      const docRef = doc(db, 'Users', userId);
      await updateDoc(docRef, profile);

      console.log('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <div className="productCard-border p-3">
        <h3 className="san-font">Profile</h3>
        <hr />
        <div className="row">
          <div className="col-12">
            <label className="san-font">First Name:</label>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-user me-2"></i>
              <input
                type="text"
                className="fom-control p-1"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="col-12 mt-2">
            <label className="san-font">Last Name:</label>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-user me-2"></i>
              <input
                type="text"
                className="fom-control p-1"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="col-12 mt-2">
            <label className="san-font">Email:</label>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-envelope me-2"></i>
              <input
                type="email"
                className="form-ontrol p-1"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="col-12 mt-2">
            <label className="san-font">Phone Number:</label>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-phone me-2"></i>
              <input
                type="tel"
                className="form-cntrol p-1"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="col-12 mt-3">
            <p className="san-font">
              Change Password{' '}
              <span className="san-font text-danger cursor-pointer">Click here</span>
            </p>
          </div>
          <p className="text-danger logout-butt cursor-p" onClick={logOut}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </p>
          <div className="col-12">
            {isEditing ? (
              <button className="btn btn-success mt-2 shadow-none" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className="btn btn-outline-primary shadow-none mt-2" onClick={toggleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
