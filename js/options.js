
var GeminiOptions = {
    init: function () {

        // クライアントリストをレンダリング
        this.renderClientList();

        // クライアント新規作成submitボタンハンドラ
        $('input#client-submit').click(this.submitCreateClient);

        // クライアントAPIキー編集イベントハンドラ
        $('input.edit-apikey').click(this.editApiKey);

        // クライント削除ハンドラ
        $('input.delete-client').click(this.deleteClient);
    },


    // クライアントリストをレンダリングする
    renderClientList: function () {
        var data = GeminiStore.getData(),
            i = 0,
            len = data.clients.length,
            txt = '<tr><th>Client</th><th>APIキー</th><th></th><th></th>';

        for (; i < len; i++) {
            var client = data.clients[i],
                key = GeminiStore.getApiKey(client);

            txt += '<tr>' +
                '<td>' + client + '</td>' +
                '<td>' + key + '</td>' +
                '<td><input type="button" class="btn edit-apikey" client="'+ client + '" value="APIキー編集"></td>' +
                '<td><input type="button" class="btn delete-client" client="'+ client + '" value="クライアント削除"></td>' +
                '</tr>';
        }

        $('tbody#client-list-tbody').html(txt);
    },


    // クライアント作成処理
    submitCreateClient: function () {
        var field = $('input[id="client-name"]'),
            val = field.val();

        if (val === '') {
            alert('client名がないよ');
            return false;
        }

        var data = GeminiStore.getData();
        if ($.inArray(val, data.clients) >= 0) {
            alert('既にclient名があるよ');
            return false;
        }

        data.clients.push(val);
        GeminiStore.updateClientData(data);

        location.reload();
    },



    // APIキーを編集する
    editApiKey: function () {
        var client = this.getAttribute('client'),
            key = prompt(client +' APIキー');

        if (key === '') {
            alert('APIキーを指定してください');
            return false;
        } else if (key === null) {
            return false;
        }

        GeminiStore.updateApiKey(client, key);
        location.reload();
    },


    // クライアントの削除
    deleteClient: function () {
        var client = this.getAttribute('client'),
            win = confirm(client+'を削除しますか？');

        if (win) {
            GeminiStore.deleteData(client);
            location.reload();
        
        } else {
            return false;
        }
    }
};


$(document).ready(function () {
    GeminiOptions.init();
});
