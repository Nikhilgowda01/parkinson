from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 

from app.prediction import router
from app.database import create_table

app = FastAPI(
    title="ParkinsonVoice API"
)

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("startup")
def startup():
    create_table()

app.include_router(router)

@app.get("/")
def root():
    return {
        "message": "ParkinsonVoice Backend Running"
    }