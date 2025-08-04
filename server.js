const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./dataBase/db');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))


app.use("/api/v1",require('./routes/navRoute'));
app.use("/api/v1", require('./routes/adminRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API is accessible at http://localhost:${PORT}`);
});

connectDB()
