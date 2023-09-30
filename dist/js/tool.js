/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      name: null,
      route: null,
      message: null,
      resources: {},
      settings: {},
      selected: {
        resource: null,
        period: 'all',
        from: null,
        to: null,
        channel: null
      }
    };
  },
  mounted: function mounted() {
    this.name = Nova.config('reporter.name');
    this.route = '/nova-vendor/' + Nova.config('reporter.path') + '/';
    this.retrieve();
  },
  watch: {
    'selected.resource': function selectedResource() {
      this.clearFilter();
    },
    'selected.period': function selectedPeriod() {
      this.selected.from = null;
      this.selected.to = null;
      this.filter();
    },
    'selected.from': function selectedFrom() {
      this.selected.to = null;
      this.filter();
    },
    'selected.to': function selectedTo() {
      this.filter();
    }
  },
  methods: {
    download: function download() {
      var _this = this;
      Nova.request().post(this.route + 'download', {
        resource: this.selected.resource,
        fields: this.resources[this.selected.resource]['fields'],
        data: this.resources[this.selected.resource]['data'],
        period: this.selected.period,
        from: this.selected.from,
        to: this.selected.to,
        channel: this.selected.channel
      }).then(function (response) {
        if (response.data.status) {
          window.open(response.data.url, '_blank');
          Nova.success(response.data.message);
        } else {
          _this.message = response.data.message;
          Nova.error(response.data.error);
        }
      })["catch"](function (error) {
        console.log(error);
        Nova.error(error.response.data.message);
      });
    },
    formatDateField: function formatDateField(value) {
      var regex = new RegExp('^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{6}Z$');
      if (regex.test(value)) {
        var date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString();
        }
      }
      return value;
    },
    clearFilter: function clearFilter() {
      this.selected.period = 'all';
      this.selected.from = null;
      this.selected.to = null;
    },
    filter: function filter() {
      var _this2 = this;
      Nova.request().post(this.route + 'filter', {
        resource: this.selected.resource,
        fields: this.resources[this.selected.resource]['fields'],
        period: this.selected.period,
        from: this.selected.from,
        to: this.selected.to
      }).then(function (response) {
        if (response.data.status) {
          _this2.resources[_this2.selected.resource]['fields'] = response.data.data['fields'];
          _this2.resources[_this2.selected.resource]['data'] = response.data.data['data'];
        } else {
          _this2.message = response.data.message;
          Nova.error(response.data.error);
        }
      })["catch"](function (error) {
        console.log(error);
        Nova.error(error.response.data.message);
      });
    },
    retrieve: function retrieve() {
      var _this3 = this;
      Nova.request().post(this.route + 'resources').then(function (response) {
        if (response.data.status) {
          _this3.resources = response.data.resources;
          _this3.settings = response.data.settings;
          Object.entries(_this3.resources).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];
            return _this3.selected.resource = key;
          });
          Object.entries(_this3.settings.channels).forEach(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
              key = _ref4[0],
              value = _ref4[1];
            if (value) return _this3.selected.channel = key;
          });
        } else {
          _this3.message = response.data.message;
          Nova.error(response.data.error);
        }
      })["catch"](function (error) {
        console.log(error);
        Nova.error(error.response.data.message);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var _hoisted_1 = {
  "class": "flex flex-row items-center justify-between mb-4"
};
var _hoisted_2 = {
  key: 0
};
var _hoisted_3 = {
  "class": "flex flex-row items-center justify-between gap-2 mb-4"
};
var _hoisted_4 = {
  "class": "w-full text-center"
};
var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "resources-selection",
  "class": "text-lg text-gray-900 dark:text-white mb-1"
}, "RESOURCE", -1 /* HOISTED */);
var _hoisted_6 = ["value"];
var _hoisted_7 = {
  key: 0,
  "class": "w-full text-center"
};
var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "resources-period",
  "class": "text-lg text-gray-900 dark:text-white mb-1"
}, "PERIOD", -1 /* HOISTED */);
var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "all",
  "class": "font-bold"
}, "ALL TIME", -1 /* HOISTED */);
var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "today",
  "class": "font-bold"
}, "TODAY", -1 /* HOISTED */);
var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "last_week",
  "class": "font-bold"
}, "LAST WEEK", -1 /* HOISTED */);
var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "last_month",
  "class": "font-bold"
}, "LAST MONTH", -1 /* HOISTED */);
var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "last_year",
  "class": "font-bold"
}, "LAST YEAR", -1 /* HOISTED */);
var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "custom",
  "class": "font-bold"
}, "CUSTOM", -1 /* HOISTED */);
var _hoisted_15 = [_hoisted_9, _hoisted_10, _hoisted_11, _hoisted_12, _hoisted_13, _hoisted_14];
var _hoisted_16 = {
  key: 1,
  "class": "w-full text-center"
};
var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "resources-from",
  "class": "text-lg text-gray-900 dark:text-white mb-1"
}, "FROM", -1 /* HOISTED */);
var _hoisted_18 = {
  key: 2,
  "class": "w-full text-center"
};
var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "resources-to",
  "class": "text-lg text-gray-900 dark:text-white mb-1"
}, "TO", -1 /* HOISTED */);
var _hoisted_20 = {
  key: 3,
  "class": "w-full text-center"
};
var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "resources-channel",
  "class": "text-lg text-gray-900 dark:text-white mb-1"
}, "CHANNEL", -1 /* HOISTED */);
var _hoisted_22 = {
  key: 0,
  value: "pdf",
  "class": "font-bold"
};
var _hoisted_23 = {
  key: 1,
  value: "csv",
  "class": "font-bold"
};
var _hoisted_24 = {
  key: 0
};
var _hoisted_25 = {
  "class": "flex flex-col"
};
var _hoisted_26 = {
  key: 0,
  "class": "flex flex-row justify-between gap-2 bg-gray-500 text-white p-2 rounded"
};
var _hoisted_27 = {
  key: 1,
  "class": "flex flex-col"
};
var _hoisted_28 = {
  key: 0
};
var _hoisted_29 = {
  "class": "flex flex-row justify-between gap-2 p-2 bg-white even:bg-slate-50"
};
var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
  "class": "mt-1"
}, null, -1 /* HOISTED */);
var _hoisted_31 = {
  "class": "flex flex-col"
};
var _hoisted_32 = {
  key: 0,
  "class": "flex flex-row justify-between gap-2 p-2 rounded"
};
var _hoisted_33 = {
  key: 0
};
var _hoisted_34 = {
  key: 1
};
var _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "flex flex-col items-center justify-center h-full"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  width: "200px",
  height: "200px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  opacity: "0.5",
  d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
  fill: "#1C274C"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z",
  fill: "#1C274C"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z",
  fill: "#1C274C"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z",
  fill: "#1C274C"
})]), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
  "class": "font-bold text-lg text-red-600"
}, "No data available.")], -1 /* HOISTED */);
var _hoisted_36 = [_hoisted_35];
var _hoisted_37 = {
  key: 1,
  "class": "flex flex-col items-center justify-center h-full"
};
var _hoisted_38 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  width: "200px",
  height: "200px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  opacity: "0.5",
  d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
  fill: "#1C274C"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z",
  fill: "#1C274C"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z",
  fill: "#1C274C"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  d: "M9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z",
  fill: "#1C274C"
})], -1 /* HOISTED */);
var _hoisted_39 = {
  "class": "font-bold text-lg text-red-600"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Head = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Head");
  var _component_Heading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Heading");
  var _component_Card = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Card");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Head, {
    title: $data.name
  }, null, 8 /* PROPS */, ["title"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Heading, null, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.name), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  }), $data.selected.channel !== null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.download && $options.download.apply($options, arguments);
    }),
    "class": "font-bold bg-gray-900 border border-gray-300 text-white text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-6 py-2"
  }, " DOWNLOAD ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Card, {
    "class": "flex flex-col p-6",
    style: {
      "min-height": "300px"
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [Object.entries($data.resources).length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return $data.selected.resource = $event;
        }),
        id: "resources-selection",
        "class": "uppercase font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
      }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.resources, function (value, key) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
          value: key,
          "class": "font-bold uppercase"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(value.name), 9 /* TEXT, PROPS */, _hoisted_6);
      }), 256 /* UNKEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selected.resource]])]), $data.resources[$data.selected.resource].period ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [_hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
          return $data.selected.period = $event;
        }),
        id: "resources-period",
        "class": "font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
      }, _hoisted_15, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selected.period]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.selected.period === 'custom' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [_hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        type: "date",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          return $data.selected.from = $event;
        }),
        id: "resources-from",
        "class": "font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.selected.from]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.selected.period === 'custom' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [_hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        type: "date",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
          return $data.selected.to = $event;
        }),
        id: "resources-to",
        "class": "font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.selected.to]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.selected.channel !== null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [_hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          return $data.selected.channel = $event;
        }),
        id: "resources-channel",
        "class": "font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
      }, [$data.settings.channels.pdf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", _hoisted_22, "PDF")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.settings.channels.csv ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", _hoisted_23, "CSV")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selected.channel]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.resources[$data.selected.resource]['data'].length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.resources[$data.selected.resource], function (value, key) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [key === 'fields' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(value, function (field, key, index) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["font-bold w-full", index === 0 ? 'text-left' : index === Object.entries(value).length - 1 ? 'text-right' : 'text-center'])
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(field.label), 3 /* TEXT, CLASS */);
        }), 256 /* UNKEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), key === 'data' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, [value.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(value, function (row) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(row, function (item, key, index) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
              "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["w-full", index === 0 ? 'text-left' : index === Object.entries(row).length - 1 ? 'text-right' : 'text-center'])
            }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDateField(item)), 3 /* TEXT, CLASS */);
          }), 256 /* UNKEYED_FRAGMENT */))]);
        }), 256 /* UNKEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
      }), 256 /* UNKEYED_FRAGMENT */)), _hoisted_30, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.resources[$data.selected.resource], function (value, key) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [key === 'fields' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(value, function (field, key, index) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["font-bold w-full uppercase", index === 0 ? 'text-left' : index === Object.entries(value).length - 1 ? 'text-right' : 'text-center'])
          }, ['sum' in field ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(field.sum), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
        }), 256 /* UNKEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
      }), 256 /* UNKEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, _hoisted_36))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_37, [_hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.message), 1 /* TEXT */)]))];
    }),

    _: 1 /* STABLE */
  })]);
}

