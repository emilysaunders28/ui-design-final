from flask import Flask
from flask import jsonify, request
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

path = 'static/db.json'

with open(path, 'r') as json_file:
    data = json.load(json_file)


def generate_quiz_array():
    quiz_array = {
        'hue' : [-1 for _ in range(3)],
        'shade': [-1 for _ in range(3)],
        'tint': [-1 for _ in range(3)],
        'tone': [-1 for _ in range(3)],
        'chroma_saturation': [-1 for _ in range(3)],
        'value': [-1 for _ in range(3)],
        'contrast': [-1 for _ in range(3)],
        'final': [-1 for _ in range(10)]
    }
    return quiz_array

current_user = None
users = {}
users['Ziggy'] = generate_quiz_array()

@app.route('/data/user')
def user_data():
    global current_user
    global users
    if current_user:
        return jsonify(data={**{'user':current_user},**users[current_user]})
    else:
        return jsonify(data={'user': current_user})


@app.route("/data/<type>/<term>")
def fetch(type,term):
    pages = data[term][type]
    return jsonify(data=pages)


@app.route('/login', methods=['GET', 'POST'])
def change_user():
    global current_user
    json_data = request.get_json()
    if json_data['user'] in users:
        current_user = json_data['user']
        return jsonify(data={**{'user':current_user},**users[current_user]})
    else:
        return jsonify({'error': 'Not an existing user'})
    
@app.route('/create', methods=['GET', 'POST'])
def add_user():
    global current_user
    json_data = request.get_json()
    if json_data['newUser'] in users:
        return jsonify({'error': 'This user name is already taken'})
    else:
        current_user = json_data['newUser']
        print(current_user)
        users[current_user] = generate_quiz_array()
        return jsonify(data={**{'user':current_user},**users[current_user]})

if __name__ == "__main__":
    app.run(debug=True)