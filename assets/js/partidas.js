var myApp = new Vue({
    el: '#app',
    data: {
        myAuth: {},
        objBoardgame: {},
        bgid: "",
        partidas:[],
        objPartida : {}
    },
    created: function () {
        this.myAuth = appmanager.auth();

        this.objBoardgame = new Boardgame();
        const params = new URLSearchParams(window.location.search)
        if (params.has("bgid")) {
            this.bgid = params.get("bgid");
        }
        const bgs = appmanager.getSession('boardgames');
        if (!bgs) {
            bgs = appmanager.getBoardgames();
        }
        this.jsonToObj(bgs);
    },
    mounted: function () {
        this.objPartida = new Partida();
        this.getPartidas();
        this.loadchart();
    },
    methods: {
        jsonToObj: function (stringJson) {
            let loadobj = stringJson;
            for (const item of loadobj) {
                if (item._id == this.bgid) {
                    this.objBoardgame.loadJson(item);
                    return true;
                }
            }
        },
        getPartidas: function(){
            for (let index = 0; index < 2; index++) {
                const partida = new Partida()
                for (let index = 0; index < 4; index++) {
                    const feedback = new Feedback();
                    feedback.nomejogador = "teste 1";
                    partida.feedbacks.push(feedback);
                }
                this.partidas.push(partida);
            }
        },
        novaPartida:function(){
            this.objPartida = new Partida();
            $('#modalPartida').modal('show');
        },
        partidaSelect: function(partida){
            this.objPartida = partida;
            $('#modalPartida').modal('show');
        },
        loadchart: function(){
          var ctx = document.getElementById('myChart').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
              datasets: [{ 
                  data: [86,114,106,106,107,111,133,221,783,2478],
                  label: "Africa",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: [282,350,411,502,635,809,947,1402,3700,5267],
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
        }
    },
});

Vue.component('input-date', {
    template: '\
        <input\
          type="date"\
          ref="input"\
          v-bind:value="dateToYYYYMMDD(value)"\
          v-on:input="updateValue($event.target)"\
          v-on:focus="selectAll"\
        >\
    ',
    props: {
      value: {
        type: Date,
        default: new Date()
      }
    },
    methods: {
      dateToYYYYMMDD(date) {
        // may have timezone caveats https://stackoverflow.com/a/29774197/1850609
        return date && date.toISOString().split('T')[0]
      },
      updateValue: function (target) {
        this.$emit('input', target.valueAsDate);
      },
      selectAll: function (event) {
        // Workaround for Safari bug
        // https://stackoverflow.com/q/1269722/1850609
        setTimeout(function () {
            event.target.select()
        }, 0)
      }
    }
  });

  Vue.component('input-time', {
    template: '\
        <input\
          type="time"\
          ref="input"\
          v-bind:value="dateToTime(value)"\
          v-on:input="updateValue($event.target)"\
          v-on:focus="selectAll"\
        >\
    ',
    props: {
      value: {
        type: Date,
        default: new Date()
      }
    },
    methods: {
        dateToTime(date) {
        // may have timezone caveats https://stackoverflow.com/a/29774197/1850609
        return date && date.toLocaleTimeString();
      },
      updateValue: function (target) {
        this.$emit('input', target.valueAsDate);
      },
      selectAll: function (event) {
        // Workaround for Safari bug
        // https://stackoverflow.com/q/1269722/1850609
        setTimeout(function () {
            event.target.select()
        }, 0)
      },
    }
  });

