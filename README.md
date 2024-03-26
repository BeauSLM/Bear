NOTE: all terminal blocks assume you're in the root folder of the project

# Setup

A few things need to happen

- install dependencies of frontend
- install dependencies of API
- initialize database

Get API dependencies and initialize database:

```bash
cd api/

npm install && npm run populate-db
```

Get frontend dependencies:


```bash
cd frontend/

npm install
```

# Run the project

first, run the api:

```bash
# inside a new terminal
cd api/

npm start
```

then run the frontend:

```bash
# inside a new terminal

cd frontend/

npm start
```
