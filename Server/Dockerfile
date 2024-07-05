# Use the official Node.js image with dependencies for Playwright
FROM mcr.microsoft.com/playwright:v1.33.0-focal

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && \
    npx playwright install

# Copy the rest of your application code
COPY . .

# Install Playwright dependencies
# RUN npx playwright install --with-deps

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
