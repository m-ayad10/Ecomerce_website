import React, { useState } from 'react';
import './ProfileInfo.css';

function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Mohammed',
    lastName: 'Ayad',
    email: 'Ayadmoahmmed@gmail.com',
    phone: '9074731468'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Implement save functionality here, e.g., send data to a server
    console.log('Profile saved:', profile);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="productCard-border">
        <h3 className="san-font">Profile</h3>
        <hr className="w-100" />
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-1">First Name</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <input
              type="text"
              className="m-1"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-1">Last Name</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <input
              type="text"
              className="m-1"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-1">Email</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <input
              type="email"
              className="m-1"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-1">Phone</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <input
              type="number"
              className="m-1"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-12 mt-1">
            <p className="san-font">Change Password <span className='san-font text-danger cursor-p'>Click here</span></p>
          </div>
          <div className="col-12 ">
            {isEditing ? (
              <button className="btn btn-success m-1 shadow-none " onClick={handleSave}>Save</button>
            ) : (
              <button className="btn  btn-outline-primary  m-1 shadow-none" onClick={toggleEdit}>Edit</button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
