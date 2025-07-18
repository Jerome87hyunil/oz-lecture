// detail.js (포스트 상세 화면용 JavaScript)

// JSONPlaceholder API의 기본 URL
const apiUrl = "https://jsonplaceholder.typicode.com";

// URL의 쿼리 파라미터에서 postId를 가져옴 // 해당 포스트의 상세 정보를 화면에 표시하는 비동기 함수
async function displayPostDetail() {
  try {
    // 현재 URL의 쿼리 파라미터를 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");

    // postId가 없으면 에러 발생
    if (!postId) {
      throw new Error("No post ID provided in URL");
    }

    let post;
    const cacheKey = `post_${postId}`; // localStorage에 사용할 키

    // --- 도전 과제: localStorage 캐싱 구현 ---
    const cachedPost = localStorage.getItem(cacheKey);

    if (cachedPost) {
      // 1. 캐시가 있는 경우: localStorage에서 데이터를 가져옴
      post = JSON.parse(cachedPost);
      console.log(`Post loaded from localStorage (ID: ${postId})`);
    } else {
      // 2. 캐시가 없는 경우: API를 통해 데이터를 가져옴
      const response = await fetch(`${apiUrl}/posts/${postId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch post. Status: ${response.status}`);
      }
      post = await response.json();
      console.log(`Post fetched from API (ID: ${postId})`);

      // 가져온 데이터를 다음을 위해 localStorage에 저장
      localStorage.setItem(cacheKey, JSON.stringify(post));
    }

    // 가져온 포스트 데이터를 화면 렌더링
    renderPost(post);
  } catch (error) {
    // 에러가 발생하면 콘솔에 메시지를 출력하고, 사용자에게 에러 상황을 알림
    console.error("Error:", error.message);
    document.getElementById("post-detail").innerHTML =
      "<p>Error: Could not load post details. Please try again later.</p>";
  }
}

// 포스트 객체를 받아와 HTML로 렌더링하는 함수
function renderPost(post) {
  const postDetailContainer = document.getElementById("post-detail");
  // 포스트 제목과 본문을 HTML로 만들어 삽입
  postDetailContainer.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
}

// 페이지가 로드될 때 displayPostDetail 함수를 호출하여 포스트 상세 정보 표시
displayPostDetail();
