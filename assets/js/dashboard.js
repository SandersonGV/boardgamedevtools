var myApp = new Vue({
    el: '#app',
    data: {
        infos: [],
        boardgames: [],
        baseBoardgameList: [],
        status:99
    },
    created: async function () {

        appmanager.auth();
        let bgs = appmanager.getSession('boardgames');
        if (!bgs) {
            const result = await appmanager.getBoardgames();
            bgs = result.status?result.json:"";
        }
        this.jsonToObj(bgs);
    },
    mounted: function () {
    },
    methods: {
        jsonToObj: function (stringJson) {
            let loadobj = stringJson;
            this.baseBoardgameList = [];
            for (const item of loadobj) {
                let boardgame = new Boardgame();
                boardgame.loadJson(item);
                this.baseBoardgameList.push(boardgame);
            }
            this.setBoardgameList();
        },
        setBoardgameList: function () {

            let jogosComManual = this.baseBoardgameList.filter(item => {
                return (!!item.manualURL);
            });

            var jogosTabletopia = this.baseBoardgameList.filter(item => {
                return (!!item.tabletopiaEmail);
            });

            var jogosEditora = this.baseBoardgameList.filter(item => {
                return (!!item.editora);
            });

            var jogosDoisjogadores = this.baseBoardgameList.filter(item => {
                return item.jogadoresAte == 2;
            });

            var jogosInfantil = this.baseBoardgameList.filter(item => {
                return item.idadeMinima < 10;
            });

            var jogosInical = this.baseBoardgameList.filter(item => {
                return item.estagio == Estagios[0];
            });

            var jogosIntermediario = this.baseBoardgameList.filter(item => {
                return item.estagio == Estagios[1];
            });

            var jogosFinal = this.baseBoardgameList.filter(item => {
                return item.estagio == Estagios[2];
            });

            this.infos.push(
                { titulo: 'Todos os jogos', valor: this.baseBoardgameList.length, cor: '#cf9c11', icon: "fas fa-box", },
                { titulo: 'Jogos no tabletopia', valor: jogosTabletopia.length, cor: '#0e46ad', icon: "fas fa-desktop", },
                { titulo: 'Jogos com Editora', valor: jogosEditora.length, cor: '#ad5b0e', icon: "fas fa-file-signature",  },
                { titulo: 'Jogos para 2 ', valor: jogosDoisjogadores.length, cor: '#7611cf', icon: "fas fa-user-friends",  },
                { titulo: 'Jogos para crianças', valor: jogosInfantil.length, cor: '#cf1199', icon: "fas fa-child",  },
                { titulo: 'Jogos com manual', valor: jogosComManual.length, cor: '#20ad0e', icon: "fas fa-scroll",  },
                { titulo: 'Jogos em estagio Inicial', valor: jogosInical.length, cor: '#18b878', icon: "far fa-lightbulb",  },
                { titulo: 'Jogos em estagio Intermediario', valor: jogosIntermediario.length, cor: '#1845b8', icon: "fas fa-sliders-h",  },
                { titulo: 'Jogos em estagio Final', valor: jogosFinal.length, cor: '#722a7a', icon: "fas fa-box",  },
            );
            this.status =0;
        },

    },
});