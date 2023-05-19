const router = require('express').Router();
const petService = require('../services/petService');
const { isAuth } = require('../middleware/auth');

router.get('/', (req, res) => {
  
  let category = req.query.category || "All";
  const search = req.query.search || "";

  const defaultCategories = [
    'cat',
    'dog',
    'parrot',
    'horse',
    'other',
  ];

  category === 'All'
    ? (category = [...defaultCategories])
    : (category = req.query.category.split(','));
  
  petService.getAll(category,search)
    .then(pets => {
      // console.log(pets)
      res.status(200).json(pets)
    });
});

router.get('/:userId', (req, res) => {
  petService.getMyPets(req.params.userId)
    .then(myPets => {
      //     console.log(myPets)
      res.status(200).json(myPets)
    })
});

router.get('/details/:petId', (req, res) => {
  petService.getOne(req.params.petId)
    .then(pet => {
     // console.log(pet)
      res.status(200).json(pet)
    })
});

router.post('/create', isAuth, (req, res) => {
  //console.log(req.body)
  //console.log(req.user)
  //res.json(req.body)
  petService.create(req.body, req.user._id , req.user.username)
    .then(createdPet => {
      res.status(201).json({ _id: createdPet._id });
    });
});

router.put('/details/edit/:petId',isAuth, (req, res) => {
  petService.updateOne(req.params.petId, req.body)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Pet. Maybe Pet was not found!`
        });
      } else res.json({ message: "Pet was updated successfully." });
    })
    .catch(err => {
      res.status(500)
    })
});

router.delete('/details/:petId',isAuth, (req, res) => {
  petService.deleteOne(req.params.petId)
    .then(pet => {
      if (req.user._id != pet.owner) {
        res.status(404)
          .json({
            message: `Cannot delete Pet. Maybe Pet was not found!`
          });
      } else {
        res.json({
          message: "Pet was deleted successfully!"
     });
     }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pet"
      });
    })
});

router.post('/like/:petId/:userId', (req, res) => {
petService.likePet(req.params.userId , req.params.petId)
.then(pet => {
    res.status(200).json({
       message: 'Product liked successfully.',
    })
   })
});


module.exports = router;
