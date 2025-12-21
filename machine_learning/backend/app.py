from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)

# 1. 데이터 불러오기
data = pd.read_csv("combined_dataset.csv")

# 2. 특징 / 라벨 분리
X = data[['url_length', 'num_dots', 'has_https']]
y = data['label']

# 3. 모델 학습
model = RandomForestClassifier(random_state=42)
model.fit(X, y)

# 4. URL 특징 추출 함수
def extract_features(url):
    return [[
        len(url),
        url.count('.'),
        1 if url.startswith("https://") else 0
    ]]

# 5. 예측 API
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    url = data.get("url", "")

    features = extract_features(url)
    prediction = model.predict(features)[0]

    result = "Phishing" if prediction == 1 else "Normal"
    return jsonify({"result": result})

# 6. 서버 실행
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)