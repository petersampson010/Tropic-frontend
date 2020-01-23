import React from 'react' 
import Checkpoint from './Checkpoint'
import Start from './Start'
import Modal from 'react-awesome-modal'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'



export default class Grow extends React.Component {

    state = {
        stage: [],
        maxVal: null,
        prop: false,
        sections: [],
        modal: false,
        keys: [],
        values: []
    }


    fill = stage => {
        let key = Object.keys(stage)[0];
        let value = Object.values(stage)[0]
        console.log(key)
        let sortedVals = this.state.values.sort()
        // console.log(sortedVals)
        let index = sortedVals.indexOf(value)
        console.log(index)
        if (key.includes("_s")) {
            if ((this.state.keys.filter(k => k.includes(key.slice(-1))).length) > 1) {
                // console.log(sortedVals)
                return (this.state.values[index+1] - this.state.values[index])
            } else {
                return 20
            }
        } else {
            return 0
        }
    }

    // pf = plant feature

    
    setGrowthStages = () => {

        let valuesArray = []
        let objArray = []
        let objKeys = Object.keys(this.props.plantF)
        let newObj = objKeys.filter(ok => this.props.plantF[ok]  !== null )
        let new1 = newObj.filter(ok => ok !== "id")
        let new2 = new1.filter(ok => ok !== "name")
        let new3 = new2.filter(ok => ok !== "created_at")
        let new4 = new3.filter(ok => ok !== "updated_at")
        console.log(new4)
        new4.map(ok => {
            let obj = {}
            obj[ok] = this.props.plantF[ok];
            valuesArray.push(this.props.plantF[ok]);
            objArray.push(obj)
        })
        console.log(valuesArray)
        this.setState({stage: objArray, keys: new4, values: valuesArray});
        this.setMaxVal(objArray)
    }

    setMaxVal = (objArray) => {
        let max = 0
        objArray.map(obj => {
            if (Object.values(obj)[0] > max) {
                max = Object.values(obj)[0]
            }
        })
        this.setState({maxVal: max})
    }
    

    componentDidMount() {
        this.setGrowthStages()
    }

    workIt = () => {
        let keys = []
        let values = []
        let sectionSpace = []
        this.state.stage.map(st => {let key = Object.keys(st)[0]; keys.push(key)})
        this.state.stage.map(st => {let value = Object.values(st)[0]; values.push(value)})
        for (let i=0; i<keys.length; i++) {
            if (keys[i].includes("_f")) {
                sectionSpace.push((values[i] - values[i-1]))
            }
        }
        return sectionSpace
    }

    viewRegrowth = () => {
        this.setState({modal: true })
    }

    removeModal = () => {
        this.setState({modal: false})
    }

    render() {
        console.log(this.props.startTime)
        return (
            <div className="grow">
                {this.state.modal ? 
                <Modal visible={true} height="auto" width="400" onClickAway={() => this.removeModal()}>
                    <div className="prop-modal">
                        {this.props.user.growlist_plants.filter(p => p.name === this.props.plantF.name)[0].propagation}
                    </div>
                </Modal> 
                : <button className="regrowth-div" onClick={this.viewRegrowth}>
                        <h8 className="regrowth-header">
                            {this.props.plantF.name}
                        </h8>
                        <p className="regrowth-para">Click to see how to re-grow</p>
                </button>}
                <div className="grow-container">
                    <div className="top-timeline">
                        <Start maxVal={this.state.maxVal} startTime={this.props.startTime}/>
                        {this.state.stage.map(st => <Checkpoint fill={this.fill} sectionSpace={this.workIt()} stage={st} maxVal={this.state.maxVal}/>)}
                    </div>
                    <div className="timeline"></div>
                    <div className="bottom-timeline">
                    
                    </div>
                </div>
                <div className="total-length">{this.state.maxVal} Month(s)</div>
                <FontAwesomeIcon className="search-icon" icon={faTrash} size="3x" onClick={(e) => this.props.deleteFromGrowlist(e, this.props.user.id, this.props.plantF.id)}/>
                
            </div>
        )
    }
}

{/* <button className="delete-grow" onClick={(e) => this.props.deleteFromGrowlist(e, this.props.user.id, this.props.plantF.id)}>
                    <FontAwesomeIcon icon={faTrash} size="3x"/>
                </button> */}