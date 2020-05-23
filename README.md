# refillr
author(s): dmiranda

## Installation
This application consists of two parts: a react frontend and a django backend.
In order to get this project up and running (for development purposes), you
need to run both.

First, clone this repository and change directories into the repository.

```
git clone https://github.com/manieldiranda/refillr.git
cd refillr/
```

### Running the Django API
To run the Django API, you will need to install the dependencies, setup the
database schemas, and run the Django development server.

**Install the dependencies**

Change directories into the backend at `refillr_backend/`

```
cd refillr_backend/
pip install -r requirements.txt
```

**Setup the database schemas**

```
python manage.py migrate
```

**Run the Django development server**

```
python manage.py runserver
```

Successful output should look something like this:

```
Performing system checks...

System check identified no issues (0 silenced).
January 10, 2020 - 07:15:39
Django version 2.0.5, using settings 'refillr_backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

Your Django develompent server is now running at `http://127.0.0.1:8000/`.

### Running the React frontend
Open a new terminal window and make sure your Django server is still running.
Then we'll need to install the dependencies for the frontend, set your
environment variables, and run the development server. Ensure you are in the
directory for the frontend in the `refillr_frontend/` folder.

**Install dependencies**

```
yarn install
```

**Set environment variables**

This app uses the Google Maps Javascript API, you can get an API key
[here](https://developers.google.com/maps/documentation/javascript/get-api-key).

Create a new file called `.env.local` in the `refillr_frontend/` directory. In
the file, you'll set the following environment variables:

| Environment Variable      | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| REACT_APP_BASE_API_URL    | The base URL to your Django server (default is http://localhost:8000) |
| REACT_APP_GOOGLE_MAPS_KEY | Your Google Maps Javascript API key                                   |

Paste the following into your `.env.local` file and replace the values as
necessary.

```
REACT_APP_BASE_API_URL=http://locahost:8000
REACT_APP_GOOGLE_MAPS_KEY=<your_api_key_here>
```

**Run the development server**

```
yarn start
```

Your React development server should be running at `http://localhost:3000` now. You can navigate to that URL in the browser to view your application.
