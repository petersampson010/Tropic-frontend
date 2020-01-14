import React, { useEffect } from 'react' 
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import { Redirect } from 'react-router-dom'
import Home from '../Pages/Home'
import SearchPage from '../Pages/SearchPage'
import SignUp from '../Pages/SignUp'
import ContactUs from '../Components/ContactUs'
import MyOasis from '../Pages/MyOasis'
import AuthForms from '../Pages/AuthForms'
import PostForms from '../PostForm'
import API from '../Adapters/API'
import { PLANTS_URL, USERS_URL, LOGIN_URL, VALIDATE_URL, WISHLIST_URL, GROWLIST_URL } from '../Adapters/API'

export default class App extends React.Component {

    state = {
        user_id: 1,
        searchTerm: null,
        searchedPlants: [],
        searchSelection: null,
        wishlist: [],
        growlist: [], 
        username: null,
        error: "",
        pageURL: ""
    }

    componentDidMount() {
        let rand = Math.floor(Math.random() * 97);
        this.fetchPlants(rand, rand+3);
        this.updateWishlist();
        this.updateGrowlist();
    }

    fetchPlants = (num1, num2) => {
        fetch(PLANTS_URL)
        .then(res => res.json())
        .then(data => data.slice(num1, num2))
        .then(data => this.setState({searchedPlants: data}))
    }

    filterFetch = (attr, userInput) => {

        let searchWord = (attr === "name" ? (userInput.charAt(0).toUpperCase() + userInput.slice(1)) : userInput)
        fetch(PLANTS_URL)
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
        fetch(WISHLIST_URL, configObj)
        .then(res => res.json())
        .then(data => this.updateWishlist())
    }

    updateWishlist = () => {
        fetch(USERS_URL)
        .then(res => res.json())
        .then(data => data.filter(u => u.id === this.state.user_id))
        .then(data => this.setState({wishlist: data[0].wishlists}))
    }

    addToGrowlist = (e, plant) => {
        e.preventDefault();
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user_id: 1, plant_id: plant.id})
        };
        fetch(GROWLIST_URL, configObj)
        .then(res => res.json())
        .then(data => this.updateGrowlist())
    }

    updateGrowlist = () => {
        fetch(USERS_URL)
        .then(res => res.json())
        .then(data => data.filter(u => u.id === this.state.user_id))
        .then(data => this.setState({growlist: data[0].growlists}))
    }

    deleteFromWishlist = (e, wish) => {
        e.preventDefault();
        let configObj = {
            method: "DELETE"
        }
        fetch(`${WISHLIST_URL}/${wish.id}`, configObj)
        .then(data => this.updateWishlist())
    }

    setUser = (loginData) => {
        // console.log(this.props.history)
        if (localStorage.getItem("token") !== "undefined") {
            this.setState({username: loginData, pageURL: "my-oasis"});
        } else {
            this.setState({error: "username or password incorrect, please try again or sign up"})
        }
    }
    


    render() {

        // useEffect(() => {
        //     API.validateUser()
        //     .then(user => this.setState({user_id: user.id}))
        //     .catch(console.error)
        // }, [])
    
        const handleLogin = loginData => {
            API.login(loginData).then(() => this.setUser(loginData.username))
        }
    
        const handleSignUp = signUpData => {
            
        }

        return (
            <Router>
                <div>
                    <Redirect push to={this.state.pageURL}/>
                    <Route exact path="/" render={() => <Home/>}/>
                    <Route exact path="/search" render={() => <SearchPage 
                    searchFV={this.searchFV} 
                    updateSearchSelection={this.updateSearchSelection}
                    searchedPlants={this.state.searchedPlants}
                    addToWishlist={this.addToWishlist}
                    searchSelection={this.state.searchSelection}/>}/>
                    <Route exact path='/authforms' render={() => <AuthForms error={this.state.error} login={handleLogin} signUp={handleSignUp}/>}/>
                    <Route exact path="/signup" render={() => <SignUp/>}/>
                    <Route exact path="/contact-us" render={() => <ContactUs/>}/>
                    <Route exact path="/my-oasis" render={() => <MyOasis
                    growlist={this.state.growlist}
                    wishlist={this.state.wishlist}
                    addToGrowlist={this.addToGrowlist}
                    deleteFromWishlist={this.deleteFromWishlist}/>}/>
                </div>
            </Router>
        )
    }
}