import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import posRouter from './routes/posRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@pos-fruit-store.yuk3f6m.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/v1/pos', posRouter);

// Root endpoint (optional)
app.get('/', (req, res) => {
  res.send('Welcome to POS backend');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
