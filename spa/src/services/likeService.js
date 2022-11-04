import * as request from './requester';

const baseUrl = 'http://localhost:3030/api';

export const like = (userId, petId) => request.post(`${baseUrl}/pets/like/${petId}/${userId}`, {userId, petId});

export const getPetLikes = (petId , userId) => {
    //const query = encodeURIComponent(`petId="${petId}"`);

    //return request.get(`${baseUrl}/likes?select=userId&where=${query}`)
    
    return request.get(`${baseUrl}/pets/details/likes/${petId}`)
        .then(res => res.map(x => x.userId));
}