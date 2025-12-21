document.getElementById("sendBtn").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerText = "분석 중...";

  const response = await fetch("https://백엔드주소/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: url })
  });

  const data = await response.json();
  resultDiv.innerText = `결과: ${data.result}`;
});
