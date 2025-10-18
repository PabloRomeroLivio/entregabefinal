import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AdoptMe API",
      version: "1.0.0",
      description: "API para la gestión de usuarios, mascotas y adopciones",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
  },
  apis: ["./src/routes/*.js"], 
};

const specs = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`📄 Documentación Swagger disponible en /api/docs`);
};
