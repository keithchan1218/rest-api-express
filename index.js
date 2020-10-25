const express = require('express');
const app = express();
// for request body support JSON format (middleware)
app.use(express.json());

const transport = [
  {name:'Bus', people:50},
  {name:'Taxi', people:5},
  {name:'Walk', people:1}
];

app.get('/',(req, res) => {
  res.send('Welcome to Mini World Transportation');
});

app.get('/api/transport', (req, res) => {
  res.send(transport);
});

app.get('/api/transport/:name', (req, res) => {
  // transport.find((item,index)=>{
  //   if(item.name == req.params.name)
  //   res.send(transport[index]);
  // });
  let result = transport.find(item=>item.name == req.params.name);
  if(!result)
    res.status(404).send({
      'status':'Error',
      'returnData':'Error transportation type!'
    });
  res.send(result)
});

// Add new transport
app.post('/api/transport',(req,res)=>{

  // validation
  if(!req.body.name){
    res.status(404).send({
      'status':'Error',
      'returnData':'Please input valid name',
      'inputData':req.params
    });
    return;
  } else if (!req.body.people){
    res.status(404).send({
      'status':'Error',
      'returnData':'Please input valid people'
    });
    return;
  }

  let newTransportation = {
    name:req.body.name,
    people:req.body.people
  }
  transport.push(newTransportation);
  res.send({
    'status':'Success',
    'returnData':'Added new transportation'
  });

});

app.delete('/api/transport/:name',(req,res)=>{
  transport.find((item,index)=>{
    if(item.name === req.params.name){
      transport.splice(index,1)
      res.send({
        'status':'Success',
        'returnData':'Deleted '+req.params.name
      });
    }
  });
  res.status(404).send({
    'status':'Error',
    'returnData':'Please input valid transportation'
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});