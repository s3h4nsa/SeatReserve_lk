/**
 * Centralized data module for SeatReserve.lk
 * Contains shared data used across multiple pages
 */

// Create a namespace for our data
window.SeatReserveData = window.SeatReserveData || {}

// Movie data
window.SeatReserveData.movies = {
  1: {
    title: "Rani",
    director: "Asoka Handagama",
    cast: [
      "Swarna Mallawarachchi",
      "Sanath Gunathilake",
      "Rehan Amaratunga",
      "Sajitha Anthony",
      "Bimal Jayakody",
      "Ashan Dias",
      "Mayura Kanchana",
      "Rithika Kodithuvakku",
    ],
    rating: "Not Rated",
    duration: "133 min",
    genre: "Biographical Drama Thriller",
    releaseDate: "January 30, 2025",
    image: "assets/posters/Rani.jpg",
    banner: "assets/banners/Rani-banner.jpg",
    synopsis:
      "Rani is a biographical drama based on the true story of Dr. Manorani Saravanamuttu's relentless pursuit of justice after the abduction and murder of her son, journalist Richard de Zoysa, in 1990. Directed by Asoka Handagama, the film portrays a mother's unwavering courage against political oppression.",
    trailerUrl: "https://www.youtube.com/watch?v=A5pTGe2Z9mI",
    imdbRating: "7.5",
    adultPrice: 600,
    childPrice: 400,
    seniorPrice: 500,
  },
  2: {
    title: "Ape Principal",
    director: "Chris Antony",
    cast: ["Dilhani Ekanayake", "Roger Seneviratne", "Jagath Chamila", "Shyam Fernando", "Samantha Kumara Gamage"],
    rating: "Not Rated",
    duration: "106 min",
    genre: "Drama",
    releaseDate: "December 14, 2023",
    image: "assets/posters/Ape-Principal.png",
    banner: "assets/banners/Ape-Principal.jpg",
    synopsis:
      "A new female principal's efforts to combat drug abuse and corruption within a struggling village school, Mihinpura Vidyalaya, with the help of villagers and students, facing opposition from drug lords and politicians.",
    trailerUrl: "https://www.youtube.com/watch?v=wYwIlq3t3gw",
    imdbRating: "6.8",
    adultPrice: 650,
    childPrice: 450,
    seniorPrice: 550,
  },
  3: {
    title: "Kasi Wasi",
    director: "Jayaprakash Sivagurunadan",
    cast: ["Giriraj Kaushalya", "Sarath Kothalawala", "Rodney Warnakula", "Gihan Fernando", "Priyantha Seneviratne"],
    rating: "Not Rated",
    duration: "115 min",
    genre: "Comedy",
    releaseDate: "2025",
    image: "assets/posters/Kasi-wasi.jpg",
    banner: "assets/banners/Kasi-Wasi.jpg",
    synopsis:
      "Mr. Amarabandu is a funeral director who manages his business with the help of three assistants. However, these assistants frequently create challenges for the business. Meanwhile, Vishwakarma joins Mr. Amarabandu's team with the aim of improving and developing the funeral service operations.",
    trailerUrl: "https://www.youtube.com/watch?v=ZDGHSLAtPg0",
    imdbRating: "4.5",
    adultPrice: 550,
    childPrice: 350,
    seniorPrice: 450,
  },
  4: {
    title: "Oppenheimer",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    rating: "R",
    duration: "180 min",
    genre: "Biography/Drama",
    releaseDate: "July 21, 2023",
    image: "assets/posters/Oppenheimer.jpg",
    banner: "assets/banners/oppenheimer-banner.jpg",
    synopsis:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, exploring the moral complexities and consequences of his work.",
    trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    imdbRating: "8.9",
    adultPrice: 700,
    childPrice: 500,
    seniorPrice: 600,
  },
  5: {
    title: "Dune: Part II",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    rating: "Not Rated",
    duration: "Not available",
    genre: "Adventure/Drama/Sci-Fi",
    releaseDate: "November 20, 2025",
    image: "assets/posters/Dune-Two.jpg",
    banner: "assets/banners/Dune-Two.jpg",
    synopsis:
      "The sequel to the 2021 film 'Dune,' continuing the adaptation of Frank Herbert's science fiction novel, focusing on Paul Atreides' journey among the Fremen and his rise against the galactic empire.",
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
    imdbRating: "8.5",
    adultPrice: 700,
    childPrice: 500,
    seniorPrice: 600,
  },
  6: {
    title: "Godzilla x Kong: The New Empire",
    director: "Adam Wingard",
    cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens"],
    rating: "PG-13",
    duration: "115 min",
    genre: "Action/Sci-Fi",
    releaseDate: "March 15, 2025",
    image: "assets/posters/godzilla_x_kong.jpg",
    banner: "assets/banners/godzilla-x-kong.jpg",
    synopsis:
      "The epic next chapter in the cinematic Monsterverse pits the almighty Kong and the fearsome Godzilla against a colossal undiscovered threat hidden within our world, challenging their very existence—and our own.",
    trailerUrl: "https://www.youtube.com/embed/vi2055259673",
    imdbRating: "7.7",
    adultPrice: 750,
    childPrice: 550,
    seniorPrice: 650,
  },
}

