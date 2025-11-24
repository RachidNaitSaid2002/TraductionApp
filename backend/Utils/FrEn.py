import os
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()


def Fr_to_En(text):
    client = InferenceClient(
        provider="hf-inference",
        api_key=os.getenv('HF_TOKEN'),
    )

    result = client.translation(
        text,
        model="Helsinki-NLP/opus-mt-fr-en",
    )

    return result.translation_text

if __name__ == '__main__':
    My_Text = input(str(' Entry Your Text Here : '))
    Pred = Fr_to_En(My_Text)
    print(Pred)