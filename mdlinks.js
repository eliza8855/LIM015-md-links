const { resolvePathToAbsolute,detectPathExists,detectDirectory,openDirectory,filterMdFile,getURLs,getStatusLinks} =  require('./index.js');

const mdLinks = (path, option = {validate:false}) => {
    return new Promise((resolve,reject) => {
      const pathtoAbsolute = resolvePathToAbsolute(path)
      let arrayFilesMD =[];
      if(detectPathExists(pathtoAbsolute)) {
         if(detectDirectory(pathtoAbsolute)){
             const arrayFiles = openDirectory(pathtoAbsolute);
               if (arrayFiles.length > 0) {
                 arrayFilesMD = filterMdFile(arrayFiles);
               }else{
                 reject('El directorio está vacío, no se puede continuar con el proceso')
                 }
         }else{
           arrayFilesMD = filterMdFile([pathtoAbsolute]);
         }
         if (arrayFilesMD.length > 0){
           const arrayURLs = getURLs(arrayFilesMD);
              if(arrayURLs.length>0){
                  if(option.validate) {
                     getStatusLinks(arrayURLs).then(res => resolve(res)); // Aca vá el validate: TRUE
                  }else {
                     resolve(arrayURLs)
                  }                 
              }else{
                  reject('No existen URLs');
              }
         }else{
           reject('No se cuenta con archivos MD');
         }
      }else{
      reject('La ruta ingresada no existe');
      }
    })
}
const carpetaSinMD = 'C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/carpeta_sinMD'
const carpetaVacia = 'C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/carpeta_vacia'
const carpetaSinURLs = 'C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/carpeta sin URLs'
const carpeta = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba";

mdLinks(carpeta, { validate: true })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
