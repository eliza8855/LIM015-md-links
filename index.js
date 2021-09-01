const { resolvePathToAbsolute,detectPathExists,detectDirectory,openDirectory,filterMdFile,getURLs,getStatusLinks} =  require('./md-Links.js');
const messages = require('./messages.js')


const mdLinks = (path, options = {validate:false}) => {
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
                  if(options.validate) {
                     getStatusLinks(arrayURLs).then(res => resolve(res));
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
      reject(messages.help);
      }
    })
}

module.exports = {
  mdLinks
}
