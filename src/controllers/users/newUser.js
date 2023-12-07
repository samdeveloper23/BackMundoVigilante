const insertUserQuery = require('../../models/usersQuery/insertUserQuery');
const { v4: uuid } = require('uuid');
const { generateError } = require('../../services/errors');
const sendMail = require('../../services/sendMail');
const validateSchema = require('../../services/validateSchema');
const newUserSchema = require('../../schemas/users/newUserSchema');

const newUser = async (req, res, next) => {
    try {
        const { email, username, password, role } = req.body;

        await validateSchema(newUserSchema, req.body);

        const regCode = uuid();

        await insertUserQuery(email, username, password, role, regCode);

        const activationURL = `http://localhost:8000/users/validate/${regCode}`;

        const emailSubject = 'Activación de usuario en tattooArt';
        const emailBody = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Correo Electrónico de Activación</title>
        </head>
        <body>
          <p>¡Hola usuario! Bienvenid@ a TattoArt.</p>
          <p>Puedes activar tu cuenta haciendo clic en el siguiente enlace:</p>
          <a id="activationLink" href="http://localhost:8000/users/validate/${regCode}" style="display: inline-block; padding: 10px; background-color: #3498db; color: #fff; text-decoration: none;">Activar cuenta</a>
        
          <script>
            document.getElementById("activationLink").addEventListener("click", async (event) => {
              event.preventDefault();
              const activationURL = event.target.href;
        
              try {
                const response = await fetch(activationURL, { method: "PUT" });
                if (response.ok) {
                  const data = await response.json();
                  alert(data.message); // Muestra mensaje de éxito en caso de respuesta exitosa.
                } else {
                  throw new Error("Error al activar la cuenta.");
                }
              } catch (error) {
                console.error(error);
                alert(error.message); // Muestra mensaje de error en caso de respuesta de error.
              }
            });
          </script>
        </body>
        </html>
`;

        await sendMail(email, emailSubject, emailBody);

        res.send({
            status: 'ok',
            data: regCode,
            message:
                'Usuario creado, por favor revise su email para completar la activación de su cuenta',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
