var myApp = new Vue({
    el: '#app',
    data: {
        myAuth: {},
        pardidaInfo: {},
        pid: "",
        objFeedback : {}
    },
    created: function () {
        const params = new URLSearchParams(window.location.search)
        if (params.has("pid")) {
            this.pid = params.get("pid");
        }
        this.loadContent();
    },
    mounted: function () {
        this.objPartida = new Partida();
    },
    methods: {
      loadContent:async function(){
        this.pardidaInfo.status = 99;
        const result = await appwebmanager.getPartidaInfo(this.pid);
        if(result.status){
            this.pardidaInfo = result.json;
        }else{
            appwebmanager.openMessage("error", "Ocorreu um erro!");
        }
      },
      saveFeedback: async function(){
        const payload = {
            partidaId : this.pid,
            feedback : this.objFeedback
        };
        const result = await appwebmanager.saveFeedback(payload);
        if(result.status){
            appwebmanager.openMessage("success", "Muito obrigado, feedback recebido");
            this.pardidaInfo.status = 1;
            this.pardidaInfo.mensagem = "Muito obrigado, feedback recebido";
        }else{
            appwebmanager.openMessage("error", result.mensagem);
        }
      },
      
    },
});
