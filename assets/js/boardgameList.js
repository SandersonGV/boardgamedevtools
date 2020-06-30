var myApp = new Vue({
    el: '#app',
    data: {
        myAuth: {},
        boardgames: [],
        objBoardgame: {},
        baseBoardgameList: [],
        tipoDeLista: 0,
        titulo: "",
        status: 99
    },
    created: async function () {
        this.myAuth = appmanager.auth();

        this.objBoardgame = new Boardgame();
        const params = new URLSearchParams(window.location.search)
        if (params.has("tipo")) {
            this.tipoDeLista = parseInt(params.get("tipo"));
        }
        let bgs = appmanager.getSession('boardgames');
        if (!bgs) {
            const result = await appmanager.getBoardgames();
            bgs = result.status ? result.json : "";
        }
        this.jsonToObj(bgs);
    },
    mounted: function () {
    },
    methods: {
        filterBoardgame: function (event) {
            var filter = event.target.value.toUpperCase();
            var list = document.getElementById("boardgameList");
            var jogos = list.getElementsByClassName("card");
            for (var i = 0; i < jogos.length; i++) {
                var a = jogos[i].getElementsByClassName("bgTitle")[0];

                if (a) {
                    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        jogos[i].style.display = "";
                    } else {
                        jogos[i].style.display = "none";
                    }
                }
            }
        },
        novoBoardgame: function () {
            this.estado = 'novo';
            this.objBoardgame = new Boardgame()
            this.objBoardgame.user = appmanager.profile.email;

        },
        addBoardgame: function () {
            this.status = 99;

            if (this.estado == 'novo') {
                this.setItem(this.objBoardgame);
            } else {
                this.putItem(this.objBoardgame);
            }
            this.objBoardgame = new Boardgame();
        },
        editBoardgame: function (index) {
            this.estado = index;
            this.objBoardgame = this.boardgames[index];
        },
        dropBoardgame: async function (boardgame) {
            let resposta = await swal({
                title: "Esta certo disso?",
                text: "Apos deletar não será possivel recuperar!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              });
              if (resposta) {
                this.status = 99;
                let result = await appmanager.dropBoardgame(boardgame);
        
                if (result.status) {
                  this.getItems();
                  appmanager.openMessage("succes", "boardgame excluido");
        
                } else {
                  appmanager.openMessage("warning", result.json.message);
                }
              }
        },
        jsonToObj: function (stringJson) {
            let loadobj = stringJson;
            this.baseBoardgameList = [];
            for (const item of loadobj) {
                let boardgame = new Boardgame();
                boardgame.loadJson(item);
                boardgame.user = item.user;
                this.baseBoardgameList.push(boardgame);
            }
            this.setBoardgameList();
        },
        setBoardgameList: function () {
            switch (this.tipoDeLista) {
                case 1:
                    this.boardgames = this.baseBoardgameList.filter(item => {
                        return (!!item.tabletopiaEmail);
                    });
                    this.titulo = "Jogos no tabletopia";
                    break;
                case 2:
                    this.boardgames = this.baseBoardgameList.filter(item => {
                        return (!!item.editora);
                    });
                    this.titulo = "jogos com Editora";
                    break;
                case 3:
                    this.boardgames = this.baseBoardgameList.filter(item => {
                        return item.jogadoresAte == 2;
                    });
                    this.titulo = "jogos para 2";
                    break;
                case 4:
                    this.boardgames = this.baseBoardgameList.filter(item => {
                        return item.idadeMinima < 10;
                    });
                    this.titulo = "jogos para crianças";
                    break;
                case 5:
                    this.boardgames == this.baseBoardgameList.filter(item => {
                        return (!!item.manualURL);
                    });
                    this.titulo = "jogos com manual";
                    break;
                case 6:
                    this.boardgames == this.baseBoardgameList.filter(item => {
                        return (item.estagio == Estagios[0]);
                    });
                    this.titulo = "Jogos em estagio Inicial";
                    break;
                case 7:
                    this.boardgames == this.baseBoardgameList.filter(item => {
                        return (item.estagio == Estagios[1]);
                    });
                    this.titulo = "Jogos em estagio Intermediario";
                    break;
                case 8:
                    this.boardgames == this.baseBoardgameList.filter(item => {
                        return (item.estagio == Estagios[2]);
                    });
                    this.titulo = "Jogos em estagio Final";
                    break;
                default:
                    this.boardgames = this.baseBoardgameList;
                    this.titulo = 'Todos os jogos';
                    break;
            }
            this.status = 0;

        },
        getItems: async function () {
            const result = await appmanager.getBoardgames();
            if (result.status) {
                let json = result.status ? result.json : "";
                this.jsonToObj(json);
                

            } else {
                appmanager.openMessage("warning", result.json.message);
            }
        },
        putItem: async function (boardgame) {
            let result = await appmanager.putBoardgame(boardgame);

            if (result.status) {
                this.getItems();
                appmanager.openMessage("success", "Aualização realizada");

            } else {
                appmanager.openMessage("warning", result.json.message);
            }

        },
        setItem: async function (boardgame) {
            let result = await appmanager.setBoardgame(boardgame);

            if (result.status) {
                this.getItems();
                appmanager.openMessage("succes", "Cadastro realizado");

            } else {
                appmanager.openMessage("warning", result.json.message);
            }

        },
    },
});