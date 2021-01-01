"use strict";

let _vue = _interopRequireDefault(require("vue"));

let _App = _interopRequireDefault(require("./App.vue"));

let _router = _interopRequireDefault(require("./router"));

let _Admin = _interopRequireDefault(require("./layouts/Admin"));

let _Default = _interopRequireDefault(require("./layouts/Default"));

let _vueSelect = _interopRequireDefault(require("vue-select"));

require("vue-select/src/scss/vue-select.scss");

let _vuejsPaginate = _interopRequireDefault(require("vuejs-paginate"));

let _index = _interopRequireDefault(require("./store/index"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_vue.default.config.productionTip = false;

_vue.default.component("default-layout", _Default.default);

_vue.default.component("admin-layout", _Admin.default);

_vue.default.component("v-select", _vueSelect.default);

_vue.default.component("paginate", _vuejsPaginate.default);

new _vue.default({
  router: _router.default,
  store: _index.default,
  render: function render(h) {
    return h(_App.default);
  }
}).$mount("#app");
