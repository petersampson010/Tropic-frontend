import React from 'react'

export default class Checkpoint extends React.Component {

    // componentDidMount() {
    //     console.log(this.value)
    //     console.log(this.valuePerc)
    //     console.log(this.props.maxVal)
    // }

    key = Object.keys(this.props.stage)[0]

    value = Object.values(this.props.stage)[0]

    containerWidth = 800

    distance = this.value*(this.containerWidth/this.props.maxVal)

    render() {
        return (
            <div className="checkpoint" style={{left: this.distance}}>{this.key}</div>
        )
    }
}
