from flask import Flask
from flask import jsonify
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

path = 'static/db.json'

with open(path, 'r') as json_file:
    data = json.load(json_file)


@app.route("/data/<term>/<type>")
def fetch(term,type):
    pages = data[term][type]
    return jsonify(data=pages)


if __name__ == "__main__":
    app.run(debug=True)