// Theater data
window.SeatReserveData.theaters = [
  {
    id: 1,
    name: "SCOPE CINEMAS MULTIPLEX - Havelock City Mall",
    address: "Havelock City Mall 324 Havelock Road, Colombo 05",
    phone: "0112590814",
    distance: "2.5 miles",
    image: "assets/theaters/60ee8ca3-e8ee-448d-a5bd-ebbc768bf3b7.jpg",
    amenities: ["IMAX", "Dolby Cinema", "Recliners", "Wheelchair Accessible"],
    showtimes: ["10:30 AM", "1:15 PM", "4:00 PM", "7:30 PM", "10:45 PM"],
  },
  {
    id: 2,
    name: "SCOPE CINEMAS MULTIPLEX - Colombo City Centre",
    address: "137 Sir James Pieris Mawatha, Colombo 2",
    phone: "0112083064",
    distance: "5.1 miles",
    image: "assets/theaters/c615697a-fd01-48bf-b40b-4067badf0189.jpeg",
    amenities: ["RPX", "Recliners", "Dine-In", "Wheelchair Accessible"],
    showtimes: ["11:00 AM", "2:00 PM", "5:15 PM", "8:30 PM", "11:15 PM"],
  },
  {
    id: 3,
    name: "LIBERTY BY SCOPE CINEMAS - Colpetty",
    address: "No.35 Srimath Anagarika Dharmapala Mawatha, Colombo 03",
    phone: "0112326266",
    distance: "3.8 miles",
    image: "assets/theaters/17d0d2b3-02c3-4fe3-9c0d-8b16241480ae.jpg",
    amenities: ["Indie Films", "Recliners", "Hearing Devices", "Doloby Cinema"],
    showtimes: ["12:30 PM", "3:45 PM", "6:30 PM", "9:15 PM"],
  },
]

// Helper functions to work with the data
window.SeatReserveData.getMovie = function (id) {
  return this.movies[id] || null
}

window.SeatReserveData.getTheater = function (id) {
  return this.theaters.find((theater) => theater.id === id) || null
}

window.SeatReserveData.getAllMovies = function () {
  return Object.values(this.movies)
}

window.SeatReserveData.getAllTheaters = function () {
  return this.theaters
}

window.SeatReserveData.getNowPlayingMovies = function () {
  const now = new Date()
  return Object.values(this.movies).filter((movie) => {
    const releaseDate = new Date(movie.releaseDate)
    return releaseDate <= now
  })
}

window.SeatReserveData.getComingSoonMovies = function () {
  const now = new Date()
  return Object.values(this.movies).filter((movie) => {
    const releaseDate = new Date(movie.releaseDate)
    return releaseDate > now
  })
}

console.log("SeatReserve data module loaded")

