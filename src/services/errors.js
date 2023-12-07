const errorStandard = (error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
};

const notFound = (req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
};

const generateError = (message, code) => {
    const error = new Error(message);
    error.httpStatus = code;
    throw error;
};

module.exports = { errorStandard, notFound, generateError };
