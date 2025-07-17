// Array.map()
// 배열을 다른 배열로 매핑할 때 사용

let movies = [
  { title: "The Matrix", director: "Wachowskis", year: 1999, genre: "Sci-Fi" },
  { title: "Inception", director: "Nolan", year: 2010, genre: "Sci-Fi" },
  { title: "Parasite", director: "Bong Joon-ho", year: 2019, genre: "Drama" },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
    genre: "Crime",
  },
  { title: "Anonymous Movie", director: "", year: 2023, genre: "" },
];

// title 만 배열로 뽑아서 확인하고 싶다.
const titles = [];
for (let i = 0; i < movies.length; i++) {
  const Movie = movies[i];
  titles.push(Movie.title);
}

// Array.map
const titlesByMap = movies.map((movie) => {
  console.log(movie);
  return movie.title;
});
console.log(titlesByMap);

// {title, director}만 있는 배열로 확인하고 싶다.
const inforArr = [];
for (const movie of movies) {
  inforArr.push({
    title: movie.title,
    director: movie.director,
  });
}
for (const movie of movies) {
  const { title, director } = movie;
  inforArr.push({
    title,
    director,
  });
}

// map
