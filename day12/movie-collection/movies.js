// --- 1. 변수 선언 및 데이터 초기화 ---
// 요구사항: let, const, var 각각 최소 1회 사용
const defaultGenre = "Unknown"; // 기본값
let movies = []; // 영화 객체를 저장할 배열
var i; // 반복문에서 사용할 변수

// 하드코딩 영화 데이터 (최소 3개 이상)
const initialMovies = [
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
movies = [...initialMovies]; // 초기 영화 데이터로 배열 초기화

// --- 2. 기본 과제 기능: 영화 목록 출력 ---
function printMovies(movieList) {
  console.log("Movie Collection:");

  // 요구사항: for 루프 사용
  for (i = 0; i < movieList.length; i++) {
    const movie = movieList[i];

    // 요구사항: 조건문과 연산자를 사용하여 빈 속성에 기본값 설정
    const title = movie.title || "Untitled";
    const director = movie.director || "Unknown"; // 매개변수 기본값 대신 논리 연산자 활용
    const year = movie.year || "N/A";
    const genre = movie.genre || defaultGenre; // const로 선언된 기본값 사용

    // 템플릿 리터럴을 사용하여 가독성 높은 출력 문자열 생성
    console.log(
      `${
        i + 1
      }. Title: ${title}, Director: ${director}, Year: ${year}, Genre: ${genre}`
    );
  }

  console.log(`\nTotal Movies: ${movieList.length}`);
}

// --- 3. 도전 과제 기능: 검색, 통계, 추가 ---
const addMovies = (...newMovies) => {
  // Array.prototype.push와 ...spread 구문을 함께 사용
  movies.push(...newMovies);
  console.log(
    `\n ${newMovies.length} new movie(s) have been successfully added.`
  );
};

const printMoviesByGenre = (movieList, genre) => {
  console.log(`\nSearching for '${genre}' movies:`); // Array.prototype.filter를 사용하여 조건에 맞는 영화만 추출
  const filteredMovies = movieList.filter(
    (movie) => (movie.genre || defaultGenre) === genre
  );

  if (filteredMovies.length === 0) {
    console.log(`No movies found for genre: ${genre}.`);
    return;
  }

  // 필터링된 결과를 순회하며 출력
  for (i = 0; i < filteredMovies.length; i++) {
    const movie = filteredMovies[i];
    console.log(
      `${i + 1}. Title: ${movie.title}, Director: ${movie.director}, Year: ${
        movie.year
      }, Genre: ${movie.genre}`
    );
  }
};

const calculateAverageYear = function (movieList) {
  if (movieList.length === 0) return 0;
  // Array.prototype.reduce를 사용하여 연도의 총합을 계산
  const totalYears = movieList.reduce(
    (sum, movie) => sum + (movie.year || new Date().getFullYear()),
    0
  );
  return Math.round(totalYears / movieList.length);
};

const findNewestMovie = (movieList) => {
  if (movieList.length === 0) return null;
  // reduce를 사용하여 가장 연도가 높은 객체를 찾음
  return movieList.reduce((newest, current) => {
    return current.year > newest.year ? current : newest;
  });
};

// --- 4. 프로그램 실행 ---

console.log("Starting Movie Collection Program...");

// 기본 과제 실행: 전체 영화 목록 출력
printMovies(movies);
console.log("\n" + "=".repeat(40));

// 도전 과제 실행
console.log("Challenge Tasks Execution");

// 1. 장르별 검색
printMoviesByGenre(movies, "Sci-Fi");
printMoviesByGenre(movies, "Comedy"); // 결과가 없는 경우 테스트

// 2. 통계 계산
console.log("\nStatistics:");
const avgYear = calculateAverageYear(movies);
const newestMovie = findNewestMovie(movies);
console.log(`Average Year: ${avgYear}`);
if (newestMovie) {
  console.log(`Newest Movie: ${newestMovie.title} (${newestMovie.year})`);
}

// 3. 여러 영화 추가 (...rest 활용)
const additionalMovies = [
  { title: "Dune", director: "Denis Villeneuve", year: 2021, genre: "Sci-Fi" },
  {
    title: "Everything Everywhere All at Once",
    director: "Daniels",
    year: 2022,
    genre: "Action",
  },
];
addMovies(...additionalMovies);
