import React from 'react' 
import Modal from 'react-awesome-modal'
import API from '../Adapters/API'

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
                {this.state.modal ? <Modal className="modal" visible={this.state.modal} width="1000" height="550" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h5>{this.props.plant.name}</h5>
                        {attributes.map(att => <p>{this.state.attributes[att] ? <div>{this.props.plant[att]}</div> : <p onClick={() => this.toggleAttribute(att)}>{att} <div className="arrow">↡</div></p>}</p>)}
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
                :   <ul>
                        <li className="list-item">
                            <div>
                                <p onClick={this.openModal}>{this.props.plant.name}</p>
                                <button onClick={(e) => this.props.addToGrowlist(e, this.props.plant)}>Add to "Growing"</button>
                                <button onClick={(e) => this.props.deleteFromWishlist(e, API.findWish(this.props.user.id, this.props.plant.id))}>Delete</button>
                            </div>
                        </li>
                    </ul>}
                
            </div>
        )
    }
}