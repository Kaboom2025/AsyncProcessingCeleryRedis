
FROM ubuntu:latest


WORKDIR /flaskapp


RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000
EXPOSE 6379
EXPOSE 3000
EXPOSE 80


CMD [ "python3", "app.py" ]