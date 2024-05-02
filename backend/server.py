from flask import Flask
from flask import jsonify, request
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

path = 'static/db.json'

with open(path, 'r') as json_file:
    data = json.load(json_file)


def generate_user_array():
    quiz_array = {
        'hue' : ['' for _ in range(3)],
        'shade': ['' for _ in range(3)],
        'tint': ['' for _ in range(3)],
        'tone': ['' for _ in range(3)],
        'chroma_saturation': ['' for _ in range(3)],
        'value': ['' for _ in range(3)],
        'contrast': ['' for _ in range(3)],
        'final': ['' for _ in range(10)]
    }
    progress = {
        'hue' : False,
        'shade': False,
        'tint': False,
        'tone': False,
        'chroma_saturation': False,
        'value': False,
        'contrast': False
    }
    return { **{'quiz': quiz_array}, **{'progress' : progress} }

current_user = 'Ziggy'
users = {}
users['Ziggy'] = generate_user_array()

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
        return jsonify(data={'error': 'Not an existing user'}), 400
    
@app.route('/create', methods=['GET', 'POST'])
def add_user():
    global current_user
    json_data = request.get_json()
    if json_data['newUser'] in users:
        return jsonify(data={'error': 'This user name is already taken'}), 400
    else:
        current_user = json_data['newUser']
        print(current_user)
        users[current_user] = generate_user_array()
        return jsonify(data={**{'user':current_user},**users[current_user]})
    
@app.route('/logout')
def logout():
    global current_user
    current_user = None
    return jsonify({'message': 'successfully logged out'})

@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    global current_user
    global users
    json_data = request.get_json()
    print(json_data)
    term = json_data['question']['term']
    id = json_data['question']['id']
    selected = json_data['selected']
    users[current_user]['quiz'][term][int(id)-1]=selected
    return jsonify({'message': f"Successfully updated {term} quiz quistion {id} answer to {selected}"})


if __name__ == "__main__":
    app.run(debug=True)