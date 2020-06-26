var appmanager = {
    appkey: "",
    profile: "",
    checkprofile: null,
    Auth0Lock: new Auth0Lock(
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
                logo: "https://cdn.icon-icons.com/icons2/1537/PNG/512/1562690-box-creative-energy-idea-think-out-of-the-box_107044.png",
                primaryColor: "green",
            }
        })
}

appmanager.Auth0Lock.on("authenticated", function (authResult) {
    appmanager.Auth0Lock.getProfile(authResult.accessToken, function (error, profile) {
        let result = {
            status: 0,
            msg: ""
        };
        if (error) {
            result.status = 1;
            result.msg = error.description;
        } else {
            result = appmanager.getinfos(profile, authResult.idToken);
        }
        if (typeof appmanager.checkprofile == "function") {
            appmanager.checkprofile(result);
        }

        appmanager.Auth0Lock.hide();
    });
})

appmanager.getinfos = (profile, idToken) => {
    let status = 0;
    let msg = "";

    if (!profile.email_verified) {
        status = 1;
        msg = "Ainda falta verificar seu email";
    } else {
        appmanager.saveSession('auth', idToken);
        appmanager.saveSession('profile', profile);
        appmanager.appkey = idToken;
        appmanager.profile = profile;
        status = 0;
        msg = "login sucesso";
    }
    return {
        status: status,
        msg: msg
    };
}

appmanager.login = () => {
    appmanager.Auth0Lock.show();
}

appmanager.checkSession = () => {
    appmanager.Auth0Lock.checkSession({}, function (error, authResult) {
        if (error || !authResult) {
            appmanager.Auth0Lock.show();
        } else {
            // user has an active session, so we can use the accessToken directly.
            appmanager.Auth0Lock.getUserInfo(authResult.accessToken, function (error, profile) {
                appmanager.getinfos(profile, accessToken.idToken);
            });
        }
    });
}

appmanager.auth = () => {
    const isAuth = appmanager.getSession('auth');
    const isLoginPage = (self.location.href.split("/")[3].includes('index') || self.location.href.split("/")[3] == "");

    if (isLoginPage && isAuth) {
        self.location.href = "dashboard.html";
    } else if (!isAuth && !isLoginPage) {
        self.location.href = "/";
    }
    const profile = appmanager.getSession('profile');

    appmanager.appkey = isAuth;
    appmanager.profile = profile;
    return isAuth;
}

appmanager.authOut = () => {
    appmanager.Auth0Lock.logout();
    appmanager.clearSession();
    self.location.href = "/";
}

appmanager.getBoardgames = async () => {
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames';
    var obj = {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            'Authorization': "Bearer " + appmanager.appkey
        }
    };
    let result = await appmanager.request(url, obj);
    let json = result.status ? result.json : "";
    appmanager.saveSession('boardgames', json);
    return result;
}

appmanager.setBoardgame = async (boardgame) => {
    boardgame.user = appmanager.profile.email;
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames';
    let data = JSON.stringify(boardgame);
    let obj = {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            'Authorization': "Bearer " + appmanager.appkey
        },
        body: data,
    };
    let json = await appmanager.request(url, obj);
    return json;
}

appmanager.putBoardgame = async (boardgame) => {
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames/' + boardgame._id;
    let data = JSON.stringify(boardgame);
    let obj = {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            'Authorization': "Bearer " + appmanager.appkey
        },
        body: data,
    };

    let json = await appmanager.request(url, obj);
    return json;
}

appmanager.request = async (url, option) => {
    const response = await fetch(url, option);
    const json = await response.json();

    if (!response.ok) {
        if (json.message.includes("Token")) {
            appmanager.authOut();
        }
    }

    return {
        status: response.ok,
        json: json
    };
}

appmanager.saveSession = (chave, valor) => {
    sessionStorage.setItem(chave, JSON.stringify(valor));
}

appmanager.clearSession = () => {
    sessionStorage.clear();
}

appmanager.getSession = (chave) => {
    const data = sessionStorage.getItem(chave);
    if (data && data != "undefined") {
        return JSON.parse(data);
    }
    return null;
}

appmanager.imgError = (event) => {
    event.src = "https://via.placeholder.com/500/?text=Not+Found";
}

appmanager.openMessage = (tipo = "info", text) => {
    let titulo = "";
    switch (tipo) {
        case "success":
            titulo = "Bom trabalho!"
            break;
        case "warning":
            titulo ="Algo aconteceu!"
            break;
        case "error":
            titulo = "Um erro ocorreu!"
            break;
        default:
            tipo ='info';
            titulo = "Informação";
            break;
    }
    swal(titulo, text, tipo);

}
