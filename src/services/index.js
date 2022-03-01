import urlServices from '../commons/'

const {
    CREATE_URL,
    DELETE_URL,
    GET_ALL_URL,
    GET_USER_URL,
    UPDATE_URL
} = urlServices;

export function getAll() {
    return new Promise((resolve, reject) => {
        fetch(GET_ALL_URL, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(users => resolve(users))
        .catch(error => reject(error))
    })
}

export function createUser(data) {
    return new Promise((resolve, reject) => {
        fetch(CREATE_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => resolve(response.json()))
        .catch(error => reject(error))
    }) 
}   

export function updateUser(data) {
    return new Promise((resolve, reject) => {
        fetch(`${UPDATE_URL}${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        .then(response => resolve(response.json()))
        .catch(error => reject(error))
    }) 
}

export function deleteUser(id) {
    return new Promise((resolve, reject) => {
        fetch(`${DELETE_URL}${id}`, {
            method: 'DELETE'
        })
        .then(response => resolve(response.json()))
        .catch(error => reject(error))
    })
}

export function getUser(id) {
    return new Promise((resolve, reject) => {
        fetch(`${GET_USER_URL}${id}`, {
            method: 'GET'
        })
        .then(response => resolve(response.json()))
        .catch(error => reject(error))
    })
}
