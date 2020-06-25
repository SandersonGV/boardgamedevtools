var myApp = new Vue({
    el: '#app',
    data: {
        myAuth: {},
        objBoardgame: {},
        pid: "",
        objFeedback : {}
    },
    created: function () {
        const params = new URLSearchParams(window.location.search)
        if (params.has("pid")) {
            this.pid = params.get("pid");
        }
    },
    mounted: function () {
        this.objPartida = new Partida();
    },
    methods: {
      loadContent:function(){
        
      },
      saveFeedback:function(){

      },

    },
});
