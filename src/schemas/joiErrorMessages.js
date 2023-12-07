const joiErrorMessages = {
    'string.base': 'El campo "{#key}" debe contener texto',
    'string.empty': 'Es obligatorio cubrir el campo "{#key}". ',
    'string.valid': 'El campo seleccionado no es válido',
    'any.required': 'El campo "{#key}" es obligatorio',
    'any.only': 'Solo se permiten fotos jpeg o png',
    'string.email': 'Debe proporcionar un email válido',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres',
    'string.pattern.base':
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo de puntuación.',
};

module.exports = joiErrorMessages;
