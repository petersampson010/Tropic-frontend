import React from 'react' 
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

const ContactUs = props => {

    const github = require('../images/github-logo.png')
    const linkedin = require('../images/linkedin-letters.png')

    return (
        <div>
        <div className="contact-us"> 
            <NavBar/>
            <Footer/>
            <div className="contact-text">
                <a href="https://github.com/petersampson010" target="_blank"><img src={github} className="contact"/></a>
                <a href="https://www.linkedin.com/in/peter-sampson-86ab05145/" target="_blank"><img src={linkedin} className="contact"/></a>
            </div>
        </div>
        <div className="contact-blank"></div>
        </div>
    )
}

export default ContactUs