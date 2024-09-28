import requests
import base64
import os
from dotenv import load_dotenv
import json

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')

def scan_image(image_path):
    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    base64_image = encode_image(image_path)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai_api_key}"
    }

    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "For the appliance in this image, accurately extract the appliance type, brand name, model, and power usage in kiloWatts. \
                                Return the information strictly in the following JSON format with no additional text, noting to exclude the ```json\ ```: \
                                {\"appliance\": \"Kettle 1.5L\", \"power_usage\": 0.1, \"brand\": \"Meyer\", \"model\": \"MMEK1500D\"}. \
                                Use your best guesses for the values of 'appliance' and 'power_usage'. If the brand or model cannot be determined, use \"Unidentified\" for those fields."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                            "detail": "low"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 300
    }

    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers=headers,
        json=payload
    )

    if response.status_code == 200:
        reply = response.json()['choices'][0]['message']['content'].strip()
        return json.loads(reply)
    else:
        raise Exception(f"OpenAI API error: {response.status_code} - {response.text}")


def get_monthly_national_average(appliance_name):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai_api_key}"
    }

    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": f"Provide an estimate of the monthly average energy consumption in kWh for one {appliance_name} in Singapore. Please respond with only a numeric value."
            }
        ],
        "max_tokens": 50
    }

    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers=headers,
        json=payload
    )

    if response.status_code == 200:
        reply = response.json()['choices'][0]['message']['content'].strip()
        try:
            # Convert the reply to a numeric value
            return float(reply)
        except ValueError:
            # If the response is not a valid number, return a default value
            return 0.0
    else:
        raise Exception(f"OpenAI API error: {response.status_code} - {response.text}")


def get_energy_saving_suggestions(appliances_list):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai_api_key}"
    }

    prompt = (
        "Given the following list of appliances and their usage in Singapore, provide suggestions "
        "for reducing energy consumption and fun insights. Generate two views: "
        "the first item should either be a key data-driven insight based on their usage (eg: You might be spending ~$14.60 powering inactive appliances that are plugged in 🔌💡)"
        "or something fun (eg: Your air conditioning ❄️ is costing you x bubble teas a month 🧋🧋🧋🧋🧋🧋), and the "
        "second item should be an actionable suggestion for reducing energy consumption (eg: Save energy by setting your air conditioner to 25°C 🌡️ and using fans 🌀 instead when possible.)."
        "If there are no specific suggestions, provide a default suggestion based on phantom usage. Each item should "
        "be less than 100 characters and include emojis where appropriate.\n\n"
        f"Appliance list: {json.dumps(appliances_list)}\n\n"
        "Respond in this format:\n"
        "{\n"
        "  \"view1\": [\"insight1 or fun_fact1\", \"suggestion1\"],\n"
        "  \"view2\": [\"insight2 or fun_fact2\", \"suggestion2\"]\n"
        "}"
    )

    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "max_tokens": 150,
        "temperature": 0.7
    }

    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers=headers,
        json=payload
    )

    if response.status_code == 200:
        reply = response.json()['choices'][0]['message']['content'].strip()
        try:
            # Convert the reply to a JSON object
            return json.loads(reply)
        except ValueError:
            return {
                "view1": ["Could not generate suggestions 😞", "Try checking your appliance usage again."],
                "view2": ["Something went wrong 🛠️", "Please try again later."]
            }
    else:
        raise Exception(f"OpenAI API error: {response.status_code} - {response.text}")