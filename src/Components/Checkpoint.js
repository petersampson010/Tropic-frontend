import React from 'react'

const Checkpoint = props => {

    const key = () => Object.keys(props.attribute)[0]
    const value = () =>  Object.values(props.attribute)[0]

    return (
        <div className="checkpoint" style={{left: `${this.value}px`}}>{this.key}</div>
    )
}

export default Checkpoint 