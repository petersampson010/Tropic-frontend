import React from 'react'
import Footer from '../Components/Footer'
import NavBar from '../Components/NavBar'
import GrowGraphic from '../Components/GrowGraphic'
import UserPlants from '../Components/UserPlants'



export default class MyOasis extends React.Component {

    render() {
        return (
            <div>
                <NavBar user_id={this.props.user.id}/>
                <GrowGraphic 
                growlist={this.props.user.growlist_plants}/>
                <UserPlants 
                user={this.props.user}
                addToGrowlist={this.props.addToGrowlist}
                deleteFromWishlist={this.props.deleteFromWishlist}/>
                <Footer/>
            </div>
        )
    }
}