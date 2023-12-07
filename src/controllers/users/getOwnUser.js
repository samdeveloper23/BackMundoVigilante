const selectUserByIdQuery = require('../../models/usersQuery/selectUserByIdQuery');

const getOwnUser = async (req, res, next) => {
    try {
        const user = await selectUserByIdQuery(req.user.id);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getOwnUser;
