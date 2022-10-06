import express from 'express'
import cors from 'cors'
import scrapeWeb from './webScraper.js'
import pool from './db.js'

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors())
app.use(express.json())

app.listen(PORT,()=>{console.log(`listening on port ${PORT}`)})


app.get('/',async(req,res)=>{
   try{
   let list = await scrapeWeb(req.query.search);
    res.send({
        data : list , status : 200 , msg : "received search result successfully"
    })
   }
   catch{
       res.send({data : null , status : 400 , msg : "Internal server error !"})
   }
})

app.post('/createCompany',async(req,res)=>{

  try{
        let body = req.body;
        let cin = body.cin;
        let name = body.name;
        let r =  await pool.query(`INSERT into company (cin,name) values('${cin}','${name}')`);
        res.send({ data : r , status : 200 , msg : "created company succesfully !" })
    }catch(err){
        console.log(err)
        res.send({data : req , status : 400 , msg : "Internal server error !"})
    }

})

app.get('/allCompaniesList',async(req,res)=>{
    try{
    
        let r =  await pool.query(`Select * from company`);
        res.send({ data : r.rows , status : 200 , msg : "got all companies list !" })
    }catch(err){
        console.log(err)
        res.send({data : null , status : 400 , msg : "Internal server error !"})
    }
})