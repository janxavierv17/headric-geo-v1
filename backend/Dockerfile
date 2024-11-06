FROM python:3.13-slim-bullseye

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    postgresql-client \
    gdal-bin \
    libgdal-dev \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir pipenv

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system --deploy

COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]
