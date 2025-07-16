import {
  require_react
} from "./chunk-N4N5IM6X.js";
import {
  __commonJS
} from "./chunk-LK32TJAX.js";

// node_modules/react-apple-signin-auth/dist/hooks/useScript.js
var require_useScript = __commonJS({
  "node_modules/react-apple-signin-auth/dist/hooks/useScript.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _react = require_react();
    function useScript(src) {
      (0, _react.useEffect)(
        function() {
          if (!src) {
            return;
          }
          var script = document.querySelectorAll('script[src="'.concat(src, '"]'))[0];
          if (!script) {
            script = document.createElement("script");
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
          }
        },
        [src]
        // Only re-run effect if script src changes
      );
    }
    var _default = useScript;
    exports.default = _default;
  }
});

// node_modules/react-apple-signin-auth/dist/utils/waitForVar.js
var require_waitForVar = __commonJS({
  "node_modules/react-apple-signin-auth/dist/utils/waitForVar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var waitForVar = function waitForVar2(name) {
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        pollFrequency: 1e3,
        retries: 100,
        parent: window
      }, _ref$pollFrequency = _ref.pollFrequency, pollFrequency = _ref$pollFrequency === void 0 ? 1e3 : _ref$pollFrequency, _ref$retries = _ref.retries, inRetries = _ref$retries === void 0 ? 100 : _ref$retries, _ref$parent = _ref.parent, parent = _ref$parent === void 0 ? window : _ref$parent;
      if (parent && parent.hasOwnProperty(name)) {
        return Promise.resolve(parent[name]);
      }
      if (!inRetries) {
        return Promise.resolve(void 0);
      }
      var retries = inRetries - 1;
      return new Promise(function(resolve) {
        return setTimeout(resolve, typeof pollFrequency === "function" ? pollFrequency({
          retries
        }) : pollFrequency);
      }).then(function() {
        return waitForVar2(name, {
          pollFrequency,
          parent,
          retries
        });
      });
    };
    var _default = waitForVar;
    exports.default = _default;
  }
});

// node_modules/react-apple-signin-auth/dist/appleAuthHelpers/index.js
var require_appleAuthHelpers = __commonJS({
  "node_modules/react-apple-signin-auth/dist/appleAuthHelpers/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _waitForVar = _interopRequireDefault(require_waitForVar());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var APPLE_SCRIPT_SRC = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    var signIn = function signIn2(_ref) {
      var authOptions = _ref.authOptions, onSuccess = _ref.onSuccess, onError = _ref.onError;
      return (
        /** wait for apple sript to load */
        (0, _waitForVar.default)("AppleID").then(function() {
          if (!window.AppleID) {
            console.error(new Error("Error loading apple script"));
          }
          window.AppleID.auth.init(authOptions);
          return window.AppleID.auth.signIn().then(function(response) {
            if (onSuccess) {
              onSuccess(response);
            }
            return response;
          }).catch(function(err) {
            if (onError) {
              onError(err);
            } else {
              console.error(err);
            }
            return null;
          });
        }).catch(function(err) {
          if (onError) {
            onError(err);
          } else {
            console.error(err);
          }
          return null;
        })
      );
    };
    var _default = {
      APPLE_SCRIPT_SRC,
      signIn
    };
    exports.default = _default;
  }
});

