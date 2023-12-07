const selectUserByEmailQuery = require('../../models/usersQuery/selectUserEmailQuery');
const updateUserRecoverPassQuery = require('../../models/usersQuery/updateUserRecoverPassQuery');

const randomstring = require('randomstring');

const { generateError } = require('../../services/errors');
const sendMail = require('../../services/sendMail');
const validateSchema = require('../../services/validateSchema');
const sendRecoverPassSchema = require('../../schemas/users/sendRecoverPassSchema');

const sendRecoverPass = async (req, res, next) => {
    try {
        const { email } = req.body;

        await validateSchema(sendRecoverPassSchema, req.body);

        await selectUserByEmailQuery(email);

        const recoverPassCode = randomstring.generate(4);

        await updateUserRecoverPassQuery(email, recoverPassCode);

        const emailSubject = 'TattooArt: Recuperación de contraseña';

        const emailBody = `
            Se ha solicitado la recuperación de contraseña para este email en TattooArt. 
            
            Introduce el siguiente código en nuestra plataforma para crear una nueva contraseña: ${recoverPassCode}

            Si no has sido tú ignora este email.
        `;

        await sendMail(email, emailSubject, emailBody);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación enviado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = sendRecoverPass;
