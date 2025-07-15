// DOM 요소 가져오기
const timerInput = document.getElementById("timerInput");
const startTimerBtn = document.getElementById("startTimer");
const timerDisplay = document.getElementById("timerDisplay");

// 상수 및 변수 선언 (요구사항: const, let, var 각각 1회 이상 사용)
const MIN_SECONDS = 1;
const MAX_SECONDS = 10;
let timerId = null; // setInterval의 ID를 저장하기 위한 변수
var timerMessage = "타이머: "; // 출력 메시지 템플릿

function startCountdown(seconds = 5) {
  // 이전 타이머가 있다면 중지
  if (timerId) {
    clearInterval(timerId);
  }

  let remainingTime = seconds;

  // 타이머 시작, 1초마다 실행
  timerId = setInterval(() => {
    // 화면에 남은 시간 표시
    timerDisplay.textContent = `${timerMessage}${remainingTime}초`;
    timerDisplay.classList.remove("error"); // 에러 스타일 제거

    // 남은 시간이 0보다 작아지면 타이머 종료
    if (remainingTime < 1) {
      clearInterval(timerId); // setInterval 중지
      timerDisplay.textContent = "타이머 종료!";
      startTimerBtn.disabled = false; // 버튼 다시 활성화
      timerId = null; // 타이머 ID 초기화
      return;
    }

    remainingTime--; // 시간 1초 감소
  }, 1000);
}

// '타이머 시작' 버튼 클릭 이벤트 리스너 추가
startTimerBtn.addEventListener("click", () => {
  // 입력값 가져오기 및 숫자로 변환
  const seconds = Number(timerInput.value);

  // 입력값 유효성 검사
  // isNaN으로 숫자인지 확인하고, 1~10 사이의 값인지 확인
  if (isNaN(seconds) || seconds < MIN_SECONDS || seconds > MAX_SECONDS) {
    // 유효하지 않은 경우 에러 메시지 표시
    timerDisplay.textContent = `유효한 숫자(${MIN_SECONDS}-${MAX_SECONDS})를 입력하세요!`;
    timerDisplay.classList.add("error"); // 에러 메시지에 빨간색 스타일 적용
    return; // 함수 실행 중단
  }

  // 유효한 경우, 버튼을 비활성화하고 카운트다운 시작
  startTimerBtn.disabled = true;
  startCountdown(seconds);
});
