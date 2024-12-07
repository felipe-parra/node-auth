# Use Node.js 21 Alpine version as the base image
FROM node:21-alpine

# Install bash and build tools required for dependencies
RUN apk add --no-cache bash build-base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install PNPM globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml into the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using PNPM
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN pnpm run build

# Expose the port (default to 3000 if not defined)
EXPOSE ${PORT:-3000}

# Define the command to run the application
CMD ["node", "dist/app.js"]