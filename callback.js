const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const listURLsDetails = [
    {
      href: 'https://www.crehana.com/hola/',
      text: 'Curso de Photoshop 2021',
      file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md'
    },
    {
      href: 'https://www.crehana.com/clases/v2/10854/detalle/',
      text: 'Introducción a la redacción digital',
      file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md'
    },
    {
      href: 'https://www.crehana.com',
      text: 'Nutrición saludable: Alimenta una vida mejor',
      file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md'
    }
  ]

let p = new Promise((resolve,reject)=> {
  let a = 1 + 1 
  if (a == 2) {
    resolve ("Succes")
  }else{
    reject("Failed")
  }
})


p.then((message) => {
  console.log ("this is in the then: " + message)
}).catch ((message) => {
  console.log ("this is in the catch: " + message)
})