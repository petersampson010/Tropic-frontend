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

        let objValues = Object.values(this.props.plantF)
        let ya = objValues.filter(ov => typeof ov === "number")
        this.setState({maxVal: Math.max(...ya)})

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
        this.setState({stage: objArray})
    }

    componentDidMount() {
        this.setGrowthStages()
    }

    render() {
        return (
            <div className="grow">
                <div className="grow-container">
                    <div className="top-timeline">
                        <Start />
                        {this.state.stage.map(st => <Checkpoint stage={st} maxVal={this.state.maxVal}/>)}
                        <button className="delete-grow" onClick={e => this.props.removeGrow(e, this.props.key)}>Remove from growing</button>
                    </div>
                    <div className="timeline"></div>
                    <div className="bottom-timeline"></div>
                </div>
            </div>
        )
    }
}