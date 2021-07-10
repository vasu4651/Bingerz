let genreSelect = document.querySelector('.genreSelect');

window.addEventListener('load' , () => {
    const params = (new URL(document.location)).searchParams;
    const queryString = params.get('queryString');
    fetchGenres();
    if(queryString === null)
        fetchTrending();
    else
    {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=03c2178517dc28b9826a04205452dba5&query=${queryString}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const results = data.results;
                showMovies(results,"Search Results for\xa0\xa0:\xa0\xa0 "  + queryString);
            })
    }


    
})


function fetchTrending() {
    console.log('inisde trending fetch');
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=03c2178517dc28b9826a04205452dba5`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const results = data.results;
                showMovies(results,"Trending Now\xa0\xa0:\xa0\xa0 ");
            })
}

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


function fetchGenres() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=03c2178517dc28b9826a04205452dba5&language=en-US')
        .then( res => {
            return res.json()
        })
        .then (data => {
            const genreObj =  data.genres;
            fetchGenreUtil(genreObj);
        })
        .catch ( e=>{
            console.log("Oops ... ", e);
        })
}

function fetchGenreUtil(genreObj) {
    genreSelect.innerHTML = '<option value="none">Genre</option>';
    for(item of genreObj) {
        const option = document.createElement('option');
        option.className = 'genreOption';
        option.value = item.id;
        option.innerHTML = item.name;
        genreSelect.appendChild(option);
    }
}

genreSelect.addEventListener('change' , () => {
    const value = genreSelect.value;
    const genreSelectText = genreSelect.options[genreSelect.selectedIndex].text;
    if(value == 'none')
        fetchTrending();
    else {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=03c2178517dc28b9826a04205452dba5&with_genres=${value}`)
        .then( res=> {
            return res.json();
        })
        .then( data => {
            const results = data.results;
            showMovies(results,`${genreSelectText}`);
        })
        .catch(e => {
            console.log("Oops ... ", e);
        })
    }
})