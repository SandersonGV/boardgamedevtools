var appmanager = {
    appkey: "5ef29ccfa529a1752c476933",
}

appmanager.auth = () => {
    const isAuth = appmanager.getSession('auth');
    const isLoginPage = (self.location.href.split("/")[3].includes('index') || self.location.href.split("/")[3] == "");

    if (isLoginPage && isAuth) {
        self.location.href = "dashboard.html";
    } else if (!isAuth && !isLoginPage) {
        self.location.href = "/";
    }

    return isAuth;
}

appmanager.authOut = () => {
    appmanager.clearSession();
    self.location.href = "/";
}

appmanager.getBoardgames = async () => {
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames';
    var obj = {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            'x-apikey': appmanager.appkey
        }
    };
    let json = await appmanager.request(url, obj);
    appmanager.saveSession('boardgames', json);
    return json;
}

appmanager.setBoardgame = async (boardgame) => {
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames';
    let data = JSON.stringify(boardgame);
    let obj = {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            'x-apikey': appmanager.appkey
        },
        body: data,
    };
    let json = await appmanager.request(url, obj);
    return json;
}

appmanager.putBoardgame = async (boardgame) => {
    boardgame.user = this.profile._id;
    let url = 'https://boardgamelibrary-36a8.restdb.io/rest/boardgames/' + boardgame._id;
    let data = JSON.stringify(boardgame);
    let obj = {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            'x-apikey': appmanager.appkey
        },
        body: data,
    };

    let json = await appmanager.request(url, obj);
    return json;
}

appmanager.request = async (url, option) => {
    const response = await fetch(url, option);
    const json = await response.json();
    return json;
}

appmanager.saveSession = (chave, valor) => {
    sessionStorage.setItem(chave, JSON.stringify(valor));
}

appmanager.clearSession = () => {
    sessionStorage.setItem(chave, JSON.stringify(valor));
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


