import flask
from flask import render_template, url_for, request

app = flask.Flask(__name__)
app.config["Debug"] = True

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/api/falldetect", methods=["POST"])
def falldetect():
    data = request.get_json()   
    print(data)
    return "Autsch"

app.run(ssl_context='adhoc', host='0.0.0.0')