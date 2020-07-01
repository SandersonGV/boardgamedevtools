class Boardgame {
    constructor() {
        this._id = "";
        this.titulo = "";
        this.ano = "";
        this.jogadoresDe = 0;
        this.jogadoresAte = 0;
        this.duracaoMedia = 0;
        this.idadeMinima = 0;
        this.dependenciaIdioma = "";
        this.descricao = "";
        this.mecanicas = [];
        this.categoria = [];
        this.componentes = [];
        this.autores = "";
        this.artista = "";
        this.editora = "";
        this.capaURL = "";
        this.manualURL = "";
        this.tabletopiaURL = "";
        this.tabletopiaEmail = "";
        this.tabletopiaSenha = "";
        this.estagio = "";
        this.imagens = [];
        this.sellsheet= new sellsheet();
        this.user = "";
    }

    loadJson(item){
        this._id = item._id;
        this.titulo = item.titulo;
        this.ano = item.ano;
        this.jogadoresDe = item.jogadoresDe;
        this.jogadoresAte = item.jogadoresAte;
        this.duracaoMedia = item.duracaoMedia;
        this.idadeMinima = item.idadeMinima;
        this.dependenciaIdioma = item.dependenciaIdioma;
        this.descricao = item.descricao;
        this.componentes = item.componentes;
        this.autores = item.autores;
        this.artista = item.artista;
        this.editora = item.editora;
        this.mecanicas = item.mecanicas;
        this.categoria =item.categoria;
        this.capaURL = item.capaURL;
        this.manualURL = item.manualURL;
        this.tabletopiaURL = item.tabletopiaURL;
        this.tabletopiaEmail = item.tabletopiaEmail;
        this.tabletopiaSenha = item.tabletopiaSenha;
        this.estagio = item.estagio;
        this.imagens = item.imagens==""?[]:item.imagens;
        this.user = item.user;
        
        let ss = new sellsheet();
        if(typeof item.sellsheet != "undefined" )
            ss.loadJson(item.sellsheet)

        this.sellsheet= ss;



    }

    addComponente() {
        this.componentes.push(new Componente());
    }

    dropComponente(index) {
        this.componentes.splice(index, 1);
    }
    addImagem() {
        this.imagens.push(new imagem());
    }

    dropImagem(index) {
        this.imagens.splice(index, 1);
    }
}
class Componente {
    constructor() {
        this.tipo = "";
        this.quantidade = 0;
        this.tamanho = "";
    }
}
class imagem {
    constructor() {
        this.url = "";
    }
}

class Partida{
    constructor() {
        this._id = "";
        this.boardgameID= "";
        this.duracao = 0;
        this.data = "";
        this.quantidadejogadores = 1;
        this.local = "";
        this.oquefoitestado="";
        this.observacao ="";
        this.quemganhou = 1;
        this.feedbackexterno = false;
        this.feedbacks=[];
        
    }

    loadJson(item){
        this._id = item._id;
        this.boardgameID= item.boardgameID;
        this.duracao =item.duracao;
        this.data = item.data;
        this.quantidadejogadores = item.quantidadejogadores;
        this.local = item.local;
        this.oquefoitestado=item.oquefoitestado;
        this.observacao =item.observacao;
        this.quemganhou = item.quemganhou;
        this.feedbacks=item.feedbacks;
        this.feedbackexterno=item.feedbackexterno;
    }

    addFeedback() {
        this.feedbacks.push(new Feedback());
    }

    dropFeedback(index) {
        this.feedbacks.splice(index, 1);
    }
  
}

class Feedback{
    constructor() {
        this.nomejogador= "";
        this.idgenero= "";
        this.pontuacao= 0;
        this.idade= 0;
        this.email= "";
        this.acompanhar= false;
        this.mediverti= 0;
        this.gosteidaduracao= 0;
        this.regrasficaramclaras= 0;
        this.jogooriginal= 0;
        this.jogobemestrategico= 0;
        this.jogarianovamente= 0;
        this.comprariaojogo= 0;
        this.oquemenosgostou= "";
        this.oquemaisgostou= "";
        this.observacao= "";
    }
}
class sellsheet{
    constructor() {
        this.fraseefeito= "";
        this.imgtopo= "";
        this.pontosfortes=[];
        this.gancho= "";
        this.premissa= "";
        this.imagens= [];
    }

    loadJson(item){
        this.fraseefeito = item.fraseefeito;
        this.pontosfortes= item.pontosfortes;
        this.gancho= item.gancho;
        this.premissa= item.premissa;
        this.imagens= item.imagens;
    }

    addPontosfortes() {
        this.pontosfortes.push(new Pontosfortes());
    }

    dropPontosfortes(index) {
        this.pontosfortes.splice(index, 1);
    }
    addImagem() {
        this.imagens.push(new imagem());
    }

