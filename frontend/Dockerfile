FROM node:22.11-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Build the application for production
# Note: This step is commented out as we're mounting the directory in dev mode
# RUN npm run build

ARG NODE_ENV=development

EXPOSE 3000

ENV NODE_ENV=${NODE_ENV} \
    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN}

# Start the application
# Use different commands for development and production
CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then \
        npm run start; \
    else \
        npm run dev; \
    fi" ]