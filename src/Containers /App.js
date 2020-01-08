import React from 'react' 
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import Home from '../Components/Home'
import SearchPage from '../Components/SearchPage'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import ContactUs from '../Components/ContactUs'
import MyOasis from '../Components/MyOasis'

const PLANTS_API = "http://localhost:3000/plants"

export default class App extends React.Component {

    state = {
        searchTerm: null,
        searchedPlants: [],
        searchSelection: null
    }

    componentDidMount() {
        let rand = Math.floor(Math.random() * 97)
        this.fetchPlants(rand, rand+3)
    }

    fetchPlants = (num1, num2) => {
        fetch(PLANTS_API)
        .then(res => res.json())
        .then(data => data.slice(num1, num2))
        .then(data => this.setState({searchedPlants: data}))
    }

    searchFV = e => {
        e.preventDefault();
        this.setState({searching: true})
    }

    updateSearchTerm = e => {
        e.preventDefault();
        this.setState({searchTerm: e.target.value})
    }

    updateSearchSelection = term => {
        this.setState({searchSelection: term})
    }


    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" render={() => <Home/>}/>
                    <Route exact path="/search" render={() => 
                    <SearchPage 
                    searchFV={this.searchFV} 
                    updateSearchTerm={this.updateSearchTerm}
                    updateSearchSelection={this.updateSearchSelection}
                    searchedPlants={this.state.searchedPlants}/>}/>
                    <Route exact path="/login" render={() => <Login/>}/>
                    <Route exact path="/signup" render={() => <SignUp/>}/>
                    <Route exact path="/contact-us" render={() => <ContactUs/>}/>
                    <Route exact path="/my-oasis" render={() => <MyOasis/>}/>
                </div>
            </Router>
        )
    }
}