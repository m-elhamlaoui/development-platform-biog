FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/EventService-0.0.1-SNAPSHOT.jar /app/EventService.jar

ENV SPRING_PROFILES_ACTIVE=dev

EXPOSE 8081

CMD ["java", "-jar", "EventService.jar"]
