FROM postgres:13.5-alpine

# DBA Account
COPY ./postgres-user /run/secrets/user
COPY ./postgres-passwd /run/secrets/passwd

# Initialize Script
COPY ./init.sql /docker-entrypoint-initdb.d/01-init.sql
