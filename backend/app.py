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
        # set reply to either the hardcode (for TEST) or analyse_image (for PROD)
        # reply = analyse_image(image_path)
        reply = "{\"appliance\": \"Kettle 1.5L\", \"brand\": \"Meyer\", \"model\": \"MMEK1500D\", \"Wh\": \"100\"}"
        print(reply)    # for debugging
        return reply
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(image_path)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)