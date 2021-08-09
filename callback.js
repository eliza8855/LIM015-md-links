let p = new Promise(function(resolve, reject){
        let sum = 2 + 6;
        if (sum === 8){
           resolve("correcto!");
        }else {
           reject("Error!");
        }
});

p.then(function(mensaje){
    console.log(mensaje);
})
.catch(function(error){
    console.log(error);
});