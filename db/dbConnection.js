const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(_ => console.log(`Baglanti saglandi`))
    .catch(err => console.log(`Baglanti saglanamadi: ${err}`));