import os
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()


def En_to_Fr(text):
    client = InferenceClient(
        provider="hf-inference",
        api_key=os.getenv('HF_TOKEN'),
    )

    result = client.translation(
        text,
        model="Helsinki-NLP/opus-mt-en-fr",
    )

    return result.translation_text

if __name__ == '__main__':
    My_Text = input(str(' Entry Your Text Here : '))
    Pred = En_to_Fr(My_Text)
    print(Pred)