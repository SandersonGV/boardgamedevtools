var myApp = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        myAuth: {},
        infos: [],
        profile: {},
        boardgames: [],
        objBoardgame: {},
        baseBoardgameList: [],
        tipoDeLista: 0,
        titulo: "",
        perfil:{},
    },
    created: function () {
        this.objBoardgame = new Boardgame();
        const params = new URLSearchParams(window.location.search)
        if (params.has("tipo")) {
            this.tipoDeLista = parseInt(params.get("tipo"));
        }
        const auth = this.getSession('auth');
        if (auth) {
            this.myAuth = auth;
            const bgs = this.getSession('boardgames');
            if (bgs) {
                this.jsonToObj(bgs);
            }else{
                this.getItems();
            }
        }else{
            if(!self.location.pathname.includes('index'))
                self.location.href="index.html";
        }
    },
    mounted: function () {
    },
    methods: {
        filterBoardgame: function (event) {
            var filter = event.target.value.toUpperCase();
            var list = document.getElementById("boardgameList");
            var jogos = list.getElementsByClassName("card");
            for (var i = 0; i < jogos.length; i++) {
                var a = jogos[i].getElementsByClassName("btnTitulo")[0];

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
        saveSession: function (chave, valor) {
            sessionStorage.setItem(chave, JSON.stringify(valor));
        },
        getSession: function (chave) {
            const data = sessionStorage.getItem(chave);
            if (data && data!="undefined") {
                return JSON.parse(data);
            }
            return null;
        },
        imgError: function (event) {
            event.target.src = "https://via.placeholder.com/350/?text=Not+Found"
        },
        getFile: function (event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            var that = this;
            reader.onload = this.loadObj;
            reader.readAsText(file);
        },
        loadObj: function (evt) {
            try {
                this.jsonToObj(JSON.parse(evt.target.result));
            } catch (error) {
                alert(error);
            }
        },
        jsonToObj: function (stringJson) {
            let loadobj = stringJson;
            this.baseBoardgameList = [];
            for (const item of loadobj) {
                let boardgame = new Boardgame();
                boardgame.loadJson(item);
                boardgame.user = item.user != "" ? item.user : this.profile.email;
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

            this.infos.push(
                { titulo: 'Todos os jogos', valor: this.baseBoardgameList.length, cor: '#cf9c11', icon: "fas fa-box", jogos: this.baseBoardgameList },
                { titulo: 'Jogos no tabletopia', valor: jogosTabletopia.length, cor: '#0e46ad', icon: "fas fa-desktop", jogos: jogosTabletopia },
                { titulo: 'jogos com Editora', valor: jogosEditora.length, cor: '#ad5b0e', icon: "fas fa-file-signature", jogos: jogosEditora },
                { titulo: 'jogos para 2 ', valor: jogosDoisjogadores.length, cor: '#7611cf', icon: "fas fa-user-friends", jogos: jogosDoisjogadores },
                { titulo: 'jogos para crianças', valor: jogosInfantil.length, cor: '#cf1199', icon: "fas fa-child", jogos: jogosInfantil },
                { titulo: 'jogos com manual', valor: jogosComManual.length, cor: '#20ad0e', icon: "fas fa-scroll", jogos: jogosComManual },
            );

            this.boardgames = this.infos[this.tipoDeLista].jogos;
            this.titulo = this.infos[this.tipoDeLista].titulo

        },
        login: function () {
            this.saveSession('auth',this.myAuth);
            self.location.href = "dashboard.html";
        },
        logout: function () {
            this.saveSession('auth',null);
            this.saveSession('boardgames',null);
            sessionStorage.clear();
            self.location.href = "/";
        },
        signup:function(){

        },
        getItems: async function () {
            let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames';
            var obj = {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    'x-apikey': '5ef29ccfa529a1752c476933'
                }
            };
            let json = await this.myrequest(url, obj);
            this.saveSession('boardgames',json);
            this.jsonToObj(json);
        },
        putItem: function (boardgame) {
            boardgame.user = this.profile.email;
            let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames/' + boardgame._id;
            let data = JSON.stringify(boardgame);
            let obj = {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    'x-apikey': '5ef29ccfa529a1752c476933'
                },
                body: data,
            };
            this.myrequest(url, obj);

        },
        setItem: async function (boardgame) {
            let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames';
            let data = JSON.stringify(boardgame);
            let obj = {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    'x-apikey': '5ef29ccfa529a1752c476933'
                },
                body: data,
            };
            let json = await this.myrequest(url, obj);
            boardgame._id = json._id;
            this.boardgames.push({ ...boardgame });
        },

        myrequest: async (url, option) => {
            const response = await fetch(url, option);
            const json = await response.json();
            return json;
        },

    },
});