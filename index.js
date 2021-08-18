const express = require('express');
const app = express();

const port = 3000;

app.use(express.json()); // para falar para as reqs do express trabalhar com json.

const filmes = [ //montando o Array de strings.
    "Capitão america",
    'Capitã Marvel',
    'Hulk',
    'Ironman',
    'Ironman 2'
]; // está é uma lista estatica (fixa), já que não está trabalhando com um banco.

//rota '/'
app.get('/', (req, res)=>{ //quero que o caminho / tenha uma requisisão e uma resposta.
    res.send('Hello, blumer!'); //nossa resposta vai enviar uma mensagem.
});

// rota filmes
app.get('/filmes', (req,res)=>{ // '/filmes' request e respons.
    res.send(filmes); // envia para a rota /filmes a 'const filmes'.
});

// rota filme/id
app.get('/filmes/:id', (req,res)=>{ //colocando os : depois de / informamos que o que vira depois é um paramentro, senão ele entende que continua sendo a rota.
    const id = req.params.id -1; // request com o parametro id -1 já que a lista começa de 0. guardamos na const id.
    const filme = filmes[id]; // pegamos indice de filmes e guadamos na const filme.

    if(!filme){ // Se filme for False '!' enviar a seguinte mng... 
        res.send('Filme não encontrado');
    };
    res.send(filme); // caso não caia dentro do if ele vai enviar estra outra mng.
});

// LISTA - GET
// CRIAR - POST
// ATUALIZAR - PUT
// DELETAR - DELETE
// rota para cadastrar um novo filme.

app.post('/filmes', (req, res) =>{ // estamos enviando um request e junto a ela uma informação.
    const filme = req.body.filme; // indicamos que vamos realizar uma requisisão com a informação no body.
    const id = filmes.length; // damos um id do tamanho da nossa array
    filmes.push(filme); // adicionamos a const filme no array filmes.
    res.send(`Filme adicionado com sucesso: ${filme}. O ID do filme é: ${id}`);
});


app.listen(port, function(){ //listen é uma função que se traduz como '' onde quero que meu servidor seja escutado?''
    console.log(`App rodando na porta  http://localhost:${port}`); // este console.log é apenas uma mensagem no console para confirmar que nosso app esta funcionando.
}); // poderiamos apenas colocar 'app.listen(port);' 