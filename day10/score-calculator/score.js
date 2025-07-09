// 사용자 입력
let inputStr = prompt("점수를 입력하세요.");
console.log(inputStr);
let input = parseInt(inputStr);
console.log(input);

const MAX_SCORE = 105;
let score;
var grade;

// 입력값 유효성 검사 (도전 과제)
if (!isNaN(score) || score < 0 || score > 100) {
  console.log("Invalid score! Please enter a number between 0 and 100.");
} else {
  // 유효한 점수인 경우에만 아래 로직을 순서대로 실행

  // 최종점수 계산
  score = input;
  //   score++; // 1점 증가 (도전과제)
  //   score += 5; // 5점 보너스 추가
  score *= 1.1; // 10% 가산 (도전과제)
  if (score > 100) {
    score = 100; // (도전과제) 보너스 점수 포함 100점 넘을경우 점수 제한
  }
  console.log("Final Score: ", score);

  // 등급 결정 (if문)
  if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }
  console.log("Grade: ", grade);

  // 합격/불합격 여부 결정 (삼항연산자)
  const status = score >= 60 ? "Pass" : "Fail";
  console.log("Status: ", status);

  // 등급에 따른 console.log 출력 (switch문)
  let message;
  switch (grade) {
    case "A":
      message = score === 100 ? "Perfect Score!" : "Excellent work!"; // 100점 만점인 경우 Perfect Score! 메시지 (도전 과제)
      break;
    case "B":
      message = "Good job!";
      break;
    case "C":
      message = "Satisfactory performance.";
      break;
    case "D":
      message = "Needs improvement.";
      break;
    case "F":
      message = "Please try harder!";
      break;
  }
  console.log("Message: ", message);
}
