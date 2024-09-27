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