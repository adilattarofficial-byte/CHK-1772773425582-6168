import os
from google import genai

# set API key
os.environ["GEMINI_API_KEY"] = "My_API_Key"

client = genai.Client()

def generate_answer(context, question):

    prompt = f"""
You are an academic assistant helping students.

Use the context below to answer the question.

Context:
{context}

Question:
{question}

Answer clearly in 2–3 sentences.
"""

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt
    )

    return response.text
