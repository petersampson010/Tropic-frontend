import React from 'react' 
import Modal from 'react-awesome-modal'
// import API from '../Adapters/API'

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

    unToggleAttribute = attr => {
        this.setState({attributes: {...attributes, [attr]: false}})
    }

    render() {

        return (
            <div className="wish-item">
                {this.state.modal ? <Modal visible={this.state.modal}  width="900" height="auto" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="modal">
                        <div className="modal-text">
                            <h5 className="plant-header">{this.props.plant.name}</h5>
                            {attributes.map(att => <p>{this.state.attributes[att] ? <div><p onClick={() => this.unToggleAttribute(att)}>{att}<div className="arrow">↟</div></p><div>{this.props.plant[att]}</div></div> : <p onClick={() => this.toggleAttribute(att)}>{att}<div className="arrow">↡</div></p>}</p>)}
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                        </div>
                        <div className="plant-pic"><img className="plant-img" src={this.props.plant.img_url}/></div>
                    </div>
                </Modal>
                :   <ul>
                        <li className="list-item">
                            <div>
                                <p onClick={this.openModal}>{this.props.plant.name}</p>
                                <button onClick={(e) => this.props.addToGrowlist(e, this.props.plant)}>Add to "Growing"</button>
                                <button onClick={(e) => this.props.deleteFromWishlist(e, this.props.user.id, this.props.plant.id)}>Delete</button>
                            </div>
                        </li>
                    </ul>}
                
            </div>
        )
    }
}