import express from 'express';
import authRoutes from './routes/auth.js';
import carRoutes from './routes/cars.js';
import dotenv from 'dotenv';
import { connect } from './db/connection.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', carRoutes);

connect()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
