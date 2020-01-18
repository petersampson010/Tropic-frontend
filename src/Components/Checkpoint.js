import React from 'react'

export default class Checkpoint extends React.Component {

    key = Object.keys(this.props.stage)[0]

    value = Object.values(this.props.stage)[0]

    screenWidth = window.innerWidth

    start = this.screenWidth/7.25

    render() {
        return (
            <div className="checkpoint" style={{left: this.start + (this.screenWidth*(this.value/this.props.maxVal)) }}>{this.key}</div>
        )
    }
}
