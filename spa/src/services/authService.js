const baseUrl = 'http://localhost:3030/api/auth';

export const login = async (username, password) => {
    let res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
};

export const register = (username , email, password) => {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
        .then(res => res.json()); 
};

export const logout = (token) => {
    return fetch(`${baseUrl}/logout`, {
        method: 'PUT' ,
        headers: {
            'Authorization': token,
        }
    })
};

export const getUser = () => {
    let username = localStorage.getItem('username');

    return username;
 
};

export const isAuthenticated = () => {
    return Boolean(getUser())
};