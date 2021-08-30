const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const absolutePathFile = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/cursos-favoritos.md";
const relativePathFile = "./docsprueba/cursos-favoritos.md";
const absolutePathDirectory = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba";
const relativePathDirectory = "./docsprueba/";
const emptyDirectoryPath = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/carpeta_vacia";

const result= [
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',      
];

const listURLDetails = [
  {
    href: 'https://www.crehana.com/hola/',
    text: 'Curso de Photoshop 2021',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md'
  },
  {
    href: 'https://www.crehana.con/clases/v2/9325/detalle/',
    text: 'Introducción a la redacción digital',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md'
  },
  {
    href: 'https://www.crehana.com/clases/v2/9536/detalle/',
    text: 'Nutrición saludable: Alimenta una vida mejor',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md'
  },
  {
    href: 'https://www.congreso.gob.pe',
    text: 'Participación ciudadana en el Parlamento Peruano',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md'
  },
  {
    href: 'https://www.freecodecamp.org/learn/',
    text: 'Javascript Algorithms and Data Structures',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md'
  }
];

const arrayWithMdFiles= [
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md'    
];


// Funcion que convierte la ruta a absoluta
const resolvePathToAbsolute = inputPath => path.resolve(inputPath);

// Funcion que detecta si el file/directorio existe, devuelve un booleano 
const detectPathExists = inputPath => fs.existsSync(inputPath);

//Funcion que detecta si la url es directorio, devuelve un booleano

const detectDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();

//Funcion que abre y muestra archivos de un directorio

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

const filterMdFile = (array) =>  array.filter(file => path.extname(file) == ".md");

// funcion que extrae las URL de los archivos
const getURLs = (arrayRoutesMD) => {
    const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    const regExpText = /\[(.*)\]/g;
    const regExpURL = /\(((?:\/|https?:\/\/).*)\)/g;
    let arrayLinksMaster = [];
    if (arrayRoutesMD.length > 0) {
      arrayRoutesMD.forEach((route) =>{
        const stringLinks = fs.readFileSync(route,'utf8');
        const arrayLinks = stringLinks.match(regExp);
        if (arrayLinks) {
          let arrayDetailed = [];
          arrayLinks.forEach( (link) => {
            const object = {
             href: link.match(regExpURL).join().slice(1,-1),
             text: link.match(regExpText).join().slice(1, -1),
             file: route,
            }
            arrayDetailed.push(object);
          });
          arrayLinksMaster = arrayLinksMaster.concat(arrayDetailed);
        }    
    })
    };
    return arrayLinksMaster;
};

console.log(getURLs(arrayWithMdFiles));

const arrayURLsBasic = [
  {
    href: 'https://www.crehana.con/clases/v2/10854/detalle/',
    text: 'Curso de Photoshop 2021',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md'
  },
  {
    href: 'https://www.crehana.com/clases/v2/9325/player/21406/',
    text: 'Introducción a la redacción digital',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md'
  },
  {
    href: 'https://www.crehana.com/hola/',
    text: 'Nutrición saludable: Alimenta una vida mejor',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md'
  },
  {
    href: 'https://www.congreso.gob.pe/control-politico/index.php',
    text: 'Participación ciudadana en el Parlamento Peruano',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md'
  },
  {
    href: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
    text: 'Javascript Algorithms and Data Structures',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md'
  },
  {
    href: 'https://github.com/mdn/learning-area/blob/master/javascript/apis/introduction/maps-example.html',
    text: 'Curso de Node Js',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md'
  }
]

// Función que muestra el estatus de los links

const getStatusLinks = (arrLinks) => Promise.all(arrLinks.map((arrLink) => fetch(arrLink.href) 
.then((res) => {
   arrLink.status = res.status;
   arrLink.ok = res.status !== 200 ? 'FAIL' : res.statusText;
   return arrLink;
  })
.catch(() => {
   arrLink.status = 'PAGINA NO EXISTE O ESTÁ MAL ESCRITA';
   arrLink.ok = 'FAIL';
   return arrLink;
}))).then (res => {return res;})

//getStatusLinks(arrayURLsBasic).then (res => console.log(res));
//

module.exports = {
  resolvePathToAbsolute,
  detectPathExists,
  detectDirectory,
  openDirectory,
  filterMdFile,
  filterMdFile,
  getURLs,
  getStatusLinks
} 