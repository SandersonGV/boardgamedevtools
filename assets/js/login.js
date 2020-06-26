var myApp = new Vue({
    el: '#app',
    data: {
 
    },
    created: function () {
        appmanager.auth();
        appmanager.checkprofile = this.logincheck;
    },
    mounted: function () {
    },
    methods: {
        login: function () {
            appmanager.login();
        },
        logincheck(isChecked){
            if(isChecked.status != 0){
                $(".alert").show("slow");
                $("#msgAlert").html("<p>"+isChecked.msg+"</p>");
                return;
            }
            appmanager.auth();
        },
        signup: function () {

        },
    },
});
