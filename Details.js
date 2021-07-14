const APIKEY = "6961a02525def4dd6219d9fc6e51f75d"


query = window.localStorage.getItem("title")

index = window.localStorage.getItem("index")


movieIds = {"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}
function displaySearchedMovies() {
    genre_string = ""
    url = "https://api.themoviedb.org/3/search/movie?api_key=6961a02525def4dd6219d9fc6e51f75d&language=en-US&page=1&include_adult=false&query=" 
    fetch(url+query).then(response => response.json())
    .then (data => {
       data.results.forEach(function(item) {
           if (item.id == parseInt(index)) {
               document.querySelector(".title").innerHTML = item.title
               document.querySelector(".pic-container").style.backgroundImage="url(http://image.tmdb.org/t/p/w500/"+item.backdrop_path+")"
               document.querySelector(".synopsis").innerHTML = "Synopsis: <br>"+item.overview
               document.querySelector(".release-date").innerHTML = "Release Date: "+item.release_date
               document.querySelector(".rating").innerHTML = "Rating: "+ item.vote_average+ "/10 ("+item.vote_count+" votes)"
               id_array= Array.from(movieIds.genres)
               display_array = []
                for (i=0; i<item.genre_ids.length;i++) {
                   for(j=0;j< id_array.length;j++) {
                        if (item.genre_ids[i] == id_array[j].id) {
                            display_array.push(id_array[j].name)
                        }

                    }
                }

                for (i=0; i<display_array.length;i++) {
                    if(i == display_array.length-1) {
                        genre_string += display_array[i]
                    }
                    else {
                        genre_string += display_array[i] + ", "
                    }
                }

                document.querySelector(".genres").innerHTML = "Genres: "+genre_string

            }
        })
        fetchCast()
        
    })

    
}

function getTrailer() {
    url= "http://api.themoviedb.org/3/movie/"+index+"/videos?api_key="+APIKEY
    fetch(url)
    .then(res => res.json())
    .then(data =>  {
        try {
            document.getElementsByTagName("iframe")[0].innerHTML=""

            document.getElementsByTagName("iframe")[0].src="https://www.youtube.com/embed/"+data.results[0].key

        }
        catch {
            document.getElementsByTagName("iframe")[0].parentElement.innerHTML="Could not find trailer"

        }


    })
       
}

function fetchCast() {
    caststring=""
    url= "https://api.themoviedb.org/3/movie/+"+index+"?api_key="+APIKEY+"&append_to_response=credits"
    fetch(url)
    .then(
        response => response.json()
    )
    .then(data => {
    console.log(data.credits.cast)
    
    for(i=0;i<data.credits.cast.length;i++) {
        if (i == data.credits.cast.length-1) {
            caststring += data.credits.cast[i].name
        }
        else {
            caststring += data.credits.cast[i].name+", "

        }

    }
    
    document.querySelector(".cast").innerHTML = caststring
})
        
}


window.addEventListener('load', function() {
    displaySearchedMovies()
    getTrailer()
})


document.querySelector(".logo").addEventListener('click',function() {
    location.href="index.html"
})
