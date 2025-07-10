// 상수 분리
const MIN_STARS = 1;
const MAX_STARS = 10;

// 지정된 개수만큼의 별(*)로 이루어진 한 줄을 생성하여 반환합니다.
const printStars = (count) => "*".repeat(count);

// 지정된 개수부터 1개까지 별이 줄어드는 역피라미드 패턴을 생성하여 반환합니다.
const printReverseStars = (count) => {
  const lines = [];
  for (let i = count; i > 0; i--) {
    lines.push(printStars(i));
  }
  return lines.join("\n");
};

// while 반복
while (true) {
  const inputStr = prompt(
    `출력할 별 개수(${MIN_STARS}~${MAX_STARS})를 입력하세요.`
  );

  const input = Number(inputStr);

  // 유효성 검사
  if (isNaN(input) || input < MIN_STARS || input > MAX_STARS) {
    console.error(
      `잘못된 입력입니다. ${MIN_STARS}~${MAX_STARS} 사이의 숫자를 입력해주세요.`
    );
    continue;
  }

  console.log(`입력 ${input}`);
  console.log("▶ 한 줄 별:");
  console.log(printStars(input)); // 가장 기본적인 별 찍기
  console.log("\n▶ 역 피라미드 별:");
  console.log(printReverseStars(input)); // 도전 과제 패턴

  break;
}
