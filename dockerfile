# Use an official JDK runtime as a parent image
FROM openjdk:17-jre-slim

# Set the working directory
WORKDIR /unihive-backend

# Copy the Spring Boot jar to the container
COPY target/*.jar unihive-backend.jar

# Expose the port the app runs on
EXPOSE 8080

# Command to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "unihive-backend.jar"]
