import React from 'react'

const MapKey = () => {

    const vals = ["Germinate", "Sprout", "Harvest", "Mature", "Pot", "Protect", "Flower", "Fruit", "Fertilize", "Bloom", "Ready to go outside"]
    const colors = ["orange", "pink", "green", "black", "yellow", "red", "purple", "blue", "brown"]


    return (
        <div className="map-key">
            <div className="key">
                <p>Germinate</p>
                <div className="germinate"></div>
            </div>
            <div className="key">
                <p>Sprout</p>
                <div className="sprout"></div>
            </div>
            <div className="key">
                <p>Harvest</p>
                <div className="harvest"></div>
            </div>
            <div className="key">
                <p>Mature</p>
                <div className="mature"></div>
            </div>
            <div className="key">
                <p>Pot</p>
                <div className="pot"></div>
            </div>
            <div className="key">
                <p>Protect</p>
                <div className="protect"></div>
            </div>
            <div className="key">
                <p>Flower</p>
                <div className="flower"></div>
            </div>
            <div className="key">
                <p>Fruit</p>
                <div className="fruit"></div>
            </div>
            <div className="key">
                <p>Fertilize</p>
                <div className="fertilize"></div>
            </div>
            <div className="key">
                <p>Bloom</p>
                <div className="bloom"></div>
            </div>
            <div className="key">
                <p>Harvest</p>
                <div className="harvest"></div>
            </div>
            <div className="key">
                <p>Ready to go outside</p>
                <div className="outside"></div>
            </div>
        </div>
    )
}

export default MapKey