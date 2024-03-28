NOTE: all terminal blocks assume you're in the root folder of the project

# Setup

A few things need to happen

- install dependencies of frontend
- install dependencies of API
- initialize database

Get API dependencies and initialize database:

```bash
cd api/

npm install
npm run populate-db
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

# Postman tests

This is a fair amount more complicated. You'll need:

- the postman cli installed
- to be in our postman team (fml there's only room for three)
    - hit me (beau) up if you're not cause i need to juggle people in it
- a postman api key to give to the cli
- the id of our postman collection in the environment variable POSTMAN_COLLECTION_ID

A brief note abt the api key and the collection id:

DO NOT CHECK ANY API KEYS OR COLLECTION IDS INTO GIT ABSOLUTELY DO NOT DO THIS
EVEN IF YOU REMOVE IT IT'LL BE IN THE COMMIT HISTORY AND I'LL HAVE TO GET IT
OUT (i've screwed this up before cause i'm bad)

install the postman cli however you install stuff. on macos:


```bash
brew install postman && brew install postman-cli
```

get the api key from your settings or whatever and run `postman login`, you'll
be prompted for the api key, just paste it in

now to get the postman collection id in your environment

```bash
cp api/envrc-template api/.envrc
```

Ask beau where to get the postman collection id, it also CANNOT be checked into
git.

edit the file `api/.envrc` and put the postman collection id where it says

them simply

```bash
cd api/

./test-api.sh
```
# How to clear and reset the database

```bash
cd api/

npm run populate-db
```

This refreshes the database to have some useful default values
