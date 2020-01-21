import React from 'react'

export default class Checkpoint extends React.Component {

    key = Object.keys(this.props.stage)[0]

    value = Object.values(this.props.stage)[0]

    containerWidth = 800

    distance = this.value*(this.containerWidth/this.props.maxVal)

    fill = this.props.sectionSpace[0]*(this.containerWidth/this.props.maxVal)

    colorAttr = (attr) => {
        if (attr.includes("germinate")) {
            return "orange"
        } else if (attr.includes("sprouting")) {
            return "pink"
        } else if (attr.includes("harvest")) {
            return "green"
        } else if (attr.includes("maturity")) {
            return "darkgreen"
        } else if (attr.includes("pot")) {
            return "brown"
        } else if (attr.includes("protect")) {
            return "grey"
        } else if (attr.includes("flowering")) {
            return "yellow"
        } else if (attr.includes("fruiting")) {
            return "red"
        } else if (attr.includes("fertilize")) {
            return "purple"
        } else if (attr.includes("bloom")) {
            return "blue"
        } else if (attr.includes("outside")) {
            return "brown"
        }
    }

    componentDidMount() {
        console.log(this.props.sectionSpace)
    }


    render() {

        if (this.key.includes("_f")) {
            return (
                <div className="checkpointF" style={{right: (800-this.distance), width: this.fill, backgroundColor: this.colorAttr(this.key), color: this.colorAttr(this.key)}}></div>
            )
        } else {
            return (
                <div className="checkpointS" style={{left: this.distance, width: "10px", backgroundColor: this.colorAttr(this.key)}}></div>
            )
        }
    }
}
