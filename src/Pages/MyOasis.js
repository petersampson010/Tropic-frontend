import React from 'react'
import Footer from '../Components/Footer'
import NavBar from '../Components/NavBar'
import GrowGraphic from '../Components/GrowGraphic'
import UserPlants from '../Components/UserPlants'



const MyOasis = props => {

    return (
        <div>
            <NavBar/>
            <GrowGraphic 
            growlist={props.growlist}/>
            <UserPlants 
            growlist={props.growlist}
            wishlist={props.wishlist}
            addToGrowlist={props.addToGrowlist}
            deleteFromWishlist={props.deleteFromWishlist}/>
            <Footer/>
        </div>
    )
}

export default MyOasis