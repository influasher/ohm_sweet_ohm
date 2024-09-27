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
    totalCost = db.Column(db.Float, nullable=True)  # Total cost, nullable

    def __init__(self, appliance, power_usage=None, brand=None, model=None, 
                frequency_of_use=None, number_of_appliance=None, totalCost=None):
        self.appliance = appliance
        self.power_usage = power_usage
        self.brand = brand
        self.model = model
        self.frequency_of_use = frequency_of_use
        self.number_of_appliance = number_of_appliance
        self.totalCost = totalCost

    def to_dict(self):
        return {
            'id': self.id,
            'appliance': self.appliance,
            'power_usage': self.power_usage,
            'brand': self.brand,
            'model': self.model,
            'frequency_of_use': self.frequency_of_use,
            'number_of_appliance': self.number_of_appliance,
            'totalCost': self.totalCost
        }

    def __repr__(self):
        return f"<Appliance {self.appliance} ({self.brand} - {self.model})>"


# Create the tables in the database using app context
with app.app_context():
    db.create_all()


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

            # reply = scan_image(image_path)
            reply = "{\"appliance\": \"Kettle 1.5L\", \"power_usage\": \"100\", \"brand\": \"Meyer\", \"model\": \"MMEK1500D\"}" # for test
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


# Endpoint to retrieve all appliances from the database
@app.route('/getAppliances', methods=['GET'])
def get_all_appliances():
    appliances = Appliance.query.all()
    result = [appliance.to_dict() for appliance in appliances]
    return jsonify(result)


# Endpoint to add a new appliance to the database
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
            totalCost=data.get('totalCost')
        )
        db.session.add(new_appliance)
        db.session.commit()

        return jsonify({'message': 'New appliance added successfully!', 'appliance': new_appliance.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Update both frequency_of_use and number_of_appliance of an appliance by ID
@app.route('/appliance/<int:appliance_id>', methods=['PATCH'])
def update_appliance(appliance_id):
    data = request.json

    try:
        # Fetch the appliance by ID
        appliance = Appliance.query.get(appliance_id)

        if appliance is None:
            return jsonify({'error': 'Appliance not found'}), 404

        # Update frequency_of_use if provided in the request body
        new_frequency = data.get('frequency_of_use')
        if new_frequency is not None:
            appliance.frequency_of_use = new_frequency

        # Update number_of_appliance if provided in the request body
        new_number = data.get('number_of_appliance')
        if new_number is not None:
            appliance.number_of_appliance = new_number

        db.session.commit()

        return jsonify({'message': 'Appliance updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Update ALL appliance Monthly Cost
@app.route('/updateMonthlyCost', methods=['PATCH'])
def update_monthly_cost():
    tariffs = 0.03257 # cost per Wh
    days_in_month = 30

    try:
        # Fetch all appliances to update their totalCost
        appliances = Appliance.query.all()

        for appliance in appliances:
            # Ensure power_usage, frequency_of_use, and number_of_appliance are valid before calculating
            if appliance.power_usage and appliance.frequency_of_use and appliance.number_of_appliance:
                # Calculate the total cost
                appliance.totalCost = tariffs * appliance.power_usage * appliance.frequency_of_use * appliance.number_of_appliance * days_in_month

                db.session.add(appliance)

        db.session.commit()

        return jsonify({"message": "Monthly costs updated successfully!"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Get the total cost of an individual appliance by ID
@app.route('/appliance/<int:appliance_id>/totalCost', methods=['GET'])
def get_total_cost(appliance_id):
    try:
        # Fetch the appliance by its ID
        appliance = Appliance.query.get(appliance_id)
        
        if appliance is None:
            return jsonify({'error': 'Appliance not found'}), 404

        return jsonify(appliance.totalCost), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



# Get the sum of totalCost for all appliances
@app.route('/appliances/totalCost', methods=['GET'])
def get_total_cost_of_all_appliances():
    try:
        # Fetch the sum of totalCost for all appliances
        total_cost_sum = db.session.query(db.func.sum(Appliance.totalCost)).scalar()

        if total_cost_sum is None:
            total_cost_sum = 0

        return jsonify(total_cost_sum), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)