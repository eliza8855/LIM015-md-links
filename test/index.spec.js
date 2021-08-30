const {resolvePathToAbsolute, detectPathExists, detectDirectory, openDirectory, filterMdFile, getURLs, getStatusLinks} = require ('../index.js');

const arrayWithFiles = [
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\carpeta_sinMD\\documento1.js',
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\carpeta_sinMD\\documento2.js',
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-excel.js',
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos.md',
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\docsprueba2\\cursos-favoritos2.md',
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\prueba1_carpeta2.md'
]

const arrayWithFiles2= [
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\carpeta_sinMD\\documento1.js',
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\carpeta_sinMD\\documento2.js',
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-excel.js',
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',
]

const arrayWithMdFiles= [
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md'    
];

const arrayWithMdFilesWithoutURLs= [
  'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\prueba1_carpeta2.md'   
];

const arrayEmptyMdFiles= [];

const arrayURLsEmpty = [];

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

const arrayURLs = [
  '[Curso de Photoshop 2021](https://www.crehana.con/clases/v2/10854/detalle/)',
  '[Introducción a la redacción digital](https://www.crehana.com/clases/v2/9325/player/21406/)',
  '[Nutrición saludable: Alimenta una vida mejor](https://www.crehana.com/hola/)',
  '[Participación ciudadana en el Parlamento Peruano](https://www.congreso.gob.pe/control-politico/index.php)',
  '[Javascript Algorithms and Data Structures](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)',
  '[Curso de Node Js](https://github.com/mdn/learning-area/blob/master/javascript/apis/introduction/maps-example.html)'
]

const arrayURLsComplete = [
  {
    href: 'https://www.crehana.con/clases/v2/10854/detalle/',
    text: 'Curso de Photoshop 2021',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',
    status: 'PAGINA NO EXISTE O ESTÁ MAL ESCRITA',
    ok: 'FAIL'
  },
  {
    href: 'https://www.crehana.com/clases/v2/9325/player/21406/',
    text: 'Introducción a la redacción digital',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://www.crehana.com/hola/',
    text: 'Nutrición saludable: Alimenta una vida mejor',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',
    status: 404,
    ok: 'FAIL'
  },
  {
    href: 'https://www.congreso.gob.pe/control-politico/index.php',
    text: 'Participación ciudadana en el Parlamento Peruano',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',
    status: 404,
    ok: 'FAIL'
  },
  {
    href: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
    text: 'Javascript Algorithms and Data Structures',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://github.com/mdn/learning-area/blob/master/javascript/apis/introduction/maps-example.html',
    text: 'Curso de Node Js',
    file: 'C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba\\cursos-favoritos3.md',
    status: 404,
    ok: 'FAIL'
  }
]

describe('convertPathToAbsolute', () => {
  it('should convert a path relative to absolute', () => {
    const relativePath = "./docsprueba";
    const AbsolutePath =  "C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba";
    expect(resolvePathToAbsolute(relativePath)).toBe(AbsolutePath)
  });
  it('should convert a path absolute to absolute', () => {
    const relativePath = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba";
    const AbsolutePath =  "C:\\Users\\elope\\OneDrive\\Documents\\GitHub\\LIM015-md-links\\docsprueba";
    expect(resolvePathToAbsolute(relativePath)).toBe(AbsolutePath)
  });
});


describe('detectPathExists', () => {
  it('return True if a path exists', () => {
    const path = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/cursos-favoritos.md";
    expect(detectPathExists(path)).toBe(true)
  });
  it('return False if a path does not exists', () => {
    const path = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/cursos.md";
    expect(detectPathExists(path)).toBe(false)
  });
})

describe('detectDirectory', () => {
  it('return TRUE if the path is a Directory', () => {
    const path = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba";
    expect(detectDirectory(path)).toBe(true)
  })
  it('return FALSE if the path is not a Directory', () => {
    const path = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba/cursos-favoritos.md";
    expect(detectDirectory(path)).toBe(false)
  })
})

describe('openDirectory', () => {
  it ('opens a Directory and show an array of files', () => {
    const directory = "C:/Users/elope/OneDrive/Documents/GitHub/LIM015-md-links/docsprueba";
    
    expect(openDirectory(directory)).toEqual(arrayWithFiles)
  })
})

describe('filterMdFile', ()=> { 
  it ('filter an array and keep only md files', ()=>{
    expect(filterMdFile(arrayWithFiles2)).toEqual(arrayWithMdFiles)
  })
})

describe('getURLs', () => {
  it ('display an array with all URLs from MDs files', () => {
    expect(getURLs(arrayWithMdFiles)).toEqual(arrayURLsBasic)
  })

  it ('display an empty array when the array of MD is empty', () => {
    expect(getURLs(arrayEmptyMdFiles)).toEqual(arrayURLsEmpty)
  })

  it ('display and empty array when there is not any URLS inside the MD file', () => {
      expect(getURLs(arrayWithMdFilesWithoutURLs)).toEqual(arrayURLsEmpty)
  })
})

// Función que muestra el estatus de los links

describe ('getStatusLinks', () => {
  it ('display an array with all URLS and its status', () => {
    return getStatusLinks(arrayURLsBasic).then( res => {
      expect(res).toEqual(arrayURLsComplete)
    })
  })
})



