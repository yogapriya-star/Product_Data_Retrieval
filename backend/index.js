const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 5000;
require("dotenv").config();
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  apiKey: process.env.API_KEY,
  password: process.env.PASSWORD
});

app.use(cors());

app.get('/',(req, res) =>{
    res.send(`<h1>Our app is running...</h1>`)
})


app.get('/products',async(req, res) =>{
    await shopify.product.list({limit:5})
    .then((products) => res.send(products))
    .catch((err) => res.status(500).send({ error: err.message }));

})

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}.....`)
})