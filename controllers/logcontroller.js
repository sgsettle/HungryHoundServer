const router = require('express').Router()
const Log = require('../db').import('../models/log');

// GET
router.get('/', (req, res) => {
  Log.findAll()
  .then(log => res.status(200).json({
    log: log
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// POST 
router.post('/', (req, res) => {
  console.log(req.body);
  
  const logFromRequest = {
    restaurantName: req.body.log.restaurantName,
    address: req.body.log.address,
    foodType: req.body.log.foodType,
  }

  Log.create(logFromRequest)
  .then(log => res.status(200).json({
    log: log
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// QUERY BY ID
router.get('/:id', (req, res) => {
  Log.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(log => res.status(200).json({
    log: log
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

module.exports = router;