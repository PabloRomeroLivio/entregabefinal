# 🧩 Proyecto Final - Backend Avanzado III

## 📚 Descripción general

Este proyecto corresponde a la **entrega final del curso "Programación Backend Avanzado III"**.  
El objetivo es implementar un servidor backend robusto con arquitectura profesional, integrando:

- **MongoDB con Mongoose** como sistema de persistencia.
- **Patrón Repository**, **DAO** (Data Access Object) y **DTOs**.
- **Servicios y controladores** para mantener una arquitectura escalable.
- **Autenticación y manejo de sesiones**.
- **Gestión de usuarios, mascotas y adopciones** mediante endpoints REST.
- **Tests automatizados funcionales** utilizando **Mocha**, **Chai** y **Supertest**.

El sistema permite:
- Crear, leer, actualizar y eliminar **usuarios**.
- Registrar y administrar **mascotas** (con y sin imagen).
- Gestionar **adopciones**, vinculando usuarios con mascotas.
- Validar toda la API mediante **tests automáticos**.

---

## 🧱 Arquitectura del proyecto

El proyecto está basado en una estructura modular y limpia:


src/
├── app.js
├── config/
│ └── db.js
├── controllers/
│ ├── users.controller.js
│ ├── pets.controller.js
│ └── adoptions.controller.js
├── dao/
│ ├── models/
│ │ ├── User.js
│ │ ├── Pet.js
│ │ └── Adoption.js
│ ├── UsersDao.js
│ ├── PetsDao.js
│ └── AdoptionsDao.js
├── repositories/
│ ├── GenericRepository.js
│ ├── UserRepository.js
│ ├── PetRepository.js
│ └── AdoptionRepository.js
├── services/
│ └── index.js
├── routes/
│ ├── users.router.js
│ ├── pets.router.js
│ ├── adoptions.router.js
│ └── sessions.router.js
├── dto/
│ └── Pet.dto.js
├── utils/
│ ├── uploader.js
│ └── index.js
└── tests/
├── users.test.js
├── pets.test.js
└── adoptions.test.js





---

## ⚙️ Tecnologías principales

- **Node.js + Express**
- **MongoDB + Mongoose**
- **bcrypt** para encriptación de contraseñas
- **dotenv** para configuración de entorno
- **Mocha**, **Chai** y **Supertest** para testing
- **Multer** para carga de imágenes
- **ES Modules (import/export)**

---

## 📦 Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio


#Instalar dependencias:
npm install

#Crear un archivo .env en la raíz con las siguientes variables:

PORT=8080
MONGO_URL=mongodb+srv://pabloromerolivio:pabloromerolivio@cluster0.gj7u9pb.mongodb.net/


iniciar el servidor:
npm start


o en modo desarrollo (si usás nodemon):
npm run dev



🔗 Endpoints principales


👤 Usuarios (/api/users)
| Método   | Ruta              | Descripción                    |
| -------- | ----------------- | ------------------------------ |
| `GET`    | `/api/users`      | Obtiene todos los usuarios     |
| `GET`    | `/api/users/:uid` | Obtiene un usuario por ID      |
| `POST`   | `/api/users`      | Crea un nuevo usuario          |
| `PUT`    | `/api/users/:uid` | Actualiza un usuario existente |
| `DELETE` | `/api/users/:uid` | Elimina un usuario             |



🐾 Mascotas (/api/pets)
| Método   | Ruta                  | Descripción                                 |
| -------- | --------------------- | ------------------------------------------- |
| `GET`    | `/api/pets`           | Obtiene todas las mascotas                  |
| `POST`   | `/api/pets`           | Crea una mascota sin imagen                 |
| `POST`   | `/api/pets/withimage` | Crea una mascota con imagen (usando multer) |
| `PUT`    | `/api/pets/:pid`      | Actualiza una mascota                       |
| `DELETE` | `/api/pets/:pid`      | Elimina una mascota                         |


💞 Adopciones (/api/adoptions)
| Método | Ruta                       | Descripción                                    |
| ------ | -------------------------- | ---------------------------------------------- |
| `GET`  | `/api/adoptions`           | Lista todas las adopciones                     |
| `GET`  | `/api/adoptions/:aid`      | Obtiene una adopción por ID                    |
| `POST` | `/api/adoptions/:uid/:pid` | Registra una adopción (usuario adopta mascota) |


🔐 Sesiones (/api/sessions)
| Método | Ruta                             | Descripción                             |
| ------ | -------------------------------- | --------------------------------------- |
| `POST` | `/api/sessions/register`         | Registra un nuevo usuario               |
| `POST` | `/api/sessions/login`            | Inicia sesión                           |
| `GET`  | `/api/sessions/current`          | Retorna usuario actual autenticado      |
| `GET`  | `/api/sessions/unprotectedLogin` | Login sin protección JWT (para pruebas) |


🧪 Testing

Los tests funcionales cubren los módulos:

Users

Pets

Adoptions

Ejecución de tests:

npm test

Cada test:

Crea un documento temporal en MongoDB.

Ejecuta operaciones CRUD.

Valida códigos de estado y respuestas.

Limpia los datos al finalizar.

Esto garantiza un entorno limpio y reproducible.



🧰 Patrón Repository

El proyecto implementa un Repository Pattern, lo que permite desacoplar la lógica de negocio del acceso a datos.
Esto mejora la mantenibilidad y escalabilidad del sistema.
Cada entidad (User, Pet, Adoption) tiene su propio DAO y Repository para operaciones CRUD y específicas.

📸 DTO (Data Transfer Object)

Se implementa un PetDTO para transformar y validar los datos de entrada de mascotas antes de persistirlos.

🧩 Controladores y servicios

Los controladores manejan las peticiones HTTP y delegan la lógica de negocio a los servicios.
Los servicios se apoyan en los repositorios, que a su vez utilizan los DAO.


💬 Conclusión

Este proyecto cumple con todos los criterios de la entrega final del curso Backend Avanzado II:

✅ Arquitectura modular profesional
✅ Patrón Repository y DAO implementado
✅ DTO funcional
✅ MongoDB operativo
✅ CRUDs completos de Users, Pets y Adoptions
✅ Tests automáticos con Mocha + Supertest
✅ Documentación completa (este README)



✨ Autor

Pablo Romero Livio

