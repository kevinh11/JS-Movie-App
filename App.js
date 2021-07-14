const APIKEY = "6961a02525def4dd6219d9fc6e51f75d"


function getPopularMovies() {
    page_number = parseInt(document.getElementsByTagName("select")[0].value)
    fetch("https://api.themoviedb.org/3/movie/popular?api_key="+APIKEY+"&language=en-US&page="+page_number+"")
    .then(
        Response => Response.json()
    )
    .then (data => {
        data.results.forEach(function(item) {
            id = item.id

            displayMovies(item,"trending-movies",id)
        })

        }
        
    )
    
}

function getHighestRatedMovies() {
    page_number = parseInt(document.getElementsByTagName("select")[1].value)

    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key="+ APIKEY+ "&language=en-US&page="+page_number)
    .then(
        Response => Response.json()
    )
    .then (data => {

        data.results.forEach(function(item) {
            id = item.id

            displayMovies(item,"highest-rated",id)
        })
        }
    )
}

function searchMovies() {
    url = "https://api.themoviedb.org/3/search/movie?api_key=6961a02525def4dd6219d9fc6e51f75d&language=en-US&page=1&include_adult=false&query=" 
    query = document.getElementById("search-button").value
    document.getElementById("search-h1").innerHTML = "Search Results For " + "'"+query+"'"
    fetch(url+query).then(response => response.json())
    .then (data => {
        removeElement("search-results")

        data.results.forEach(function(item) {
            id = item.id

            searchDisplay()
            narrowDown(query)
            displayMovies(item, "search-results",id)

        })

        
    })

    if(query.length == 0) {
        document.querySelector(".highest-rated").style.display="grid"
        document.querySelector(".trending-movies").style.display="grid"
        document.getElementsByTagName("footer")[0].style.display="flex"
        Array.from(document.getElementsByClassName("header")).forEach(function(el) {
            el.style.display = "flex"
        })

        removeElement("trending-movies")
        removeElement("highest-rated")

        
        getHighestRatedMovies()
        getPopularMovies()

        Array.from(document.getElementsByClassName("search-results")).forEach(function(item) {
            item.remove()
            document.getElementById("search-h1").innerHTML = ""

        })
        entry = document.createElement("div")
        entry.classList.add("search-results")
        document.querySelector(".search").appendChild(entry)
    }
}

function searchDisplay() {
    document.querySelector(".highest-rated").style.display="none"
    document.querySelector(".trending-movies").style.display="none"
    document.getElementsByTagName("footer")[0].style.display="none"


    Array.from(document.getElementsByClassName("header")).forEach(function(el) {
        el.style.display = "none"
    })
}

function getTitle(event) {
    window.localStorage.setItem("title",event.target.parentElement.children[1].innerHTML)
    window.localStorage.setItem("index",event.target.parentElement.children[3].innerHTML)


}



function narrowDown(key) {
    titleh1 = document.getElementsByClassName("title-h1")
    
    Array.from(titleh1).forEach(function(item) {
        if (!item.innerHTML.toLowerCase().includes(key.toLowerCase())) {
            item.parentElement.remove()
        }
    })


}


function removeElement(classname) {

    document.querySelector('.'+classname).remove()

    El = document.createElement("div")

    El.classList.add(classname)

    if (classname == "trending-movies") {
        document.querySelector(".trending").appendChild(El)


    }
    else if (classname == "highest-rated") {
        document.querySelector(".highest").appendChild(El)

    }
    else {
        document.querySelector(".search").appendChild(El)

    }


}
function displayMovies(element,category,index) {
    newEntry = document.createElement("div")
    newEntry.classList.add("trending-movie")

    title = document.createElement("h1")
    title.classList.add("title-h1")
    title.innerHTML = element.title;

    imagesect = document.createElement("div")
    imagesect.alt = element.title
    imagesect.classList.add("poster")
    try {

        imagesect.style.backgroundImage = "url(http://image.tmdb.org/t/p/w500/"+element.backdrop_path+")"

    }
    catch {
        imagesect.innerHTML="Image Unavailable"
    }

    rating = document.createElement("h4")
    rating.classList.add("rating")
    rating.innerHTML = "Rating: "+ element.vote_average+ " /10 ("+ element.vote_count+" votes)"

    indexVal= document.createElement("h5")
    indexVal.innerHTML = index.toString()
    indexVal.style.display = "none"
    

    newEntry.appendChild(imagesect)
    newEntry.appendChild(title)
    newEntry.appendChild(rating)
    newEntry.appendChild(indexVal)



    newEntry.addEventListener('click', function() {
        location.href="details.html"
        getTitle(event)
        
    })
    
    document.querySelector("."+category).appendChild(newEntry)

   
}




//Event Listeners
document.getElementById("search-button").addEventListener('input',function() {
    searchMovies()
})
document.getElementsByTagName("select")[0].addEventListener('change',function() {
    removeElement("trending-movies")
    getPopularMovies()
})
document.getElementsByTagName("select")[1].addEventListener('change',function() {
    removeElement("highest-rated")
    getHighestRatedMovies()
})

window.addEventListener('load',function() {
    getPopularMovies()
    getHighestRatedMovies()
  

})

