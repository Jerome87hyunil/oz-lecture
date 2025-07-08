// var 변수
var name = "hyunil";
var name = "chorokdaddy";
name = "jerome";
name = "hyunil";
console.log(name);

// const 상수
const NAME = "hyunil";
const AGE = "38";
const GENDER = "mail";
console.log(NAME, AGE, GENDER);

// let 변수
let age = 38;
age = 28;
age = 30;
console.log(age);

// 문자열 연결
let string = NAME + " 현일" + age;
console.log("인적사항:", string);

// 배열 리터럴
let hobbies = ["reading", "gaming", "coding"];
console.log("My hobbies", hobbies[2]);

// 객체 리터럴 object
let profile = {
  name: "hyunil",
  age: 20,
  isStudent: true,
};
console.log("profile.name", profile.name);
console.log("profile.isStudent", profile.isStudent);

// type 확인
console.log(typeof NAME);
console.log(typeof age);
console.log(typeof hobbies);

// 도전 과제
// null과 undefined 구분
let emptyData = [];
let emptyTest1;
console.log(emptyData === emptyTest1); // 정답 false

// 템플릿 문자열
let myName = `나의 이름은 ${NAME} 입니다.`;
console.log(myName);

// 추가 데이터 처리
// 배열
let emptyTest2 = ["있음", "없나?", ""];
console.log("My emptyTest2", emptyTest2[2]);
console.log("My emptyTest2", emptyTest2[3]);

// 객체
let emptyProfile = {
  name: "hyunil",
  age: 20,
  isStudent: true,
  email: null,
};
console.log("emptyProfile.email", emptyProfile.email);
