import React from 'react' 
import WishItem from './WishItem'
import GrowItem from './GrowItem'

const UserPlants = props => {

    

    return (
        <div className="user-plants">
            <div className="currently-growing">
                <h3 className="growlist-header">GROWLIST (POTENT. SOMEHTING ELSE)</h3>
                {props.user ? props.user.growlist_plants.map(p => <GrowItem plant={p}/>) 
                : null}
            </div>
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