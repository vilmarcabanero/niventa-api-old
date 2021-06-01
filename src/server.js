import express from 'express';
import connectDB from './config/db.js';
import env from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
env.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
