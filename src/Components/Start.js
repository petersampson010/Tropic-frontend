import React from 'react'

export default class Start extends React.Component {

    state={
        time: 0
    }

    componentDidMount() {
        let timeNow = Date.now()
        console.log(timeNow)
        console.log(this.props.startTime)
    }


    render() {
        return (
            <div className="user-line" style={{left: this.state.time}}></div>
        )
    }
}