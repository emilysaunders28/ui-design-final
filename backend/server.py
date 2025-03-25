from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm.attributes import flag_modified
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    quiz_data = db.Column(db.JSON, nullable=False)  # Stores both quiz answers and progress

    def __init__(self, username, quiz_data):
        self.username = username
        self.quiz_data = quiz_data

# Create the database and tables (if they don't already exist)
with app.app_context():
    db.create_all()

# Load the content data
path = 'static/content.json'

with open(path, 'r') as json_file:
    data = json.load(json_file)

answers = data['answers']

def generate_user_array():
    quiz_array = {
        'hue': ['' for _ in range(3)],
        'shade': ['' for _ in range(3)],
        'tint': ['' for _ in range(3)],
        'tone': ['' for _ in range(3)],
        'chroma_saturation': ['' for _ in range(3)],
        'value': ['' for _ in range(3)],
        'contrast': ['' for _ in range(3)],
        'final': ['' for _ in range(10)]
    }
    progress = {
        'hue': False,
        'shade': False,
        'tint': False,
        'tone': False,
        'chroma_saturation': False,
        'value': False,
        'contrast': False,
        'final': False
    }
    return {'quiz': quiz_array, 'progress': progress}



current_user = None

# Fetch user data refactored
@app.route('/data/user')
def user_data():
    global current_user
    if current_user:
        user = User.query.filter_by(username=current_user).first()
        if user:
            return jsonify(data={'user': user.username, 'quiz_data': user.quiz_data})
    return jsonify(data={'user': current_user})


# Fetch content from the server
@app.route("/data/<type>/<term>")
def fetch(type,term):
    pages = data[term][type]
    return jsonify(data=pages)

# Login refactored
@app.route('/login', methods=['POST'])
def login():
    global current_user
    json_data = request.get_json()
    username = json_data['user']

    user = User.query.filter_by(username=username).first()
    print(user)
    if user:
        current_user = user.username
        return jsonify(data={'user': user.username, 'quiz_data': user.quiz_data})
    else:
        return jsonify(data={'error': 'Not an existing user'}), 400


# Create a new user refactored
@app.route('/create', methods=['POST'])
def add_user():
    global current_user
    json_data = request.get_json()
    new_username = json_data['newUser']
    print(User.query.filter_by(username=new_username).first())
    if User.query.filter_by(username=new_username).first():
        return jsonify(data={'error': 'This user name is already taken'}), 400
    else:
        current_user = new_username
        new_user = User(username=new_username, quiz_data=generate_user_array())
        db.session.add(new_user)
        db.session.commit()
        return jsonify(data={'user': new_user.username, 'quiz_data': new_user.quiz_data})

# Logout refactored
@app.route('/logout')
def logout():
    global current_user
    current_user = None
    return jsonify({'message': 'successfully logged out'})

# Quiz refactored
@app.route('/quiz', methods=['POST'])
def quiz():
    global current_user
    global answers
    json_data = request.get_json()
    term = json_data['question']['term']
    question_id = json_data['question']['id']
    selected = json_data['selected']
    print(selected)

    user = User.query.filter_by(username=current_user).first()
    if not user:
        return jsonify({'error': f'User {current_user} not found'}), 400

    # Update quiz data
    quiz_data = user.quiz_data
    quiz_data['quiz'][term][int(question_id) - 1] = selected
    quiz_data['progress'][term] = (quiz_data['quiz'][term] == answers[term])

    user.quiz_data = quiz_data
    print("Before commit: ", user.quiz_data['quiz'][term])
    flag_modified(user, 'quiz_data')
    db.session.commit()
    print("After commit: ", user.quiz_data['quiz'][term])

    return jsonify({'message': f"Successfully updated {term} quiz question {question_id} answer to {selected}"})




@app.route('/users', methods=['GET'])
def list_users():
    all_users = User.query.all()
    # Create a list of usernames (or more detailed info as needed)
    user_list = [user.username for user in all_users]
    return jsonify(users=user_list)

@app.route('/quiz_data', methods=['GET'])
def quiz_data():
    user = User.query.filter_by(username=current_user).first()
    # Create a list of usernames (or more detailed info as needed)
    quiz_data = user.quiz_data
    return jsonify(quiz_data=quiz_data)


if __name__ == "__main__":
    app.run(debug=True)