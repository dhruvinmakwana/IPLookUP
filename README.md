# IPLookUP

This projects allows user to find geo-location data based on the IP addresses provided.

| Tech Stack                                                   | Description                                                                                      |
|--------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [Flask](https://flask.palletsprojects.com/)                                                        | For REST API development                                                                         |
| [Flassger](https://github.com/flasgger/flasgger)             | For Swagger UI generation and request and/or response validation                                 |
| [Marshmellow](https://marshmallow.readthedocs.io/en/stable/) | As an ORM/ODM framework to serialize and deserialize complex data types in REST request response |
| [PyTest](https://pytest.org/)                                | Testing framework                                                                                |
| [React](https://react.dev/)                                  | Frontend Development framework                                                                   |
| [MUI](https://mui.com/)                                      | React based component library                                                                    |
| [zustand](https://github.com/pmndrs/zustand)                                                      | State management library                                                                         |

## [Live demo](http://dhruvinmakwana.pythonanywhere.com/)

## Running the project
You will only need to run flask server which is located in the backend directory, since the repository already contains the build files for client application.

## Server
- Navigate to `backend` directory using `cd backend`
- Optional
  - Create a new virtual environment - [guide](https://docs.python.org/3/library/venv.html).
  - Activate virtual environment.
- Use existing or newly created virtual environment to install dependencies described in requirements.txt using `pip install -r requirements.txt`
- Make sure `backend/resources` directory contains `GeoLite2_City` database. 
  - Note:
    - I have included this as a part of repository in order to speed up the set up process. Ideally it should be served from S3 or other similar storage solutions.
- Start flask server by running `python app.py` or `python -m flask run`
- Navigate to `http://localhost:8000`
- To view swagger API documentation navigate to `http://localhost:8000/apidocs`

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