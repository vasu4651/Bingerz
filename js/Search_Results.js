let genreSelect = document.querySelector('.genreSelect');
const trendingAPI = `https://api.themoviedb.org/3/trending/movie/day?api_key=03c2178517dc28b9826a04205452dba5`;




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

function getMovies(movieURL,movieType) {
    fetch(movieURL)
        .then(res => {
            return res.json()
        })
        .then(data => {
            const results = data.results;
            showMovies(results,movieType);
        })
        .catch(e => {
            console.log("Oops ... " , e);
        })
}

function getGenreUtil(genreObj) {
    genreSelect.innerHTML = '<option value="none">Genre</option>';
    for(item of genreObj) {
        const option = document.createElement('option');
        option.className = 'genreOption';
        option.value = item.id;
        option.innerHTML = item.name;
        genreSelect.appendChild(option);
    }
}

function getGenres() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=03c2178517dc28b9826a04205452dba5&language=en-US')
        .then( res => {
            return res.json()
        })
        .then (data => {
            const genreObj =  data.genres;
            getGenreUtil(genreObj);
        })
        .catch ( e=>{
            console.log("Oops ... ", e);
        })
}

genreSelect.addEventListener('change' , () => {
    const value = genreSelect.value;
    const genreSelectText = genreSelect.options[genreSelect.selectedIndex].text;
    if(value == 'none')
        getMovies(trendingAPI,"Trending Now\xa0\xa0:\xa0\xa0 ");
    else
        getMovies(`https://api.themoviedb.org/3/discover/movie?api_key=03c2178517dc28b9826a04205452dba5&with_genres=${value}`,`${genreSelectText}`);
})

window.addEventListener('scroll' , () => {
    let header = document.querySelector('header');
    header.classList.toggle('scroll-active' , window.scrollY > 0);
})


window.addEventListener('load' , () => {
    getGenres();
    const params = (new URL(document.location)).searchParams;  // to get query string from previous page
    const queryString = params.get('queryString');
    if(queryString === null)
        getMovies(trendingAPI,"Trending Now\xa0\xa0:\xa0\xa0 ");
    else
    {
        getMovies(`https://api.themoviedb.org/3/search/movie?api_key=03c2178517dc28b9826a04205452dba5&query=${queryString}`,"Search Results for\xa0\xa0:\xa0\xa0 "  + queryString);
    }
})