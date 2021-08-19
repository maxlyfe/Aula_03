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
    res.send(`Filme adicionado com sucesso: ${filme}. O ID do filme é: ${id}`); // enviamos uma mensagem confirmando o post com as informações que desejamos.
});

app.put('/filmes/:id', (req, res) =>{ // criamos um atualizar na rota /filme/id
    const id = req.params.id -1; // selecionamos o filme com o id unformado na rota.
    const filme = req.body.filme; // pedimos o nome do novo filme
    const filmeAnterior = filmes[id]; // guardo o nome atual do filme em 'filmeAnterior' penas para dar essa informação ao usuario.
    filmes[id] = filme; // colocamos o nome inserido no body e guardamos na lista filmes no id selecionado na rota.
    res.send(`Filme atualizado com sucesso: ${filmeAnterior} para ${filme}.`); // enviamos uma mensagem de sucesso.
});

app.delete('/filmes/:id', (req, res)=>{ //criamos a roda delete
    const id = req.params.id -1; // pedimos para guardar o id especificado na rota.
    const filme = filmes[id]; // trago o nome do filme da lista filmes (filtrando pelo id especificado na rota) e guardo em filme para poder utilizar na mensagem mais na frente.
    delete filmes[id]; // deletamos o filme da lista filmes filtrado pelo id especificado na rota
    res.send(`O filme ${filme} foi excluido com sucesso.`);
    // filmes.splice(id,1)  com este codigo podemos subistiruir a linha anterior e em vez de fazer o delete e deixar o id null ele suprime e diminui o lengh
});

app.delete('/filmesVerificado/:id', (req, res)=>{ 
    const id = req.params.id -1;
    const filme =filmes[id];
    if(!filme){
        res.send('Esse filme não existe')
    };
    delete filmes[id];
});

app.listen(port, function(){ //listen é uma função que se traduz como '' onde quero que meu servidor seja escutado?''
    console.log(`App rodando na porta  http://localhost:${port}`); // este console.log é apenas uma mensagem no console para confirmar que nosso app esta funcionando.
}); // poderiamos apenas colocar 'app.listen(port);' 