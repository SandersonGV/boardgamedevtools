var myApp = new Vue({
  el: '#app',
  data: {
    myAuth: {},
    objBoardgame: {},
    bgid: "",
    partidas: [],
    objPartida: {},
    statusList: 99,
  },
  created: async function () {
    this.myAuth = appmanager.auth();

    this.objBoardgame = new Boardgame();
    const params = new URLSearchParams(window.location.search)
    if (params.has("bgid")) {
      this.bgid = params.get("bgid");
    }
    const bgs = appmanager.getSession('boardgames');
    if (!bgs) {
      const result = await appmanager.getBoardgames();
      bgs = result.status ? result.json : "";
    }
    this.jsonToObjBoardgame(bgs);
  },
  mounted: function () {
  },
  methods: {
    jsonToObjBoardgame: function (stringJson) {
      let loadobj = stringJson;
      for (const item of loadobj) {
        if (item._id == this.bgid) {
          this.objBoardgame.loadJson(item);
          return true;
        }
      }
    },
    jsonToObjPartida: function (stringJson) {
      let loadobj = stringJson;
      const newParidas = [];
      for (const item of loadobj) {
        let partida = new Partida();
        partida.loadJson(item);
        newParidas.push(partida);
      }
      this.partidas = newParidas;

    },
  },
});


