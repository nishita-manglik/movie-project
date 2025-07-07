# Use official Python 3.13 slim image
FROM python:3.13-slim

# Set Python environment variables
ENV PYTHONDONTWRITEBYTECODE=1  # Prevent .pyc files
ENV PYTHONUNBUFFERED=1         # Output logs immediately

# Set working directory in container
WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project code into container
COPY . /app/

# Copy startup script and make it executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose backend port
EXPOSE 8000

# Run the entrypoint script
CMD ["/app/entrypoint.sh"]
