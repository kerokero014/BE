import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import recipeRoutes from './routes/recipeRoutes';
import { setupSwagger } from './config/swagger';
import ingredientRoutes from './routes/Ingredient.routes';
import allergyRoutes from './routes/allergy.routes';
import dislikeRoutes from './routes/dislike.routes';
import recipeIngredientRoutes from './routes/recipeIngredientRoutes';
import userRoutes from './routes/user.routes';
import preferenceRoutes from './routes/preference.routes';
import labsRoutes from './routes/labs.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.send('api is running');
});

app.use('/recipes', recipeRoutes);
app.use('/auth', authRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/allergies', allergyRoutes);
app.use('/dislikes', dislikeRoutes);
app.use('/recipe-ingredients', recipeIngredientRoutes);
app.use('/preferences', preferenceRoutes);
app.use('/users', userRoutes);
app.use('/labs-recipe', labsRoutes);

// Setup Swagger
setupSwagger(app);

export default app;
