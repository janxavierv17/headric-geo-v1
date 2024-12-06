# Base stage with common system dependencies
FROM python:3.9.2-slim-buster AS base
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat \
    gcc \
    postgresql \
    postgresql-client \
    python-psycopg2 \
    binutils \
    libproj-dev \
    gdal-bin \
    python-gdal \
    python3-gdal \
    libpq-dev \
    libjpeg-dev \
    build-essential \
    zlib1g-dev \
    linux-headers-amd64 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies stage
FROM base AS python-deps
WORKDIR /backend

# Install Python dependencies
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip

# Copy only requirements files first
COPY requirements.txt /tmp/
RUN /py/bin/pip install -r /tmp/requirements.txt

# Development dependencies (optional)
ARG DEV=false
COPY requirements.dev.txt /tmp/
RUN if [ "$DEV" = "true" ]; then \
    echo -e "\033[1;33m=== Development mode enabled. Installing development dependencies... ===\033[0m" && \
    /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi

# Final stage
FROM base AS final
WORKDIR /backend

# Copy Python environment from python-deps stage
COPY --from=python-deps /py /py
ENV PATH="/py/bin:$PATH"

# Create non-root user
RUN adduser --disabled-password --no-create-home django-user && \
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol

# Copy application code
COPY . /backend

EXPOSE 8000

USER django-user

# TODO: Integrate scripts later for EC2 deployment
# CMD ["run.sh"]