var myApp = new Vue({
    el: '#app',
    data: {
        myAuth: {},
        perfil:{},
    },
    created: function () {
        appmanager.auth();
    },
    mounted: function () {
    },
    methods: {
        login: function () {
            appmanager.saveSession('auth',this.myAuth);
            self.location.href = "dashboard.html";
        },
        signup:function(){

        },
    },
});



$(document).ready(function () {
    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }

    // form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        } else {
            $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        }
    });


});
