import axios from 'axios';
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/public', express.static(path.join('../', 'public')));
app.use(favicon(path.join(__dirname, '../', 'public', 'favicon.ico')));

app.get('/memes', (_req: any, res: any): void => {
  axios
    .get('https://api.reddit.com/r/programmingmemes')
    .then((response: any) => {
      res.json(response.data);
    });
});

app.get('/', (_req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../', 'public') });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
