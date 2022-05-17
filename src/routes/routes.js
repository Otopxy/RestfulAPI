const express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
// to get login password
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router()


const Model = require('../model/model');

module.exports = router;

// POST /login gets urlencoded bodies
/* app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
  }) */
//Post Method
router.post('/post', jsonParser, async (req, res) => {
    
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
/* router.get('/getAll', (req, res) => {
    res.send('Get All API')
}) */
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
/* router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
}) */

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
/* router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
}) */
//Update by ID Method
router.patch('/update/:id', jsonParser, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
/* router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
}) */
//Delete by ID Method
router.delete('/delete/:id', jsonParser,  async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
