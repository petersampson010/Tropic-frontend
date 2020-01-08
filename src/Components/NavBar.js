import React from 'react' 

export default class NavBar extends React.Component {

    render() {
        

        let links = [
            { name: 'Home', route: '/' },
            { name: 'Search', route: '/search' },
            { name: 'My Oasis', route: '/my-oasis' }
        ]


        let navLinks = links.map((link, index) => {
            return (
                <li key={index} className="nav-list-item">
                    <a className="nav-link" href={link.route}>{link.name}</a>
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