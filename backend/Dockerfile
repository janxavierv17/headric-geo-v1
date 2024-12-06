FROM python:3.9.2-slim-buster
LABEL maintainer="Jan"

# Allow Python to write output (stdout & stderr) without buffering.
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /backend

# Copy necessary files into the image
# Production dependencies
COPY requirements.txt /tmp/requirements.txt

# Development dependencies
COPY requirements.dev.txt /tmp/requirements.dev.txt

# Backend application source code
COPY . /backend

EXPOSE 8000

# Build argument for toggling development mode
ARG DEV=false

RUN apt-get update \
    && apt-get -y install netcat gcc postgresql \
    && apt-get clean

RUN apt-get update \
    && apt-get install -y python-psycopg2 binutils libproj-dev gdal-bin python-gdal python3-gdal libpq-dev

# Python dependencies and other required tools
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    libjpeg-dev \
    build-essential \
    libpq-dev \
    zlib1g-dev \
    linux-headers-amd64 && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then \
    echo -e "\033[1;33m=== Development mode enabled. Installing development dependencies... ===\033[0m"; \
    /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    apt-get remove -y build-essential && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    adduser \
    --disabled-password \
    --no-create-home \
    django-user && \
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol

# Set the PATH to include venv and scripts
ENV PATH="/py/bin:$PATH"

# Use a non-root user
USER django-user

# TODO: Integrate scripts later for EC2 deployment
# CMD ["run.sh"]