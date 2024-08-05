# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from celery import Celery

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": "*"}})

celery = Celery('worker', broker='redis://localhost:6379/0', backend='redis://localhost:6379/1')

@app.route('/add', methods=['POST'])
def add():
    data = request.json
    task = celery.send_task('tasks.add', args=[data['num1'], data['num2']])
    return jsonify({'task_id': task.id}), 202

@app.route('/status/<task_id>', methods=['GET'])
def status(task_id):
    task = celery.AsyncResult(task_id)
    return jsonify({'status': task.status, 'result': task.result}), 200

@app.route('/result/<task_id>', methods=['GET'])
def result(task_id):
    task = celery.AsyncResult(task_id)
    if task.status == 'SUCCESS':
        return jsonify({'result': task.result}), 200
    else:
        return jsonify({'status': task.status}), 202

if __name__ == '__main__':
    app.run(debug=True)