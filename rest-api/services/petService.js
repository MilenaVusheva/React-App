const Pet = require('../models/Pet');
const User = require('../models/User');

async function getAll(category, search) {
    let pets = await Pet
        .find({ title: { $regex: search, $options: "i" } })
        .where('category').in([...category]);
    return pets;
}
async function getOne(petId) {
    let pet = await Pet.findById(petId)
    return pet;
};
async function getMyPets(userId) {
    let myPets = await Pet.find({ owner: userId });
    return myPets;
};
function create(data, userId, username) {
    let pet = new Pet({ ...data, owner: userId, creator: username })
    return pet.save();
};
function updateOne(petId, petData) {
    return Pet.findByIdAndUpdate(petId, petData);
}
function deleteOne(petId) {
    return Pet.findByIdAndRemove(petId)
};
async function likePet(userId, petId) {
    let liker = await User.findById(userId)
    let pet = await Pet.findById(petId)
    pet.likes.push(liker)
    return pet.save()
};



const petService = {
    getAll,
    getMyPets,
    create,
    getOne,
    updateOne,
    deleteOne,
    likePet,
    //getPetLikes
};
module.exports = petService;
