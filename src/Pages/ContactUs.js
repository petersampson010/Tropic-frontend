import React from 'react' 
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

const ContactUs = props => {

    return (
        <div className="contact-us"> 
            <NavBar/>
            <Footer/>
            <div className="contact-text">
                <a href="https://github.com/petersampson010" className="github"></a>
                <a href="https://www.linkedin.com/in/peter-sampson-86ab05145/" className="linkedIn"></a>
            </div>
        </div>
    )
}

export default ContactUs