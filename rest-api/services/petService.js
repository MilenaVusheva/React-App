const Pet = require('../models/Pet');
const User = require('../models/User');

async function getAll() {
    let pets = await Pet.find({})
    //.limit(6)
   // .sort({ name: -1 })
     //if (query) {
         //await Pet.find().populate('category')
         //await Pet.find({'category':'category'})
        // await Pet.find({category:query})
        // pets = pets.filter(x => x.category.includes(query.category))
    // }

    return pets;
}
async function getOne(petId) {
    let pet = await Pet.findById(petId)
    return pet;
};
// const getAll = () => Pet.find({}).lean();
// const getOne = (petId) => Pet.findById(petId)
async function getMyPets(userId) {
    let myPets = await Pet.find({ owner: userId });
    return myPets;
};
function create(data, userId, username) {
    let pet = new Pet({ ...data, owner: userId, creator: username })
    return pet.save();
};
// function getOne(petId) {
//     return Pet.findById(petId).populate('likes').lean();
// };
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
// async function getPetLikes(petId, userId) {
//     let isOwn = pet.req.user._id == pet.owner
//     return Pet.findById(petId).populate('likes');
// }


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