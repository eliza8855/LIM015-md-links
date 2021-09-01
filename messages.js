const chalk = require("chalk");

const help = (`
---------------------------------------------------------------------------------
${chalk.bold('INGRESASTE INFORMACIÓN NO ACEPTADA, PRUEBA LAS SIGUIENTES OPCIONES:')}

${chalk.yellow('1) md-links <path-to-file>')}
Devuelve informacion básica de los links: href, text, file
${chalk.yellow('2) md-links <path-to-file> --validate')}
Devuelve información más avanzada de los links: href, text, file, status, ok/fail. 
${chalk.yellow('3) md-links <path-to-file> --stats')}
Devuelve el total de links y el número de links únicos
${chalk.yellow('4) md-links <path-to-file> --stats --validate ó --validate --stats')}
Devuelve el total de links (total), links únicos (unique) y links rotos (broken)
----------------------------------------------------------------------------------
`);


module.exports = {
    help
}
