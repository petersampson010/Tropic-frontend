import React from 'react'

export default class Checkpoint extends React.Component {

    key = Object.keys(this.props.stage)[0]

    value = Object.values(this.props.stage)[0]

    containerWidth = 800

    distance = this.value*(this.containerWidth/this.props.maxVal)

    colorAttr = (attr) => {
        if (attr == "germinate") {
            return "orange"
        } else if (attr.includes("sprouting")) {
            return "pink"
        } else if (attr.includes("harvest")) {
            return "brown"
        } else if (attr.includes("maturity")) {
            return "dark-green"
        } else if (attr.includes("pot")) {
            return "brown"
        } else if (attr.includes("protect")) {
            return "black"
        } else if (attr.includes("flowering")) {
            return "yellow"
        } else if (attr.includes("fruiting")) {
            return "red"
        } else if (attr.includes("fertilize")) {
            return 
        } else if (attr.includes("bloom")) {
            return "blue"
        } else if (attr.includes("outside")) {
            return "green"
        }
    }

    render() {
        return (
            <div className="checkpoint" style={{left: this.distance, color: this.colorAttr(this.key)}}>{this.key}</div>
        )
    }
}
