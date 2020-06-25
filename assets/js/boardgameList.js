var myApp = new Vue({
    el: '#app',
    data: {
        myAuth: {},
        boardgames: [],
        objBoardgame: {},
        baseBoardgameList: [],
        tipoDeLista: 0,
        titulo: "",
    },
    created: function () {
        this.myAuth = appmanager.auth();

        this.objBoardgame = new Boardgame();
        const params = new URLSearchParams(window.location.search)
        if (params.has("tipo")) {
            this.tipoDeLista = parseInt(params.get("tipo"));
        }
        const bgs = appmanager.getSession('boardgames');
        if (!bgs) {
            bgs = appmanager.getBoardgames();
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
            this.objBoardgame.user = this.profile.email;

        },
        addBoardgame: function () {
            if (this.estado == 'novo') {
                this.setItem(this.objBoardgame);
            } else {
                this.setItem(this.objBoardgame);
            }
            this.objBoardgame = new Boardgame();
        },
        editBoardgame: function (index) {
            this.estado = index;
            this.objBoardgame = this.boardgames[index];
        },
        dropBoardgame: function (index) {
            this.boardgames.splice(index, 1);
        },
        jsonToObj: function (stringJson) {
            let loadobj = stringJson;
            this.baseBoardgameList = [];
            for (const item of loadobj) {
                let boardgame = new Boardgame();
                boardgame.loadJson(item);
                boardgame.user = item.user != "" ? item.user : this.myAuth.email;
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
                default:
                    this.boardgames = this.baseBoardgameList;
                    this.titulo = 'Todos os jogos';
                    break;
            }

        },
        getItems: async function () {
            let json = appmanager.getBoardgames();
            this.jsonToObj(json);
        },
        putItem: function (boardgame) {
            boardgame.user = this.profile.email;
            let result = appmanager.putBoardgames(boardgame);
            this.getItems();

        },
        setItem: async function (boardgame) {
            let result = appmanager.setBoardgames(boardgame);
            this.getItems();
        },
    },
});