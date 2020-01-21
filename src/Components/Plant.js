import React from 'react' 

const attributes = ["description", "uses", "health", "climate", "soil"]
const attrObject = {
    description: false,
    uses: false, 
    health: false, 
    climate: false, 
    soil: false
}

export default class Plant extends React.Component {

    state = {
        isHovering: false,
        attributes: {
            description: false,
            uses: false, 
            health: false, 
            climate: false, 
            soil: false
        }
    }
    
    handleMouseEnter = () => {
        this.setState({isHovering: true});
    }

    handleMouseLeave = () => {
        this.setState({isHovering: false})
    }


    toggleAttribute = attr => {
        this.setState({attributes: {...attrObject, [attr]: true}})
    }

    unToggleAttribute = attr => {
        this.setState({attributes: attrObject})
    }

    render() {
        return (
            <div className="plant" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div style={{display: this.state.isHovering ? "block" : "none"}}>
                    <h5 className="plant-header">{this.props.plant.name}</h5>
                    {attributes.map(att => <p>{this.state.attributes[att] ? <div><p onClick={() => this.unToggleAttribute(att)}>{att}<div className="arrow">↟</div></p><div>{this.props.plant[att]}</div></div> : <p onClick={() => this.toggleAttribute(att)}>{att}<div className="arrow">↡</div></p>}</p>)}
                    {this.props.user ? <button className="add-to-wishlist" onClick={(e) => this.props.addToWishlist(e, this.props.plant)}>Add to Wishlist</button>
                    : null}
                </div>
                <div style={{display: this.state.isHovering ? "none" : "block"}}>
                    <img src={this.props.plant.img_url} className="plant-image"/>
                    <h5 className="plant-image-tag">{this.props.plant.name}</h5>
                </div>
            </div>
        )
    }
}
