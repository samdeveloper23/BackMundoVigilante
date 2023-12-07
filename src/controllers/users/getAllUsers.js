const selectAllUsersQuery = require('../../models/usersQuery/selectAllUsersQuery');

const getListPublication = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const users = await selectAllUsersQuery(keyword);

        const isAuthenticated = req.user !== undefined;

        if (!isAuthenticated) {
            users.forEach((user) => delete user.email);
        }

        res.send({
            status: 'ok',
            data: {
                users,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getListPublication;
