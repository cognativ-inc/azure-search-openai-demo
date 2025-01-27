FROM python:3.11-bullseye

WORKDIR /app

COPY ./ /app

RUN python -m pip install --no-cache-dir -r /app/requirements.txt

RUN python -m pip install --upgrade pip


RUN python -m pip install gunicorn

CMD ["python3", "-m", "gunicorn", "-b", "0.0.0.0:8000", "main:app"]
