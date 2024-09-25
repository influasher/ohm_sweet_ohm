from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from flask import Flask
from ai_functions import scan_image
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
CORS(app)

# DATABASE_URL = postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<DB_HOST>:<DB_PORT>/<POSTGRES_DB>
# app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
# db = SQLAlchemy(app)


# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@host.docker.internal:3306/appliance'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/appliance'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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

    def __init__(self, appliance, power_usage=None, brand=None, model=None, 
                frequency_of_use=None, number_of_appliance=None, total_cost=None):
        self.appliance = appliance
        self.power_usage = power_usage
        self.brand = brand
        self.model = model
        self.frequency_of_use = frequency_of_use
        self.number_of_appliance = number_of_appliance
        self.total_cost = total_cost

    def to_dict(self):
        return {
            'id': self.id,
            'appliance': self.appliance,
            'power_usage': self.power_usage,
            'brand': self.brand,
            'model': self.model,
            'frequency_of_use': self.frequency_of_use,
            'number_of_appliance': self.number_of_appliance,
            'total_cost': self.total_cost
        }

    def __repr__(self):
        return f"<Appliance {self.appliance} ({self.brand} - {self.model})>"


# Create the tables in the database using app context
with app.app_context():
    db.create_all()


@app.route('/scan', methods=['POST'])
def scan():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided.'}), 400

    image = request.files['image']
    image_path = os.path.join('temp', image.filename)
    os.makedirs('temp', exist_ok=True)
    image.save(image_path)

    try:
        # set reply to either the hardcode (for TEST) or analyse_image (for PROD)
        # reply = scan_image(image_path)
        reply = "{\"appliance\": \"Kettle 1.5L\", \"power_usage\": \"100\", \"brand\": \"Meyer\", \"model\": \"MMEK1500D\"}"
        print(reply)    # for debugging
        return reply
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(image_path)


# Endpoint to retrieve all appliances from the database
@app.route('/getAppliances', methods=['GET'])
def get_all_appliances():
    appliances = Appliance.query.all()
    result = [appliance.to_dict() for appliance in appliances]
    return jsonify(result)


# New endpoint to add a new appliance to the database
@app.route('/addAppliance', methods=['POST'])
def add_appliance():
    data = request.json
    if not data or 'appliance' not in data:
        return jsonify({'error': 'Invalid data, appliance name is required'}), 400

    try:
        new_appliance = Appliance(
            appliance=data.get('appliance'),
            power_usage=data.get('powerUsage'),
            brand=data.get('brand'),
            model=data.get('model'),
            frequency_of_use=data.get('frequencyOfUse'),
            number_of_appliance=data.get('numberOfAppliance'),
            total_cost=data.get('totalCost')
        )
        db.session.add(new_appliance)
        db.session.commit()

        return jsonify({'message': 'New appliance added successfully!', 'appliance': new_appliance.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)