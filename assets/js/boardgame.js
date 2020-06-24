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
        this.capaURL = item.capaURL;
        this.manualURL = item.manualURL;
        this.tabletopiaURL = item.tabletopiaURL;
        this.tabletopiaEmail = item.tabletopiaEmail;
        this.tabletopiaSenha = item.tabletopiaSenha;
        this.estagio = item.estagio;
        this.imagens = item.imagens;
        this.user = item.user;
    }

    addComponente() {
        this.componentes.push(new Componente());
    }

    dropComponente(index) {
        this.componentes.splice(index, 1);
    }
    addImagem() {
        this.imagens.push("");
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
        this.duracao =0;
        this.data = date();
        this.quantidadejogadores = 1;
        this.tipo = "";
        this.oquefoitestado="";
        this.observasao ="";
        this.quemganhou = 1;
        this.feedbacks=[];
        
    }

    loadJson(item){
        this._id = item._id;
        this.boardgameID= item.boardgameID;
        this.duracao =item.duracao;
        this.data = item.data;
        this.quantidadejogadores = item.quantidadejogadores;
        this.tipo = item.tipo;
        this.oquefoitestado=item.oquefoitestado;
        this.observasao =item.observasao;
        this.quemganhou = item.quemganhou;
        this.feedbacks=item.feedback;
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
        this.genero= "";
        this.pontuacao= 0;
        this.idade= 0;
        this.email= "";
        this.mediverti= 0;
        this.gosteidaduracao= 0;
        this.regrasficaramclaras= 0;
        this.jogooriginal= 0;
        this.jogobemestrategico= 0;
        this.jogarianovamente= 0;
        this.comprariaojogo= 0;
        this.oquemenosgostou= "";
        this.oquemaisgostou= "";
        this.observasao= "";
    }
}
