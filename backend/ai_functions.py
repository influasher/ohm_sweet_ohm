import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')

def analyse_image(image_path):
    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    base64_image = encode_image(image_path)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai_api_key}"
    }

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "For the appliance in this image, extract the appliance, brand name, model, \
                                and estimate/calculate the electricity consumption in Wh per month. Extract the following information and return it strictly \
                                with no additional text: \
                                e.g.: {\"appliance\": \"Kettle 1.5L\", \"brand\": \"Meyer\", \"model\": \"MMEK1500D\", \"Wh\": \"100\"}. \
                                If unable to identify any fields, change that field to \"Unidentified\""
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
        return reply
    else:
        raise Exception(f"OpenAI API error: {response.status_code} - {response.text}")