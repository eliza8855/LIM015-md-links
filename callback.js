const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

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

// Prueba de HTTP Request (Mari)

/*const getStatusLink = (Links)  =>
   Links.map( (link) => {
   return fetch(link.href)
   .then((res) => {
       return {
           file: link.file,
           href: link.href,
           text: link.text,
           status: res.status,
           message: res.statusText
       }
   }).catch((err) => {
       return {
        file: link.file,
        href: link.href,
        text: link.text,
        status: res.status,
        message: "ERROR"
       }
   })
    });*/

    const getStatusLink = (data) => data.map((obj) => {
            return fetch(obj.href)
                .then((res) => {
                    return {
                        file: obj.file,
                        href: obj.href,
                        text: obj.text,
                        status: res.status,
                        message: res.statusText
                    }
                })
                .catch((error) => {
                    return {
                        file: obj.file,
                        href: obj.href,
                        text: obj.text,
                        status: 500,
                        message: 'FAIL',
                    }
                });
    });


const prueba = (listURLsDetails) => {
    const respuesta = Promise.all(getStatusLink(listURLsDetails))
    .then(res => {
        return res
    })
    return respuesta;
}

console.log(prueba());



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
 