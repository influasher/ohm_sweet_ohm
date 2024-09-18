from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from ai_functions import analyse_image

app = Flask(__name__)
CORS(app)

@app.route('/analyse', methods=['POST'])
def analyse():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided.'}), 400

    image = request.files['image']
    image_path = os.path.join('temp', image.filename)
    os.makedirs('temp', exist_ok=True)
    image.save(image_path)

    try:
        reply = analyse_image(image_path)
        print(reply)    # for debugging
        return reply
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(image_path)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)