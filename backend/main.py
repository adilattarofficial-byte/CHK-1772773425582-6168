import os
from datetime import datetime, timedelta

from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError

from rag.retrieval import ask_documents
from rag.gemini import generate_answer


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# AUTH CONFIG
# -----------------------------

SECRET_KEY = "campus_ai_secret_key"
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 60 * 24

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "campus123"

security = HTTPBearer()


# -----------------------------
# MODELS
# -----------------------------

class ChatRequest(BaseModel):
    question: str


class LoginRequest(BaseModel):
    username: str
    password: str


# -----------------------------
# AUTH FUNCTIONS
# -----------------------------

def create_token(username: str):

    expire = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)

    payload = {
        "sub": username,
        "exp": expire
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return token


def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):

    token = credentials.credentials

    try:

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        username = payload.get("sub")

        if username != ADMIN_USERNAME:
            raise HTTPException(status_code=401, detail="Unauthorized")

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# -----------------------------
# ROUTES
# -----------------------------

@app.get("/")
def home():
    return {"message": "CampusAI backend is running"}


# -----------------------------
# ADMIN LOGIN
# -----------------------------

@app.post("/login")
def login(data: LoginRequest):

    if data.username == ADMIN_USERNAME and data.password == ADMIN_PASSWORD:

        token = create_token(data.username)

        return {
            "token": token
        }

    raise HTTPException(status_code=401, detail="Invalid credentials")


# -----------------------------
# CHAT
# -----------------------------

@app.post("/chat")
def chat(request: ChatRequest):

    user_question = request.question

    docs = ask_documents("../documents", user_question)

    context = "\n".join([doc.page_content for doc in docs])

    answer = generate_answer(context, user_question)

    return {"answer": answer}


# -----------------------------
# DOCUMENT LIST
# -----------------------------

@app.get("/documents")
def list_documents():

    documents_folder = "../documents"

    if not os.path.exists(documents_folder):
        return {"documents": []}

    files = [
        f for f in os.listdir(documents_folder)
        if f.endswith(".pdf")
    ]

    return {"documents": files}


# -----------------------------
# ADMIN DOCUMENT UPLOAD
# -----------------------------

@app.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    user=Depends(verify_admin)
):

    documents_folder = "../documents"

    if not os.path.exists(documents_folder):
        os.makedirs(documents_folder)

    file_path = os.path.join(documents_folder, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    return {
        "message": "File uploaded successfully",
        "filename": file.filename
    }