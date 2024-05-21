FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/API-Gateway-0.0.1-SNAPSHOT.jar /app/APIGATEWAY.jar

ENV SPRING_PROFILES_ACTIVE=dev

EXPOSE 8081

CMD ["java", "-jar", "APIGATEWAY.jar"]
