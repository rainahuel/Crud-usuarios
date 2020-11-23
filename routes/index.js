const router = require('express').Router()
const userController = require('../controllers/userController')

module.exports = () => {


    router.get('/users', userController.getUser)
    router.post('/users', userController.newUser)
    router.put('/users/:idUser', userController.editUser)
    router.delete('/users', userController.deleteUser)
    router.get('/users/:idUser', userController.findUser)
    
    return router;

}