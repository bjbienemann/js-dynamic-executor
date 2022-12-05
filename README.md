# JS code snippet executor
Sample javascript code snippet dynamic executor.

![Sequence diagram](./out/sequence-diagram/JS%20code%20snippet%20executor.png?raw=true "Sequence diagram")

## Requirements
* NodeJS
* Npm
* Mongodb

## Dependencies
```
npm install
```

## Run
```
node src/index.js
``` 

## Test
1. Insert the document into the student's collection.
```
db.student.insertOne(
    {
        "_id": "1",
        "name": "Brian",
        "grades": [5, 6, 7, 8, 9]
    }
);
```

2. Download the [js-dynamic-executor.postman_collection.json](./js-dynamic-executor.postman_collection.json) file and import it into Postman.

3. Use the http request do run the test.
