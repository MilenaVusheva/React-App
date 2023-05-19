import * as request from './requester';

const baseUrl = 'http://localhost:3030/api';

export const getAll = (selectedCategory,search) => {
    return request.get(`${baseUrl}/pets?category=${selectedCategory.toString()}&search=${search}`)
};

export const getMyPets = (userId) => {
    return request.get(`${baseUrl}/pets/${userId}`);
};

export const create = async (petData, token) => {
    let response = await fetch(`${baseUrl}/pets/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'bearer ' + token,
        },
        body: JSON.stringify({ ...petData, likes: [] })
    });

    let result = await response.json();

    return result;
};

export const getOne = (petId) => {
    return fetch(`${baseUrl}/pets/details/${petId}`)
        .then(res => res.json())
};

export const updateOne = (petId, petData) =>
    request.put(`${baseUrl}/pets/details/edit/${petId}`, petData);

export const deleteOne = (petId, token) => {
    return fetch(`${baseUrl}/pets/details/${petId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + token,
        },
    }).then(res => res.json());
};

export const like = (petId, pet, token) => {
    return fetch(`${baseUrl}/pets/${petId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'bearer' + token
        },
        body: JSON.stringify(pet)
    }).then(res => res.json());
};
