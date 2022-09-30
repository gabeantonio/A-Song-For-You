import tokenService from "./tokenService";

const BASE_URL = '/song/';

export function getSong(songName) {
    return fetch(BASE_URL + songName, {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer ' + tokenService.getToken() 
        }
    })
    .then((res) => {
        if(res.ok) return res.json();

        return res.json().then(response => {
        console.log(response)
        throw new Error(response.err)
        })
    });
}

