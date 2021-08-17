const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const absolutePathFile = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/cursos-favoritos.md";
const relativePathFile = "./docsprueba/cursos-favoritos.md";
const absolutePathDirectory = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba";
const relativePathDirectory = "./docsprueba/";

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

//console.log ( listURLsDetails[0].href);

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

const filterMdFile = (inputArray) => {
    const listFilesMd = inputArray.filter(file => path.extname(file) == ".md");
    if (listFilesMd.length === 0) {
       return "VACIO";
    } else {
       return listFilesMd;
    }
};

const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
const regExpText = /\[(.*)\]/g;
const regExpURL = /\(((?:\/|https?:\/\/).*)\)/g;

// funcion que extrae las URL de los archivos
const getURLs = (arrayRoutesMD) => {

    const allURLs = arrayRoutesMD.map ((link) => leerArchivo(link))
  
    //const resultado = (arrayHiperDetailsMaster.length == 0) ?  'No existen URLs': arrayHiperDetailsMaster;
    //return resultado;
    return allURLs;
};

 const leerArchivo = (link) => {
   console.log(link,"aqui un link");
  const function1 = fs.readFileSync(link, 'utf8', (err, data) => {
    if (err) { return 'error'; } else { return data; }
});
  console.log(function1);
  let allLinksMD = [];
  const arrayLinks = function1.match(regExp);
  console.log(arrayLinks);
  arrayLinks.forEach((el) => {
     allLinksMD.push({
      href: el.match(regExpURL).join().slice(1,-1),
      text: el.match(regExpText).join().slice(1, -1),
      file: path.normalize(link),
     });
  });
    return allLinksMD;
 }

//console.log(getURLs(filesArray2))

// Hacer el HTTP Request 

//fetch("https://www.crehana.com/hola").then(function(response){
  //console.log(response.status, response.statusText);
//});

// Prueba de HTTP Request ( Marii)

const getStatusLink = (Links)  => {
   Links.map((link) => {
       fetch(link.href)
       .then ((res) => { return res.status;
        })
       .catch( () =>{
         return "FAIL"
       })
       return `${link} ${res.status}`;
   })
}

//console.log(getStatusLink(listURLsDetails))

const statusLink = (arrLinks) => fetch(arrLinks.href) 
    .then((res) => {
      const mystatus = res.status;
      const mymessage = res.status !== 200 ? 'FAIL' : res.statusText;
        return {
          ...arrLinks,
          status: mystatus,
          message: mymessage,
        };
      })
    .catch(() => {
      return {
        ...arrLinks,
        status: 'no status',
        message: 'FAIL',
      }
    });

//console.log(statusLink(listURLsDetails));

module.exports = {
  detectPathExists,
  convertPathToAbsolute,
  detectDirectory,
  openDirectory,
  filterMdFile,
  getURLs
} 