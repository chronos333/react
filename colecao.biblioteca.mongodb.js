const banco = "bibliotecaDiogoTB";
const colecao = "livros";

use(banco);

db.createCollection(colecao);

db.getCollection(colecao).insertMany([
    { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954, genero: "Fantasia", paginas: 1178, disponivel: true },
    { titulo: "1984", autor: "George Orwell", ano: 1949, genero: "Distopia", paginas: 328, disponivel: true }, 
    { titulo: "Dom Quixote", autor: "Miguel de Cervantes", ano: 1605, genero: "Clássico", paginas: 863, disponivel: false },
    { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943, genero: "Ficção Infantil", paginas: 96, disponivel: true },
    { titulo: "O Guia do Mochileiro das Galáxias", autor: "Douglas Adams", ano: 1979, genero: "Ficção Científica", paginas: 193, disponivel: true },
    { titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", ano: 1967, genero: "Realismo Mágico", paginas: 417, disponivel: false }, 
    { titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, genero: "Romance", paginas: 256, disponivel: true }, 
    { titulo: "Duna", autor: "Frank Herbert", ano: 1965, genero: "Ficção Científica", paginas: 680, disponivel: false },
    { titulo: "O Iluminado", autor: "Stephen King", ano: 1977, genero: "Terror", paginas: 464, disponivel: true },
    { titulo: "Orgulho e Preconceito", autor: "Jane Austen", ano: 1813, genero: "Romance", paginas: 424, disponivel: true },
    { titulo: "E Não Sobrou Nenhum", autor: "Agatha Christie", ano: 1939, genero: "Mistério", paginas: 400, disponivel: false },
    { titulo: "Fahrenheit 451", autor: "Ray Bradbury", ano: 1953, genero: "Distopia", paginas: 256, disponivel: true }, 
    { titulo: "A Hora da Estrela", autor: "Clarice Lispector", ano: 1977, genero: "Romance", paginas: 88, disponivel: true }, 
    { titulo: "O Alquimista", autor: "Paulo Coelho", ano: 1988, genero: "Ficção", paginas: 208, disponivel: true },
    { titulo: "Sapiens: Uma Breve História da Humanidade", autor: "Yuval Noah Harari", ano: 2011, genero: "Não-Ficção", paginas: 443, disponivel: true }
]);

// Passo 1 - Consultas com Filtros
//listar todos os livros publicados após 1950 e que estão disponíveis

db.getCollection("livros").find({ano:{$gt:1950}, disponivel:true});

// listem os livros - 200 páginas
db.getCollection("livros").find({paginas:{$lt:200}});

//liste todos os livros, porem so mostre o titulo, autor, ano, não mostre o id
db.getCollection("livros").find({}, {titulo:1, autor:1, ano:1, _id:0});

// Passo 2 - Updates/Atualizações 
//trocar genero "Distopia" => "Ficção Distópica"
db.getCollection("livros").updateMany({genero:"Distopia"}, {$set: {genero: "Ficção Distopia"}});

//adicionar em todos os livros que tiverem mais 400 páginas chave {edicao:"Longa"}

db.getCollection("livros").updateMany({paginas: {$gt: 400}},{$set: {edicao: "Longa"}});

//Passo 3 - Criação de Índices
//criar um indice para deixar a exibição em ordem crescente pelo nome do autor
db.getCollection("livros").createIndex({autor:-1});
db.getCollection("livros").find();

db.getCollection("livros").deleteOne({titulo: "Cem Anos de Solidão"});

mongodump --db bibliotecaDiogoTB --out C:/src/mongodb/backup/biblioteca_data;