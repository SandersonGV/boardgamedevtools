var appmanager = {
    appkey: "",
    profile: "",
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
    appmanager.clearSession();
    self.location.href = "/";
}
//boardgames
appmanager.getBoardgames = async () => {
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames?q={"user":"'+appmanager.profile.email+'"}';
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
    delete boardgame._id;
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
//partidas
appmanager.getPartidas = async (boardgameID) => {
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/partidas?q={"boardgameID":"'+boardgameID+'"}';
    var obj = {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            'Authorization': "Bearer " + appmanager.appkey
        }
    };
    let result = await appmanager.request(url, obj);
    return result;
}

appmanager.setPartida = async (partida) => {
    delete partida._id;
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/partidas';
    let data = JSON.stringify(partida);
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

appmanager.putPartida = async (partida) => {
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/partidas/' + partida._id;
    let data = JSON.stringify(partida);
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

appmanager.dropPartida = async (partida) => {
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/partidas/' + partida._id;
    let data = JSON.stringify(partida);
    let obj = {
        method: 'DELETE',
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
