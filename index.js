const path = require("path");
const fs = require("fs");

const convertToPathAbsolute = (inputPath) => {
  if (path.isAbsolute(inputPath)) {
     return inputPath;
  } else {
     return path.resolve(inputPath);
  }
};

statsObj = fs.statSync("./docsprueba/cursos-favoritos.md");

const isFilePath = (route) => {
   const stats =
};

const checkTypeObject = (inputPath) => {
   let arrayPathFiles = [ ];
  if (fs.statSync(inputPath).isDirectory()) {
    const readDirectory = fs.readdir(inputPath, (err,files) => {
       if (err) {
          return console.error(err);
       } else {
          
       }

    })
    readDirectory.forEach(file => {
       const pathFile = path.join(inputPath,file);
       arrayPathFiles = arrayPathFiles.concat(checkTYpeObject(pathFile))
    })
     return arrayPathFiles 
  } else {
     return console.log("it is a file",convertToPathAbsolute(inputPath))  
  }
};

console.log(statsObj);
//console.log(checkTypeObject("./docsprueba/cursos-favoritos.md"));
//console.log(convertToPathAbsolute("docsprueba"));