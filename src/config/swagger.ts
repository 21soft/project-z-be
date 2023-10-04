import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Z API with Swagger',
      version: '1.0.0',
      description: 'This is a REST API application made with Express and documented with Swagger'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local server'
      },
      {
        url: 'http://project-z.nugrazurus.site',
        description: 'Development server'
      }
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);

