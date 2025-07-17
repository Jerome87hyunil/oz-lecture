async function getPost(postNum) {
  try {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postNum}`
    );
    let data = await response.json();
    console.log(data);
  } catch (error) {
    alert("에러: " + error.message);
  }
}
getPost(102);
