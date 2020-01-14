import React from 'react' 

export default class Grow extends React.Component {

    render() {
        return (
            <div>
                <h4>{this.props.plant.name}</h4>
                <p className="propagation">{this.props.plant.propagation}</p>
            </div>
        )
    }
}