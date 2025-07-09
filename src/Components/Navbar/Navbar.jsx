import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { auth, db } from '../../Firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { SearchQueryContext } from '../../Consonant/SearchQuery';

function Navbar() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // Initial state is null
  const [userData, setUserData] = useState({ firstName: '', lastName: '' });
  const [search, setSearch] = useState(false);
  const {searchQuery,setSearchQuery} =useContext(SearchQueryContext)
  const [firstLetter, setFirstLetter] = useState('');
  const [secondLetter, setSecondLetter] = useState('');

  // Listen for authentication state changes and persist user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set user ID if user is logged in
      } else {
        setUserId(null); // Clear user ID if no user is logged in
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Fetch user data from Firestore when userId is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userDocRef = doc(db, 'Users', userId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data()); // Set user data (firstName, lastName)
            setFirstLetter(userDocSnap.data().firstName.charAt(0));
            setSecondLetter(userDocSnap.data().lastName.charAt(0));
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  // Log out function
  const logOut = () => {
    signOut(auth);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h4>Ryme.</h4>
          </a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav m-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <p class="nav-link active cursor-p san-font" aria-current="page"  onClick={()=>navigate('/')}>Home</p>
        </li>
        <li class="nav-item">
          <p class="nav-link active cursor-p san-font" aria-current="page"  onClick={()=>navigate('/men')}>Men</p>
        </li>
        <li class="nav-item">
          <p class="nav-link active cursor-p san-font" aria-current="page"  onClick={()=>navigate('/women')}>Women </p>
        </li>
        {/* <li class="nav-item">
          <p class="nav-link active cursor-p san-font" aria-current="page"  onClick={()=>navigate('/blog')}>Blog</p>
        </li> */}
        
      </ul>
      
    </div>

          <div className="d-flex align-items-center nav-right">
          <p className="mb-0 navbar-hide cursor-p" onClick={()=>navigate('/wishlist')} ><i class="fa-solid fa-heart nav-icon"></i></p>
        <p className="mb-0 cursor-p " onClick={()=>setSearch(search!=true)}><i className="fa-solid fa-magnifying-glass nav-icon"></i></p>
        <p className="mb-0 cursor-p" onClick={()=>navigate('/cart')}><i class="fa-solid fa-cart-shopping nav-icon"></i></p>

            {/* Conditional rendering based on userId */}
            {userId ? (
              // User Profile Dropdown when logged in
              <div className="navbar-hide">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="loged-initial">
                        <p>{firstLetter}{secondLetter}</p>
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-loged" aria-labelledby="navbarDropdownMenuLink">
                      <li>
                        <a className="dropdown-item" onClick={()=>navigate('/profile')}>
                          <i className="fa-solid fa-user"></i> My profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={() => navigate('/orders')}>
                          <i className="fa-solid fa-bag-shopping"></i> Orders
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={logOut}>
                          <i className="fa-solid fa-right-from-bracket"></i> Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            ) : (
              // Login Button when not logged in
              <div className="navbar-hide">
                <button type="button" className="btn nav-login-btn bg-primary text-light" onClick={() => navigate('/login')}>Login</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search Form */}
      {search?(
  <div className="search-form-container">
  <div className="search-form-box">
    <div className="input-container">
      <input
        type="search"
        className="head-search-form"
        placeholder="Search"
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            navigate('/search')
          }
        }}      />
    </div>
    <div className="icon-container d-flex align-items-center">
      <i className="fa-solid fa-xmark" onClick={()=>setSearch(false)}></i>
    </div>
  </div>
</div>

):''}
    </div>
  );
}

export default Navbar;
