FROM python:3.7

RUN python -m pip install --upgrade pip

WORKDIR /app

# Install dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

EXPOSE 5000

ENTRYPOINT ["python", "./entrypoint.py"]
