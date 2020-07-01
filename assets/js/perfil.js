var myApp = new Vue({
    el: '#app',
    data: {
        myAuth: {},
        perfil: {},
        status: 99
    },
    created: function () {
        this.myAuth = appmanager.auth();
        this.perfil = new Perfil();

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
        saveProfile: async function () {
            this.status = 99;
            let result;
            if (this.perfil._id == "") {
                result = await appmanager.setProfile(this.perfil);
            } else {
                result = await appmanager.putProfile(this.perfil);
            }

            if (result.status) {
                this.perfil.loadJson(result.json);
                appmanager.openMessage("succes", "Atualização realizado");
        
              } else {
                appmanager.openMessage("warning", result.json.message);
              }

            this.status = 0;
        }
    },
});