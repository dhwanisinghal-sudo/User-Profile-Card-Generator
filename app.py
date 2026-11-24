from flask import Flask, render_template, request, jsonify
from urllib.parse import urlparse
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.post("/api/profile")
def create_profile():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    bio = (data.get("bio") or "").strip()
    image_url = (data.get("image_url") or "").strip()
    if not name or not bio or not image_url:
        return jsonify({"error":"Please fill in all three fields."}), 400
    if len(name)>60 or len(bio)>300:
        return jsonify({"error":"Name must be 60 characters or fewer and bio 300 or fewer."}), 400
    parsed = urlparse(image_url)
    if parsed.scheme not in ("http","https") or not parsed.netloc:
        return jsonify({"error":"Enter a valid image URL beginning with http:// or https://."}), 400
    return jsonify({"name":name,"bio":bio,"image_url":image_url})

if __name__ == "__main__":
    app.run(debug=True)
