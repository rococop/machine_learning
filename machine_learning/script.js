function checkUrl() {
  const url = document.getElementById("urlInput").value;
  const resultElement = document.getElementById("result");

  if (url.trim() === "") {
    resultElement.innerText = "URL을 입력하세요.";
    return;
  }

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: url })
  })
    .then(response => response.json())
    .then(data => {
      resultElement.innerText = "예측 결과: " + data.result;
    })
    .catch(error => {
      resultElement.innerText = "서버와 연결할 수 없습니다.";
      console.error(error);
    });
}
