export const PLANTS_URL = "http://localhost:3000/plants"
export const USERS_URL = "http://localhost:3000/users"
export const LOGIN_URL = "http://localhost:3000/users/login"
export const VALIDATE_URL = "http://localhost:3000/users/validate_user"
export const WISHLIST_URL = "http://localhost:3000/wishlists"
export const GROWLIST_URL = "http://localhost:3000/growlists"

const jsonify = res => {
    if (!res.ok) throw {error: 'something went wrong'}
    return res.json()
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
    .then(data => {
        localStorage.setItem("token", data.token);
        return data.user;
    });
}

const updateList = (e, plant, user, list) => {
    e.preventDefault();
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ user_id: user.id, plant_id: plant.id })
    };
    return fetch(list, configObj)
    .then(res => res.json())
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
    console.log(wish)
    return fetch(`${WISHLIST_URL}/${wish.id}`, configObj)
}

const deleteGrow = (e, plant_id) => {
    e.preventDefault();
        let configObj = {
            method: "DELETE"
        }
        return fetch(`${GROWLIST_URL}/${plant_id}`, configObj)
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

export default {
    login, 
    signUp,
    validateUser,
    updateList,
    fetchPF,
    fetchPlants,
    deleteWishlist,
    deleteGrow,
    fetchUser, 
    findWish
}

