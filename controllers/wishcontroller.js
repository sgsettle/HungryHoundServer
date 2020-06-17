const router = require('express').Router()
const Wish = require('../db').import('../models/wish');

// GET
router.get('/', (req, res) => {
  Wish.findAll({
    where: {
      owner_id: req.user.id
    }
  })
  .then(wish => res.status(200).json({
    wish: wish
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// POST 
router.post('/', (req, res) => {
  console.log(req.body);
  
  const wishFromRequest = {
    restaurantName: req.body.wish.restaurantName,
    address: req.body.wish.address,
    foodType: req.body.wish.foodType,
    comment: req.body.wish.comment,
    owner_id: req.user.id
  }

  Wish.create(wishFromRequest)
  .then(wish => res.status(200).json({
    wish: wish
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// QUERY BY ID
router.get('/:id', (req, res) => {
  Wish.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(wish => res.status(200).json({
    wish: wish
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// UPDATE
router.put('/:id', (req, res) => {
  Wish.update(req.body.wish, {
    where: {
      id:req.params.id
    }
  })
  .then(wish => res.status(200).json({
    wish: wish
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// DELETE
router.delete('/:id', (req, res) => {
  Wish.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(wish => res.status(200).json({
      wish: wish
  }))
  .catch(err => res.status(500).json({
      error: err
  }))
})

module.exports = router;