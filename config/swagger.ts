import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CHEFGPT API Documentation',
            version: '1.0.0',
            description: 'Documentation for the CHEFGPT API',
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token in the format: Bearer {token}',
                },
            },
        },
        servers: [
            {
                url: 'http://localhost:5000', // Update this to match your server URL
            },
        ],
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.ts'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
