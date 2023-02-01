const express=require("express");
require("./db/conn");
const Student = require('./models/students');
const cors=require("cors"); 

const app=express();


const port= process.env.PORT || 3002;

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  const corsOptions = {
    origin: 'http://localhost:3000',      
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
  
  app.use(cors(corsOptions)); 



  app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    
    Student.findByIdAndRemove(id) 
      .then((student) => {
        if (!student) {
          return res.status(404).send();
        }
        res.send(student);
      })
      .catch((error) => {
        res.status(500).send(error);  
        console.log(error)  
      });
  });
  
  
  app.get('/students', (req, res) => {
    Student.find({})
      .then((students) => {
        res.send(students);
      })
      .catch((error) => {
        console.log("error is",error);
        res.status(500).send(error);
      });
  });

app.post('/students',(req,res)=>{
    const user= new Student(req.body);
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
});

app.patch('/students/:id', async (req,res)=>{
  try{
    const _id=req.params.id;
    const updateStudent= await Student.findByIdAndUpdate(_id, req.body);
    res.send(updateStudent)
  }catch(e){
    res.status(404).send(updateStudent)
  }
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})





// data directory   C:\Program Files\MongoDB\Server\6.0\data\
// log directory    C:\Program Files\MongoDB\Server\6.0\log\