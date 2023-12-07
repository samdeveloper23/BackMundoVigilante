const selectUserEmailQuery = require('../../models/usersQuery/selectUserEmailQuery');
const { generateError } = require('../../services/errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateSchema = require('../../services/validateSchema');
const loginUserSchema = require('../../schemas/users/loginUserSchema');

const loginUsers = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        await validateSchema(loginUserSchema, req.body);

        const user = await selectUserEmailQuery(email);

        const validationPass = await bcrypt.compare(password, user.password);

        if (!validationPass) {
            generateError('Contraseña incorrecta', 401);
        }

        const infoToken = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(infoToken, process.env.SECRET, {
            expiresIn: '1d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = loginUsers;
