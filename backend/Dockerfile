FROM python:3.8-slim

# Install Poetry
RUN pip install poetry

WORKDIR /app

# Copy only pyproject.toml and poetry.lock to install dependencies
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 80

# Run the application
CMD ["sh", "-c", "poetry run alembic upgrade head && poetry run uvicorn app.main:app --host 0.0.0.0 --port 80"]
