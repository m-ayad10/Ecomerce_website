import React from 'react';
import './ProfileInfo.css';

function ProfileInfo() {
  return (
    <div>
      <div className="productCard-border">
        <h3 className="san-font">Profile</h3>
        <hr className="w-100" />
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-0">First Name</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <p className="m-0">Mohammed</p>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-0">Last Name</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <input type="text" value={'Ayad'} />
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            
            <h5 className="san-font m-0">Email </h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <p className="m-0 text-overflow-profile" >Mohammedayad@gmail.com</p>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-0">Phone</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <p className="m-0">9074731468</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
