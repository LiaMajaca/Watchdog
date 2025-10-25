from flask import Flask, request, jsonify
from sklearn.ensemble import IsolationForest
import numpy as np

app = Flask(__name__)

# Placeholder for a pre-trained model
# In a real scenario, this would be loaded from a file
model = IsolationForest()
model.fit(np.random.rand(100, 5)) # Fit with some dummy data

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features)
    score = model.decision_function(features)
    return jsonify({'prediction': int(prediction[0]), 'score': float(score[0])})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)