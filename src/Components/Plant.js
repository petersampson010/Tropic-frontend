import React from 'react' 

const attributes = ["description", "uses", "health", "climate", "soil", "propagation"]
const attrObject = {
    description: false,
    uses: false, 
    health: false, 
    climate: false, 
    soil: false, 
    propagation: false
}

export default class Plant extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.handleMouseHover = this.handleMouseHover.bind(this);
    //     this.state = {
    //         hover: false
    //     }
    // }

    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
            attributes: {
                description: false,
                uses: false, 
                health: false, 
                climate: false, 
                soil: false, 
                propagation: false
            }
        };
      }
    
      handleMouseHover() {
        this.setState(this.toggleHoverState);
      }
    
      toggleHoverState(state) {
        return {
          isHovering: !state.isHovering,
        };
      }

      toggleAttribute = attr => {
        //   console.log(!this.state[attr])
          this.setState({attributes: {...attrObject, [attr]: true}})
      }

    render() {
        return (
            <div className="plant" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                {this.state.isHovering ? 
                <div>
                    <h5>{this.props.plant.name}</h5>
                    {attributes.map(att => <p>{this.state.attributes[att] ? <div>{this.props.plant[att]}</div> : <p onClick={() => this.toggleAttribute(att)}>{att} <div className="arrow">↡</div></p>}</p>)}
                </div>
                : <div><img src={this.props.plant.img_url} className="plant-image"/>
                <h5 className="plant-image-tag">{this.props.plant.name}</h5></div>
                }

            </div>
        )
    }
}