// node_modules/react-apple-signin-auth/dist/AppleSigninButton/AppleSigninButton.js
var require_AppleSigninButton = __commonJS({
  "node_modules/react-apple-signin-auth/dist/AppleSigninButton/AppleSigninButton.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _react = _interopRequireDefault(require_react());
    var _useScript = _interopRequireDefault(require_useScript());
    var _appleAuthHelpers = _interopRequireDefault(require_appleAuthHelpers());
    var _excluded = ["onSuccess", "onError", "skipScript", "authOptions", "iconProps", "render", "uiType", "className", "noDefaultStyle", "buttonExtraChildren"];
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var _style = "\n.react-apple-signin-auth-btn {\n  background-color: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  border-radius: 4px;\n  padding: 0 8px 0 2px;\n  font-size: 14px;\n  font-size: 1em;\n  line-height: 1;\n  border: 1px solid #000;\n  overflow: hidden;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n}\n.react-apple-signin-auth-btn-light {\n  background-color: #FFF;\n  color: #000;\n  border-color: #000;\n}\n.react-apple-signin-auth-btn-dark {\n  background-color: #000;\n  color: #FFF;\n  border-color: #FFF;\n}".replace(/ {2}|\n/g, "");
    var AppleSigninButton = function AppleSigninButton2(_ref) {
      var onSuccess = _ref.onSuccess, onError = _ref.onError, _ref$skipScript = _ref.skipScript, skipScript = _ref$skipScript === void 0 ? false : _ref$skipScript, authOptions = _ref.authOptions, iconProps = _ref.iconProps, render = _ref.render, _ref$uiType = _ref.uiType, uiType = _ref$uiType === void 0 ? "dark" : _ref$uiType, className = _ref.className, _ref$noDefaultStyle = _ref.noDefaultStyle, noDefaultStyle = _ref$noDefaultStyle === void 0 ? false : _ref$noDefaultStyle, _ref$buttonExtraChild = _ref.buttonExtraChildren, buttonExtraChildren = _ref$buttonExtraChild === void 0 ? "Continue with Apple" : _ref$buttonExtraChild, rest = _objectWithoutProperties(_ref, _excluded);
      (0, _useScript.default)(skipScript ? null : _appleAuthHelpers.default.APPLE_SCRIPT_SRC);
      var handleClick = function handleClick2(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        _appleAuthHelpers.default.signIn({
          authOptions,
          onSuccess,
          onError
        });
      };
      var props = _objectSpread({
        children: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("svg", _extends({
          width: "24px",
          height: "44px",
          viewBox: "0 0 24 44"
        }, iconProps), _react.default.createElement("g", {
          stroke: "none",
          strokeWidth: "1",
          fill: "none",
          fillRule: "evenodd"
        }, _react.default.createElement("rect", {
          fill: uiType === "light" ? "#FFF" : "#000",
          x: "0",
          y: "0",
          width: "24",
          height: "44"
        }), _react.default.createElement("path", {
          d: "M12.2337427,16.9879688 C12.8896607,16.9879688 13.7118677,16.5445313 14.2014966,15.9532812 C14.6449341,15.4174609 14.968274,14.6691602 14.968274,13.9208594 C14.968274,13.8192383 14.9590357,13.7176172 14.9405591,13.6344727 C14.2107349,13.6621875 13.3330982,14.1241016 12.8065162,14.7430664 C12.3907935,15.2142188 12.012024,15.9532812 12.012024,16.7108203 C12.012024,16.8216797 12.0305005,16.9325391 12.0397388,16.9694922 C12.0859302,16.9787305 12.1598365,16.9879688 12.2337427,16.9879688 Z M9.92417241,28.1662891 C10.8202857,28.1662891 11.2175318,27.5658008 12.3353638,27.5658008 C13.4716724,27.5658008 13.721106,28.1478125 14.7188404,28.1478125 C15.6980982,28.1478125 16.3540162,27.2424609 16.972981,26.3555859 C17.6658521,25.339375 17.9522388,24.3416406 17.9707154,24.2954492 C17.9060474,24.2769727 16.0306763,23.5101953 16.0306763,21.3576758 C16.0306763,19.491543 17.5088013,18.6508594 17.5919459,18.5861914 C16.612688,17.1819727 15.1253248,17.1450195 14.7188404,17.1450195 C13.6194849,17.1450195 12.7233716,17.8101758 12.1598365,17.8101758 C11.5501099,17.8101758 10.7463794,17.1819727 9.79483648,17.1819727 C7.98413335,17.1819727 6.14571538,18.6785742 6.14571538,21.5054883 C6.14571538,23.2607617 6.8293482,25.1176563 7.67003179,26.3186328 C8.39061773,27.3348438 9.01882085,28.1662891 9.92417241,28.1662891 Z",
          fill: uiType === "light" ? "#000" : "#FFF",
          fillRule: "nonzero"
        }))), buttonExtraChildren),
        onClick: handleClick
      }, rest);
      if (render) {
        return render(props);
      }
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("button", _extends({
        className: "".concat(noDefaultStyle ? "" : "react-apple-signin-auth-btn react-apple-signin-auth-btn-".concat(uiType)).concat(className ? " ".concat(className) : ""),
        type: "button",
        "aria-label": "Signin with apple ID"
      }, props)), noDefaultStyle ? null : _react.default.createElement("style", null, _style));
    };
    var _default = AppleSigninButton;
    exports.default = _default;
  }
});

// node_modules/react-apple-signin-auth/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-apple-signin-auth/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "appleAuthHelpers", {
      enumerable: true,
      get: function get() {
        return _appleAuthHelpers.default;
      }
    });
    Object.defineProperty(exports, "useScript", {
      enumerable: true,
      get: function get() {
        return _useScript.default;
      }
    });
    exports.default = void 0;
    var _AppleSigninButton = _interopRequireDefault(require_AppleSigninButton());
    var _appleAuthHelpers = _interopRequireDefault(require_appleAuthHelpers());
    var _useScript = _interopRequireDefault(require_useScript());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = _AppleSigninButton.default;
    exports.default = _default;
  }
});
export default require_dist();
//# sourceMappingURL=react-apple-signin-auth.js.map
