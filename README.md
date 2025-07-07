# Movie Explorer Project

## Overview
This project is a full-stack application for exploring movies. It consists of a **frontend** built with Angular and a **backend** using Django with a PostgreSQL database.

---

## Prerequisites

Before running the project, ensure the following software is installed:

- **Git**  
- **Node.js** (Version: 20.9.0)  
- **Angular CLI** (Compatible with Node.js 18.2.20)  
- **PostgreSQL**  
- **pgAdmin** (IDE for PostgreSQL)  
- **Python 3.13**  
- **Python Virtual Environment**  

---

## Setup Instructions

Step 1: Clone the repository:

```bash
git clone <repository-url>

Replace <repository-url> with your actual Git repository URL.

Step 2: 

##Build and Run with Docker Compose:
	docker-compose up --build

OR

##Manual Setup
1. Backend Setup:

1.1. Create and activate a Python virtual environment
	 Create a folder for your virtual environment (if not created already), then run:
		python -m venv <virtual_env_name>
	 Activate the virtual environment:
		<virtual_env_name>\Scripts\activate
		
1.2. Install Python dependencies using below command:
	 pip install -r requirements.txt
	(Make sure requirements.txt is present in your backend directory.)

1.3. Setup PostgreSQL database
	 Open pgAdmin.

	 Create a new database named: movie_explorer.
	 
1.4 Change the contiguration of database in settings.py:
	DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'movie_explorer',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
        'ATOMIC_REQUESTS': True, #Ensures the DB doesn't end up in a half-updated state if an error occurs.
		}
	}
	After updating the database settings, proceed with the following commands from your backend project root to apply migrations and load initial data:
		python manage.py makemigrations
		python manage.py migrate
		python manage.py collectstatic --noinput

		# Load fixtures (initial data)
		python manage.py loaddata actors_fixture.json
		python manage.py loaddata directors_fixture.json
		python manage.py loaddata genres_fixture.json
		python manage.py loaddata movie_fixture.json
		python manage.py loaddata movie_actor_fixture.json
		python manage.py loaddata movie_genre_fixture.json

1.5. Run the Django development server
	 python manage.py runserver 0.0.0.0:8000

1.6. Run Backend Unit Tests
	 To run unit tests for the Django backend using pytest:
		pytest


2.Frontend Setup:

2.1. Navigate to the frontend folder:
	 cd movie-explorer-ui

2.2. Install frontend dependencies using below command:
	 npm install --legacy-peer-deps
	 (Using --legacy-peer-deps to avoid dependency conflicts.)
	
2.3. Run the Angular development server using below command:
	 ng serve --port 4200

		
2.4. Run Angular Unit Tests
	 To execute unit tests for the frontend:
		ng test
---

##Access the Application
Frontend UI:
http://localhost:4200/#/movie

Backend Swagger API documentation:
http://127.0.0.1:8000/swagger-ui/#/

---

If you want, I can also help you add badges, contribution guidelines, or more details! Would you like me to?

	



