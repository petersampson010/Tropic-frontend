import React from 'react' 
import Checkpoint from './Checkpoint'
import Start from './Start'


export default class Grow extends React.Component {

    state = {
        stage: [],
        maxVal: null,
        prop: false 
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

    render() {
        return (
            <div className="grow">
                <button>View re-growth of {this.props.plantF.name}</button>
                <div className="grow-container">
                    <div className="top-timeline">
                        <Start />
                        {this.state.stage.map(st => <Checkpoint stage={st} maxVal={this.state.maxVal}/>)}
                    </div>
                    <div className="timeline"></div>
                    <div className="bottom-timeline"></div>
                </div>
                <button className="delete-grow" onClick={(e) => this.props.deleteFromGrowlist(e, this.props.user.id, this.props.plantF.id)}>Remove from growing</button>
            </div>
        )
    }
}