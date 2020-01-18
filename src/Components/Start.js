import React from 'react'

export default class Start extends React.Component {

    state={
        time: 0
    }


    render() {
        return (
            <div className="user-line" style={{left: this.state.time}}></div>
        )
    }
}