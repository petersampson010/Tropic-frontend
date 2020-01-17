import React from 'react' 
import GrowthStage from './GrowthStage'

let newObj = {}


export default class Grow extends React.Component {


    // pf = plant feature
    
    setArray = () => {
        console.log(this.props.plantF)
        let objKeys = Object.keys(this.props.plantF)
        let newObj = objKeys.filter(ok => this.props.plantF[ok]  !== null )
        debugger
    }

    componentDidMount() {
        this.setArray()
    }

    render() {
        return (
            <div className="grow">
                <div className="top-timeline">
                    {/* {this.props.plantF.map(pf => <GrowthStage pf={pf}/>)} */}
                </div>
                <div className="timeline"></div>
                <div className="bottom-timeline"></div>
            </div>
        )
    }
}