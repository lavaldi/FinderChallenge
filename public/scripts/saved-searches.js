function savedSearches(){
    var st, dom, catchDom, afterCatchDom, subscribeEvents, fn, initialize;

    st = {
        filtersSidebar   : "filters",
        filtersItem      : "filters-item",
        tplSavedSearches : "tplSavedSearches",
        deleteSavedSearch: "js-delete-saved-search"
    };

    dom = {};

    catchDom = function () {
        dom.filtersSidebar = document.getElementById(st.filtersSidebar);
        dom.tplSavedSearches = document.getElementById(st.tplSavedSearches);
    };

    afterCatchDom = function () {
        fn.loadSavedSearches();
    };

    subscribeEvents = function () {
        dom.filtersSidebar.addEventListener("click", events.deleteSavedSearch);
    }

    events = {
        deleteSavedSearch: function (event) {
            if (event.target.classList.contains(st.deleteSavedSearch)) {
                var parent = fn.getParent(event.target, st.filtersItem);
                parent.parentNode.removeChild(parent);
            }
        }
    }

    fn = {
        loadSavedSearches: function () {
            loadJSON(JSON_FILE, function (content) {
                var list = content.entities.saved;
                tplHtml = _.template(dom.tplSavedSearches.innerHTML);
                tplWithData = tplHtml({list: list});
                dom.filtersSidebar.innerHTML = tplWithData;
            });
        },
        getParent: function (element, classSelector) {
            var parent = element.parentNode;

            while (!parent.classList.contains(classSelector)) {
                var tmp = parent;
                parent = tmp.parentNode;
            }

            return parent;
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
