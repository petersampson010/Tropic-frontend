export const PLANTS_URL = "http://localhost:3000/plants"
export const USERS_URL = "http://localhost:3000/users"
export const LOGIN_URL = "http://localhost:3000/users/login"
export const VALIDATE_URL = "http://localhost:3000/users/validate_user"
export const WISHLIST_URL = "http://localhost:3000/wishlists"
export const GROWLIST_URL = "http://localhost:3000/growlists"
export const PLANT_GROWTHS_URL = "http://localhost:3000/plant_growths"

const jsonify = res => {
    if (!res.ok) {
        return false
    } else {
        return res.json()
    }
}

const login = loginData => {
    return fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ user: loginData })
    })
    .then(jsonify)
    .then(data => check(data))
    // .then(data => {
    //     localStorage.setItem("token", data.token);
    //     return data.user;
    // });
}

const check = (data) => {
    if (data) {
        localStorage.setItem("token", data.token);
        return data.user
    } else {
        return false 
    }
    // console.log(data)
}

const addToWishlist = (e, plant, user) => {
    e.preventDefault();
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ user_id: user.id, plant_id: plant.id })
    };
    return fetch(WISHLIST_URL, configObj)
    .then(res => res.json())
}

const addToGrowlist = (e, plant, user) => {
    e.preventDefault();
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ user_id: user.id, plant_id: plant.id, start_time: new Date()})
    };
    return fetch(GROWLIST_URL, configObj)
    .then(res => res.json())
    // .then(console.log)
}

const fetchPF = () => {
    return fetch("http://localhost:3000/plant_growths")
        .then(res => res.json())
}

const signUp = signupData => {
    return fetch(USERS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, body: JSON.stringify({ user: signupData })
    })
    .then(jsonify)
    .then(data => {
        localStorage.setItem("token", data.token);
        return data.user;
    });
}


const validateUser = () => {
    if (localStorage.token) {
        return fetch(VALIDATE_URL, {
            headers: {
                Authorisation: localStorage.token
            }
        })
        .then(jsonify)
        .then(data => {
            localStorage.setItem("token", data.token);
            return data.user;
        });
    } else {
        return Promise.reject({ error: "no token" });
    }
};

const fetchPlants = () => {
    return fetch(PLANTS_URL)
        .then(res => res.json())
}

const deleteWishlist = (e, wish) => {
    e.preventDefault()
    let configObj = {
        method: "DELETE"
    }
    return fetch(`${WISHLIST_URL}/${wish.id}`, configObj)
}

const deleteGrow = (e, grow) => {
    e.preventDefault();
    let configObj = {
            method: "DELETE"
    }
    return fetch(`${GROWLIST_URL}/${grow.id}`, configObj)
}

const fetchUser = (id) => {
    return fetch(`${USERS_URL}/${id}`)
        .then(res => res.json())
}

const findWish = (userId, plantId) => {
        return fetch(WISHLIST_URL)
            .then(res => res.json())
            .then(data => data.filter(w => w.user_id === userId))
            .then(data => data.filter(w => w.plant_id === plantId))
            .then(data => data[0])
}

const findGrow = (userId, plantId) => {
    return fetch(GROWLIST_URL)
        .then(res => res.json())
        .then(data => data.filter(g => g.user_id === userId))
        .then(data => data.filter(g => g.plant_id === plantId))
        .then(data => data[0])
}

const getPlantFeatures = (id) => {
    return fetch(`${PLANT_GROWTHS_URL}/${id}`)
        .then(res => res.json())
}

export default {
    login, 
    signUp,
    validateUser,
    addToWishlist,
    addToGrowlist,
    fetchPF,
    fetchPlants,
    deleteWishlist,
    deleteGrow,
    fetchUser, 
    findWish,
    findGrow,
    getPlantFeatures
}

