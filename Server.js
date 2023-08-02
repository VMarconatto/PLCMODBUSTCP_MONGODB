require(`dotenv`).config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const route = require('./Routes')

mongoose.connect(process.env.connectionstring,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('Conexão com Mongo DB Cluster 0, DataBase')
    app.emit('Pronto')
})
.catch((e)=>{
    console.log(e, `Verificar string de conexao e senha`)
})

app.use(route)
app.on('Pronto',()=>{
    app.listen(3000,()=>{
        console.log('Acessar http://localhost:3000')
        console.log('Servidor ouvindo pela porta 3000')
    })
})
