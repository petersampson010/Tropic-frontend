import React from 'react' 
import WishItem from './WishItem'
import GrowItem from './GrowItem'

const UserPlants = props => {

    

    return (
        <div className="user-plants">
            <div className="currently-growing">
                <h3 className="growlist-header">GROWLIST (POTENT. SOMEHTING ELSE)</h3>
                {props.growlist.map(g => <GrowItem plant={g}/>)}
            </div>
            <div className="wishlist">
                <h3 className="wishlist-header">WISHLIST</h3>
                {props.wishlist.map(w => <WishItem 
                wish={w}
                addToGrowlist={props.addToGrowlist}
                deleteFromWishlist={props.deleteFromWishlist}/>)}
            </div>
        </div>
    )
}

export default UserPlants 