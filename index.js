import express from 'express';
import ejs from 'ejs';

const app = express();
const port = 3000;

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('AllProductsPage.ejs');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });