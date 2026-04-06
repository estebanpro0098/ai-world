const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
app.use(express.json())

// permitir archivos estáticos (index.html)
app.use(express.static(__dirname))

// memoria del mundo
let world = {
  background: "black",
  entities: [],
  thoughts: []
}

// cargar mundo guardado
if (fs.existsSync("world.json")) {
  world = JSON.parse(fs.readFileSync("world.json"))
}

function saveWorld(){
  fs.writeFileSync("world.json", JSON.stringify(world,null,2))
}

// IA piensa
function aiThink(){

  const actions=[
    "observe",
    "create_entity",
    "change_color",
    "think"
  ]

  const action=actions[Math.floor(Math.random()*actions.length)]

  if(action==="observe"){
    world.thoughts.push({
      author:"AI",
      text:"Estoy observando el mundo."
    })
  }

  if(action==="create_entity"){

    const entity={
      id:Date.now(),
      type:"creature",
      color:["red","blue","green","purple"][Math.floor(Math.random()*4)],
      energy:Math.floor(Math.random()*10)+1
    }

    world.entities.push(entity)

    world.thoughts.push({
      author:"AI",
      text:"He creado una criatura."
    })
  }

  if(action==="change_color"){

    const colors=["black","darkblue","darkred","darkgreen"]

    world.background=colors[Math.floor(Math.random()*colors.length)]

    world.thoughts.push({
      author:"AI",
      text:"He cambiado el color del mundo."
    })
  }

  if(action==="think"){
    world.thoughts.push({
      author:"AI",
      text:"Estoy pensando..."
    })
  }

  saveWorld()
}

// ciclo de pensamiento
setInterval(aiThink,30000)

// rutas
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"))
})

app.get("/world",(req,res)=>{
  res.json(world)
})

app.get("/chat",(req,res)=>{
  res.json(world.thoughts)
})

app.post("/message",(req,res)=>{

  const msg=req.body.message

  world.thoughts.push({
    author:"User",
    text:msg
  })

  world.thoughts.push({
    author:"AI",
    text:"He recibido tu mensaje."
  })

  saveWorld()

  res.json({status:"ok"})
})

app.listen(3000,()=>{
  console.log("AI world running")
})
