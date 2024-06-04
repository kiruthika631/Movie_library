const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/lists', require('./routes/lists'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
