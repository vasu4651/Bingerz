window.addEventListener('load' , () => {
    const params = (new URL(document.location)).searchParams;
    const queryString = params.get('queryString');
    if(queryString === null)
        return;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=03c2178517dc28b9826a04205452dba5&query=${queryString}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            const results = data.results;
            showMovies(results,"Search Results for\xa0\xa0:\xa0\xa0 "  + queryString);
        })


    
})


function getRatingColor(vote) {
    if(vote >= 7.5)
        return 'green';
    if(vote >= 5.5)
        return 'orange';
    return 'red';
} 

function showMovies(movies,movieType)
{
    let sec = document.querySelector('.sec');
    sec.innerHTML = `<h2 class="movie-type">${movieType}</h2>`;

    for(ele of movies) {
        let div = document.createElement('div');
        div.className = 'movie';
        let img_url = 'https://image.tmdb.org/t/p/w500' + ele.poster_path;

        div.innerHTML = `
            <img src="${img_url}"
                alt="">
            <div class="info">
                <h3>${ele.original_title}</h3>
                <span class = "rating ${getRatingColor(ele.vote_average)} "> ${ele.vote_average} </span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <div>${ele.overview}</div>
            </div>`
        

        sec.appendChild(div);
    }
}

window.addEventListener('scroll' , () => {
    let header = document.querySelector('header');
    header.classList.toggle('scroll-active' , window.scrollY > 0);
})

// const form = document.querySelector('#form');
// form.addEventListener('submit' , (e) => {
//     e.preventDefault();
//     const queryString = document.querySelector('#search').value;
    
//     fetch(`https://api.themoviedb.org/3/search/movie?api_key=03c2178517dc28b9826a04205452dba5&query=${queryString}`)
//         .then(res => {
//             return res.json()
//         })
//         .then(data => {
//             const results = data.results;
//             showMovies(results,"Search Results for\xa0\xa0:\xa0\xa0 "  + queryString);
//         })
// })