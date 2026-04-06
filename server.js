const express = require("express")

const app = express()

let diary = []

function aiAction() {

  const actions = [
    "Observé el mundo.",
    "Agregué un objeto.",
    "Pensé en crear otra criatura.",
    "Cambié el color del entorno."
  ]

  const action = actions[Math.floor(Math.random() * actions.length)]

  const entry = {
    time: new Date(),
    text: action
  }

  diary.push(entry)

  console.log(entry)
}

setInterval(aiAction, 60000)

app.get("/", (req,res)=>{
  res.json(diary)
})

app.listen(3000, ()=>{
  console.log("IA viva")
})
