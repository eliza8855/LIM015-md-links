const path = require("path");
const fs = require("fs");

const absolutePathFile = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/cursos-favoritos.md";
const relativePathFile = "./docsprueba/cursos-favoritos.md";
const absolutePathDirectory = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba";
const relativePathDirectory = "./docsprueba/";

// Funcion que convierte la ruta a absoluta
const convertPathToAbsolute = inputPath => path.resolve(inputPath);

// Funcion que detecta si el file/directorio existe, devuelve un booleano 
const detectPathExists = inputPath => fs.existsSync(inputPath);

//Funcion que detecta si la url es directorio, devuelve un booleano
const detectDirectory = inputPath => fs.statSync(inputPath).isDirectory;

//Funcion que abre y muestra archivos de un directorioc


const openDirectory = (inputPath) => {
        let listFiles = fs.readdirSync(inputPath);
        let filesArray = [];
        listFiles.forEach( (file) => {
        const pathChild = path.resolve(inputPath,file)
          if (fs.statSync(pathChild).isFile()){
              filesArray.push(pathChild);
          } else {
               const newDirectory = openDirectory(pathChild);
               filesArray = filesArray.concat(newDirectory);
          }
        })
        return filesArray;
    };

//console.log(openDirectory(absolutePathDirectory));

//Funcion que filtra un array y devuelve un array con solo archivos .md 

const filesArray2 = [
    'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md',
    'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',
    'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\docsprueba2\\cursos-favoritos2.md'
    //'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\docsprueba2',
    //'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\docsprueba2.js'
  ];

const FilterMdFile = (inputArray) => {
    const listFilesMd = inputArray.filter(file => path.extname(file) == ".md");
    if (listFilesMd.length === 0) {
       return "There isn't any Markdown Files";
    } else {
       return listFilesMd;
    }
};

// funcion que extrae las URL de los archivos
const getURLs = (arrayRoutesMD) => {
    const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    const regExpText = /\[(.*)\]/g;
    const regExpURL = /\(((?:\/|https?:\/\/).*)\)/g;
    let arrayHiperDetailsMaster = [];
    arrayRoutesMD.forEach((route) =>{
        const stringInsideRoute = fs.readFileSync(route,'utf8');
        const arrayofHipers = stringInsideRoute.match(regExp);
        arrayHipersDetails = [];
        arrayofHipers.forEach( (e) => {
          const fileObject = {
           href: path.normalize(route),
           text: e.match(regExpText).join().slice(1, -1),
           file: e.match(regExpURL).join().slice(1,-1),
          }
          arrayHipersDetails.push(fileObject);
        })
        arrayHiperDetailsMaster = arrayHiperDetailsMaster.concat(arrayHipersDetails);
    })   
    return arrayHiperDetailsMaster;
};

console.log(getURLs(filesArray2))




