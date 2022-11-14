const express = require('express')
const app = express()
const port = 3000
const connect = require('./connect')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/Hi', (req, res) => {
    res.send('สวัสดีครับ')
  })

  app.get('/say/:somthing', (req, res) => {
    const name = req.params.somthing;
    res.send('สวัสดีครับ' + name);
  })

  app.get('/sum/:num1/:num2', (req, res) => {
    const num1 = +req.params.num1;
    const num2 = +req.params.num2;
    res.send("ผลรวมของ" + num1 + "และ" + num2 + "คือ" + (num1+num2))
  })

  app.get('/users', (req, res) => {
    const query = "SELECT * FROM users";

    connect.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
  })

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM users WHERE id = ?";
    connect.query(query,[id], (error, results) => {
        if (error) throw error;
        res.json(results[0])
    });
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})