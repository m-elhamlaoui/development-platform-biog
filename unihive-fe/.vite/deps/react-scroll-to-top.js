import {
  require_react
} from "./chunk-UMBEC6V5.js";
import {
  __commonJS
} from "./chunk-ROME4SDB.js";

// node_modules/react-scroll-to-top/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-scroll-to-top/dist/index.js"(exports, module) {
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var React = require_react();
    var React__default = _interopDefault(React);
    var __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    }
    function styleInject(css, ref) {
      if (ref === void 0)
        ref = {};
      var insertAt = ref.insertAt;
      if (!css || typeof document === "undefined") {
        return;
      }
      var head = document.head || document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      style.type = "text/css";
      if (insertAt === "top") {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }
    var css_248z = ".scroll-to-top {\n  background-color: white;\n  right: 40px;\n  bottom: 40px;\n  position: fixed;\n  z-index: 2;\n  cursor: pointer;\n  border-radius: 7px;\n  width: 40px;\n  height: 40px;\n  box-shadow: 0 9px 25px 0 rgba(132, 128, 177, 0.28);\n  border: none;\n}\n\n.scroll-to-top:active {\n  transform: matrix(0.95, 0, 0, 0.95, 0, 0);\n}\n";
    styleInject(css_248z);
    function scrollToTop(smooth) {
      if (smooth === void 0) {
        smooth = false;
      }
      if (smooth) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else {
        document.documentElement.scrollTop = 0;
      }
    }
    var ScrollToTop = function(_a) {
      var _b = _a.top, top = _b === void 0 ? 20 : _b, _c = _a.className, className = _c === void 0 ? "" : _c, _d = _a.color, color = _d === void 0 ? "black" : _d, _e = _a.smooth, smooth = _e === void 0 ? false : _e, _f = _a.component, component = _f === void 0 ? "" : _f, _g = _a.viewBox, viewBox = _g === void 0 ? "0 0 256 256" : _g, _h = _a.svgPath, svgPath = _h === void 0 ? "M222.138,91.475l-89.6-89.6c-2.5-2.5-6.551-2.5-9.051,0l-89.6,89.6c-2.5,2.5-2.5,6.551,0,9.051s6.744,2.5,9.244,0L122,21.85  V249.6c0,3.535,2.466,6.4,6,6.4s6-2.865,6-6.4V21.85l78.881,78.676c1.25,1.25,2.992,1.875,4.629,1.875s3.326-0.625,4.576-1.875  C224.586,98.025,224.638,93.975,222.138,91.475z" : _h, _j = _a.width, width = _j === void 0 ? "28" : _j, _k = _a.height, height = _k === void 0 ? "28" : _k, props = __rest(_a, ["top", "className", "color", "smooth", "component", "viewBox", "svgPath", "width", "height"]);
      var _l = React.useState(false), visible = _l[0], setVisible = _l[1];
      React.useEffect(function() {
        var onScroll = function() {
          setVisible(document.documentElement.scrollTop >= top);
        };
        onScroll();
        document.addEventListener("scroll", onScroll);
        return function() {
          return document.removeEventListener("scroll", onScroll);
        };
      }, [top]);
      return React__default.createElement(React__default.Fragment, null, visible && React__default.createElement("button", __assign({ className: "scroll-to-top " + className, onClick: function() {
        return scrollToTop(smooth);
      }, "aria-label": "Scroll to top" }, props), component || React__default.createElement(
        "svg",
        { width, height, fill: color, viewBox },
        React__default.createElement("path", { d: svgPath })
      )));
    };
    module.exports = ScrollToTop;
  }
});
export default require_dist();
/*! Bundled license information:

react-scroll-to-top/dist/index.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=react-scroll-to-top.js.map
