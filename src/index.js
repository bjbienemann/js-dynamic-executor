const dotenv = require('dotenv');
dotenv.config({});

const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(
    process.env.DATABASE_URI || 'mongodb://localhost:27017/sample'
);

const express = require('express');
const api = express();
api.use(express.json());

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

api.get('/', (_, res) => {
    res.send('<html><body><h1>Sample nodejs!</></body></html>');
});

api.post('/v1/run', (req, res) => {
    const query = new AsyncFunction(
        'db',
        'obj',
        'sleep',
        req.body.query.script
    );

    const command = new AsyncFunction(
        'obj',
        req.body.command.script
    );
    
    mongoClient.connect()
        .then((client) => client.db())
        .then((db) => query(db, req.body.query.content, sleep))
        .then((content) => command(content))
        .then((content) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).send(content);
        })
        .catch ((error) => res.status(500).send(error));
        // .finally(() => mongoClient.close()); loses performace

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const port = process.env.PORT || 3000;
api.listen(port, function() {
    console.warn(`Express server listening on port ${port}`);
});
