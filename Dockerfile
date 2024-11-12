FROM openjdk:23
EXPOSE 8083
ADD target/amdocsb624.jar amdocsb624.jar
ENTRYPOINT ["java","-jar","/amdocs624.jar"]