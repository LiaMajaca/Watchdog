from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/action', methods=['POST'])
def action():
    data = request.get_json()
    risk_score = data.get('risk_score')
    if risk_score and risk_score > 0.90:
        action_taken = "Lock Account/Hold Payment"
        justification = f"Teller {data.get('teller_id')} bypassed biometric check. Action Justified."
    else:
        action_taken = "No action"
        justification = "Risk score below threshold."
    return jsonify({'action': action_taken, 'justification': justification})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)