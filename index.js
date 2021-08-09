const path = require("path");
const fs = require("fs");

const absolutePathFile = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/cursos-favoritos.md";
const relativePathFile = "./docsprueba/cursos-favoritos.md";
const absolutePathDirectory = "C:\Users\elope\OneDrive\Documents/GitHub/LIM015-md-links/docsprueba";

// Funcion que convierte la ruta a absoluta
const convertPathToAbsolute = inputPath => path.resolve(inputPath);

// Funcion que detecta si el file existe, devuelve un booleano 
const detectPathExists = inputPath => fs.existsSync(inputPath);

//Funcion que detecta si el directorio existe, devuelve un booleano

const a = path.normalize(absolutePathDirectory);
console.log(a);

//console.log(detectPathExists(absolutePathFile));
//console.log(checkTypeObject("./docsprueba"));
//console.log(path);
