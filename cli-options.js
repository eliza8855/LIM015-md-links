const chalk = require("chalk");
const { mdLinks } = require('./index.js');

const optionDefault = (path) => {
    mdLinks(path, { validate: false })
    .then(links => {
        console.log(links.map((link) => `file: ${chalk.yellow(link.file)}\nhref: ${chalk.green(link.href)}\ntext: ${chalk.green(link.text)}`).join('\n\n'))
    })
    .catch(error => {
        console.log(error);
    })
}

const optionValidate = (path) => {
    mdLinks(path, { validate: true })
    .then(links => {
        console.log(links.map((link) => `href: ${chalk.green(link.href)}\ntext: ${chalk.green(link.text)}\nfile: ${chalk.green(link.file)}\nstatus: ${chalk.green(link.status)}\nok: ${chalk.green(link.ok)}`).join('\n\n'))
    })
    .catch(error => {
        console.log(error);
    })
}

const optionStats = (path) => {
    mdLinks(path, { validate: true })
    .then(links => {
        const totalLinks = links.map(link => link.href)
        const uniqueLinks = new Set(totalLinks)
        console.log(`Total: ${totalLinks.length}\nUnique: ${uniqueLinks.size}`)
    })
    .catch(error => {
        console.log(error);
    })
}

const optionValStat = (path) => {
    mdLinks(path, { validate: true })
    .then(links => {
        const totalLinks = links.map(link => link.href)
        const uniqueLinks = new Set(totalLinks)
        const arrayBroquenLinks = links.map(link => link.ok)
        const brokenLinks = arrayBroquenLinks.filter(el => el === 'FAIL')
        console.log(`Total: ${totalLinks.length}\nUnique: ${uniqueLinks.size}\nBroken: ${brokenLinks.length}`)
    })
    .catch(error => {
        console.log(error);
    })
}


module.exports = {
    optionValStat,
    optionDefault,
    optionValidate,
    optionStats
}