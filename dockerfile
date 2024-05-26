# Stage 1: Build the frontend
FROM node:current as build-frontend
WORKDIR /app/unihive-fe
COPY /unihive-fe/package*.json ./
RUN npm install
COPY unihive-fe/ ./
RUN npm run build

# Stage 2: Build the backend
FROM maven:3.8.3-openjdk-17 as build-backend
WORKDIR /app/unihive-backend
COPY /unihive-backend/pom.xml .
COPY /unihive-backend/src ./src
RUN mvn clean package -DskipTests

# Stage 3: Prepare the final image
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy the Spring Boot jar
COPY --from=build-backend /app/unihive-backend/target/*.jar ./app.jar
# Copy the frontend build to the backend static resources
COPY --from=build-frontend /app/unihive-fe/dist ./static
# Copy the Google Cloud credentials file
COPY unihive-backend/src/main/resources/gcp-account-file.json ./gcp-account-file.json
# Set environment variable for Google Cloud credentials
ENV GOOGLE_CLOUD_CREDENTIALS=./gcp-account-file.json

# Expose port and define the entry point
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
