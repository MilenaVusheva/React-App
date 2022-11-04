const router = require('express').Router();
const petService = require('../services/petService');
const { isAuth } = require('../middleware/auth');
const {isOwnerPet} = require('../middleware/petAuth')
const Pet = require('../models/Pet');



//Retrieve all Pets from the database.
router.get('/', (req, res) => {
  petService.getAll()
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
 
 //let isOwn = pet.owner == req.user._id
    .then(pet => {
     // console.log(pet)
      res.status(200).json(pet)
    })
});

// Create and Save a new Pet
router.post('/create', isAuth, (req, res) => {
  //console.log(req.body)
  //console.log(req.user)
  //res.json(req.body)
  petService.create(req.body, req.user._id , req.user.username)
    .then(createdPet => {
      res.status(201).json({ _id: createdPet._id });
    });
});

// Find a single Pet with an id
// router.get('/likes/:petId', async (req, res) => {

//   await petService.getPetLikes(req.params.petId)
//     //let isOwn = pet.owner == req.user._id

//     .then(pet => {
//       console.log(pet)
//       if (!pet)
//         res.status(404)
//           .json({ message: "Not found Pet" });
//       else res.json(pet);
//     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ message: "Error retrieving Pet" });
  //   });
//});
// Update a Pet by the id in the request
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
// Delete a Pet with the specified id in the request
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

//   // petService.likePet(req.params.petId, req.params.userId)
//   //   .then(likedPet => {
//   //     res.json(likedPet)
//   //   })
})

// router.post('/likes', (req, res) => {
//   petService.likePet(req.params.petId, req.params.userId)
//     .then(likedPet => {
//       res.json({likedPet})
//     });

// })
module.exports = router;