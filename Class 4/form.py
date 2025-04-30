from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.form.to_dict()
    with open('Class 4/submissions.txt', 'a') as f:
        f.write(str(data) + '\\n')
    return jsonify({'message': 'Submission received', 'data': data})

if __name__ == '__main__':
    app.run(debug=True)
