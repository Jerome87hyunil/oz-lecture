// 과제:
// HTML 파일에 연결하여 브라우저에서 실행하세요

// DOM 요소 선택
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const clearButton = document.getElementById("clearButton");

// [도전 과제] DOM 요소 추가
const taskCount = document.querySelector("#taskCount");
const prioritySelect = document.querySelector("#priority");

// [도전 과제] 할 일 개수를 업데이트 함수
function updateTaskCount() {
  const count = taskList.children.length;
  taskCount.textContent = `현재 할 일: ${count}개`;
}

// 입력값 검증 및 할 일 추가 함수
function addTask() {
  // 입력창의 텍스트를 가져오고, trim으로 양쪽 공백을 제거
  const taskText = taskInput.value.trim();

  // 입력값이 비어있는지 확인 (유효성 검증) early-return;
  if (taskText === "") {
    alert("할 일을 입력해주세요!");
    return; // 함수 실행 중단
  }

  // 새로운 리스트 아이템 생성 // li 생성
  const li = document.createElement("li");
  li.className = "task-item";

  // 할 일 텍스트 추가 // 할 일 텍스트를 표시할 span 생성
  const span = document.createElement("span");
  span.textContent = taskText; // span에 할 일 텍스트 삽입

  // [도전 과제] 우선순위 기능 구현
  const priority = prioritySelect.value;
  if (priority === "high") {
    span.textContent = `${taskText} (높음)`; // 텍스트에 (높음) 추가
    span.style.color = "red";
  }

  // 삭제 버튼 생성
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제"; // 버튼 '삭제' 텍스트 추가
  deleteButton.className = "delete-button"; // CSS 클래스 추가

  // 삭제 버튼 이벤트 리스너 // 클릭 시 해당 항목(li)을 목록(taskList)에서 제거
  deleteButton.addEventListener("click", function () {
    taskList.removeChild(li);
    // [도전 과제] 삭제 후 개수 업데이트
    updateTaskCount();
  });

  // 완료 상태 토글 이벤트 리스너
  // span 클릭 시 'completed' 클래스를 추가하거나 제거하여 취소선 스타일을 적용/해제함
  span.addEventListener("click", function () {
    span.classList.toggle("completed");
  });

  // 요소 조립 // li에 span과 deleteButton을 자식 요소로 추가
  li.appendChild(span);
  li.appendChild(deleteButton);
  // 완성된 li를 할 일 목록(ul)에 추가합니다.
  taskList.appendChild(li);

  // [도전 과제] 추가 후 개수 업데이트
  updateTaskCount();

  // 입력창 초기화
  taskInput.value = "";
}

// 모든 할 일 삭제 함수 // taskList의 내부 HTML을 빈 문자열로 설정하여 모든 자식 요소를 한번에 삭제
function clearAllTasks() {
  taskList.innerHTML = "";
  // [도전 과제] 전체 삭제 후 개수 업데이트
  updateTaskCount();
}

// 추가 버튼 클릭 이벤트 적용 // '추가' 버튼 클릭 시 addTask 함수 실행
addButton.addEventListener("click", addTask);

// 입력창에서 Enter 키 이벤트 적용 (event.key === 'Enter')
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 전체 삭제 버튼 클릭 이벤트 적용 // '전체 삭제' 버튼 클릭 시 clearAllTasks 함수 실행
clearButton.addEventListener("click", clearAllTasks);
