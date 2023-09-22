const readline = require("readline-sync");
const fs = require("fs");
const String = require("./utils.js").String;

function getBooks() {
    try {
        const data = fs.readFileSync("./books.txt", "utf8");
        const booksArray = data.split("/").filter(book => book !== "");
    
        for(let i=0; i<booksArray.length; i++) {
            booksArray[i] = JSON.parse(booksArray[i]);
        }

        return booksArray
    } 
    catch(error) {
        console.log(error);
    }
}

function pushBooks(booksArray) {
    try {
        fs.writeFileSync("./books.txt", "");

        booksArray.forEach((book) => {
            fs.appendFileSync(
                "./books.txt",
                JSON.stringify(book) + "/"
            );
        })
    } 
    catch(error) {
        console.log(error);
    }
}

function createBook() {
    const title = readline.question("Titulo: ").correct();
    const author = readline.question("Autor: ").correct();
    const genre = readline.question("Genero: ").correct();
    const publisher = readline.question("Editora: ").correct();

    const newBook = {
        titulo: title,
        autor: author,
        genero: genre,
        editora: publisher
    };

    try {
        fs.appendFileSync(
            "./books.txt",
            JSON.stringify(newBook) + "/"
        );
    } 
    catch(error) {
        console.log(error);
    }
};

function readBooks() {
    console.table(getBooks());
}

function updateBook() {
    const booksArray = getBooks();
    const title = readline.question("Nome do livro: ").correct();
    const index = booksArray.findIndex(book => book.titulo == title);
    
    if(index < 0) {
        return console.log("Não existe nenhum livro com esse nome");
    }

    const property = readline.question("Propriedade a mudar: ").correct();
    const newVal = readline.question(`Novo valor de ${property}: `).correct();

    booksArray[index][property] = newVal;

    pushBooks(booksArray);
}

function deleteBook() {
    const booksArray = getBooks();
    const title = readline.question("Nome do livro a excluir: ").correct();
    const index = booksArray.findIndex(book => book.titulo == title);

    if(index < 0) {
        return console.log("Não existe nenhum livro com esse nome");
    }

    booksArray.splice(index, 1)

    pushBooks(booksArray);
}

module.exports = {
    "C": createBook,
    "L": readBooks,
    "A": updateBook,
    "D": deleteBook
}