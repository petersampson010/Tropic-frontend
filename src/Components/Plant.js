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

    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
            hidden: false, 
            attributes: {
                description: false,
                uses: false, 
                health: false, 
                climate: false, 
                soil: false
            }
        };
      }
    
      handleMouseHover() {
        this.setState(this.toggleHoverState);
      }
    
      toggleHoverState(state) {
        return {
          isHovering: !state.isHovering,
          hidden: true
        };
      }

      toggleAttribute = attr => {
          this.setState({attributes: {...attrObject, [attr]: true}})
      }

    render() {
        return (
            <div className="plant" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                <div style={{display: this.state.isHovering ? "block" : "none"}}>
                    <h5>{this.props.plant.name}</h5>
                    {attributes.map(att => <p>{this.state.attributes[att] ? <div>{this.props.plant[att]}</div> : <p onClick={() => this.toggleAttribute(att)}>{att} <div className="arrow">↡</div></p>}</p>)}
                    <button className="add-to-wishlist" onClick={(e) => this.props.addToWishlist(e, this.props.plant)}>Add to Wishlist</button>
                </div>
                <div style={{display: this.state.isHovering ? "none" : "block"}}>
                    <img src={this.props.plant.img_url} className="plant-image"/>
                    <h5 className="plant-image-tag">{this.props.plant.name}</h5>
                </div>
            </div>
        )
    }
}
