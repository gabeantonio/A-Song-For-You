import tokenService from "./tokenService";

const BASE_URL = '/api/posts';

export function create(post) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: post,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then( res => {
        if(res.ok) return res.json()

        throw new Error('CREATE ERROR: Check your server terminal for error.')
    }) 
}

export function deletePost(postId) {
    return fetch(`${BASE_URL}/${postId}`, {
        method: 'DELETE',
        headers: {
        'Authorization': "Bearer " + tokenService.getToken(), 
        }
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}


export function getAll() {
    return fetch(BASE_URL, {
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