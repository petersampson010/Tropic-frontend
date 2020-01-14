import React from 'react' 
import { withRouter } from 'react-router-dom'

class NavBar extends React.Component {


    render() {

        let inLinks = [
            {name: 'Home', route: '/'},
            {name: 'Search', route: '/search'},
            {name: 'My Oasis', route: '/my-oasis'},
            {name: 'Logout', route: '/'}
        ]

        let outLinks = [
            {name: 'Home', route: '/'},
            {name: 'Search', route: '/search'},
            {name: 'Login', route: '/authforms'}
        ]

        let links = this.props.user_id === null ? outLinks : inLinks

        const { history } = this.props

        let navLinks = links.map((link, index) => {
            return (
                <li key={index} className="nav-list-item">
                    <p className="nav-link" onClick={() => history.push(link.route)}>{link.name}</p>
                </li>
            );
        });

        return (
            <nav className="nav-menu">
                <div className="nav-logo"></div>

                <div className="nav-menu-right">
                    <ul className="nav-menu-list">
                        {navLinks}
                    </ul>
                </div>
            </nav>
        )
    }

}

export default withRouter(NavBar)