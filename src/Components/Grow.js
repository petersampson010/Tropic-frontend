import React from 'react' 
import GrowthStage from './GrowthStage'


export default class Grow extends React.Component {

    state = {
        stage: []
    }


    // pf = plant feature
    setGrowthStages = () => {

        let objKeys = Object.keys(this.props.plantF)
        let noNull = objKeys.filter(stage => this.props.plantF[stage] !== null)
        let noId = noNull.filter(stage => stage !== "id")
        let noName = noId.filter(stage => stage !== "name")
        let noCreate = noName.filter(stage => stage !== "created_at")
        let useful = noCreate.filter(stage => stage !== "updated_at")

        console.log(useful)

        useful.map(stage => this.setState({stage: [...this.state.stage, `${stage}: ${this.props.plantF[stage]}`]}))

        // let target = {}
        // let objKeys = Object.keys(this.props.plantF)
        // let newObj = objKeys.filter(ok => this.props.plantF[ok]  !== null )
        // newObj.map(k => target[k] = this.props.plantF[k])
        // delete target["id"]
        // delete target["name"]
        // delete target["created_at"]
        // delete target["updated_at"]
        // this.setState({stage: target})
    }

    componentDidMount() {
        this.setGrowthStages()
    }

    render() {
        return (
            <div className="grow">
                <div className="top-timeline">
                    
                </div>
                <div className="timeline"></div>
                <div className="bottom-timeline"></div>
            </div>
        )
    }
}