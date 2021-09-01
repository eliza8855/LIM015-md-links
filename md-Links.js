const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");


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
  listFiles.forEach((file) => {
    const pathChild = path.resolve(inputPath, file)
    if (fs.statSync(pathChild).isFile()) {
      filesArray.push(pathChild);
    } else {
      const newDirectory = openDirectory(pathChild);
      filesArray = filesArray.concat(newDirectory);
    }
  })
  return filesArray;
};

//Funcion que filtra un array y devuelve un array con solo archivos .md 
const filterMdFile = (array) => array.filter(file => path.extname(file) == ".md");

// funcion que extrae las URL de los archivos
const getURLs = (arrayRoutesMD) => {
  const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
  const regExpText = /\[(.*)\]/g;
  const regExpURL = /\(((?:\/|https?:\/\/).*)\)/g;
  let arrayLinksMaster = [];
  if (arrayRoutesMD.length > 0) {
    arrayRoutesMD.forEach((route) => {
      const stringLinks = fs.readFileSync(route, 'utf8');
      const arrayLinks = stringLinks.match(regExp);
      if (arrayLinks) {
        let arrayDetailed = [];
        arrayLinks.forEach((link) => {
          const object = {
            href: link.match(regExpURL).join().slice(1, -1),
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
  }))).then(res => { return res; })


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