from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/send', methods=['POST'])
def send_message():
    data = request.get_json()
    username = data.get('username')
    message = data.get('message')

    url = f'https://ngl.link/api/submit'
    payload = {
        'username': username,
        'question': message,
        'deviceId': 'some-device-id'
    }

    response = requests.post(url, data=payload)
    if response.status_code == 200:
        return jsonify({'success': True, 'message': 'Pesan berhasil dikirim.'})
    else:
        return jsonify({'success': False, 'message': 'Gagal mengirim pesan.'}), 500
