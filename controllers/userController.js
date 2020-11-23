const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUser = (req, res, next) => {
    User.find({})
        .select('name email status')
        .exec((err, users) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    message: 'Error al cargar usuarios',
                })
            }
            res.status(200).json({
                ok: true,
                users
            })
        })
}

exports.newUser = (req, res, next) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        status: body.status,
    })
    user.save( (err, userSave ) => {
        userSave.password = ';)'
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error al guardar usuario',
                errors: err
            })
        }
        res.status(201).json({
            ok: true,
            user: userSave
        })
    })
    
} 

exports.editUser = (req, res) => {
    let idUser = req.params.idUser
    let body = req.body;

    User.findById(idUser, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar el usuario',
                errors: err
            });
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: `el usuario con el id: ${idUser}, no existe`,
                errors: { message: 'no existe un usuario con ese id' }
            });
        }

        user.name = body.name
        user.status = body.status
        user.email = body.email
        user.save((err, userUpdate) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `error al actualizar el usuario`,
                    errors: err
                });
            }
            userUpdate.password = ';)'; 
            res.status(200).json({
                ok: true,
                userUpdate
            })
        })
    })
   
}

exports.deleteUser = (req, res) => {
    let id = req.params.idUser

    User.findByIdAndDelete(id, (err, userDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al borrar usuario',
                errors: err
            });
        }
        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                message: 'No existe usuario con ese id',
                errors: { message: 'No existe usuario con ese id' }
            });
        }
        res.status(200).json({
            ok: true,
            userDelete
        });
    })
}

exports.findUser = (req, res) => {

    let idUser = req.params.idUser

    User.findById(idUser, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar el usuario',
                errors: err
            });
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: `el usuario con el id: ${idUser}, no existe`,
                errors: { message: 'no existe un usuario con ese id' }
            });
        }
        res.status(201).json({
            ok: true,
            user
        })
    })
}