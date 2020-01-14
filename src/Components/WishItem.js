import React from 'react' 
import Modal from 'react-awesome-modal'

const attributes = ["description", "uses", "health", "climate", "soil"]
const attrObject = {
    description: false,
    uses: false, 
    health: false, 
    climate: false, 
    soil: false
}

export default class WishItem extends React.Component {

    state = {
        modal: false,
        attributes: {
            description: false,
            uses: false, 
            health: false, 
            climate: false, 
            soil: false, 
            propagation: false
        }
    }

    openModal = () => {
        this.setState({
            modal: true
        })
    }

    closeModal = () => {
        this.setState({
            modal: false 
        })
    }

    toggleAttribute = attr => {
        this.setState({attributes: {...attrObject, [attr]: true}})
    }

    render() {

        return (
            <div className="wish-item">
                {this.state.modal ? <Modal visible={this.state.modal} width="1000" height="550" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h5>{this.props.wish.plant.name}</h5>
                        {attributes.map(att => <p>{this.state.attributes[att] ? <div>{this.props.wish.plant[att]}</div> : <p onClick={() => this.toggleAttribute(att)}>{att} <div className="arrow">↡</div></p>}</p>)}
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
                :   <ul>
                        <li className="list-item">
                            <p onClick={this.openModal}>{this.props.wish.plant.name}</p>
                            <div>
                                <button onClick={(e) => this.props.addToGrowlist(e, this.props.wish.plant)}>Add to "Growing"</button>
                                <button onClick={(e) => this.props.deleteFromWishlist(e, this.props.wish)}>Delete</button>
                            </div>
                        </li>
                    </ul>}
                
            </div>
        )
    }
}