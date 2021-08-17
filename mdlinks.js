const { detectPathExists,convertPathToAbsolute,detectDirectory,openDirectory,filterMdFile,getURLs} =  require('./index.js');

const mdLinks = (path, option = {validate:false}) => {
    return new Promise((resolve,reject) => {
       const pathtoAbsolute = convertPathToAbsolute(path)
       let arrayFilesMD;
        if(detectPathExists(pathtoAbsolute)) {
           if (detectDirectory(pathtoAbsolute)){
               const arrayFiles = openDirectory(pathtoAbsolute);
                arrayFilesMD = filterMdFile(arrayFiles);
           } else {
                arrayFilesMD = filterMdFile([pathtoAbsolute]);
           }
       resolve(getURLs(arrayFilesMD));
      }else {
          reject('La ruta ingresada no existe');
      }
    })
}

mdLinks("./docsprueba/", { validate: false })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
