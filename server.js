const express = require('express');
const fs = require('fs');
const PORT = 3000;
const app = express();
const data = require('./data.json');

app.use(express.static('public'));

app.get('/tree-data', (req, res) => {
    res.json(data);
});

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, htmlContent) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла html');
        }
        res.send(htmlContent);
    });
});

app.listen(PORT, () => {
    console.log(`Сервер на порту ${PORT}`);
});

