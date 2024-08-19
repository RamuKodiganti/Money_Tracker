// import logo from './logo.svg';
// import { response } from 'express';
// import { response } from 'express';
import './App.css';
import {useEffect, useState} from "react";


// IP adress:103.172.202.70
// password:rbyrCE0hRNC3vFki
// username:ramukodiganti0

function App() {
  const [name,setName]=useState("");
  const [dateTime,setDateTime]=useState("");
  const [description,setDescription]=useState("");
  const [transactions, setTransactions]= useState([]);
  useEffect(()=>{
    getTransactions().then(setTransactions)
  },[])

  async function getTransactions(){
    const url=process.env.REACT_APP_API_URL+"/transaction";
    const response=await fetch(url);
    return await response.json();
  }


  function addNewTransaction(event){
    event.preventDefault();
    const url=process.env.REACT_APP_API_URL+'/transaction';
    const price=name.split(' ')[0]
    console.log(url);
    fetch(url,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({
        name:name.substring(price.length+1),
        description,
        dateTime,
        price}),
        
    }).then((response)=>{
      response.json().then((json)=>{
        setName("");
        setDateTime("");
        setDescription("");
        console.log("result",json);
      });
    });
  }
  let balance=0;
  for(const transaction of transactions){
    balance=balance+transaction.price
  }

  return(
    <main>
      <h1>{balance}</h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
        <input type="text" 
        value={name}
        onChange={event=>setName(event.target.value)}
        placeholder={'20000 mobile'} />
        <input type="datetime-local" value={dateTime}
        onChange={event=>setDateTime(event.target.value)} />
        </div>

        <div className="description">
        <input type="text" 
        value={description}
        onChange={event=>setDescription(event.target.value)}
        placeholder={"description"} />
        </div>
        <button className="custom-button"><span>Add new transaction</span></button>

        
      </form>
      <div className="transactions">
        {transactions.length>0 && transactions.map(transaction=>(
          <div>
          <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}
            </div>
          </div>
          <div className="right">
            <div className={"price " +(transaction.price<0 ?'red':'green')}>{transaction.price}</div>
            <div className="datetime">{transaction.dateTime}</div>
          </div>
        </div></div>
        ))}
      </div>
    </main>
  )
}

export default App;
