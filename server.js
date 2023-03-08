const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const{conn,Character} = require('./db')
const path = require('path')

app.use(express.json())
app.use('/assets',express.static('assets'))
//app.use('/api/characters',require('./routers/beyblade'))

app.get('/',async(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/api/characters',async(req,res,next)=>{
    try{
        const characters = await Character.findAll({
            include:[{
                model:Character,
                as:'blader'
            }]
        })
        res.send(characters)
    }
    catch(ex){
        next(ex)
    }
})
app.get('/api/characters/:id',async(req,res,next)=>{
    try{
        const character = await Character.findByPk(req.params.id)
        res.send(character)
    }
    catch(ex){
        next(ex)
    }
})
app.post('/api/characters',async(req,res,next)=>{
    try{
        const character = await Character.create(req.body)
        res.status(201).send(character)
    }
    catch(ex){
        next(ex)
    }
})
app.put('/api/characters/:id',async(req,res,next)=>{
    try{
        const character = await Character.findByPk(req.params.id)
        await character.update(req.body)
        res.send(character)
    }
    catch(ex){
        next(ex)
    }
})

app.delete('/api/characters/:id',async(req,res,next)=>{
    try{
        const character = await Character.findByPk(req.params.id)
        await character.destroy()
        res.sendStatus(204)
    }
    catch(ex){
        next(ex)
    }
})

app.use((err,req,res,next)=>{
    console.log(err)
})

app.listen(port, async()=>{
    try{
        await conn.sync({force:true})
        const[tyson,kai,ray,max] = await Promise.all(['Tyson Granger','Kai Hiwatari','Ray Kon','Max Tate'].map(name => {
            return Character.create({name})
        
        }))
        await Promise.all([
            Character.create({name:'Dragoon Galaxy Turbo',role:'BITBEAST',specialAttack:'Galaxy Turbo Twister',bitType:'WIND',bladerId:tyson.id}),
            Character.create({name:'Dranzer Gigs Turbo',role:'BITBEAST',specialAttack:'Blazing Gig Tempest',bitType:'FIRE',bladerId:kai.id}),
            Character.create({name:'Driger Gatling',role:'BITBEAST',specialAttack:'Gatling Claw Maximum',bitType:'THUNDER',bladerId:ray.id}),
            Character.create({name:'Draciel Gravity',role:'BITBEAST',specialAttack:'Gravity Control',bitType:'WATER',bladerId:max.id})
        ])
        console.log(`listening on ${port}`)
    }
    catch(ex){
        console.log(ex)
    }
})