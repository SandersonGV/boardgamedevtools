var myApp = new Vue({
    el: '#app',
    data: {
        myAuth: {},
    },
    created: function () {
        this.myAuth = appmanager.auth();
    },
    mounted: function () {
    },
    methods: {
        putUser: function (auth) {
            boardgame.user = this.profile.email;
            let url = 'https://boardgamelibrary-36a8.restdb.io/rest/users/' + auth._id;
            let data = JSON.stringify(auth);
            let obj = {
                method: 'PATCH',
                headers: {
                    "content-type": "application/json",
                    'x-apikey': '5ef29ccfa529a1752c476933'
                },
                body: data,
            };

        },
    },
});