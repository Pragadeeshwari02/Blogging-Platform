const dotenv = require('dotenv');
dotenv.config({ path: './db.env' });
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
