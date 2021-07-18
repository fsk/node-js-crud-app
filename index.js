const express = require('express');
require('./db/dbConnection');
const errorMiddleware = require('./middleware/errorMiddleware');
const jwt = require('jsonwebtoken');


//ROUTES
const userRouter = require('./router/userRouter')

const app = express();

app.use(express.json());


app.use('/api/users/', userRouter);

app.get('/', (req, res) => {
    res.status(200).json({ 'message': 'Hosgeldiniz' });
})

app.use(errorMiddleware);




app.listen(3000, () => {
    console.log('Server 3000 portunda calisiyor.');
});