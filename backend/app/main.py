from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.stores import models
from app.stores.database import engine
from app.routers import api

# Автоматическое создание всех таблиц
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    # Frontend running on localhost:3000 (React, Vue, etc.)
    "http://localhost:3000",
    "http://127.0.0.1:3000",  # Another form of localhost
    "http://172.18.0.4:3000",
    "https://yourfrontenddomain.com",  # Your frontend production domain
    # "*" to allow all domains (be cautious with this in production)
    "*",
]

# Add CORS middleware to the FastAPI application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow all origins or specific origins
    allow_credentials=True,
    # Allow specific HTTP methods
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    # Allow specific headers
    allow_headers=["X-Custom-Header", "Content-Type"],
)

# Подключение роутов
app.include_router(api.router)
