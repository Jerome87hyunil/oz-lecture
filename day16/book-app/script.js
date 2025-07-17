// 도서 데이터를 저장할 배열
const books = [];
// 대여 상태를 관리할 배열 (도전 과제)
const rentals = [];

// 입력된 정보로 새 도서를 목록에 추가
// 대여 관리를 위한 클로저 객체도 함께 생성
function addBook() {
  const titleInput = document.getElementById("bookTitle");
  const priceInput = document.getElementById("bookPrice");
  const title = titleInput.value.trim();
  const price = Number(priceInput.value);

  // 유효성 검사
  if (title === "" || isNaN(price) || price <= 0) {
    alert("도서 제목과 유효한 가격(0 초과)을 입력하세요!");
    return;
  }

  // 도서 객체 생성 및 배열에 추가
  const book = { title, price };
  books.push(book);

  // 대여 상태 클로저 객체 생성 및 저장 (도전 과제)
  const rental = createBookRental(title);
  rentals.push(rental);

  // DOM에 새로운 도서 항목 추가
  const bookList = document.getElementById("bookList");
  const li = document.createElement("li");
  li.className = "book-item";
  li.innerHTML = `
        <span>${title} - ${price}원 (대여 가능)</span>
        <div>
            <button onclick="removeBook(this)">삭제</button>
            <button onclick="toggleRental(this)">대여/반납</button>
        </div>
    `;
  bookList.appendChild(li);

  // 입력 필드 초기화
  titleInput.value = "";
  priceInput.value = "";
}

// '삭제' 버튼에 연결된 도서를 목록과 데이터에서 제거
function removeBook(button) {
  // li 요소와 제목 추출
  const li = button.closest(".book-item");
  const text = li.querySelector("span").textContent; // 예: "책1 - 5000원 (대여 가능)"
  const title = text.split(" - ")[0]; // 제목: "책1"

  // books 배열에서 해당 도서의 인덱스를 찾습니다.
  const bookIndex = books.findIndex((book) => book.title === title);
  // 인덱스를 찾았다면, splice를 이용해 배열에서 제거
  if (bookIndex > -1) {
    books.splice(bookIndex, 1);
  }

  // (도전과제) rentals 배열에서 해당 도서의 대여 상태를 제거
  const rentalIndex = rentals.findIndex(
    (rental) => rental.getStatus().title === title
  );
  if (rentalIndex > -1) {
    rentals.splice(rentalIndex, 1);
  }

  // DOM에서 li 요소를 제거하여 화면에서 숨기기
  li.remove();
}

// 배열 메서드(map, filter, reduce)를 사용해 도서 데이터를 처리하고 결과를 화면에 표시
function processBooks() {
  const resultsDiv = document.getElementById("results");

  // 1. map: 각 도서 제목에 "Book: " 접두사를 추가한 새 배열 생성
  const prefixedBooks = books.map((book) => {
    return `Book: ${book.title} - ${book.price}원`;
  });

  // 2. filter: 가격이 10,000원 이상인 도서만 필터링하여 새 배열 생성
  const highPriceBooks = books.filter((book) => book.price >= 10000);

  // 3. reduce: 모든 도서의 가격을 합산하여 총 가격 계산
  const totalPrice = books.reduce((sum, book) => sum + book.price, 0);

  // 결과 표시
  let html = "<h3>📚 도서 데이터 처리 결과</h3>";

  html += "<h4>- 모든 도서 (제목 접두사 추가):</h4><ul>";
  if (prefixedBooks.length === 0) {
    html += "<li>도서가 없습니다.</li>";
  } else {
    prefixedBooks.forEach((bookText) => {
      html += `<li>${bookText}</li>`;
    });
  }
  html += "</ul>";

  html += "<h4>- 고가 도서 (10,000원 이상):</h4><ul>";
  if (highPriceBooks.length === 0) {
    html += "<li>고가 도서가 없습니다.</li>";
  } else {
    highPriceBooks.forEach((book) => {
      html += `<li>${book.title} - ${book.price}원</li>`;
    });
  }
  html += "</ul>";

  html += `<h4>- 총 가격:</h4><p>${totalPrice.toLocaleString()}원</p>`;
  resultsDiv.innerHTML = html;
}

// 클로저를 사용하여 각 도서의 대여 상태를 관리하는 객체를 생성합니다.
const createBookRental = (bookTitle) => {
  let isBorrowed = false; // 대여 상태 (private 변수)
  let borrowCount = 0; // 대여 횟수 (private 변수)

  return {
    // 대여 처리 메서드
    borrow: () => {
      if (isBorrowed) {
        alert(`'${bookTitle}'은(는) 이미 대여 중입니다.`);
        return false;
      }
      isBorrowed = true;
      borrowCount++;
      return true;
    },
    // 반납 처리 메서드
    returnBook: () => {
      if (!isBorrowed) {
        alert(`'${bookTitle}'은(는) 이미 반납된 상태입니다.`);
        return;
      }
      isBorrowed = false;
    },
    // 현재 상태 조회 메서드
    getStatus: () => ({
      title: bookTitle,
      isBorrowed,
      borrowCount,
    }),
  };
};

// '대여/반납' 버튼 클릭 시 도서의 대여 상태를 토글 (도전 과제)
function toggleRental(button) {
  const li = button.closest(".book-item");
  const span = li.querySelector("span");
  const text = span.textContent;
  const title = text.split(" - ")[0];

  // rentals 배열에서 해당 제목의 rental 객체 찾기
  const rental = rentals.find((r) => r.getStatus().title === title);
  if (!rental) return;

  // books 배열에서 해당 제목의 book 객체를 찾기
  const book = books.find((b) => b.title === title);
  if (!book) return;

  const status = rental.getStatus();

  if (status.isBorrowed) {
    // 현재 대여 중이면 반납 처리
    rental.returnBook();
    span.textContent = `${title} - ${book.price}원 (대여 가능)`;
  } else {
    // 대여 가능 상태이면 대여 처리
    if (rental.borrow()) {
      span.textContent = `${title} - ${book.price}원 (대여 중)`;
    }
  }
}

// 모든 도서의 현재 대여 상태와 횟수를 화면에 표시 (도전 과제)
function showAllRentalStatus() {
  const resultsDiv = document.getElementById("results");
  let html = "<h3>📊 전체 도서 대여 상태</h3><ul>";
  if (rentals.length === 0) {
    html += "<li>대여 정보가 없습니다.</li>";
  } else {
    // ...rest 파라미터를 사용하여 여러 rental 객체의 상태를 한 번에 처리
    const allStatuses = rentals.map((r) => r.getStatus());

    allStatuses.forEach((status) => {
      html += `<li>${status.title}: ${
        status.isBorrowed ? "🔴 대여 중" : "🟢 대여 가능"
      } (총 ${status.borrowCount}회 대여)</li>`;
    });
  }
  html += "</ul>";
  resultsDiv.innerHTML = html;
}
