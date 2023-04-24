# IPLookUP - [Live demo](http://dhruvinmakwana.pythonanywhere.com/)

This projects allows user to find geolocation data based on the IP addresses provided.

| Tech Stack                                                                                                            | Description                                                                                      |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [GeoLite2 City database and geoip2 python API](https://dev.maxmind.com/geoip/docs/databases/city-and-country?lang=en) | GeoIP2 python API allows fetching geo location data with the help of GeoLite City database       |
| [Flask](https://flask.palletsprojects.com/)                                                                           | For REST API development                                                                         |
| [Flasgger](https://github.com/flasgger/flasgger)                                                                      | For Swagger UI generation and request and/or response validation                                 |
| [Marshmallow](https://marshmallow.readthedocs.io/en/stable/)                                                          | As an ORM/ODM framework to serialize and deserialize complex data types in REST request response |
| [Flask-Limiter](https://flask-limiter.readthedocs.io/en/stable/)                                                      | Used to limit records query to 25 records per minute                                             |
| [PyTest](https://pytest.org/)                                                                                         | Testing framework                                                                                |
| [React](https://react.dev/)                                                                                           | Frontend Development framework                                                                   |
| [MUI](https://mui.com/)                                                                                               | React based component library                                                                    |
| [Zustand](https://github.com/pmndrs/zustand)                                                                          | State management library                                                                         |

##    

## Running the project

You will only need to run flask server which is located in the backend directory, since the repository already contains
the build files for client application.

## Running  the server

- Navigate to `backend` directory using `cd backend`

- This project was build using python version 3.8
- Create a new virtual environment  `python -m venv  venv` [guide](https://docs.python.org/3/library/venv.html).
- Activate the `venv` environment using `./venv/Scripts/activate`
- Install dependencies described in requirements.txt using `pip install -r requirements.txt`
- Make sure `backend/resources` directory contains [GeoLite2_City](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data) database.
- Update `DevelopmentConfig` to point to `GeoLite2_City` database
- Start flask server by running  `python -m flask run`
- Navigate to `http://127.0.0.1:8000`
- To view swagger API documentation navigate to `http://127.0.0.1:8000/apidocs`

## Running the client

- Navigate to `frontend` directory using `cd frontend`
- Update `REACT_APP_API_END_POINT` constant inside `src/constants.js ` with the flask server URL without a trailing
  slash(/)
    - ex. `REACT_APP_API_END_POINT="https://127.0.0.1"`
- run `npm install`
- run `npm start`
- It should automatically load the application in the browser. If not follow then prompt on console to view the webapp.

Please let me know if you have any concerns or need help in setting up the project.