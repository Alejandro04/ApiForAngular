const express = require('express');
const router = express.Router();

const Client = require('../models/Client')

router.get('/clients', async (req, res) => {
    const clients = await Client.find()

    res.json(clients);
})

router.post('/clients', async (req, res) => {
    const { name, description } = req.body;
    const errors = [];
    if (!name) {
        res.json({
            message: 'Ingrese el nombre'
        })
    }
    if (!description) {
        res.json({
            message: 'Ingrese la descripción'
        })
    }
    if (errors.length > 0) {
        res.json({
            errors,
            name,
            description
        })
    } else {
        try {
            const newClient = new Client({ name, description });
            await newClient.save();

            res.json({
                client: newClient
            });
        } catch (err) {
            console.log(err)
        }
    }
})


router.get('/clients/:id', async (req, res) => {
    const client = await Client.findById(req.params.id)
    res.json(client);
})


router.put('/clients/:id', async (req, res) => {
  const { name, description } = req.body;
  const client = await Client.findByIdAndUpdate(req.params.id, {name, description});
  
  res.json(client);
});

/*
router.delete('/notes/:id',  async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  
  return "Cliente Eliminado"
});
*/

module.exports = router;