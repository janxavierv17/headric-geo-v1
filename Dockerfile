# Alpine a lightwweight python image
FROM python:3.9-alpine3.13
LABEL maintainer="Jan"

# Allow python to write output (stdout & stderr) withouth buferring.
ENV PYTHONUNBUFFERED=1

# Copy ncessary files into the image
# Production dependencies.
COPY ./requirements.txt /tmp/requirements.txt

# Development dependencies
COPY ./requirements.dev.txt /tmp/requirements.dev.txt

# TODO: Integrate scripts later for ec2 deployment
# Scripts for the container
# COPY ./scripts /scripts

# Backend application soure code.
COPY ./backend /backend

WORKDIR /backend

EXPOSE 8000

# Build argument for toggling development mode
ARG DEV=false

# Python dependencies and other required tools
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client jpeg-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
    build-base postgresql-dev musl-dev zlib zlib-dev linux-headers && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ $DEV = "true"]; then \
    echo -e "\033[1;33m=== Development mode enabled. Installing development dependencies... ===\033[0m"; \
    /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    rm -rf /tmp && \
    apk del .tmp-build-deps && \
    adduser \
    --disabled-password \
    --no-create-home \
    django-user && \
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol
# \ chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"

USER django-user

# TODO: Integrate scripts later for ec2 deployment
# CMD ["run.sh"]