var myApp = new Vue({
    el: '#app',
    data: {
        myAuth: {},
        perfil:{}
    },
    created: function () {
        this.myAuth = appmanager.auth();
        this.perfil = new Perfil();
        this.perfil.loadJson(appmanager.profile);
    },
    mounted: function () {
    },
    methods: {
        getUser: function (auth) {

        },
    },
});