/***/ }),

/***/ "./resources/js/tool.js":
/*!******************************!*\
  !*** ./resources/js/tool.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_Tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/Tool */ "./resources/js/pages/Tool.vue");

Nova.booting(function (app, store) {
  Nova.inertia('NovaReportGenerator', _pages_Tool__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./resources/css/tool.css":
/*!********************************!*\
  !*** ./resources/css/tool.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vue-loader/dist/exportHelper.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-loader/dist/exportHelper.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// runtime helper for setting properties on components
// in a tree-shakable way
exports["default"] = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "./resources/js/pages/Tool.vue":
/*!*************************************!*\
  !*** ./resources/js/pages/Tool.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tool_vue_vue_type_template_id_ef10eebe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tool.vue?vue&type=template&id=ef10eebe */ "./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe");
/* harmony import */ var _Tool_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tool.vue?vue&type=script&lang=js */ "./resources/js/pages/Tool.vue?vue&type=script&lang=js");
/* harmony import */ var C_laragon_www_polas_nova_components_NovaReportGenerator_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_laragon_www_polas_nova_components_NovaReportGenerator_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Tool_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Tool_vue_vue_type_template_id_ef10eebe__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/Tool.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/Tool.vue?vue&type=script&lang=js":
/*!*************************************************************!*\
  !*** ./resources/js/pages/Tool.vue?vue&type=script&lang=js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tool.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_template_id_ef10eebe__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_template_id_ef10eebe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tool.vue?vue&type=template&id=ef10eebe */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe");


/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/***/ ((module) => {

module.exports = Vue;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/tool": 0,
/******/ 			"css/tool": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksalekur_nova_report_generator"] = self["webpackChunksalekur_nova_report_generator"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/tool"], () => (__webpack_require__("./resources/js/tool.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/tool"], () => (__webpack_require__("./resources/css/tool.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;