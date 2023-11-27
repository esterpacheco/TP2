const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())

const dotenv=require('dotenv')


if(process.env.OMG === "DEV"){
    dotenv.config({path:'./config/.env.dev'})
}
if(process.env.OMG === "PROD"){
    dotenv.config({path:'./config/.env.prod'})
}


const modelodeUsuario = mongoose.model('contas', new mongoose.Schema({
    email: String,
    senha: String,
    eadmin: Boolean
}))


mongoose.connect('mongodb://127.0.0.1:27017/aaaa') // process.env.URL
 .then(()=>{

app.post('/login/', async (req,res)=>{
    const usuarioEncontrado = await modelodeUsuario.findOne({email: req.body.email, senha: req.body.senha})
    if(usuarioEncontrado === null){
        return res.send('Usuário não encontrado')
    }
    res.send(usuarioEncontrado)
})

app.post('/getProdutos/', async (req,res)=>{
    const produtoEncontrado = await modelodeUsuario.findOne({violãoR$61900: req.body.violãoR$61900, bateriaR$320000: req.body.bateriaR$320000, guitarraR$59800: req.body.guitarraR$59800, saxofoneR$194000: req.body.saxofoneR$194000})
    if(produtoEncontrado === null){
        return res.send('Produto não encontrado')
    }
    res.send(produtoEncontrado)
})
  
app.post('/cadastro',async (req,res) =>{
    const usuarioCriado = await modelodeUsuario.create({email: req.body.email, senha: req.body.senha, endereço: req.body.endereço, cidade: req.body.cidade, cep: req.body.cep, estado: req.body.estado, telefone: req.body.telefone, admin: req.body.admin})
    res.send(usuarioCriado)
})

app.post('/admin',async (req,res) =>{
    const usuarioEncontrado = await modelodeUsuario.findOne({email: req.body.email, senha: req.body.senha})
    if (usuarioEncontrado.eadmin === null) {
        return res.send('')
    }
    const produtoCriado = await modelodeUsuario.create({violãoR$61900: req.body.violãoR$61900, bateriaR$320000: req.body.bateriaR$320000, guitarraR$59800: req.body.guitarraR$59800, saxofoneR$194000: req.body.saxofoneR$194000})
    res.send(produtoCriado)
})

app.put('/put', async (req,res)=>{
    const usuarioAtualizado = await modelodeUsuario.findOneAndUpdate({email: req.body.email, password: req.body.password}, {email: req.body.newemail, password: req.body.newpassword})
    res.send({ message: "dados atualizados com sucesso!" })
})
  
app.delete('/delete', async (req,res)=>{
    const usuarioDeletado = await modelodeUsuario.deleteOne({email: req.body.email, password: req.body.password})
    res.send(usuarioDeletado)
})  

app.use((req,res)=>{
    res.send('Não foi possível encontrar sua rota')
})

app.listen(7000, ()=>console.log(`o servidor ta rodando :) ${7000}`))

})
