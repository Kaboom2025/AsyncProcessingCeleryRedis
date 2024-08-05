FROM python:3.12-slim


RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install -r requirements.txt

ADD . /tworker

WORKDIR /tworker


ENV BROKER_URL=redis://myredis:6379/0
ENV CELERY_RESULT_BACKEND=redis://myredis:6379/1


ENTRYPOINT celery -A worker worker --loglevel=info