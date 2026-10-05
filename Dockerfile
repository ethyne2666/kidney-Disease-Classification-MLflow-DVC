FROM python:3.8-slim-bookworm

RUN apt-get update -y && apt-get install -y awscli && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY . /app
RUN pip install -r requirements.txt

CMD ["python3", "app.py"]