var myApp = new Vue({
  el: '#app',
  data: {
    objBoardgame: {},
    bgid: "",
    perfil: {},
    status: 99,
  },
  created: async function () {
    appmanager.auth();
    this.perfil = new Perfil();
    this.perfil.loadJson(appmanager.profile);

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
    this.getProfile();
  },
  methods: {
    getProfile: async function (auth) {
      const result = await appmanager.getProfile(appmanager.profile.userid);

      if (result.status) {
          this.perfil.userid = appmanager.profile.userid;
          if (result.json.length == 1) {
              this.perfil.loadJson(result.json[0]);
          }
      }

      this.status = 0;
  },
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


