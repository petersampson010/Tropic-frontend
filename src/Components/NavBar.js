import React from 'react' 
import { withRouter } from 'react-router-dom'
import Footer from './Footer'

class NavBar extends React.Component {


    render() {

        let inLinks = [
            {name: 'Home', route: '/'},
            {name: 'Search', route: '/search'},
            {name: 'My Oasis', route: '/my-oasis'}
        ]

        let outLinks = [
            {name: 'Home', route: '/'},
            {name: 'Search', route: '/search'},
            {name: 'Login', route: '/authforms'}
        ]

        let links = (this.props.user ? inLinks : outLinks)

        const { history } = this.props

        let navLinks = links.map((link, index) => {
            return (
                <li key={index} className="nav-list-item">
                    <p className="nav-link" onClick={() => history.push(link.route)}>{link.name}</p>
                </li>
            );
        });

        const func = () => {
            history.push('/');
            this.props.logout()
        }

        return (
            <nav className="nav-menu">
                <div className="nav-logo">Tropic</div>

                <div className="nav-menu-right">
                    <ul className="nav-menu-list">
                        {navLinks}
                        <li key="4" className="nav-list-item">
                            {this.props.user ? <p className="nav-link" onClick={func}>Logout</p> : null}
                        </li>
                    </ul>
                </div>
                <Footer />
            </nav>
        )
    }

}

export default withRouter(NavBar)