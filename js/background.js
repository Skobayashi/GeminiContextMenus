

var GeminiMenus = {
    // メニュー初期化処理
    init: function () {

        // コンテキストメニューの構築
        this.buildContextMenus();
    },


    // コンテキストメニューの構築
    buildContextMenus: function () {
        var me = this;

        chrome.contextMenus.removeAll(function() {
            var data = GeminiStore.getData(),
                i = 0,
                len = data.clients.length;

            var lock = chrome.contextMenus.create({
                'title': "ロック",
                'contexts': ['selection'],
                'documentUrlPatterns': ['*://www.chatwork.com/*']
            });

            var unlock = chrome.contextMenus.create({
                'title': "アンロック",
                'contexts': ['selection'],
                'documentUrlPatterns': ['*://www.chatwork.com/*']
            });


            for (; i < len; i++) {
                chrome.contextMenus.create({
                    'title': data.clients[i],
                    'contexts': ['selection'],
                    'parentId': lock,
                    'documentUrlPatterns': ['*://www.chatwork.com/*'],
                    'onclick': me.lock(data.clients[i])
                });

                chrome.contextMenus.create({
                    'title': data.clients[i],
                    'contexts': ['selection'],
                    'parentId': unlock,
                    'documentUrlPatterns': ['*://www.chatwork.com/*'],
                    'onclick': me.unlock(data.clients[i])
                });
            }
        });
    },


    // セクションロック処理
    lock: function (client) {
        return function (info, tab) {
            var data = GeminiStore.getData(),
                sections = info.selectionText;

            if (! data.api.hasOwnProperty(client)) {
                alert(client + 'のAPIキーが設定されていません');
                return false;
            }


            $.ajax({
                url: 'http://api.gemini/section/lock',
                type: 'POST',
                data: 'client='+client+'&key='+data.api[client]+'&val='+sections,
                success: function (data) {
                    alert(data.msg);
                }
            });
        };
    },


    // セクションアンロック処理
    unlock: function (client) {
        return function (info, tab) {
            var data = GeminiStore.getData(),
                sections = info.selectionText;

            if (! data.api.hasOwnProperty(client)) {
                alert(client + 'のAPIキーが設定されていません');
                return false;
            }


            $.ajax({
                url: 'http://api.gemini/section/unlock',
                type: 'POST',
                data: 'client='+client+'&key='+data.api[client]+'&val='+sections,
                success: function (data) {
                    alert(data.msg);
                }
            });
        };
    }
};


$(document).ready(function () {
    GeminiMenus.init();
});

