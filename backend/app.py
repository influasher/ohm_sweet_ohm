from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from flask import Flask
from ai_functions import scan_image


app = Flask(__name__)
CORS(app)


@app.route('/scan', methods=['POST'])
def scan():
    if 'images' not in request.files:
        return jsonify({'error': 'No image files provided.'}), 400

    images = request.files.getlist('images')  # Retrieve all images from the request
    print(images) # debug
    image_responses = []

    os.makedirs('temp', exist_ok=True)

    try:
        for image in images:
            image_path = os.path.join('temp', image.filename)
            image.save(image_path)

            reply = scan_image(image_path)
            # below is for test
            # reply = {
            #     "appliance": "Kettle 1.5L",
            #     "power_usage": 0.1,
            #     "brand": "Meyer",
            #     "model": "MMEK1500D"
            # }
            image_responses.append(reply)

            # Clean up the saved image
            os.remove(image_path)

        # Return all replies as a JSON response
        print(image_responses) # debug
        return jsonify(image_responses)

    except Exception as e:
        return jsonify({'error': str(e)}), 500
# def scan():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image file provided.'}), 400

#     image = request.files['image']
#     image_path = os.path.join('temp', image.filename)
#     os.makedirs('temp', exist_ok=True)
#     image.save(image_path)

#     try:
#         # set reply to either the hardcode (for TEST) or analyse_image (for PROD)
#         reply = scan_image(image_path)
#         # reply = "{\"appliance\": \"Kettle 1.5L\", \"power_usage\": \"100\", \"brand\": \"Meyer\", \"model\": \"MMEK1500D\"}"
#         print(reply)    # for debugging
#         return reply
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
#     finally:
#         os.remove(image_path)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)