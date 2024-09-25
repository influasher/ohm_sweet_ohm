from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from flask import Flask
from ai_functions import analyse_image

app = Flask(__name__)
CORS(app)
# DATABASE_URL = postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<DB_HOST>:<DB_PORT>/<POSTGRES_DB>
# app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
# db = SQLAlchemy(app)

'''
class Appliance(db.Model):
    __tablename__ = 'appliance'

    id = db.Column(db.Integer, primary_key=True)  # Auto-incrementing ID column, non-nullable
    appliance = db.Column(db.String(100), nullable=False)  # Appliance name, non-nullable
    power_usage = db.Column(db.Float, nullable=True)  # Power usage, nullable
    brand = db.Column(db.String(100), nullable=True)  # Brand name, nullable
    model = db.Column(db.String(100), nullable=True)  # Model name, nullable
    frequency_of_use = db.Column(db.Integer, nullable=True)  # Frequency of use, nullable
    number_of_appliance = db.Column(db.Integer, nullable=True)  # Number of appliances, nullable
    total_cost = db.Column(db.Float, nullable=True)  # Total cost, nullable

    def __repr__(self):
        return f"<Appliance {self.appliance} ({self.brand} - {self.model})>"
'''

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
'''
@app.route('/getAppliances', methods=['POST'])
def getAll():
     appliances = Appliance.query.all()  # Query all rows from appliance table
        result = [
            {
                'id': appliance.id,
                'appliance': appliance.appliance,
                'powerUsage': appliance.power_usage,
                'brand': appliance.brand,
                'model': appliance.model,
                'frequencyOfUse': appliance.frequency_of_use,
                'numberOfAppliance': appliance.number_of_appliance,
                'totalCost': appliance.total_cost
            }
            for appliance in appliances
        ]
        return jsonify(result)
'''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)