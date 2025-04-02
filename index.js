import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('MainPage.ejs');
});

app.get('/products', (req, res) => {
  res.render('AllProductsPage.ejs');
});

app.get('/product', (req, res) => {
  res.render('ProductPage.ejs');
});

app.get('/', (req, res) => {
  res.render('MainPage.ejs');
});

app.get('/cart', (req, res) => {
  res.render('Cart.ejs');
});

app.get('/loginpage', (req, res) => {
  res.render('LoginPage.ejs');
});

app.get('/faq', (req, res) => {
  res.render('FAQPage.ejs');
});

app.post("/login" , (req, res) => {
  console.log(req.body);
  res.send('Login data received');
});

app.post("/signup" , (req, res) => {
  console.log(req.body);
  res.send('Signup data received');
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });