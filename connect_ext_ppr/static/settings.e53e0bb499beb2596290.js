/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ui/src/styles/app.styl":
/*!********************************!*\
  !*** ./ui/src/styles/app.styl ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://connect-extension-xvs/./ui/src/styles/app.styl?");

/***/ }),

/***/ "./ui/styles/index.css":
/*!*****************************!*\
  !*** ./ui/styles/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://connect-extension-xvs/./ui/styles/index.css?");

/***/ }),

/***/ "./ui/src/components.js":
/*!******************************!*\
  !*** ./ui/src/components.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addEventListener: () => (/* binding */ addEventListener),\n/* harmony export */   disableButton: () => (/* binding */ disableButton),\n/* harmony export */   enableButton: () => (/* binding */ enableButton),\n/* harmony export */   hideComponent: () => (/* binding */ hideComponent),\n/* harmony export */   prepareChart: () => (/* binding */ prepareChart),\n/* harmony export */   prepareMarketplaces: () => (/* binding */ prepareMarketplaces),\n/* harmony export */   prepareMarketplacesWithSwitch: () => (/* binding */ prepareMarketplacesWithSwitch),\n/* harmony export */   renderChart: () => (/* binding */ renderChart),\n/* harmony export */   renderMarketplaces: () => (/* binding */ renderMarketplaces),\n/* harmony export */   showComponent: () => (/* binding */ showComponent)\n/* harmony export */ });\n/*\nCopyright (c) 2023, Ingram Micro\nAll rights reserved.\n*/\n// prepare UI components\nconst prepareMarketplaces = (marketplaces) => {\n  try {\n    return marketplaces.reduce((list, marketplace) => `${list}<li class=\"list-item\">\n        <div class=\"list-item-image\">\n          <img src=\"${marketplace.icon}\" alt=\"Thumbnail\">\n        </div>\n        <div class=\"list-item-content\">\n          <h4>${marketplace.id} - ${marketplace.name}</h4>\n          <p>${marketplace.description}</p>\n        </div>\n      </li>`, '');\n  } catch (e) { return ''; }\n};\n\nconst prepareMarketplacesWithSwitch = (marketplaces) => {\n  try {\n    return marketplaces.reduce((list, marketplace) => `${list}<li class=\"list-item\">\n        <div class=\"list-item-image\">\n          <img src=\"${marketplace.icon}\" alt=\"Thumbnail\">\n        </div>\n        <div class=\"list-item-content\">\n          <h4>${marketplace.name}</h4>\n          <p>${marketplace.description}</p>\n        </div>\n        <div class=\"list-item switch\">\n          <label class=\"switch\">\n              <input type=\"checkbox\" role=\"switch\" value=\"${marketplace.id}\"${marketplace.checked ? ' checked' : ''}>\n              <span></span>\n          </label>\n        </div>\n      </li>`, '');\n  } catch (e) { return ''; }\n};\n\nconst prepareChart = (chartData) => `<img src=\"https://quickchart.io/chart?c=${encodeURI(JSON.stringify(chartData))}\">`;\n\n// render UI components\nconst renderMarketplaces = (marketplaces) => {\n  const element = document.getElementById('marketplaces');\n  element.innerHTML = marketplaces;\n};\n\nconst renderChart = (chart) => {\n  const element = document.getElementById('chart');\n  element.innerHTML = chart;\n};\n\n// render UI components - buttons\nconst enableButton = (id, text) => {\n  const element = document.getElementById(id);\n  element.disabled = false;\n  if (text) element.innerText = text;\n};\n\nconst disableButton = (id, text) => {\n  const element = document.getElementById(id);\n  element.disabled = true;\n  if (text) element.innerText = text;\n};\n\nconst addEventListener = (id, event, callback) => {\n  const element = document.getElementById(id);\n  element.addEventListener(event, callback);\n};\n\n// render UI components - show/hide\nconst showComponent = (id) => {\n  if (!id) return;\n  const element = document.getElementById(id);\n  element.classList.remove('hidden');\n};\n\nconst hideComponent = (id) => {\n  if (!id) return;\n  const element = document.getElementById(id);\n  element.classList.add('hidden');\n};\n\n\n//# sourceURL=webpack://connect-extension-xvs/./ui/src/components.js?");

/***/ }),

/***/ "./ui/src/pages.js":
/*!*************************!*\
  !*** ./ui/src/pages.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   index: () => (/* binding */ index),\n/* harmony export */   saveSettingsData: () => (/* binding */ saveSettingsData),\n/* harmony export */   settings: () => (/* binding */ settings)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./ui/src/utils.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ \"./ui/src/components.js\");\n/*\nCopyright (c) 2023, Ingram Micro\nAll rights reserved.\n*/\n\n\n\n\nconst saveSettingsData = async (app) => {\n  if (!app) return;\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.disableButton)('save', 'Saving...');\n  try {\n    const allMarketplaces = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getMarketplaces)();\n    const checkboxes = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.processCheckboxes)(document.getElementsByTagName('input'));\n    const marketplaces = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.processSelectedMarketplaces)(allMarketplaces, checkboxes);\n    await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.updateSettings)({ marketplaces });\n    app.emit('snackbar:message', 'Settings saved');\n  } catch (error) {\n    app.emit('snackbar:error', error);\n  }\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.enableButton)('save', 'Save');\n};\n\nconst index = () => {\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.hideComponent)('app');\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.showComponent)('loader');\n\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.hideComponent)('loader');\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.showComponent)('app');\n};\n\nconst settings = async (app) => {\n  if (!app) return;\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.showComponent)('loader');\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.hideComponent)('app');\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.hideComponent)('error');\n  try {\n    const allMarketplaces = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getMarketplaces)();\n    const { marketplaces: selectedMarketpaces } = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getSettings)();\n    const preparedMarketplaces = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.processMarketplaces)(allMarketplaces, selectedMarketpaces);\n    const marketplaces = (0,_components__WEBPACK_IMPORTED_MODULE_1__.prepareMarketplacesWithSwitch)(preparedMarketplaces);\n    (0,_components__WEBPACK_IMPORTED_MODULE_1__.renderMarketplaces)(marketplaces);\n    (0,_components__WEBPACK_IMPORTED_MODULE_1__.enableButton)('save', 'Save');\n    (0,_components__WEBPACK_IMPORTED_MODULE_1__.addEventListener)('save', 'click', saveSettingsData.bind(null, app));\n    (0,_components__WEBPACK_IMPORTED_MODULE_1__.showComponent)('app');\n  } catch (error) {\n    app.emit('snackbar:error', error);\n    (0,_components__WEBPACK_IMPORTED_MODULE_1__.showComponent)('error');\n  }\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__.hideComponent)('loader');\n};\n\n\n//# sourceURL=webpack://connect-extension-xvs/./ui/src/pages.js?");

/***/ }),

/***/ "./ui/src/pages/settings.js":
/*!**********************************!*\
  !*** ./ui/src/pages/settings.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var portal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! portal-vue */ \"./node_modules/portal-vue/dist/portal-vue.common.js\");\n/* harmony import */ var _cloudblueconnect_connect_ui_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cloudblueconnect/connect-ui-toolkit */ \"./node_modules/@cloudblueconnect/connect-ui-toolkit/dist/index.js\");\n/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages */ \"./ui/src/pages.js\");\n/* harmony import */ var _styles_app_styl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/app.styl */ \"./ui/src/styles/app.styl\");\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/index.css */ \"./ui/styles/index.css\");\n/*\nCopyright (c) 2023, Ingram Micro\nAll rights reserved.\n*/\n\n\n\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].use(portal_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n(0,_cloudblueconnect_connect_ui_toolkit__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ 'settings-card': _cloudblueconnect_connect_ui_toolkit__WEBPACK_IMPORTED_MODULE_1__.Card })\n  .then(_pages__WEBPACK_IMPORTED_MODULE_2__.settings);\n\n\n//# sourceURL=webpack://connect-extension-xvs/./ui/src/pages/settings.js?");

/***/ }),

/***/ "./ui/src/utils.js":
/*!*************************!*\
  !*** ./ui/src/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createDeploymentConfigurations: () => (/* binding */ createDeploymentConfigurations),\n/* harmony export */   getChart: () => (/* binding */ getChart),\n/* harmony export */   getDeployment: () => (/* binding */ getDeployment),\n/* harmony export */   getDeploymentConfigurations: () => (/* binding */ getDeploymentConfigurations),\n/* harmony export */   getDeployments: () => (/* binding */ getDeployments),\n/* harmony export */   getMarketplaces: () => (/* binding */ getMarketplaces),\n/* harmony export */   getPPR: () => (/* binding */ getPPR),\n/* harmony export */   getPPRs: () => (/* binding */ getPPRs),\n/* harmony export */   getSettings: () => (/* binding */ getSettings),\n/* harmony export */   processCheckboxes: () => (/* binding */ processCheckboxes),\n/* harmony export */   processMarketplaces: () => (/* binding */ processMarketplaces),\n/* harmony export */   processSelectedMarketplaces: () => (/* binding */ processSelectedMarketplaces),\n/* harmony export */   regeneratePPR: () => (/* binding */ regeneratePPR),\n/* harmony export */   updateSettings: () => (/* binding */ updateSettings),\n/* harmony export */   uploadPPR: () => (/* binding */ uploadPPR)\n/* harmony export */ });\n\n/*\nCopyright (c) 2023, Ingram Micro\nAll rights reserved.\n*/\n// API calls to the backend\nconst getSettings = () => fetch('/api/settings').then((response) => response.json());\n\nconst getChart = () => fetch('/api/chart').then((response) => response.json());\n\nconst getMarketplaces = () => fetch('/api/marketplaces').then((response) => response.json());\n\nconst getDeployments = () => fetch('/api/deployments').then((response) => response.json());\n\nconst getDeployment = (id) => fetch(`/api/deployments/${id}`).then((response) => response.json());\n\nconst getDeploymentConfigurations = (id) => fetch(`/api/deployments/${id}/configurations`).then((response) => response.json());\n\nconst createDeploymentConfigurations = (id, data) => fetch(`/api/deployments/${id}/configurations`, {\n  method: 'POST',\n  body: JSON.stringify(data),\n  headers: { 'Content-Type': 'application/json' },\n}).then((response) => response.json());\n\nconst getPPRs = (id) => fetch(`/api/deployments/${id}/pprs`)\n  .then((response) => response.json());\n\nconst getPPR = (deploymentId, id) => fetch(\n  `/api/deployments/${deploymentId}/pprs/${id}`,\n).then((response) => response.json());\n\nconst regeneratePPR = (id) => fetch(`/api/deployments/${id}/pprs`, {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({}),\n}).then((response) => response.json());\n\nconst uploadPPR = (deploymentId, {\n  id,\n  location,\n  size,\n  name,\n  mimeType,\n  description,\n}) => fetch(`/api/deployments/${deploymentId}/pprs`, {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({\n    file: {\n      id,\n      location,\n      size,\n      name,\n      mime_type: mimeType,\n    },\n    description,\n  }),\n}).then((response) => response.json());\n\nconst updateSettings = (settings) => fetch('/api/settings', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify(settings),\n}).then((response) => response.json());\n\n// data processing\nconst processMarketplaces = (\n  allMarketplaces,\n  selectedMarketplaces,\n) => allMarketplaces.map((marketplace) => {\n  const checked = !!selectedMarketplaces.find(\n    (selectedMarketplace) => selectedMarketplace.id === marketplace.id,\n  );\n\n  return { ...marketplace, checked };\n});\n\nconst processSelectedMarketplaces = (\n  allMarketplaces,\n  checkboxes,\n) => checkboxes.map((checkbox) => allMarketplaces.find(\n  (marketplace) => marketplace.id === checkbox.value,\n));\n\nconst processCheckboxes = (\n  checkboxes,\n) => Array.from(checkboxes).filter(checkbox => checkbox.checked);\n\n\n//# sourceURL=webpack://connect-extension-xvs/./ui/src/utils.js?");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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
/******/ 			"settings": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkconnect_extension_xvs"] = self["webpackChunkconnect_extension_xvs"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./ui/src/pages/settings.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;