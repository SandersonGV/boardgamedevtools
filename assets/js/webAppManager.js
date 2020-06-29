var appwebmanager = {
    partidaId: "",
}
appwebmanager.getPartidaInfo = async (partidaId) => {
    let url = 'https://www-boardgamelibrary-36a8.restdb.io/feedback?pid='+partidaId;
    var obj = {
        method: 'GET',
        headers: {
            "content-type": "application/json",
        }
    };
    let result = await appwebmanager.request(url, obj);
    return result;
}

appwebmanager.saveFeedback = async (feedback) => {
    let url = 'https://www-boardgamelibrary-36a8.restdb.io/feedback';
    let data = JSON.stringify(feedback);
    let obj = {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: data,
    };

    let json = await appwebmanager.request(url, obj);
    return json;
}

appwebmanager.request = async (url, option) => {
    const response = await fetch(url, option);
    const json = await response.json();

    if (!response.ok) {
        if (json.message.includes("Token")) {
            appwebmanager.authOut();
        }
    }

    return {
        status: response.ok,
        json: json
    };
}

appwebmanager.saveSession = (chave, valor) => {
    sessionStorage.setItem(chave, JSON.stringify(valor));
}

appwebmanager.clearSession = () => {
    sessionStorage.clear();
}

appwebmanager.getSession = (chave) => {
    const data = sessionStorage.getItem(chave);
    if (data && data != "undefined") {
        return JSON.parse(data);
    }
    return null;
}


appwebmanager.imgError = (event) => {
    event.src = "https://via.placeholder.com/500/?text=Not+Found";
}

appwebmanager.openMessage = (tipo = "info", text) => {
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