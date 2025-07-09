import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SearchList from '../Components/Search List/SearchList'
import Footer from '../Components/Footer/Footer'
import BottomBar from '../Components/Bottom Bar/BottomBar'

function Search() {
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div>
      <Navbar/>
      <SearchList/>
      <Footer/>
      <BottomBar/>
    </div>
  )
}

export default Search
