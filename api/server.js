// BUILD YOUR SERVER HERE

const express = require('express')
const bodyParser = require('body-parser');

//import model
const Model = require('./users/model')

const server = express();

server.use(express.json());
// server.use(bodyParser.urlencoded({
//     extended: true
// }))

server.get('/', (req, res) => {
    res.end('<h1>Welcome to the Project App</h1>');
})

server.get('/api/users', (req, res) => {
    Model.find()
        .then(models => {
            res.json(models);
        })
        .catch(err => {
            res.status(500).json({message: "The users information could not be retrieved"})
        })
});



server.post('/api/users', async (req, res) => {
    let { name, bio } = req.body;
    let model = req.body;
    // Model.insert(model)
    // .then(elem => {
    //     console.log('test', elem)
    //     console.log('second', model)
    //     res.status(201).json(elem);
    // })
    if(name && bio) {
        Model.insert(model)
            .then(elem => {
                console.log(elem)
                res.status(201).json(elem);
            })
    }
    else {
        console.log(model)
        res.status(400).json({ message: "Please provide name and bio for the user"})
    }
})

server.get('/api/users/:id', (req, res) => {
    Model.findById(req.params.id)
        .then(model => {
            if(!model) {
                res.status(404).json({ message: 'The user with the specified ID does not exist' })
            } else {
                res.json(model);
            }
        })
        .catch(err => {
            res.status(500).json({message: 'The user information could not be retrieved'})
        });
});

server.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let model = req.body;
    Model.update(id, model)
        .then(updatedUser => {
            if(!updatedUser) {
                res.status(404).json({ message: 'The user with the specified ID does not exist' })
            } else if(!req.body.name || !req.body.bio) {
                res.status(400).json({message: 'Please provide name and bio for the'})
            }
            else {
                res.status(200).json(updatedUser)
            }
        })
})

server.delete('/api/users/:id', (req, res) => {
    Model.remove(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The user could not be removed' })
        })
})


// When the client makes a `DELETE` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist" }`.

// - If there's an error in removing the _user_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ message: "The user could not be removed" }`.

module.exports = server; // EXPORT YOUR SERVER instead of {}

