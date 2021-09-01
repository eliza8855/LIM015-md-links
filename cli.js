#!/usr/bin/env node

const chalk = require("chalk");
//const {mdLinks} = require ('./index.js');
const messages = require('./messages.js')
const {optionValStat,optionDefault,optionValidate,optionStats} = require ('./cli-options')

path = process.argv[2];
options = process.argv;

if (options.length === 2) {
    console.log (messages.help);
} else if (options.length === 3) {
    return optionDefault(path)
} else if(options.length === 4 && options[3] === '--validate') {   
    return optionValidate(path)    
} else if(options.length === 4 && options[3] === '--stats') {
    return optionStats(path);
} else if(options.length === 5 && options[3] === '--validate' && options[4] === '--stats') {
    return optionValStat(path);  
} else if(options.length === 5 &&  options[3] === '--stats' &&  options[4] === '--validate'){
    return optionValStat(path);  
} else {
    console.log(messages.help);
}




