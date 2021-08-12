/*const usersList = [
    {id: 1, name: "Dominicode", city: 4},
    {id: 2, name: "Wilfredo", city: 3},
    {id: 3, name: "Alberto", city: 2},
    {id: 4, name: "Dany", city: 1},
];

const citiesList = {
    1: "Barcelona",
    2: "New York",
    3: "Santo Domingo",
    4: "Madrid",
};

const getUsers = () => {
    return new Promise((resolve,reject)=>{
        setTimeout( ()=> {
            resolve(usersList);
        }, 2000)
    });
}

getUsers().then( res => {
    console.log("users", res);
});*/

let nombres = ["ELizabeth", "Mariella", "Jose", "Pedro", "Juan"];
const object = { nombre: "Elizabeth", apellido: "Lopez", edad:31}

for (const data in object) {
    console.log (`${data}: ${object[data]}`);
}