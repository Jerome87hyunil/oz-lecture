// DOM 요소
const postIdsInput = document.getElementById("postIds");
const fetchBtn = document.getElementById("fetchPosts");
const outputDiv = document.getElementById("output");
const loadingDiv = document.getElementById("loading");

// 코드에서 사용할 상수와 변수 선언
const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";
const MIN_ID = 1;
const MAX_ID = 100; // JSONPlaceholder posts는 100개까지
var statusMessage = ""; // 사용자에게 보여줄 메시지를 담을 변수

const fetchSinglePost = async (id) => {
  // try...catch: 네트워크 에러나 API 서버 문제 등 예외 상황을 잡기 위함
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    // API 응답이 성공적이지 않을 때 (예: 404 Not Found)
    if (!response.ok) {
      // 에러를 만들어서 catch 블록으로 던짐
      throw new Error(`서버 응답 에러 (상태 코드: ${response.status})`);
    }

    // 응답받은 데이터를 JSON 형태로 변환
    const postData = await response.json();
    return postData;
  } catch (error) {
    // try 블록에서 에러가 발생하면 여기서 잡음
    console.error(`ID ${id} 가져오기 실패:`, error);
    // 실패했음을 알리기 위해 에러 객체를 반환
    return { error: true, message: error.message };
  }
};

const runChallenge = function () {
  // '게시물 가져오기' 버튼에 클릭 이벤트 리스너를 추가
  fetchBtn.addEventListener("click", async () => {
    // --- 입력값 처리 및 유효성 검사 ---
    const rawInput = postIdsInput.value; // 사용자가 입력한 텍스트 그대로

    // 입력값을 쉼표(,)로 자르고, 공백을 제거한 뒤, 숫자로 변환
    // 유효하지 않은 값(예: 'abc')은 filter로 걸러냄
    const idsToFetch = rawInput
      .split(",")
      .map((id) => id.trim()) // 앞뒤 공백 제거
      .filter((id) => id !== "") // 빈 값 제거
      .map(Number) // 숫자로 변환
      .filter((id) => !isNaN(id) && id >= MIN_ID && id <= MAX_ID); // 유효한 숫자 ID(1~100)만 필터링

    // --- 유효한 ID가 없을 경우 에러 처리 ---
    if (idsToFetch.length === 0) {
      outputDiv.innerHTML = `<div class="post error">유효한 ID(${MIN_ID}-${MAX_ID})를 1개 이상 입력하세요!</div>`;
      return; // 함수 실행 중단
    }

    // --- 데이터 가져오기 시작 ---
    fetchBtn.disabled = true; // 버튼 비활성화 (중복 클릭 방지)
    outputDiv.innerHTML = ""; // 이전 결과 초기화
    loadingDiv.style.display = "flex"; // 로딩 스피너 보이기

    // Promise.all을 사용해 모든 fetch 요청을 동시에 보냄
    // 각 ID에 대해 fetchSinglePost 함수를 호출하고, 모든 결과가 올 때까지 기다림
    const results = await Promise.all(
      idsToFetch.map((id) => fetchSinglePost(id))
    );

    loadingDiv.style.display = "none"; // 로딩 스피너 숨기기

    // --- 결과 렌더링 ---
    let finalHtml = "";
    // for...of를 사용해 결과 배열을 순회
    for (const result of results) {
      if (result.error) {
        // fetchSinglePost에서 에러 객체를 반환한 경우
        statusMessage = `데이터를 가져오는 중 에러가 발생했습니다: ${result.message}`;
        finalHtml += `<div class="post error-post"><strong>게시물 ID ${
          result.id || "?"
        }</strong>: ${statusMessage}</div>`;
      } else {
        // 성공적으로 데이터를 가져온 경우
        statusMessage = `<strong>${result.title}</strong>`;
        finalHtml += `<div class="post"><strong>게시물 ID ${result.id}</strong>: ${statusMessage}</div>`;
      }
    }

    outputDiv.innerHTML = finalHtml; // 완성된 HTML을 화면에 출력
    fetchBtn.disabled = false; // 버튼 다시 활성화
  });
};

// 스크립트가 로드되면 메인 함수 실행
runChallenge();
