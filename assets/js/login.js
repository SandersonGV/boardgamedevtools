var myApp = new Vue({
    el: '#app',
    data: {
        Auth0Lock: {},
        AuthResult: {},
        Perfil: null,
        status:99
        
    },
    created: function () {
        appmanager.auth();
    },
    mounted: function () {
        this.Auth0Lock = new Auth0Lock(
            'Vj79NXuRXIU8SuDZvRxjZsesFqB3anNZ',
            'virgolinos.auth0.com',
            {
                languageDictionary: {
                    title: "Boardgame Dev Tools"
                },
                language: "pt-BR",
                auth: {
                    redirect: false,
                    responseType: 'token id_token'
                },
                theme: {
                    logo: "assets/img/logo.png",
                    primaryColor: "green",
                }
            });
        this.Auth0Lock.on("authenticated", this.authenticated)
        this.checkSession();

    },
    methods: {
        login: function () {
            this.checkSession();
        },
        logout: function () {
            this.Auth0Lock.logout();
        },
        resumeSession: function () {
            appmanager.saveSession('auth', this.AuthResult.idToken);
            appmanager.saveSession('profile', this.Perfil);
            appmanager.auth();
        },
        authenticated: function (authResult) {
            this.AuthResult = authResult;
            this.Auth0Lock.getProfile(authResult.accessToken, this.getProfile);
            this.Auth0Lock.hide();
        },
        getProfile: function (error, profile) {
            if (error) {
                appmanager.openMessage("warning", error.description);
                return;
            } else {
                if (!profile.email_verified) {
                    appmanager.openMessage("warning", "Ainda falta verificar seu email");
                    return;
                }
                this.Perfil = profile;
                this.resumeSession();
            }
        },
        checkSession: function () {
            this.Auth0Lock.checkSession({}, this.checkSessionResult);
        },
        checkSessionResult: function (error, authResult) {
            if (error || !authResult) {
                this.Auth0Lock.show();
                this.status=0;
            } else {
                this.AuthResult = authResult;
                this.Auth0Lock.getUserInfo(authResult.accessToken, this.getProfileSession);
            }
        },
        getProfileSession: function (error, profile) {
            this.Perfil = profile;
            this.status=1;
        }

    },
});
