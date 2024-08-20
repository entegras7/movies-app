
export async function getMovies(page) {
    let url = 'https://movies-api14.p.rapidapi.com/movies';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '684ba17c76msh7932f4326f3ae34p1611e7jsnc7338e117506',
            'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
        }
    };

    if (page !== null) {
        url += `?page=${page}`
    }

    return await fetch(url, options)
        .then(response => response.json())
        .catch((e) => { console.log(e) })
}

export async function searchMovies(value) {
    const url = `https://movies-api14.p.rapidapi.com/search?query=${encodeURIComponent(value)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '684ba17c76msh7932f4326f3ae34p1611e7jsnc7338e117506',
            'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
        }
    };

    return await fetch(url, options)
        .then(response => response.json())
        .catch(console.log("Error"))
}