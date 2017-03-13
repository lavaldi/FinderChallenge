function searchForm(){
    var st, dom, global, catchDom, afterCatchDom, subscribeEvents, fn, initialize;

    st = {
        inputSearch: "inputSearch",
        btnSearch  : "btnSearch"
    };

    dom = {};

    global = {
        awesomplete: null
    };

    catchDom = function () {
        dom.inputSearch = document.getElementById(st.inputSearch);
        dom.btnSearch = document.getElementById(st.btnSearch);
    };

    afterCatchDom = function () {
        fn.initAutocomplete();
    };

    subscribeEvents = function () {
        dom.inputSearch.addEventListener("keyup", fn.enableButton);
        dom.inputSearch.addEventListener("keyup", fn.showAutocomplete);
    };

    fn = {
        enableButton: function (event) {
            dom.btnSearch.disabled = true;
            if (dom.inputSearch.value.length > 1) {
                dom.btnSearch.disabled = false;
            }
        },
        initAutocomplete: function () {
            global.awesomplete = new Awesomplete(dom.inputSearch, {
              minChars: 3,
              maxItems: 7
            });
        },
        showAutocomplete: function () {
            loadJSON(JSON_FILE, function (content) {
                var list = content.data.map(function(item) { return item.title; });
                global.awesomplete.list = list;
            });
        }
    };

    initialize = function () {
        catchDom();
        afterCatchDom();
        subscribeEvents();
    }

    return {
        init: initialize
    }
}
