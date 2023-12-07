const activationStatusQuery = require('../../models/usersQuery/activationStatusQuery');

const activationStatus = async (req, res, next) => {
    const { email } = req.body;
    try {
        await activationStatusQuery(email);

        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = activationStatus;
