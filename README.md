# IPLookUP - [Live demo](http://dhruvinmakwana.pythonanywhere.com/)

This projects allows user to find geolocation data based on the IP addresses provided.

| Tech Stack                                                  | Description                                                                                      |
|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [Flask](https://flask.palletsprojects.com/)                 | For REST API development                                                                         |
| [Flasgger](https://github.com/flasgger/flasgger)            | For Swagger UI generation and request and/or response validation                                 |
| [Marshmallow](https://marshmallow.readthedocs.io/en/stable/) | As an ORM/ODM framework to serialize and deserialize complex data types in REST request response |
| [Flask-Limiter](https://flask-limiter.readthedocs.io/en/stable/)                                               | Used to limit records query to 25 records per minute                                             |
| [PyTest](https://pytest.org/)                               | Testing framework                                                                                |
| [React](https://react.dev/)                                 | Frontend Development framework                                                                   |
| [MUI](https://mui.com/)                                     | React based component library                                                                    |
| [Zustand](https://github.com/pmndrs/zustand)                | State management library                                                                         |

## 

## Running the project
You will only need to run flask server which is located in the backend directory, since the repository already contains the build files for client application.

## Server
- Navigate to `backend` directory using `cd backend`

- This project was build using python version 3.8
- Create a new virtual environment  `python -m venv  venv` [guide](https://docs.python.org/3/library/venv.html).
- Activate the `venv` environment using `./venv/Scripts/activate`
- Install dependencies described in requirements.txt using `pip install -r requirements.txt`
- Make sure `backend/resources` directory contains `GeoLite2_City` database. 
  - Note:
    - I have included this as a part of repository in order to speed up the setup process. Ideally it should be served from S3 or other similar storage solutions.
- Start flask server by running  `python -m flask run`
- Navigate to `http://127.0.0.1:8000`
- To view swagger API documentation navigate to `http://127.0.0.1:8000/apidocs`

## Client
- To build client
- Navigate to `frontend` directory using `cd frontend`
- run `npm install`
- run `npm start`
- It should automatically load the application in the browser. If not follow then  prompt on console to view the webapp.
  - Note:
    - client might face issue connecting to the API if you are attempting to run both of them separately.
    - in order for it to work make sure you are point to right API end point in [ApiService.js](https://github.com/dhruvinmakwana/IPLookUP/blob/master/frontend/src/services/ApiService.js) 
    
Please let me know if you have any concerns or need help in setting up the project.