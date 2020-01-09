import React from 'react' 
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import Home from '../Pages/Home'
import SearchPage from '../Pages/SearchPage'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import ContactUs from '../Components/ContactUs'
import MyOasis from '../Pages/MyOasis'

const PLANTS_API = "http://localhost:3000/plants"
const USERS_API = "http://localhost:3000/users"
const WISHLIST_API = "http://localhost:3000/wishlists"
const GROWLIST_API = "http://localhost:3000/growlists"

const healthTerms = ["Diabetes", "Vitamin E", "Monounsaturated Fat", "Cholesterol", "Indegestion", "Dysentry", "Vitamin C"]


export default class App extends React.Component {

    state = {
        searchTerm: null,
        searchedPlants: [],
        searchSelection: null,
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

    filterFetch = (attr, userInput) => {

        let searchWord = (attr === "name" ? (userInput.charAt(0).toUpperCase() + userInput.slice(1)) : userInput)
        fetch(PLANTS_API)
        .then(res => res.json())
        .then(data => data.filter(pl => pl[attr].includes(searchWord)))
        .then(data => data.slice(0, 3))
        .then(data => this.setState({searchedPlants: data}))
    }

    searchFV = e => {
        e.preventDefault();
        this.filterFetch(this.state.searchSelection, e.target.plantsearch.value)
    }


    updateSearchSelection = (e, term) => {
        e.preventDefault();
        this.setState({searchSelection: term})
    }

    addToWishlist = (e, plant) => {
        e.preventDefault();
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user_id: 1, plant_id: plant.id})
        };
        fetch(WISHLIST_API, configObj)
        .then(res => res.json())
        .then(data => console.log(data))
    }


    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" render={() => <Home/>}/>
                    <Route exact path="/search" render={() => <SearchPage 
                    searchFV={this.searchFV} 
                    updateSearchSelection={this.updateSearchSelection}
                    searchedPlants={this.state.searchedPlants}
                    addToWishlist={this.addToWishlist}
                    searchSelection={this.state.searchSelection}/>}/>
                    <Route exact path="/login" render={() => <Login/>}/>
                    <Route exact path="/signup" render={() => <SignUp/>}/>
                    <Route exact path="/contact-us" render={() => <ContactUs/>}/>
                    <Route exact path="/my-oasis" render={() => <MyOasis/>}/>
                </div>
            </Router>
        )
    }
}