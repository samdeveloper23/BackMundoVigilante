# tatooArt

- App para tatuadores.

- Se trata de una web donde los usuarios tienen dos roles (artista o estudio), ambos perfiles pueden crear publicaciones.

- Cada publicación tiene un título, descripción, lugar y una foto asignada.

- Cada publicación puede ser valorada con un like.

- Cada publicación puede ser comentada por los demás usuarios registrados, independientemente de su rol.

- La finalidad es poner encontacto a los artistas con los estudios.

- Sólo los usuarios registrados pueden acceder a los datos de contacto de los demás usuarios e interactuar con ellos.

## Instalar

- Instalar las dependencias mediante el comando `npm install` o `npm i`.

- Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

- Ejecutar `npm run initDB` para crear la base de datos necesaria con todas sus tablas.

- Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

- Importar la colección de Postman para poder probar los endpoints.

## Base de datos

- **`users:`** id, email, password, username, role, avatar, personalInfo, active, registrationCode, recoverPassCode, createdAt, modifiedAt.

- **`publications:`** id, title, photoName, description, place, userId, createdAt.

- **`Likes:`** id, publicationId, userId, createdAt, modifiedAt.

- **`Comments:`** id, text, publicationId, userId, createdAt.

## Endpoints del usuario

- **POST** - [`/users`] - Crea un usuario pendiente de validar.
- **PUT** - [`/users/validate/:regCode`] - Valida a un usuario recién registrado para darle acceso.
- **POST** - [`/users/login`] - Logea a un usuario retornando un token.
- **GET** - [`/users/:userId`] - Retorna información de un usuario concreto.
- **GET** - [`/users/owner`] - Retorna información del usuario del token. ➡️ `Token`
- **GET** - [`/users`] - Retorna un listado de usuarios y nos permite filtrar la búsqueda.
- **PUT** - [`/users/avatar`] - Permite actualizar el avatar del usuario. ➡️ `Token`
- **POST** - [`/users/password/recover`] - Envía al usuario un correo de recuperación de contraseña.
- **PUT** - [`/users/password/recover`] - Permite actualizar la contraseña mediante la recuperación.
- **PUT** - [`/users/password`] - Resetea la contraseña de un usuario.➡️ `Token`
- **DELETE** - [`/users/:userId`] - Elimina a un usuario en concreto. -> `Token`

## Endpoints de las publicaciones

- **POST** - [`/publications`] - Crea una publicación. ➡️ `Token`
- **GET** - [`/publications`] - Retorna un listado de publicaciones y nos permite filtrar la búsqueda.
- **GET** - [`/publications/:publicationId`] - Retorna una publicación en concreto.
- **POST** - [`/publications/:publicationId/likes`] - Agrega un like a una publicación. ➡️ `Token`
- **DELETE** - [`/publications/:publicationId/likes`] - Retira un like a una publicación. ➡️ `Token`
- **POST** - [`/publications/:publicationId/comments`] - Agrega un comentario a una publicación concreta. ➡️ `Token`
- **DELETE** - [`/publications/:publicationId/comments/:commentId`] - Elimina un comentario en concreto. -> `Token`
- **DELETE** - [`/publications/:publicationId`] - Eliminar una publicación propia junto con sus likes y comentarios. ➡️ `Token`
# radSocialBack
