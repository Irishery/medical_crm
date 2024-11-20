FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install the dependencies
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install @fontsource/roboto
RUN npm install @mui/icons-material
RUN npm install react-router-dom@latest
RUN npm install react-big-calendar moment react-select
RUN npm install react-select


# Copy the remaining application files to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npx", "vite", "--host"]
