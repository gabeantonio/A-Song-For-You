const axios = require("axios")

const options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/search',
    params: {q: 'Beyonce'},
    headers: {
    'X-RapidAPI-Key': '355f8f5ff2msh84cc656855492b7p1b752cjsn934e4aa88371',
    'X-RapidAPI-Host': 'genius.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

