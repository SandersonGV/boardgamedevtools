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
    this.objPartida = new Partida();
    this.getPartidas();
    this.loadchart();
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
    novaPartida: function () {
      this.objPartida = new Partida();
      this.objPartida.boardgameID = this.bgid;
      $('#modalPartida').modal('show');
    },
    partidaSelect: function (partida) {
      this.objPartida = partida;
      $('#modalPartida').modal('show');
    },
    addPartida: function () {
      if (this.objPartida._id == '') {
        this.setPartida(this.objPartida);
      } else {
        this.putPartida(this.objPartida);
      }
      this.objPartida = new Partida();
    },
    loadchart: function () {
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
          datasets: [{
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
          }, {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            fill: false
          },
          ]
        },
        options: {
          title: {
            display: true,
            text: 'World population per region (in millions)'
          }
        }
      });
    },
    getPartidas: async function () {
      const result = await appmanager.getPartidas(this.bgid);

      if (result.status) {
        let json = result.status ? result.json : "";
        this.jsonToObjPartida(json);
        this.statusList = 0;

      } else {
        appmanager.openMessage("warning", result.json.message);
      }
    },
    putPartida: async function (partida) {
      this.statusList = 99;

      let result = await appmanager.putPartida(partida);

      if (result.status) {
        this.getPartidas();
        appmanager.openMessage("success", "Aualização realizada");

      } else {
        appmanager.openMessage("warning", result.json.message);
      }
    },
    setPartida: async function (partida) {
      this.statusList = 99;

      let result = await appmanager.setPartida(partida);

      if (result.status) {
        this.getPartidas();
        appmanager.openMessage("succes", "Cadastro realizado");

      } else {
        appmanager.openMessage("warning", result.json.message);
      }
    },
    dropPartida: async function (partida) {
      let resposta = await swal({
        title: "Esta certo disso?",
        text: "Apos deletar não será possivel recuperar!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (resposta) {
        this.statusList = 99;
        let result = await appmanager.dropPartida(partida);

        if (result.status) {
          this.getPartidas();
          appmanager.openMessage("succes", "Partida excluida");

        } else {
          appmanager.openMessage("warning", result.json.message);
        }
      }
    },
  },
});


