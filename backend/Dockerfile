# 베이스 이미지로 OpenJDK 17 사용
FROM openjdk:17-jdk-alpine

# 애플리케이션 JAR 파일을 빌드할 때 사용할 ARG
ARG JAR_FILE=build/libs/sleepGuardian-0.0.1-SNAPSHOT.jar

# 컨테이너 내에 디렉토리 생성
WORKDIR /app

# JAR 파일을 컨테이너 내로 복사
COPY ${JAR_FILE} app.jar

# Asia/Seoul 시간대를 설정
ENV TZ=Asia/Seoul

RUN apk update && apk add --no-cache tzdata


EXPOSE 8080

# 애플리케이션을 실행 (시간대 추가)
ENTRYPOINT ["java", "-Dfile.encoding=UTF-8", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]