
var GeminiStore = {

    // ストレージデータの初期化データ
    getInitializeData: function () {
        return {
            clients: [],
            api: {}
        };
    },


    // クライアントデータ群を取得する
    getData: function () {
        var data = localStorage.clients;

        if (data === undefined) {
            data = this.getInitializeData();

        } else {
            data = JSON.parse(data);
        }

        return data;
    },


    // クライアント情報を更新する
    updateClientData: function (data) {
        localStorage.clients = JSON.stringify(data);
    },


    // APIキーを取得する
    getApiKey: function (client) {
        var data = this.getData();
        return (data.api.hasOwnProperty(client)) ? data.api[client]: false;
    },


    // APIキーを更新する
    updateApiKey: function (client, key) {
        var data = this.getData();

        data.api[client] = key;
        localStorage.clients = JSON.stringify(data);
    },


    // クライントデータを削除する
    deleteData: function (client) {
        var data = this.getData();

        if (data.api.hasOwnProperty(client)) {
            delete data.api[client];
        }

        var i = 0,
            len = data.clients.length;

        for (; i < len; i++) {
            if (data.clients[i] === client) {
                data.clients.splice(i, 1);
            }
        }

        localStorage.clients = JSON.stringify(data);
    }

};
