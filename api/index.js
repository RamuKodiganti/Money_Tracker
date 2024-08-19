const express = require("express");
const PORT=3001;
const cors=require('cors')
require("dotenv").config();
const Transaction=require('./models/Transaction');
const mongoose=require('mongoose');
const app=express();

app.use(cors());
app.use(express.json());
app.get("/api/test",(req,res)=>{
  res.send({body:"testing successfully....!"})
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, description, datetime, price } = req.body;

  const transaction = await new Transaction({
    name,
    description,
    datetime,
    price,
  });
  await transaction.save();
  res.json(transaction);
});

app.get('/api/transaction',async(req,res)=>{
  await mongoose.connect(process.env.MONGO_URL)
  const transactions=await Transaction.find()
  res.json(transactions)
});

app.listen(PORT,()=>{
  mongoose.connect(process.env.MONGO_URL)
  console.log(`Server is running on port ${PORT} `);
})    