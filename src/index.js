const readline = require("readline-sync");
const operations = require("./operations.js");

const defaultMessage = `
Menu
-----------------
(C)riar
(L)er
(A)tualizar
(D)eletar

(S)air
`;


while(true) {
    console.log(defaultMessage);
    
    const option = readline.keyIn("Aperte a letra correspondente a uma opcao: ").toUpperCase();

    if(option == "S") {
        break;
    }

    operations[option]();

    readline.question("\nAperte Enter tecla para continuar...");
}