    dropImagem(index) {
        this.imagens.splice(index, 1);
    }
}

class Pontosfortes{
    constructor() {
        this.item="";
    }
}

class Perfil{
    constructor() {
        this._id = "";
        this.userid = "";
        this.telefone = "";
        this.nome = "";
        this.redessociais = [];
        this.emailcontato = "";
    }

    loadJson(item){
        this._id = item._id;
        this.userid = item.userid;
        this.nome = item.nome;
        this.telefone= item.telefone;
        this.redessociais = typeof item.redessociais!= "object"? [] :item.redessociais;
        this.emailcontato = item.emailcontato;
    }

    addRedeSocial() {
        this.redessociais.push(new Redessociais());
    }

    dropRedeSocial(index) {
        this.redessociais.splice(index, 1);
    }
  
}

class Redessociais{
    constructor() {
        this.nome="";
        this.url="";
    }
}

var Estagios=[
    "Inicial",
    "Intermediario",
    "Finalizado"
]

var mertricas=[
    {valor:1, descricao:"far fa-angry" , cor:'#b03b21'},
    {valor:2, descricao:"far fa-frown", cor:'#b07221'},
    {valor:3, descricao:"far fa-meh", cor:'#aeb021'},
    {valor:4, descricao:"far fa-smile-beam", cor:'#69b021'},
    {valor:5, descricao:"far fa-grin-stars", cor:'#34b021'},
]

var mecanicas=[
    {id:0,descricao:"Ação / Movimento Programado"},
    {id:1,descricao:"Ação Simultânea"},
    {id:2,descricao:"Alocação de Trabalhadores"},
    {id:3,descricao:"Apostas"},
    {id:4,descricao:"Atuação"},
    {id:5,descricao:"Blefe"},
    {id:6,descricao:"Campanha/ Batalhas Dirigidas por Cartas"},
    {id:7,descricao:"Cantar"},
    {id:8,descricao:"Cerco de Área"},
    {id:9,descricao:"Colecionar Componentes"},
    {id:10,descricao:"Colocação de Peças"},
    {id:11,descricao:"Construção a partir de Modelo"},
    {id:12,descricao:"Construção de Baralho/Peças"},
    {id:13,descricao:"Construção de Rotas"},
    {id:14,descricao:"Controle/Influência de Área"},
    {id:15,descricao:"Cooperativo"},
    {id:16,descricao:"Dedução"},
    {id:17,descricao:"Desenhar"},
    {id:18,descricao:"Desenhar Rota com Lápis"},
    {id:19,descricao:"Eliminação de Jogadores"},
    {id:20,descricao:"Especulação Financeira"},
    {id:21,descricao:"Force sua sorte"},
    {id:22,descricao:"Gestão de Mão"},
    {id:23,descricao:"Impulso de Área"},
    {id:24,descricao:"Jogadores com Diferentes Habilidades"},
    {id:25,descricao:"Jogo em Equipe"},
    {id:26,descricao:"Leilão"},
    {id:27,descricao:"Linha de Tempo"},
    {id:28,descricao:"Marcadores e Hexágonos"},
    {id:29,descricao:"Memória"},
    {id:30,descricao:"Mercado de Ações"},
    {id:31,descricao:"Movimento de Área"},
    {id:32,descricao:"Movimento em Grades"},
    {id:33,descricao:"Movimento Ponto-a-Ponto"},
    {id:34,descricao:"Narração de Histórias"},
    {id:35,descricao:"Negociação"},
    {id:36,descricao:"Ordem de Fases Variável"},
    {id:37,descricao:"Papel e Caneta"},
    {id:38,descricao:"Pedra, Papel e Tesoura"},
    {id:39,descricao:"Pegar e Entregar"},
    {id:40,descricao:"Posicionamento Secreto"},
    {id:41,descricao:"Reconhecimento de Padrão"},
    {id:42,descricao:"Rolagem de Dados"},
    {id:43,descricao:"Rolar e Mover"},
    {id:44,descricao:"RPG"},
    {id:45,descricao:"Seleção de Cartas"},
    {id:46,descricao:"Simulação"},
    {id:47,descricao:"Sistema de Pontos de Ação"},
    {id:48,descricao:"Sistema por Impulsos"},
    {id:49,descricao:"Tabuleiro Modular"},
    {id:50,descricao:"Tempo real"},
    {id:51,descricao:"Toma essa"},
    {id:52,descricao:"Vazas/Truques"},
    {id:53,descricao:"Votação"},
]

var categorias = [
    {id:0,descricao:"Jogos Infantis"},
    {id:1,descricao:"Jogos Familiares"},
    {id:2,descricao:"Jogos Expert"},
]

