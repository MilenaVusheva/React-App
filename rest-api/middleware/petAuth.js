const petService = require('../services/petService');

exports.isOwnerPet = function (req, res, next) {
    let pet = petService.getOne(req.params.petId)

    if (pet.owner == req.user._id) {
        req.pet = pet;
        next()
    } else {
        next('you are not authorized to edit this pet')
    }
};
