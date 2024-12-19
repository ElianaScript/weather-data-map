import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
dotenv.config();
// Import the routes
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'dist')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', routes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));