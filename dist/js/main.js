/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/alertMessage.js":
/*!****************************!*\
  !*** ./js/alertMessage.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showAlert": () => (/* binding */ showAlert),
/* harmony export */   "hideAlert": () => (/* binding */ hideAlert)
/* harmony export */ });
function showAlert() {
  document.querySelector('.alert-message').classList.remove('hide');
  document.querySelector('.alert-message').classList.add('show');
}

function hideAlert() {
  document.querySelector('.alert-message').classList.add('hide');
}



/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ "../node_modules/normalize.css/normalize.css");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/main.scss */ "./styles/main.scss");
/* harmony import */ var _todoComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todoComponent */ "./js/todoComponent.js");
/* harmony import */ var _alertMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alertMessage */ "./js/alertMessage.js");
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sortablejs */ "../node_modules/sortablejs/modular/sortable.esm.js");







var body = document.querySelector('body');
var form = document.querySelector('.todo__form');
var todosList = document.querySelector('.todo__list');
var input = document.getElementById('add');
var clearCompletedBtn = document.querySelector('.btn--clear');
var filterBtns = document.querySelectorAll('.filter-list li .btn');
var switcher = document.querySelector('.todo'); // *** Change theme ***

function changeTheme(e) {
  if (e.target.classList.contains('switcher')) {
    body.classList.toggle('dark-theme');
  }
} // *** Items left ***


function itemsLeft() {
  var count = todosList.childElementCount;
  var qty = document.querySelector('.qty');
  count === 1 ? qty.innerHTML = "".concat(count, " item") : qty.innerHTML = "".concat(count, " items");
}

itemsLeft(); // *** Add todo ***

function addTodo(e) {
  e.preventDefault();

  if (input.value === '') {
    (0,_alertMessage__WEBPACK_IMPORTED_MODULE_3__.showAlert)();
    setTimeout(_alertMessage__WEBPACK_IMPORTED_MODULE_3__.hideAlert, 1000);
  } else {
    todosList.insertAdjacentHTML('beforeend', (0,_todoComponent__WEBPACK_IMPORTED_MODULE_2__.default)(input.value));
    input.value = '';
    itemsLeft();
  }
} // *** Delete todo ***


function deleteTodo(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }

  itemsLeft();
} // *** Completed todo **


function completedTodo(e) {
  if (e.target.id === 'checkbox') {
    e.target.parentElement.classList.toggle('completed');
  }
} // *** Clear completed ***


function clearCompleted(e) {
  if (e.target.classList.contains('btn--clear')) {
    Array.from(todosList.children).forEach(function (todo) {
      if (todo.firstElementChild.classList.contains('completed')) {
        todo.remove();
      }
    });
  }
} // *** Filter todos ***


function filterTodos(e) {
  filterBtns.forEach(function (filterBtn) {
    filterBtn.classList.remove('active');
  });
  e.target.classList.add('active');
  var text = e.target.textContent.toLowerCase();
  Array.from(todosList.children).forEach(function (todo) {
    var checkedTodo = todo.firstElementChild.firstElementChild.checked;

    if (text === 'all') {
      todo.style.display = 'flex';
    }

    if (text === 'active') {
      checkedTodo ? todo.style.display = 'none' : todo.style.display = 'flex';
    }

    if (text === 'completed') {
      !checkedTodo ? todo.style.display = 'none' : todo.style.display = 'flex';
    }
  });
} // *** Drag and Drop ***


var sortable = new sortablejs__WEBPACK_IMPORTED_MODULE_4__.default(todosList, {
  animation: 350
}); // *** Events ***

switcher.addEventListener('click', changeTheme);
body.addEventListener('click', deleteTodo);
form.addEventListener('submit', addTodo);
todosList.addEventListener('click', completedTodo);
clearCompletedBtn.addEventListener('click', clearCompleted);
filterBtns.forEach(function (filterBtn) {
  filterBtn.addEventListener('click', filterTodos);
});

/***/ }),

/***/ "./js/todoComponent.js":
/*!*****************************!*\
  !*** ./js/todoComponent.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ todoComponent)
/* harmony export */ });
function todoComponent(todo) {
  return "\n\t\t<li class=\"todo__list-item\">\n\t\t\t<label class=\"text--large\"\n\t\t\t\t><input type=\"checkbox\" id=\"checkbox\" name=\"complete\" />\n\t\t\t\t<span class=\"custom-checkbox\"></span>\n\t\t\t\t".concat(todo, "</label\n\t\t\t>\n\t\t\t<svg\n\t\t\t\t\tclass=\"delete\"\n\t\t\t\t\txmlns=\"http://www.w3.org/2000/svg\"\n\t\t\t\t\twidth=\"18\"\n\t\t\t\t\theight=\"18\"\n\t\t\t\t>\n\t\t\t\t\t<path\n\t\t\t\t\tfill=\"#494C6B\"\n\t\t\t\t\tfill-rule=\"evenodd\"\n\t\t\t\t\td=\"M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z\"\n\t\t\t\t/>\n\t\t\t</svg>\n\t\t</li>\n\t");
}



/***/ }),

/***/ "./styles/main.scss":
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
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
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./js/index.js","vendors-node_modules_normalize_css_normalize_css-node_modules_sortablejs_modular_sortable_esm_js"]
/******/ 		];
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
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map