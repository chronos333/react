const banco = "gerenciadorDeTarefas";
const colecao = "tarefas";

use(banco);

db.createCollection(colecao);

db.getCollection(colecao).insertMany([
    { titulo: "Comprar Leite", descricao: "Leite integral no supermercado", status: "pendente", prioridade: "alta", dataLimite: new Date("2023-10-26") },

    { titulo: "Preparar Apresentação", descricao: "Slides para a reunião de segunda", status: "em andamento", prioridade: "alta", dataLimite: new Date("2023-10-30") },

    { titulo: "Responder E-mails", descricao: "Limpar a caixa de entrada", status: "pendente", prioridade: "média", dataLimite: new Date("2023-10-27") }
]);

//Exercício 3: Leitura de Tarefas (READ)
db.getCollection(colecao).find();
db.getCollection(colecao).find({ status: "pendente" });
db.getCollection(colecao).find({ prioridade: "alta"}, { titulo: 1, dataLimite: 1, _id: 0 }); 

//Exercício 4: Atualização de Tarefas (UPDATE)
db.getCollection(colecao).updateOne({ titulo: "Comprar Leite" },{ $set: { status: "concluída" } });
db.getCollection(colecao).updateMany({ titulo: "Responder E-mails" }, { $set: { responsavel: "Seu Nome" } });
db.getCollection(colecao).update({ titulo: "Estudar MongoDb" }, { $set: { status: "pendente", prioridade: "alta", dataLimite: new Date("2023-11-05") } });
db.getCollection(colecao).updateMany({ status: "pendente" }, { $set: { tag: "urgente" } });


// Exercício 5: Deletar Tarefas (DELETE)
db.getCollection(colecao).deleteOne({ titulo: "Comprar Leite" });
db.getCollection(colecao).deleteMany({ prioridade: "baixa" });

// Exercício 6: Consultas Avançadas e Agregação
db.getCollection(colecao).insertMany([

    {titulo: "Planejar Viagem", descricao: "Pesquisar destinos", status: "pendente", prioridade: "média", dataLimite: new Date("2024-01-15")},

    {titulo: "Pagar Contas", descricao: "Contas de água e luz", status: "em andamento", prioridade: "alta", dataLimite: new Date("2023-10-28")},

    {titulo: "Fazer Exercício", descricao: "Academia ou caminhada", status: "pendente", prioridade: "baixa", dataLimite: new Date("2023-10-26")}
]);

db.getCollection(colecao).find({$or: [{ status: "pendente" }, { prioridade: "alta" }]});

db.getCollection(colecao).createIndex({ status: 1 });


db.getCollection(colecao).aggregate([{$group: { _id: "$status", quantidade: { $sum: 1 }}}]);

db.getCollection(colecao).find({status: "pendente"}).sort({dataLimite: 1}).limit(1);