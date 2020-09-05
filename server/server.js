const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const url = new URL(document.currentScript.src);
const widgetLink = url.href.substring(0, url.href.lastIndexOf('/') + 1);
__webpack_public_path__ = widgetLink;
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/publicPath/build'));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
   console.log('Server is up!');
});