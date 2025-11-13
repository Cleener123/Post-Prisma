# frontend/Dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy package.json first for caching dependencies
COPY package*.json ./

RUN npm install

# Copy all frontend code
COPY . .

# Expose development port
EXPOSE 3000

# Start frontend in dev mode
CMD ["npm", "run", "dev"]
