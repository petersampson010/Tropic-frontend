import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import SearchPage from '../Pages/SearchPage'
import ContactUs from '../Components/ContactUs'
import MyOasis from '../Pages/MyOasis'
import AuthForms from '../Pages/AuthForms'
import API from '../Adapters/API'
import { PLANTS_URL, USERS_URL, LOGIN_URL, VALIDATE_URL, WISHLIST_URL, GROWLIST_URL } from '../Adapters/API'
import { withRouter } from 'react-router-dom'


class App extends React.Component {
    
    state = {
        searchTerm: null,
        searchedPlants: [],
        searchSelection: null,
        error: "",
        user: false,
    }

    componentDidMount() {
        let rand = Math.floor(Math.random() * 97);
        this.fetchPlants(rand, rand + 3);
    }

    fetchPlants = (num1, num2) => {
        fetch(PLANTS_URL)
            .then(res => res.json())
            .then(data => data.slice(num1, num2))
            .then(data => this.setState({ searchedPlants: data }))
    }

    filterFetch = (attr, userInput) => {

        let searchWord = (attr === "name" ? (userInput.charAt(0).toUpperCase() + userInput.slice(1)) : userInput)
        fetch(PLANTS_URL)
            .then(res => res.json())
            .then(data => data.filter(pl => pl[attr].includes(searchWord)))
            .then(data => data.slice(0, 3))
            .then(data => this.setState({ searchedPlants: data }))
    }

    searchFV = e => {
        e.preventDefault();
        this.filterFetch(this.state.searchSelection, e.target.plantsearch.value)
    }


    updateSearchSelection = (e, term) => {
        e.preventDefault();
        this.setState({ searchSelection: term })
    }

    addToWishlist = (e, plant) => {
        API.updateList(e, plant, this.state.user, WISHLIST_URL)        
            .then(plant => this.setState({
                user: {
                    ...this.state.user,
                    wishlist_plants: [...this.state.user.wishlist_plants, plant]
                }
            }))
    }

    addToGrowlist = (e, plant) => {
        API.updateList(e, plant, this.state.user, GROWLIST_URL)
            .then(plant => this.setState({
                user: {
                    ...this.state.user,
                    growlist_plants: [...this.state.user.growlist_plants, plant]
                    // growlist_plants: (this.state.user.growlist_plants.length === 0 ? [plant] : [...this.state.user.growlist_plants, plant])
                }
            }))
    }

    deleteFromWishlist = (e, wish) => {
        e.preventDefault();
        let configObj = {
            method: "DELETE"
        }
        fetch(`${WISHLIST_URL}/${wish.id}`, configObj)
            .then(this.setState({user: {...this.state.user, 
                wishlist_plants: this.state.user.wishlist_plants.filter(p => p.id !== wish.plant_id)}
            }))
    }


    setUser = (user) => {
        const { history } = this.props
        this.setState({
            user
        }, () => history.push('/my-oasis'))
    }


    logout = () => {
        this.setState({user: false});
        localStorage.removeItem("token")
    }



    render() {

        const handleLogin = loginData => {
            API.login(loginData)
                .then(this.setUser)
                .catch(console.error)
        }

        const handleSignUp = signUpData => {
            API.signUp(signUpData)
            .then(this.setUser)
            // .catch(console.error)
        }

        return (
            <>
                <Route exact path="/" render={() => <Home 
                user={this.state.user} 
                logout={this.logout}/>}/>
                <Route exact path="/search" render={() => <SearchPage
                    logout={this.logout}
                    user={this.state.user}
                    searchFV={this.searchFV}
                    updateSearchSelection={this.updateSearchSelection}
                    searchedPlants={this.state.searchedPlants}
                    addToWishlist={this.addToWishlist}
                    searchSelection={this.state.searchSelection} />}/>
                <Route exact path='/authforms' render={() => <AuthForms 
                    error={this.state.error} 
                    login={handleLogin} 
                    signUp={handleSignUp} />} />
                <Route exact path="/contact-us" render={() => <ContactUs />} />
                <Route exact path="/my-oasis" render={() => <MyOasis
                    logout={this.logout}
                    user={this.state.user}
                    addToGrowlist={this.addToGrowlist}
                    deleteFromWishlist={this.deleteFromWishlist} />}/>
            </>
        )
    }
}

export default withRouter(App)