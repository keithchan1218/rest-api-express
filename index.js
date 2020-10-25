const express = require('express');
const app = express();

const transport = [
  {name:'bus', people:50},
  {name:'taxi', people:5},
  {name:'walk', people:1}
];

app.get('/',(req, res) => {
  res.send('Hello World!!!');
});

app.get('/api/transport', (req, res) => {
  res.send(['bus', 'taxi', 'walk']);
});

app.get('/api/transport/:name', (req, res) => {
  // transport.find((item,index)=>{
  //   if(item.name == req.params.name)
  //   res.send(transport[index]);
  // });
  let result = transport.find(item=>item.name == req.params.name);
  if(!result)
    res.status(404).send('Error');
  res.send(result)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});