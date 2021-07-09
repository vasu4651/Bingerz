function getRatingColor(vote) {
    if(vote >= 7.5)
        return 'green';
    if(vote >= 5.5)
        return 'orange';
    return 'red';
} 

function showMovies(movies,movieType)
{
    let main = document.querySelector('main');
    let sec = document.createElement('section');
    sec.className = 'sec';
    sec.innerHTML = `<h2 class="movie-type">${movieType}</h2>`;

    for(ele of movies) {
        let div = document.createElement('div');
        div.className = 'movie';
        let img_url = 'https://image.tmdb.org/t/p/w500' + ele.poster_path;

        div.innerHTML = `
            <img src="${img_url}"
                alt="${ele.original_title}">
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
    main.appendChild(sec);
}

function getMovies(urlMovies,movieType) {
    fetch(urlMovies)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const results = data.results;
            showMovies(results,movieType);
        })
        .catch(e => {
            console.log("Oops ... " , e);
        })
}




window.addEventListener('scroll' , () => {
    let header = document.querySelector('header');
    header.classList.toggle('scroll-active' , window.scrollY > 0);
})



const urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=03c2178517dc28b9826a04205452dba5&language=en-US&page=1';
const urlTopRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=03c2178517dc28b9826a04205452dba5&language=en-US&page=1';

getMovies(urlPopular,"Popular Movies");
getMovies(urlTopRated,"Top Rated Movies");


