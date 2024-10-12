from fastapi import FastAPI
from app.stores import models
from app.stores.database import engine
from app.routers import api

# Автоматическое создание всех таблиц
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Подключение роутов
app.include_router(api.router)
