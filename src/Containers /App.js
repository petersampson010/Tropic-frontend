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
import { faPoll } from '@fortawesome/free-solid-svg-icons'


class App extends React.Component {
    
    state = {
        allPlants: [],
        searchedPlants: [],
        shownPlants: [],
        searchSelection: null,
        error: "",
        user: false,
        num: null,
        growingPlantsFeatures: []
    }

    componentDidMount() {
        this.fetchPlants();
    }

    fetchPlantFeatures = () => {
        const plant_names = this.state.user.growlist_plants.map(pl => pl.name)
        fetch("http://localhost:3000/plant_growths")
        .then(res => res.json())
        .then(data => data.filter(pl => plant_names.includes(pl.name)))
        .then(data => this.setState({growingPlantsFeatures: data}))
    }

    fetchPlants = () => {
        let rand = Math.floor(Math.random() * 97)
        fetch(PLANTS_URL)
            .then(res => res.json())
            .then(data => this.setState({ allPlants: data, num: rand}))
            .then(() => this.setState({searchedPlants: this.state.allPlants}))
            .then(() => this.setState({shownPlants: this.state.searchedPlants.slice(rand, rand + 3)}))
    }

    updateSearchedPlants = (attr, userInput) => {
        let searchWord = (attr === "name" ? (userInput.charAt(0).toUpperCase() + userInput.slice(1)) : userInput);
        this.setState({searchedPlants: this.state.allPlants.filter(pl => pl[attr].includes(searchWord))});
        this.updateShownPlants(attr, userInput);
    }

    updateShownPlants = (attr, userInput) => {
        let searchWord = (attr === "name" ? (userInput.charAt(0).toUpperCase() + userInput.slice(1)) : userInput);
        this.setState({shownPlants: (this.state.allPlants.filter(pl => pl[attr].includes(searchWord))).slice(0, 3), num: 0});
    }


    searchFV = e => {
        e.preventDefault();
        this.updateSearchedPlants(this.state.searchSelection, e.target.plantsearch.value)
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

    nextPage = () => {
        this.state.num > this.state.searchedPlants.length - 3 ? 
            this.setState({shownPlants: this.state.searchedPlants.slice(2), 
            num: 0})
            : this.setState({shownPlants: this.state.searchedPlants.slice(this.state.num + 3, this.state.num + 6), 
            num: this.state.num + 3}) 
    }

    prevPage = () => {
        this.state.num < 3 ?
        this.setState({shownPlants: this.state.searchedPlants.slice(-3), num: this.state.searchedPlants.length - 2})
        : this.setState({shownPlants: this.state.searchedPlants.slice(this.state.num - 3, this.state.num), 
            num: this.state.num - 3});
    }


    render() {

        const handleLogin = loginData => {
            API.login(loginData)
                .then(this.setUser)
                .catch(console.error)
                .then(this.fetchPlantFeatures)
        }

        const handleSignUp = signUpData => {
            API.signUp(signUpData)
            .then(this.setUser)
        }



        return (
            <>
                <Route exact path="/" render={() => <Home 
                user={this.state.user} 
                logout={this.logout}/>}/>
                <Route exact path="/search" render={() => <SearchPage
                    nextPage={this.nextPage}
                    prevPage={this.prevPage}
                    logout={this.logout}
                    user={this.state.user}
                    searchFV={this.searchFV}
                    updateSearchSelection={this.updateSearchSelection}
                    shownPlants={this.state.shownPlants}
                    addToWishlist={this.addToWishlist}
                    searchSelection={this.state.searchSelection} />}/>
                <Route exact path='/authforms' render={() => <AuthForms 
                    error={this.state.error} 
                    login={handleLogin} 
                    signUp={handleSignUp} />} />
                <Route exact path="/contact-us" render={() => <ContactUs />} />
                <Route exact path="/my-oasis" render={() => <MyOasis
                    growingPlantsFeatures={this.state.growingPlantsFeatures}
                    logout={this.logout}
                    user={this.state.user}
                    addToGrowlist={this.addToGrowlist}
                    deleteFromWishlist={this.deleteFromWishlist} />}/>
            </>
        )
    }
}

export default withRouter(App)