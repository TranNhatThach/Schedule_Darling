from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)
DATA_FILE = "schedule.json"

# Hàm đọc file JSON
def read_data():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

# Hàm ghi file JSON
def write_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# API lấy dữ liệu
@app.route("/api/schedule", methods=["GET"])
def get_schedule():
    return jsonify(read_data())

# API lưu dữ liệu
@app.route("/api/schedule", methods=["POST"])
def save_schedule():
    data = request.json
    write_data(data)
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
