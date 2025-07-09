let num = -2;

if (num > 0) {
  console.log("양수"); // if 는 참일 때 출력
} else if (num === 0) {
  console.log("0");
} else {
  console.log("음수"); // else 는 거짓 일 때 출력
}

// 중첩 if 문
const LIMIT = 80;
let score = 90;

if (score < LIMIT) {
  console.log("낙제");
} else {
  if (score > 90) {
    console.log("A");
  } else if (score > 80) {
    console.log("B");
  } else {
    console.log("C");
  }
}
