import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SearchList from '../Components/Search List/SearchList'
import Footer from '../Components/Footer/Footer'
import BottomBar from '../Components/Bottom Bar/BottomBar'

function Search() {
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
