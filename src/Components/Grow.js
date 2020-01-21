import React from 'react' 
import Checkpoint from './Checkpoint'
import Start from './Start'
import Modal from 'react-awesome-modal'



export default class Grow extends React.Component {

    state = {
        stage: [],
        maxVal: null,
        prop: false,
        sections: [],
        modal: false
    }


    // pf = plant feature

    
    setGrowthStages = () => {

        let objArray = []
        let objKeys = Object.keys(this.props.plantF)
        let newObj = objKeys.filter(ok => this.props.plantF[ok]  !== null )
        let new1 = newObj.filter(ok => ok !== "id")
        let new2 = new1.filter(ok => ok !== "name")
        let new3 = new2.filter(ok => ok !== "created_at")
        let new4 = new3.filter(ok => ok !== "updated_at")
        new4.map(ok => {
            let obj = {}
            obj[ok] = this.props.plantF[ok];
            objArray.push(obj)
        })
        this.setState({stage: objArray});
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
                {this.state.modal ? <Modal visible={true} className="modal" backgroundColor="red" height="550" width="1000" onClickAway={() => this.removeModal()}>{this.props.user.growlist_plants.filter(p => p.name === this.props.plantF.name)[0].propagation}</Modal> : <button onClick={this.viewRegrowth} >View re-growth of {this.props.plantF.name}</button>}
                <div className="grow-container">
                    <div className="top-timeline">
                        <Start maxVal={this.state.maxVal} startTime={this.props.startTime}/>
                        {this.state.stage.map(st => <Checkpoint sectionSpace={this.workIt()} stage={st} maxVal={this.state.maxVal}/>)}
                    </div>
                    <div className="timeline"></div>
                    <div className="bottom-timeline">
                    {this.state.maxVal} Months
                    </div>
                </div>
                <button className="delete-grow" onClick={(e) => this.props.deleteFromGrowlist(e, this.props.user.id, this.props.plantF.id)}>Remove from growing</button>
            </div>
        )
    }
}