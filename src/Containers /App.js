import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import SearchPage from '../Pages/SearchPage'
import ContactUs from '../Pages/ContactUs'
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
        this.fetchPlants()
        // console.log(localStorage.token)
        // this.validateUser()
    }

    // validateUser = () => {
    //     if (localStorage.token) {
    //         fetch(VALIDATE_URL, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //                 Authorization: `bearer ${localStorage.token}`
    //             }
    //         })
    //         .then(res => res.json())
    //         .then(console.log)
    //     }
    // }

    fetchPlantFeatures = () => {
        const plant_names = this.state.user.growlist_plants.map(pl => pl.name)
        API.fetchPF()
        .then(data => data.filter(pl => plant_names.includes(pl.name)))
        .then(data => this.setState({growingPlantsFeatures: data}))
    }

    fetchPlants = () => {
        let rand = Math.floor(Math.random() * 97);
        API.fetchPlants()
            .then(data => this.setState({ allPlants: data, num: rand}))
            .then(() => this.setState({searchedPlants: this.state.allPlants}))
            .then(() => this.setState({shownPlants: this.state.searchedPlants.slice(rand, rand + 3)}))
    }

    capitalize = (input) => {
        return (input.charAt(0).toUpperCase() + input.slice(1))
    }

    uncapitalize = (input) => {
        return (input.charAt(0).toLowerCase() + input.slice(1))
    }

    updateSearchedPlants = (attr, userInput) => {
        let searchWord = (attr === "name" ? this.capitalize(userInput) : this.uncapitalize(userInput));
        this.setState({searchedPlants: this.state.allPlants.filter(pl => pl[attr].includes(searchWord))});
        this.updateShownPlants(attr, userInput);
    }

    updateShownPlants = (attr, userInput) => {
        let searchWord = (attr === "name" ? this.capitalize(userInput) : this.uncapitalize(userInput));
        this.setState({shownPlants: (this.state.allPlants.filter(pl => pl[attr].includes(searchWord))).slice(0, 3), num: 0});
    }

    searchAll = () => {
        this.updateSearchedPlants("name", "")
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
        if (this.state.user.wishlist_plants > 8) {
        } else {
            API.addToWishlist(e, plant, this.state.user)        
            .then(plant => this.setState({
                user: {
                    ...this.state.user,
                    wishlist_plants: [...this.state.user.wishlist_plants, plant]
                }
            }))
        }
    }

    addToGrowlist = (e, plant) => {
        if (this.state.growingPlantsFeatures.length > 3) {
        } else {
            API.addToGrowlist(e, plant, this.state.user)
            .then(growlist => this.setState({
                user: {
                    ...this.state.user,
                    growlist_plants: [...this.state.user.growlist_plants, growlist.plant],
                    start_time: [...this.state.user.start_time, growlist.start_time]
                }
            }))
            .then(() => API.getPlantFeatures(plant.id)
            .then(data => this.setState({growingPlantsFeatures: [...this.state.growingPlantsFeatures, data]})))
        }
    }

    deleteFromWishlist = (e, userId, plantId) => {
        API.findWish(userId, plantId)
            .then(wish => API.deleteWishlist(e, wish)
                .then(this.setState({user: {...this.state.user, 
                wishlist_plants: this.state.user.wishlist_plants.filter(p => p.id !== wish.plant_id)}
            })))
    }

    deleteFromGrowlist = (e, userId, plantId) => {
        API.findGrow(userId, plantId)
            .then(grow => API.deleteGrow(e, grow)
                .then(this.setState({user: {...this.state.user, 
                growlist_plants: this.state.user.growlist_plants.filter(p => p.id !== grow.plant_id)},
                growingPlantsFeatures: this.state.growingPlantsFeatures.filter(gp => gp.id !== plantId)}
            )))
    }


    setUser = (user) => {
        const { history } = this.props
        if (user) { 
            this.setState({
                user
            }, () => {
                history.push('/my-oasis');
                this.fetchPlantFeatures()
            })
        } else {
            this.setState({error: "please enter a valid username and password"})
        }
    }


    logout = () => {
        this.setState({user: false});
        localStorage.removeItem("token")
    }

    nextPage = () => {
        return this.state.num > (this.state.searchedPlants.length - 3) ? null : this.setState({shownPlants: this.state.searchedPlants.slice(this.state.num + 3, this.state.num + 6), num: this.state.num + 3}) 
    }

    prevPage = () => {
        return this.state.num < 1 ? null 
        : (this.state.num < 3 ? this.setState({shownPlants: this.state.searchedPlants.slice(0, 3), num: 0}) : this.setState({shownPlants: this.state.searchedPlants.slice(this.state.num - 3, this.state.num), 
        num: this.state.num - 3}))
    }


    render() {

        const handleLogin = loginData => {
            API.login(loginData)
                .then(this.setUser)
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
                    searchAll={this.searchAll}
                    searchedPlants={this.state.searchedPlants}
                    num={this.state.num}
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
                    deleteFromGrowlist={this.deleteFromGrowlist}
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