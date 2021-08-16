arrayListLinks = [
    '[Curso de Photoshop 2021](https://www.crehana.com)',
    '[Introducción a la redacción digital](https://www.crehana.com)',
    '[Nutrición saludable: Alimenta una vida mejor](https://www.crehana.com)',
    '[Participación ciudadana en el Parlamento Peruano](https://www.congreso.gob.pe)',
    '[Javascript Algorithms and Data Structures](https://www.freecodecamp.org/learn/)',
    '[Curso de Node Js](https://github.com/)',
    '[Google](https://www.google.c)',
    '[NodeJS](https://nodejs.org/api/index.ml)',
    '[Youtube](https://www.youtube.com/)',
    '[Curso de Photoshop 2021](https://www.crehana.com/clases/v2/10854/detalle/)',
    '[Introducción a la redacción digital](https://www.crehana.com/clases/v2/)',
    '[Nutrición saludable: Alimenta una vida mejor](https://www.crehana.com/hola/)',
    '[Participación ciudadana en el Parlamento Peruano](https://www.congreso.gob.pe/control-politico/index.php)',
    '[Javascript Algorithms and Data Structures](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)'
    '[Curso de Node Js](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)',
    '[Curso de Photoshop 2021](https://www.crehana.com/clases/v2/10854/detalle/)',
    '[Introducción a la redacción digital](https://www.crehana.com/clases/v2/9325/player/21406/)',
    '[Nutrición saludable: Alimenta una vida mejor](https://www.crehana.com/hola/)',
    '[Participación ciudadana en el Parlamento Peruano](https://www.congreso.gob.pe/control-politico/index.php)',
    '[Javascript Algorithms and Data Structures](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)'
    '[Curso de Node Js](https://github.com/mdn/learning-area/blob/master/javascript/apis/introduction/maps-example.html)'
  ];

 console.log(arrayListLinks[0]); 

// funcion que extrae las URL de los archivos
const getURLs = (arrayFilesMD) => {
    const  regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    const regExpText = /\[(.*)\]/g;
    const regExpURL = /\(((?:\/|https?:\/\/).*)\)/g;
    let arrayListURLs = [];
    arrayFilesMD.forEach((file) =>{
        const readFile = fs.readFileSync(file,'utf8');
        const arrayLinks  = readFile.match(regExp);
        arrayListURLs = arrayListURLs.concat(arrayLinks);
        arrayListLinks = [];
        arrayListURLs.forEach( (link) => {
          const fileObject = {
            href: file,
            text: link.match(regExpText).join().slice(1, -1),
            file: link.match(regExpURL).join().slice(1, -1),
          }
          arrayListLinks.push(fileObject);
        })

    })   
    return arrayListLinks;
};

console.log(getURLs(filesArray2))




const arrayRegex = {
    regexMdLinks: new RegExp(/\[([\w\s\d.|()À-ÿ]+)\]\([?:\/|https?:?\/\/]+[\w\d./?=#-&_%~,\-.:]+\)/gim),
    regxLink: new RegExp(/\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg),
    regxText: new RegExp(/\[([\w\s\d.()]+)\]/g),
  };
  
  const getLinksArray = ((route) => {
    // fs.readFileSync lee el contenido de un archivo y lo transforma a string
    const contentMD = fs.readFileSync(route, 'utf-8');
    const arrayContentURL = contentMD.match(arrayRegex.regexMdLinks);
    //console.log(arrayContentURL);
    const linksArray = [];
    if (arrayContentURL) {
      arrayContentURL.forEach((element) => {
        const linkObject = {
          path: route,
          text: element.match(arrayRegex.regxText).join().slice(1, -1),
          href: element.match(arrayRegex.regxLink).join().slice(1, -1),
        };
        linksArray.push(linkObject);
      });
    }
    return linksArray.filter((element) => element !== undefined);
  });

  //console.log(getLinksArray(absolutePathFile));

  
 // const regExEli = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi