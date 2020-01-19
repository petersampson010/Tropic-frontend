import React from 'react' 
import WishItem from './WishItem'

const UserPlants = props => {

    

    return (
        <div className="user-plants">
            <div className="wishlist">
                <h3 className="wishlist-header">WISHLIST</h3>
                {props.user ? props.user.wishlist_plants.map(p => <WishItem 
                plant={p}
                addToGrowlist={props.addToGrowlist}
                deleteFromWishlist={props.deleteFromWishlist}/>)
                : null}
            </div>
        </div>
    )
}

export default UserPlants 