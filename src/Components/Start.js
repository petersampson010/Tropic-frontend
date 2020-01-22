import React from 'react'

export default class Start extends React.Component {

    state = {
        growth: 0
    }

    componentDidMount() {

        this.getNumberDays()
    }

    containerWidth = 800

    pixelsPerDay = parseFloat(this.containerWidth/(this.props.maxVal*30))

    timeDifference = new Date() - this.props.startTime

    getNumberDays = () => {
        return this.props.startTime === null ? null 
        : this.getNumber()
    }
    
    getNumber = () => {
        let startDate = this.props.startTime.split("T")[0]
        let startYear = startDate.split("-")[0]
        let startMonth = startDate.split("-")[1]
        let startDay = startDate.split("-")[2]
        let date = (JSON.stringify(new Date())).split("T")[0]
        let year = date.split("-")[0]
        year = year.substring(1)
        let month = date.split("-")[1]
        let day = date.split("-")[2]
        let daysAhead = (360*(year-startYear)) + (30*(month-startMonth)) + (day-startDay)
        console.log(daysAhead)
        this.setState({growth: daysAhead*this.pixelsPerDay})
    }

    render() {
        return (
            <div className="user-line" style={{left: this.state.growth}}></div>
        )
    }
}