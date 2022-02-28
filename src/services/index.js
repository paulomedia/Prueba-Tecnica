export function fetchAllUsers() {
    return new Promise((resolve, reject) => {
        fetch('http://dummy.restapiexample.com/public/api/v1/employees', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(users => resolve(users))
        .catch(error => reject(error))
    }) 
}

export function createUser(data) {
    return new Promise((resolve, reject) => {
        fetch('http://dummy.restapiexample.com/api/v1/create', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => resolve(response.json()))
        .catch(error => reject(error))
    }) 
}   

export function updateUser(data) {
    return new Promise((resolve, reject) => {
        fetch(`http://dummy.restapiexample.com/api/v1/update/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        .then(response => resolve(response.json()))
        .catch(error => reject(error))
    }) 
}

export function deleteUser(id) {
    return new Promise((resolve, reject) => {
        fetch(`http://dummy.restapiexample.com/api/v1/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => resolve(response.json()))
        .catch(error => reject(error))
    })
}

export function getUser(id) {
    return new Promise((resolve, reject) => {
        fetch(`http://dummy.restapiexample.com/api/v1/employee/${id}`, {
            method: 'GET'
        })
        .then(response => resolve(response.json()))
        .catch(error => reject(error))
    })
}
