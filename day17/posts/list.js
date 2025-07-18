// list.js (포스트 목록 화면용 JavaScript)

// JSONPlaceholder API의 기본 URL
const apiUrl = "https://jsonplaceholder.typicode.com";

// API로부터 모든 포스트를 가져와 화면에 목록으로 표시하는 비동기 함수
async function displayPosts() {
  try {
    // API에 GET 요청을 보내 포스트 목록 가져옴
    const response = await fetch(`${apiUrl}/posts`);

    // 응답이 성공적이지 않으면 에러 발생
    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    // 응답 본문을 JSON 형태로 파싱
    const posts = await response.json();

    // HTML에서 포스트 목록을 표시할 <ul> 요소 가져옴
    const postList = document.getElementById("post-list");
    postList.innerHTML = ""; // 기존 목록이 있다면 초기화

    // 각 포스트에 대해 리스트 아이템(<li>)을 생성하고 목록 추가
    posts.forEach((post) => {
      const li = document.createElement("li");
      li.textContent = post.title; // <li>에 포스트 제목을 텍스트 추가
      li.dataset.postId = post.id; // 데이터 속성에 포스트 ID 저장

      // 각 리스트 아이템에 클릭 이벤트 추가
      li.addEventListener("click", () => {
        // 클릭 시 해당 포스트의 상세 페이지 이동
        // 쿼리 파라미터로 postId 전달
        window.location.href = `detail.html?postId=${post.id}`;
      });

      postList.appendChild(li);
    });
  } catch (error) {
    // 에러가 발생하면 콘솔에 에러 메시지 출력
    console.error("Error:", error.message);
    // 사용자에게 에러 상황 전달
    document.getElementById("post-list").innerHTML =
      "<li>포스트를 불러오는 데 실패했습니다.</li>";
  }
}

// 페이지가 로드될 때 displayPosts 함수를 호출하여 포스트 목록 표시
displayPosts();
