const apikey = "53f00e02";

function search_movies() {
    const query = document.getElementById("search_input").value;
    if (!query) {
        return;
    }

    fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}&type=movie`)
        .then(res => res.json())
        .then(data => {
             console.log(data);
            if (data.Response === "True") {
                displaySearchResults(data.Search);
            } else {
                document.getElementById("search_results").innerHTML =`<h2>${data.Error}</h2>`;
            }
        })
        .catch(err => console.error(err));
}

function displaySearchResults(movies) {
    const resultsDiv = document.getElementById("search_results");
    resultsDiv.innerHTML = "";
    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie_card");
        card.innerHTML = `<img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" width="100">
            <h3>${movie.Title} (${movie.Year})</h3> `;
        resultsDiv.appendChild(card);
    });
}

function loadGenreMovies() {
    const genres = {
        crime: "crime",
        drama: "drama",
        action: "action"
    };
    for (const section in genres) {
        fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${genres[section]}&type=movie`)
            .then(res => res.json())
            .then(data => {
                console.log(section, data);
                if (data.Response === "True") {

                    displayGenreMovies(section, data.Search);

                } else {

                    document.getElementById(section + "_movies").innerHTML =
                        `<h2>${data.Error}</h2>`;
                }

            })
            .catch(err => console.log(err));
    }
}


function displayGenreMovies(section, movies) {
    const containerId = section + "_movies";
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie_card");
        card.innerHTML = `<img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" width="100"><h4>${movie.Title} (${movie.Year})</h4>`;
        container.appendChild(card);
    });
}
function addCustomMovie() {

    const movieName =
        document.getElementById("movie_name").value;

    const movieDescription =
        document.getElementById("movie_description").value;

    if (!movieName || !movieDescription) {

        alert("Please fill all fields");

        return;
    }

    fetch(`https://www.omdbapi.com/?apikey=${apikey}&t=${movieName}`)
        .then(res => res.json())
        .then(data => {

            if (data.Response === "True") {

                const container =
                    document.getElementById("my_movies_container");

                const card = document.createElement("div");

                card.classList.add("movie_card");

                card.innerHTML = `

                    <img src="${data.Poster}" />

                    <h3>${data.Title} (${data.Year})</h3>

                    <p>${movieDescription}</p>

                `;

                container.appendChild(card);

                // clear inputs

                document.getElementById("movie_name").value = "";

                document.getElementById("movie_description").value = "";

            } else {

                alert("Movie not found!");

            }

        })
        .catch(err => console.log(err));
}

window.onload = loadGenreMovies;