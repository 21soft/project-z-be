import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Project Z API with Swagger",
      version: "1.0.0",
      description:
        "This is a REST API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://project-z.nugrazurus.site/api/v1",
        description: "Development server",
      },
      {
        url: "http://localhost:8080/api/v1",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
