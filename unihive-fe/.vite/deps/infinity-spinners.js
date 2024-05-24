import {
  require_react
} from "./chunk-UMBEC6V5.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/infinity-spinners/index.mjs
var import_react = __toESM(require_react(), 1);
var P = function() {
  return P = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, P.apply(this, arguments);
};
function W(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function qt(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var Ut = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var Xt = qt(
  function(e) {
    return Ut.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
var b = "-ms-";
var le = "-moz-";
var m = "-webkit-";
var mt = "comm";
var ke = "rule";
var qe = "decl";
var Kt = "@import";
var gt = "@keyframes";
var Zt = "@layer";
var Qt = Math.abs;
var Ue = String.fromCharCode;
var Me = Object.assign;
function Jt(e, t) {
  return N(e, 0) ^ 45 ? (((t << 2 ^ N(e, 0)) << 2 ^ N(e, 1)) << 2 ^ N(e, 2)) << 2 ^ N(e, 3) : 0;
}
function yt(e) {
  return e.trim();
}
function j(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function l(e, t, n) {
  return e.replace(t, n);
}
function ge(e, t) {
  return e.indexOf(t);
}
function N(e, t) {
  return e.charCodeAt(t) | 0;
}
function Z(e, t, n) {
  return e.slice(t, n);
}
function D(e) {
  return e.length;
}
function vt(e) {
  return e.length;
}
function ce(e, t) {
  return t.push(e), e;
}
function en(e, t) {
  return e.map(t).join("");
}
function et(e, t) {
  return e.filter(function(n) {
    return !j(n, t);
  });
}
var Ee = 1;
var Q = 1;
var wt = 0;
var I = 0;
var A = 0;
var ne = "";
function xe(e, t, n, r, o, i, s, c) {
  return { value: e, root: t, parent: n, type: r, props: o, children: i, line: Ee, column: Q, length: s, return: "", siblings: c };
}
function L(e, t) {
  return Me(xe("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function K(e) {
  for (; e.root; )
    e = L(e.root, { children: [e] });
  ce(e, e.siblings);
}
function tn() {
  return A;
}
function nn() {
  return A = I > 0 ? N(ne, --I) : 0, Q--, A === 10 && (Q = 1, Ee--), A;
}
function T() {
  return A = I < wt ? N(ne, I++) : 0, Q++, A === 10 && (Q = 1, Ee++), A;
}
function H() {
  return N(ne, I);
}
function ye() {
  return I;
}
function $e(e, t) {
  return Z(ne, e, t);
}
function Be(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function rn(e) {
  return Ee = Q = 1, wt = D(ne = e), I = 0, [];
}
function on(e) {
  return ne = "", e;
}
function Ie(e) {
  return yt($e(I - 1, Le(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function sn(e) {
  for (; (A = H()) && A < 33; )
    T();
  return Be(e) > 2 || Be(A) > 3 ? "" : " ";
}
function an(e, t) {
  for (; --t && T() && !(A < 48 || A > 102 || A > 57 && A < 65 || A > 70 && A < 97); )
    ;
  return $e(e, ye() + (t < 6 && H() == 32 && T() == 32));
}
function Le(e) {
  for (; T(); )
    switch (A) {
      case e:
        return I;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Le(A);
        break;
      case 40:
        e === 41 && Le(e);
        break;
      case 92:
        T();
        break;
    }
  return I;
}
function cn(e, t) {
  for (; T() && e + A !== 47 + 10; )
    if (e + A === 42 + 42 && H() === 47)
      break;
  return "/*" + $e(t, I - 1) + "*" + Ue(e === 47 ? e : T());
}
function ln(e) {
  for (; !Be(H()); )
    T();
  return $e(e, I);
}
function un(e) {
  return on(ve("", null, null, null, [""], e = rn(e), 0, [0], e));
}
function ve(e, t, n, r, o, i, s, c, a) {
  for (var d = 0, v = 0, f = s, g = 0, y = 0, S = 0, $ = 1, O = 1, C = 1, E = 0, w = "", k = o, x = i, h = r, u = w; O; )
    switch (S = E, E = T()) {
      case 40:
        if (S != 108 && N(u, f - 1) == 58) {
          ge(u += l(Ie(E), "&", "&\f"), "&\f") != -1 && (C = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        u += Ie(E);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        u += sn(S);
        break;
      case 92:
        u += an(ye() - 1, 7);
        continue;
      case 47:
        switch (H()) {
          case 42:
          case 47:
            ce(pn(cn(T(), ye()), t, n, a), a);
            break;
          default:
            u += "/";
        }
        break;
      case 123 * $:
        c[d++] = D(u) * C;
      case 125 * $:
      case 59:
      case 0:
        switch (E) {
          case 0:
          case 125:
            O = 0;
          case 59 + v:
            C == -1 && (u = l(u, /\f/g, "")), y > 0 && D(u) - f && ce(y > 32 ? nt(u + ";", r, n, f - 1, a) : nt(l(u, " ", "") + ";", r, n, f - 2, a), a);
            break;
          case 59:
            u += ";";
          default:
            if (ce(h = tt(u, t, n, d, v, o, c, w, k = [], x = [], f, i), i), E === 123)
              if (v === 0)
                ve(u, t, h, h, k, i, f, c, x);
              else
                switch (g === 99 && N(u, 3) === 110 ? 100 : g) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    ve(e, h, h, r && ce(tt(e, h, h, 0, 0, o, c, w, o, k = [], f, x), x), o, x, f, c, r ? k : x);
                    break;
                  default:
                    ve(u, h, h, h, [""], x, 0, c, x);
                }
        }
        d = v = y = 0, $ = C = 1, w = u = "", f = s;
        break;
      case 58:
        f = 1 + D(u), y = S;
      default:
        if ($ < 1) {
          if (E == 123)
            --$;
          else if (E == 125 && $++ == 0 && nn() == 125)
            continue;
        }
        switch (u += Ue(E), E * $) {
          case 38:
            C = v > 0 ? 1 : (u += "\f", -1);
            break;
          case 44:
            c[d++] = (D(u) - 1) * C, C = 1;
            break;
          case 64:
            H() === 45 && (u += Ie(T())), g = H(), v = f = D(w = u += ln(ye())), E++;
            break;
          case 45:
            S === 45 && D(u) == 2 && ($ = 0);
        }
    }
  return i;
}
function tt(e, t, n, r, o, i, s, c, a, d, v, f) {
  for (var g = o - 1, y = o === 0 ? i : [""], S = vt(y), $ = 0, O = 0, C = 0; $ < r; ++$)
    for (var E = 0, w = Z(e, g + 1, g = Qt(O = s[$])), k = e; E < S; ++E)
      (k = yt(O > 0 ? y[E] + " " + w : l(w, /&\f/g, y[E]))) && (a[C++] = k);
  return xe(e, t, n, o === 0 ? ke : c, a, d, v, f);
}
function pn(e, t, n, r) {
  return xe(e, t, n, mt, Ue(tn()), Z(e, 2, -2), 0, r);
}
function nt(e, t, n, r, o) {
  return xe(e, t, n, qe, Z(e, 0, r), Z(e, r + 1, -1), r, o);
}
function bt(e, t, n) {
  switch (Jt(e, t)) {
    case 5103:
      return m + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return m + e + e;
    case 4789:
      return le + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return m + e + le + e + b + e + e;
    case 5936:
      switch (N(e, t + 11)) {
        case 114:
          return m + e + b + l(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return m + e + b + l(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return m + e + b + l(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    case 6828:
    case 4268:
    case 2903:
      return m + e + b + e + e;
    case 6165:
      return m + e + b + "flex-" + e + e;
    case 5187:
      return m + e + l(e, /(\w+).+(:[^]+)/, m + "box-$1$2" + b + "flex-$1$2") + e;
    case 5443:
      return m + e + b + "flex-item-" + l(e, /flex-|-self/g, "") + (j(e, /flex-|baseline/) ? "" : b + "grid-row-" + l(e, /flex-|-self/g, "")) + e;
    case 4675:
      return m + e + b + "flex-line-pack" + l(e, /align-content|flex-|-self/g, "") + e;
    case 5548:
      return m + e + b + l(e, "shrink", "negative") + e;
    case 5292:
      return m + e + b + l(e, "basis", "preferred-size") + e;
    case 6060:
      return m + "box-" + l(e, "-grow", "") + m + e + b + l(e, "grow", "positive") + e;
    case 4554:
      return m + l(e, /([^-])(transform)/g, "$1" + m + "$2") + e;
    case 6187:
      return l(l(l(e, /(zoom-|grab)/, m + "$1"), /(image-set)/, m + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return l(e, /(image-set\([^]*)/, m + "$1$`$1");
    case 4968:
      return l(l(e, /(.+:)(flex-)?(.*)/, m + "box-pack:$3" + b + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + m + e + e;
    case 4200:
      if (!j(e, /flex-|baseline/))
        return b + "grid-column-align" + Z(e, t) + e;
      break;
    case 2592:
    case 3360:
      return b + l(e, "template-", "") + e;
    case 4384:
    case 3616:
      return n && n.some(function(r, o) {
        return t = o, j(r.props, /grid-\w+-end/);
      }) ? ~ge(e + (n = n[t].value), "span") ? e : b + l(e, "-start", "") + e + b + "grid-row-span:" + (~ge(n, "span") ? j(n, /\d+/) : +j(n, /\d+/) - +j(e, /\d+/)) + ";" : b + l(e, "-start", "") + e;
    case 4896:
    case 4128:
      return n && n.some(function(r) {
        return j(r.props, /grid-\w+-start/);
      }) ? e : b + l(l(e, "-end", "-span"), "span ", "") + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return l(e, /(.+)-inline(.+)/, m + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (D(e) - 1 - t > 6)
        switch (N(e, t + 1)) {
          case 109:
            if (N(e, t + 4) !== 45)
              break;
          case 102:
            return l(e, /(.+:)(.+)-([^]+)/, "$1" + m + "$2-$3$1" + le + (N(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~ge(e, "stretch") ? bt(l(e, "stretch", "fill-available"), t, n) + e : e;
        }
      break;
    case 5152:
    case 5920:
      return l(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(r, o, i, s, c, a, d) {
        return b + o + ":" + i + d + (s ? b + o + "-span:" + (c ? a : +a - +i) + d : "") + e;
      });
    case 4949:
      if (N(e, t + 6) === 121)
        return l(e, ":", ":" + m) + e;
      break;
    case 6444:
      switch (N(e, N(e, 14) === 45 ? 18 : 11)) {
        case 120:
          return l(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + m + (N(e, 14) === 45 ? "inline-" : "") + "box$3$1" + m + "$2$3$1" + b + "$2box$3") + e;
        case 100:
          return l(e, ":", ":" + b) + e;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return l(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function be(e, t) {
  for (var n = "", r = 0; r < e.length; r++)
    n += t(e[r], r, e, t) || "";
  return n;
}
function dn(e, t, n, r) {
  switch (e.type) {
    case Zt:
      if (e.children.length)
        break;
    case Kt:
    case qe:
      return e.return = e.return || e.value;
    case mt:
      return "";
    case gt:
      return e.return = e.value + "{" + be(e.children, r) + "}";
    case ke:
      if (!D(e.value = e.props.join(",")))
        return "";
  }
  return D(n = be(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
function hn(e) {
  var t = vt(e);
  return function(n, r, o, i) {
    for (var s = "", c = 0; c < t; c++)
      s += e[c](n, r, o, i) || "";
    return s;
  };
}
function fn(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function mn(e, t, n, r) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case qe:
        e.return = bt(e.value, e.length, n);
        return;
      case gt:
        return be([L(e, { value: l(e.value, "@", "@" + m) })], r);
      case ke:
        if (e.length)
          return en(n = e.props, function(o) {
            switch (j(o, r = /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                K(L(e, { props: [l(o, /:(read-\w+)/, ":" + le + "$1")] })), K(L(e, { props: [o] })), Me(e, { props: et(n, r) });
                break;
              case "::placeholder":
                K(L(e, { props: [l(o, /:(plac\w+)/, ":" + m + "input-$1")] })), K(L(e, { props: [l(o, /:(plac\w+)/, ":" + le + "$1")] })), K(L(e, { props: [l(o, /:(plac\w+)/, b + "input-$1")] })), K(L(e, { props: [o] })), Me(e, { props: et(n, r) });
                break;
            }
            return "";
          });
    }
}
var gn = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var q = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled";
var Xe = typeof window < "u" && "HTMLElement" in window;
var yn = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== "" ? process.env.REACT_APP_SC_DISABLE_SPEEDY !== "false" && process.env.REACT_APP_SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.SC_DISABLE_SPEEDY !== void 0 && process.env.SC_DISABLE_SPEEDY !== "" ? process.env.SC_DISABLE_SPEEDY !== "false" && process.env.SC_DISABLE_SPEEDY : true);
var rt = /invalid hook call/i;
var he = /* @__PURE__ */ new Set();
var vn = function(e, t) {
  if (true) {
    var n = t ? ' with the id of "'.concat(t, '"') : "", r = "The component ".concat(e).concat(n, ` has been created dynamically.
`) + `You may see this warning because you've called styled inside another component.
To resolve this only create new StyledComponents outside of any render method and function component.`, o = console.error;
    try {
      var i = true;
      console.error = function(s) {
        for (var c = [], a = 1; a < arguments.length; a++)
          c[a - 1] = arguments[a];
        rt.test(s) ? (i = false, he.delete(r)) : o.apply(void 0, W([s], c, false));
      }, (0, import_react.useRef)(), i && !he.has(r) && (console.warn(r), he.add(r));
    } catch (s) {
      rt.test(s.message) && he.delete(r);
    } finally {
      console.error = o;
    }
  }
};
var Ce = Object.freeze([]);
var J = Object.freeze({});
function wn(e, t, n) {
  return n === void 0 && (n = J), e.theme !== n.theme && e.theme || t || n.theme;
}
var ze = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]);
var bn = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g;
var Sn = /(^-|-$)/g;
function ot(e) {
  return e.replace(bn, "-").replace(Sn, "");
}
var kn = /(a)(d)/gi;
var it = function(e) {
  return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function Fe(e) {
  var t, n = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0)
    n = it(t % 52) + n;
  return (it(t % 52) + n).replace(kn, "$1-$2");
}
var _e;
var V = function(e, t) {
  for (var n = t.length; n; )
    e = 33 * e ^ t.charCodeAt(--n);
  return e;
};
var St = function(e) {
  return V(5381, e);
};
function kt(e) {
  return Fe(St(e) >>> 0);
}
function Et(e) {
  return typeof e == "string" && e || e.displayName || e.name || "Component";
}
function Te(e) {
  return typeof e == "string" && e.charAt(0) === e.charAt(0).toLowerCase();
}
var xt = typeof Symbol == "function" && Symbol.for;
var $t = xt ? Symbol.for("react.memo") : 60115;
var En = xt ? Symbol.for("react.forward_ref") : 60112;
var xn = { childContextTypes: true, contextType: true, contextTypes: true, defaultProps: true, displayName: true, getDefaultProps: true, getDerivedStateFromError: true, getDerivedStateFromProps: true, mixins: true, propTypes: true, type: true };
var $n = { name: true, length: true, prototype: true, caller: true, callee: true, arguments: true, arity: true };
var Ct = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true };
var Cn = ((_e = {})[En] = { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, _e[$t] = Ct, _e);
function st(e) {
  return ("type" in (t = e) && t.type.$$typeof) === $t ? Ct : "$$typeof" in e ? Cn[e.$$typeof] : xn;
  var t;
}
var An = Object.defineProperty;
var Nn = Object.getOwnPropertyNames;
var at = Object.getOwnPropertySymbols;
var Pn = Object.getOwnPropertyDescriptor;
var On = Object.getPrototypeOf;
var ct = Object.prototype;
function At(e, t, n) {
  if (typeof t != "string") {
    if (ct) {
      var r = On(t);
      r && r !== ct && At(e, r, n);
    }
    var o = Nn(t);
    at && (o = o.concat(at(t)));
    for (var i = st(e), s = st(t), c = 0; c < o.length; ++c) {
      var a = o[c];
      if (!(a in $n || n && n[a] || s && a in s || i && a in i)) {
        var d = Pn(t, a);
        try {
          An(e, a, d);
        } catch {
        }
      }
    }
  }
  return e;
}
function ee(e) {
  return typeof e == "function";
}
function Ke(e) {
  return typeof e == "object" && "styledComponentId" in e;
}
function G(e, t) {
  return e && t ? "".concat(e, " ").concat(t) : e || t || "";
}
function Ve(e, t) {
  if (e.length === 0)
    return "";
  for (var n = e[0], r = 1; r < e.length; r++)
    n += t ? t + e[r] : e[r];
  return n;
}
function te(e) {
  return e !== null && typeof e == "object" && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function Ge(e, t, n) {
  if (n === void 0 && (n = false), !n && !te(e) && !Array.isArray(e))
    return t;
  if (Array.isArray(t))
    for (var r = 0; r < t.length; r++)
      e[r] = Ge(e[r], t[r]);
  else if (te(t))
    for (var r in t)
      e[r] = Ge(e[r], t[r]);
  return e;
}
function Ze(e, t) {
  Object.defineProperty(e, "toString", { value: t });
}
var Rn = true ? { 1: `Cannot create styled-component for component: %s.

`, 2: `Can't collect styles once you've consumed a \`ServerStyleSheet\`'s styles! \`ServerStyleSheet\` is a one off instance for each server-side render cycle.

- Are you trying to reuse it across renders?
- Are you accidentally calling collectStyles twice?

`, 3: `Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.

`, 4: `The \`StyleSheetManager\` expects a valid target or sheet prop!

- Does this error occur on the client and is your target falsy?
- Does this error occur on the server and is the sheet falsy?

`, 5: `The clone method cannot be used on the client!

- Are you running in a client-like environment on the server?
- Are you trying to run SSR on the client?

`, 6: `Trying to insert a new style tag, but the given Node is unmounted!

- Are you using a custom target that isn't mounted?
- Does your document not have a valid head element?
- Have you accidentally removed a style tag manually?

`, 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: `ThemeProvider: Please make your "theme" prop an object.

`, 9: "Missing document `<head>`\n\n", 10: `Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021

`, 11: `_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.

`, 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: `%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.

`, 14: `ThemeProvider: "theme" prop is required.

`, 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: `Reached the limit of how many styled components may be created at group %s.
You may only create up to 1,073,741,824 components. If you're creating components dynamically,
as for instance in your render method then you may be running into this limitation.

`, 17: `CSSStyleSheet could not be found on HTMLStyleElement.
Has styled-components' style tag been unmounted or altered by another script?
`, 18: "ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`" } : {};
function In() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var n = e[0], r = [], o = 1, i = e.length; o < i; o += 1)
    r.push(e[o]);
  return r.forEach(function(s) {
    n = n.replace(/%[a-z]/, s);
  }), n;
}
function re(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return false ? new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e, " for more information.").concat(t.length > 0 ? " Args: ".concat(t.join(", ")) : "")) : new Error(In.apply(void 0, W([Rn[e]], t, false)).trim());
}
var _n = function() {
  function e(t) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = t;
  }
  return e.prototype.indexOfGroup = function(t) {
    for (var n = 0, r = 0; r < t; r++)
      n += this.groupSizes[r];
    return n;
  }, e.prototype.insertRules = function(t, n) {
    if (t >= this.groupSizes.length) {
      for (var r = this.groupSizes, o = r.length, i = o; t >= i; )
        if ((i <<= 1) < 0)
          throw re(16, "".concat(t));
      this.groupSizes = new Uint32Array(i), this.groupSizes.set(r), this.length = i;
      for (var s = o; s < i; s++)
        this.groupSizes[s] = 0;
    }
    for (var c = this.indexOfGroup(t + 1), a = (s = 0, n.length); s < a; s++)
      this.tag.insertRule(c, n[s]) && (this.groupSizes[t]++, c++);
  }, e.prototype.clearGroup = function(t) {
    if (t < this.length) {
      var n = this.groupSizes[t], r = this.indexOfGroup(t), o = r + n;
      this.groupSizes[t] = 0;
      for (var i = r; i < o; i++)
        this.tag.deleteRule(r);
    }
  }, e.prototype.getGroup = function(t) {
    var n = "";
    if (t >= this.length || this.groupSizes[t] === 0)
      return n;
    for (var r = this.groupSizes[t], o = this.indexOfGroup(t), i = o + r, s = o; s < i; s++)
      n += "".concat(this.tag.getRule(s)).concat(`/*!sc*/
`);
    return n;
  }, e;
}();
var we = /* @__PURE__ */ new Map();
var Se = /* @__PURE__ */ new Map();
var De = 1;
var fe = function(e) {
  if (we.has(e))
    return we.get(e);
  for (; Se.has(De); )
    De++;
  var t = De++;
  if ((0 | t) < 0 || t > 1073741824)
    throw re(16, "".concat(t));
  return we.set(e, t), Se.set(t, e), t;
};
var Tn = function(e, t) {
  we.set(e, t), Se.set(t, e);
};
var Dn = "style[".concat(q, "][").concat("data-styled-version", '="').concat("6.0.5", '"]');
var jn = new RegExp("^".concat(q, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'));
var Mn = function(e, t, n) {
  for (var r, o = n.split(","), i = 0, s = o.length; i < s; i++)
    (r = o[i]) && e.registerName(t, r);
};
var Bn = function(e, t) {
  for (var n, r = ((n = t.textContent) !== null && n !== void 0 ? n : "").split(`/*!sc*/
`), o = [], i = 0, s = r.length; i < s; i++) {
    var c = r[i].trim();
    if (c) {
      var a = c.match(jn);
      if (a) {
        var d = 0 | parseInt(a[1], 10), v = a[2];
        d !== 0 && (Tn(v, d), Mn(e, v, a[3]), e.getTag().insertRules(d, o)), o.length = 0;
      } else
        o.push(c);
    }
  }
};
function Ln() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}
var Nt = function(e) {
  var t = document.head, n = e || t, r = document.createElement("style"), o = function(c) {
    var a = Array.from(c.querySelectorAll("style[".concat(q, "]")));
    return a[a.length - 1];
  }(n), i = o !== void 0 ? o.nextSibling : null;
  r.setAttribute(q, "active"), r.setAttribute("data-styled-version", "6.0.5");
  var s = Ln();
  return s && r.setAttribute("nonce", s), n.insertBefore(r, i), r;
};
var zn = function() {
  function e(t) {
    this.element = Nt(t), this.element.appendChild(document.createTextNode("")), this.sheet = function(n) {
      if (n.sheet)
        return n.sheet;
      for (var r = document.styleSheets, o = 0, i = r.length; o < i; o++) {
        var s = r[o];
        if (s.ownerNode === n)
          return s;
      }
      throw re(17);
    }(this.element), this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    try {
      return this.sheet.insertRule(n, t), this.length++, true;
    } catch {
      return false;
    }
  }, e.prototype.deleteRule = function(t) {
    this.sheet.deleteRule(t), this.length--;
  }, e.prototype.getRule = function(t) {
    var n = this.sheet.cssRules[t];
    return n && n.cssText ? n.cssText : "";
  }, e;
}();
var Fn = function() {
  function e(t) {
    this.element = Nt(t), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    if (t <= this.length && t >= 0) {
      var r = document.createTextNode(n);
      return this.element.insertBefore(r, this.nodes[t] || null), this.length++, true;
    }
    return false;
  }, e.prototype.deleteRule = function(t) {
    this.element.removeChild(this.nodes[t]), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.nodes[t].textContent : "";
  }, e;
}();
var Vn = function() {
  function e(t) {
    this.rules = [], this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    return t <= this.length && (this.rules.splice(t, 0, n), this.length++, true);
  }, e.prototype.deleteRule = function(t) {
    this.rules.splice(t, 1), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.rules[t] : "";
  }, e;
}();
var lt = Xe;
var Gn = { isServer: !Xe, useCSSOMInjection: !yn };
var Pt = function() {
  function e(t, n, r) {
    t === void 0 && (t = J), n === void 0 && (n = {});
    var o = this;
    this.options = P(P({}, Gn), t), this.gs = n, this.names = new Map(r), this.server = !!t.isServer, !this.server && Xe && lt && (lt = false, function(i) {
      for (var s = document.querySelectorAll(Dn), c = 0, a = s.length; c < a; c++) {
        var d = s[c];
        d && d.getAttribute(q) !== "active" && (Bn(i, d), d.parentNode && d.parentNode.removeChild(d));
      }
    }(this)), Ze(this, function() {
      return function(i) {
        for (var s = i.getTag(), c = s.length, a = "", d = function(f) {
          var g = function(C) {
            return Se.get(C);
          }(f);
          if (g === void 0)
            return "continue";
          var y = i.names.get(g), S = s.getGroup(f);
          if (y === void 0 || S.length === 0)
            return "continue";
          var $ = "".concat(q, ".g").concat(f, '[id="').concat(g, '"]'), O = "";
          y !== void 0 && y.forEach(function(C) {
            C.length > 0 && (O += "".concat(C, ","));
          }), a += "".concat(S).concat($, '{content:"').concat(O, '"}').concat(`/*!sc*/
`);
        }, v = 0; v < c; v++)
          d(v);
        return a;
      }(o);
    });
  }
  return e.registerId = function(t) {
    return fe(t);
  }, e.prototype.reconstructWithOptions = function(t, n) {
    return n === void 0 && (n = true), new e(P(P({}, this.options), t), this.gs, n && this.names || void 0);
  }, e.prototype.allocateGSInstance = function(t) {
    return this.gs[t] = (this.gs[t] || 0) + 1;
  }, e.prototype.getTag = function() {
    return this.tag || (this.tag = (t = function(n) {
      var r = n.useCSSOMInjection, o = n.target;
      return n.isServer ? new Vn(o) : r ? new zn(o) : new Fn(o);
    }(this.options), new _n(t)));
    var t;
  }, e.prototype.hasNameForId = function(t, n) {
    return this.names.has(t) && this.names.get(t).has(n);
  }, e.prototype.registerName = function(t, n) {
    if (fe(t), this.names.has(t))
      this.names.get(t).add(n);
    else {
      var r = /* @__PURE__ */ new Set();
      r.add(n), this.names.set(t, r);
    }
  }, e.prototype.insertRules = function(t, n, r) {
    this.registerName(t, n), this.getTag().insertRules(fe(t), r);
  }, e.prototype.clearNames = function(t) {
    this.names.has(t) && this.names.get(t).clear();
  }, e.prototype.clearRules = function(t) {
    this.getTag().clearGroup(fe(t)), this.clearNames(t);
  }, e.prototype.clearTag = function() {
    this.tag = void 0;
  }, e;
}();
var Hn = /&/g;
var Yn = /^\s*\/\/.*$/gm;
function Ot(e, t) {
  return e.map(function(n) {
    return n.type === "rule" && (n.value = "".concat(t, " ").concat(n.value), n.value = n.value.replaceAll(",", ",".concat(t, " ")), n.props = n.props.map(function(r) {
      return "".concat(t, " ").concat(r);
    })), Array.isArray(n.children) && n.type !== "@keyframes" && (n.children = Ot(n.children, t)), n;
  });
}
function Wn(e) {
  var t, n, r, o = e === void 0 ? J : e, i = o.options, s = i === void 0 ? J : i, c = o.plugins, a = c === void 0 ? Ce : c, d = function(g, y, S) {
    return S === n || S.startsWith(n) && S.endsWith(n) && S.replaceAll(n, "").length > 0 ? ".".concat(t) : g;
  }, v = a.slice();
  v.push(function(g) {
    g.type === ke && g.value.includes("&") && (g.props[0] = g.props[0].replace(Hn, n).replace(r, d));
  }), s.prefix && v.push(mn), v.push(dn);
  var f = function(g, y, S, $) {
    y === void 0 && (y = ""), S === void 0 && (S = ""), $ === void 0 && ($ = "&"), t = $, n = y, r = new RegExp("\\".concat(n, "\\b"), "g");
    var O = g.replace(Yn, ""), C = un(S || y ? "".concat(S, " ").concat(y, " { ").concat(O, " }") : O);
    s.namespace && (C = Ot(C, s.namespace));
    var E = [];
    return be(C, hn(v.concat(fn(function(w) {
      return E.push(w);
    })))), E;
  };
  return f.hash = a.length ? a.reduce(function(g, y) {
    return y.name || re(15), V(g, y.name);
  }, 5381).toString() : "", f;
}
var qn = new Pt();
var He = Wn();
var Rt = import_react.default.createContext({ shouldForwardProp: void 0, styleSheet: qn, stylis: He });
Rt.Consumer;
import_react.default.createContext(void 0);
function ut() {
  return (0, import_react.useContext)(Rt);
}
var Ye = function() {
  function e(t, n) {
    var r = this;
    this.inject = function(o, i) {
      i === void 0 && (i = He);
      var s = r.name + i.hash;
      o.hasNameForId(r.id, s) || o.insertRules(r.id, s, i(r.rules, s, "@keyframes"));
    }, this.name = t, this.id = "sc-keyframes-".concat(t), this.rules = n, Ze(this, function() {
      throw re(12, String(r.name));
    });
  }
  return e.prototype.getName = function(t) {
    return t === void 0 && (t = He), this.name + t.hash;
  }, e;
}();
var Un = function(e) {
  return e >= "A" && e <= "Z";
};
function pt(e) {
  for (var t = "", n = 0; n < e.length; n++) {
    var r = e[n];
    if (n === 1 && r === "-" && e[0] === "-")
      return e;
    Un(r) ? t += "-" + r.toLowerCase() : t += r;
  }
  return t.startsWith("ms-") ? "-" + t : t;
}
var It = function(e) {
  return e == null || e === false || e === "";
};
var _t = function(e) {
  var t, n, r = [];
  for (var o in e) {
    var i = e[o];
    e.hasOwnProperty(o) && !It(i) && (Array.isArray(i) && i.isCss || ee(i) ? r.push("".concat(pt(o), ":"), i, ";") : te(i) ? r.push.apply(r, W(W(["".concat(o, " {")], _t(i), false), ["}"], false)) : r.push("".concat(pt(o), ": ").concat((t = o, (n = i) == null || typeof n == "boolean" || n === "" ? "" : typeof n != "number" || n === 0 || t in gn || t.startsWith("--") ? String(n).trim() : "".concat(n, "px")), ";")));
  }
  return r;
};
function Y(e, t, n, r) {
  if (It(e))
    return [];
  if (Ke(e))
    return [".".concat(e.styledComponentId)];
  if (ee(e)) {
    if (!ee(i = e) || i.prototype && i.prototype.isReactComponent || !t)
      return [e];
    var o = e(t);
    return typeof o != "object" || Array.isArray(o) || o instanceof Ye || te(o) || o === null || console.error("".concat(Et(e), " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")), Y(o, t, n, r);
  }
  var i;
  return e instanceof Ye ? n ? (e.inject(n, r), [e.getName(r)]) : [e] : te(e) ? _t(e) : Array.isArray(e) ? Array.prototype.concat.apply(Ce, e.map(function(s) {
    return Y(s, t, n, r);
  })) : [e.toString()];
}
var Kn = St("6.0.5");
var Zn = function() {
  function e(t, n, r) {
    this.rules = t, this.staticRulesId = "", this.isStatic = false, this.componentId = n, this.baseHash = V(Kn, n), this.baseStyle = r, Pt.registerId(n);
  }
  return e.prototype.generateAndInjectStyles = function(t, n, r) {
    var o = this.baseStyle ? this.baseStyle.generateAndInjectStyles(t, n, r) : "";
    if (this.isStatic && !r.hash)
      if (this.staticRulesId && n.hasNameForId(this.componentId, this.staticRulesId))
        o = G(o, this.staticRulesId);
      else {
        var i = Ve(Y(this.rules, t, n, r)), s = Fe(V(this.baseHash, i) >>> 0);
        if (!n.hasNameForId(this.componentId, s)) {
          var c = r(i, ".".concat(s), void 0, this.componentId);
          n.insertRules(this.componentId, s, c);
        }
        o = G(o, s), this.staticRulesId = s;
      }
    else {
      for (var a = V(this.baseHash, r.hash), d = "", v = 0; v < this.rules.length; v++) {
        var f = this.rules[v];
        if (typeof f == "string")
          d += f, a = V(a, f);
        else if (f) {
          var g = Ve(Y(f, t, n, r));
          a = V(a, g), d += g;
        }
      }
      if (d) {
        var y = Fe(a >>> 0);
        n.hasNameForId(this.componentId, y) || n.insertRules(this.componentId, y, r(d, ".".concat(y), void 0, this.componentId)), o = G(o, y);
      }
    }
    return o;
  }, e;
}();
var Tt = import_react.default.createContext(void 0);
Tt.Consumer;
var je = {};
var dt = /* @__PURE__ */ new Set();
function Qn(e, t, n) {
  var r = Ke(e), o = e, i = !Te(e), s = t.attrs, c = s === void 0 ? Ce : s, a = t.componentId, d = a === void 0 ? function(k, x) {
    var h = typeof k != "string" ? "sc" : ot(k);
    je[h] = (je[h] || 0) + 1;
    var u = "".concat(h, "-").concat(kt("6.0.5" + h + je[h]));
    return x ? "".concat(x, "-").concat(u) : u;
  }(t.displayName, t.parentComponentId) : a, v = t.displayName, f = v === void 0 ? function(k) {
    return Te(k) ? "styled.".concat(k) : "Styled(".concat(Et(k), ")");
  }(e) : v, g = t.displayName && t.componentId ? "".concat(ot(t.displayName), "-").concat(t.componentId) : t.componentId || d, y = r && o.attrs ? o.attrs.concat(c).filter(Boolean) : c, S = t.shouldForwardProp;
  if (r && o.shouldForwardProp) {
    var $ = o.shouldForwardProp;
    if (t.shouldForwardProp) {
      var O = t.shouldForwardProp;
      S = function(k, x) {
        return $(k, x) && O(k, x);
      };
    } else
      S = $;
  }
  var C = new Zn(n, g, r ? o.componentStyle : void 0);
  function E(k, x) {
    return function(h, u, z) {
      var U = h.attrs, Bt = h.componentStyle, Lt = h.defaultProps, zt = h.foldedComponentIds, Qe = h.styledComponentId, Ft = h.target, Vt = import_react.default.useContext(Tt), Gt = ut(), Ne = h.shouldForwardProp || Gt.shouldForwardProp;
      (0, import_react.useDebugValue)(Qe);
      var M = function(ue, ae, pe) {
        for (var X, F = P(P({}, ae), { className: void 0, theme: pe }), Re = 0; Re < ue.length; Re += 1) {
          var de = ee(X = ue[Re]) ? X(F) : X;
          for (var B in de)
            F[B] = B === "className" ? G(F[B], de[B]) : B === "style" ? P(P({}, F[B]), de[B]) : de[B];
        }
        return ae.className && (F.className = G(F.className, ae.className)), F;
      }(U, u, wn(u, Vt, Lt) || J), ie = M.as || Ft, se = {};
      for (var R in M)
        M[R] === void 0 || R[0] === "$" || R === "as" || R === "theme" || (R === "forwardedAs" ? se.as = M.forwardedAs : Ne && !Ne(R, ie) || (se[R] = M[R], Ne || false || Xt(R) || dt.has(R) || !ze.has(ie) || (dt.add(R), console.warn('styled-components: it looks like an unknown prop "'.concat(R, '" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));
      var Pe = function(ue, ae) {
        var pe = ut(), X = ue.generateAndInjectStyles(ae, pe.styleSheet, pe.stylis);
        return (0, import_react.useDebugValue)(X), X;
      }(Bt, M);
      h.warnTooManyClasses && h.warnTooManyClasses(Pe);
      var Oe = G(zt, Qe);
      return Pe && (Oe += " " + Pe), M.className && (Oe += " " + M.className), se[Te(ie) && !ze.has(ie) ? "class" : "className"] = Oe, se.ref = z, (0, import_react.createElement)(ie, se);
    }(w, k, x);
  }
  E.displayName = f;
  var w = import_react.default.forwardRef(E);
  return w.attrs = y, w.componentStyle = C, w.shouldForwardProp = S, w.displayName = f, w.foldedComponentIds = r ? G(o.foldedComponentIds, o.styledComponentId) : "", w.styledComponentId = g, w.target = r ? o.target : e, Object.defineProperty(w, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(k) {
    this._foldedDefaultProps = r ? function(x) {
      for (var h = [], u = 1; u < arguments.length; u++)
        h[u - 1] = arguments[u];
      for (var z = 0, U = h; z < U.length; z++)
        Ge(x, U[z], true);
      return x;
    }({}, o.defaultProps, k) : k;
  } }), vn(f, g), w.warnTooManyClasses = function(k, x) {
    var h = {}, u = false;
    return function(z) {
      if (!u && (h[z] = true, Object.keys(h).length >= 200)) {
        var U = x ? ' with the id of "'.concat(x, '"') : "";
        console.warn("Over ".concat(200, " classes were generated for component ").concat(k).concat(U, `.
`) + `Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs(props => ({
    style: {
      background: props.background,
    },
  }))\`width: 100%;\`

  <Component />`), u = true, h = {};
      }
    };
  }(f, g), Ze(w, function() {
    return ".".concat(w.styledComponentId);
  }), i && At(w, e, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true }), w;
}
function ht(e, t) {
  for (var n = [e[0]], r = 0, o = t.length; r < o; r += 1)
    n.push(t[r], e[r + 1]);
  return n;
}
var ft = function(e) {
  return Object.assign(e, { isCss: true });
};
function Dt(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  if (ee(e) || te(e)) {
    var r = e;
    return ft(Y(ht(Ce, W([r], t, true))));
  }
  var o = e;
  return t.length === 0 && o.length === 1 && typeof o[0] == "string" ? Y(o) : ft(Y(ht(o, t)));
}
function We(e, t, n) {
  if (n === void 0 && (n = J), !t)
    throw re(1, t);
  var r = function(o) {
    for (var i = [], s = 1; s < arguments.length; s++)
      i[s - 1] = arguments[s];
    return e(t, n, Dt.apply(void 0, W([o], i, false)));
  };
  return r.attrs = function(o) {
    return We(e, t, P(P({}, n), { attrs: Array.prototype.concat(n.attrs, o).filter(Boolean) }));
  }, r.withConfig = function(o) {
    return We(e, t, P(P({}, n), o));
  }, r;
}
var jt = function(e) {
  return We(Qn, e);
};
var _ = jt;
ze.forEach(function(e) {
  _[e] = jt(e);
});
function oe(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof navigator < "u" && navigator.product === "ReactNative" && console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");
  var r = Ve(Dt.apply(void 0, W([e], t, false))), o = kt(r);
  return new Ye(o, r);
}
typeof navigator < "u" && navigator.product === "ReactNative" && console.warn(`It looks like you've imported 'styled-components' on React Native.
Perhaps you're looking to import 'styled-components/native'?
Read more about this at https://www.styled-components.com/docs/basics#react-native`);
var me = "__sc-".concat(q, "__");
typeof window < "u" && (window[me] || (window[me] = 0), window[me] += 1);
var Ae = oe`
from  {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}	
`;
var Jn = oe`
from  {
  transform: rotate(360deg);
}
to {
  transform: rotate(0deg);
}	
`;
var er = oe`
0% {
  stroke-dasharray: 20 150;
  stroke-dashoffset: 20;
}
50% {
  stroke-dasharray: 110 150;
  stroke-dashoffset: -35;
}
100% {
  transform: rotate(360deg);
  stroke-dasharray: 20 150;
  stroke-dashoffset: -140;
}
`;
var tr = oe`
0% {
  r: 10%;
}
50% {
  r: 40%;
}
100% {
  r: 10%;
}`;
var nr = oe`
0% {
  r: 20%;
}
8% {
  r: 40%;
}
16% {
  r: 30%;
}
24% {
  r: 40%;
}
100% {
  r: 20%;
}
`;
var rr = oe`
0% {
  r: 10%;
  opacity: 0;
}
25% {
  r: 20%;
  opacity: 1;
}
100% {
  r: 40%;
  opacity: 0;
}
`;
var or = _.circle`
  cx: 25;
  cy: 25;
  r: 20;
  fill: none;
  stroke: url("#myGradient");
  stroke-width: ${(e) => e.$weight};
  stroke-linecap: round;
  stroke-dasharray: 35 150;
  animation: ${Ae} ${(e) => e.speed}s linear infinite;
  transform-origin: center;
`;
var mr = ({
  size: e = 50,
  color: t = "#000",
  speed: n = 2,
  weight: r = 3,
  style: o
}) => import_react.default.createElement("div", { style: { width: e, height: e, ...o } }, import_react.default.createElement("svg", { viewBox: "0 0 50 50" }, import_react.default.createElement("defs", null, import_react.default.createElement("linearGradient", { id: "myGradient", gradientTransform: "rotate(90)" }, import_react.default.createElement("stop", { offset: "50%", stopColor: "white" }), import_react.default.createElement("stop", { offset: "100%", stopColor: t }))), import_react.default.createElement(or, { speed: n, $weight: r })));
var ir = _.circle`
  cx: 25;
  cy: 25;
  r: 20;
  fill: none;
  stroke: ${(e) => e.color};
  stroke-width: ${(e) => e.$weight};
  animation: ${tr} ${(e) => e.speed}s linear infinite;
`;
var gr = ({
  size: e = 50,
  color: t = "#000",
  speed: n = 2,
  weight: r = 3,
  style: o
}) => import_react.default.createElement("div", { style: { width: e, height: e, ...o } }, import_react.default.createElement("svg", { viewBox: "0 0 50 50" }, import_react.default.createElement(ir, { color: t, speed: n, $weight: r })));
var sr = _.circle`
  cx: 25;
  cy: 25;
  r: 20;
  fill: none;
  stroke: ${(e) => e.color};
  stroke-width: ${(e) => e.$weight};
  stroke-linecap: round;
  stroke-dasharray: calc(2 * 3.14 * 20 / 4);
  animation: ${Ae} ${(e) => e.speed}s linear infinite;
  transform-origin: center;
`;
var yr = ({
  size: e = 50,
  color: t = "#000",
  speed: n = 2,
  weight: r = 3,
  style: o
}) => import_react.default.createElement("div", { style: { width: e, height: e, ...o } }, import_react.default.createElement("svg", { viewBox: "0 0 50 50" }, import_react.default.createElement(sr, { color: t, speed: n, $weight: r })));
var ar = _.circle`
  cx: 25;
  cy: 25;
  r: 20;
  fill: none;
  stroke: ${(e) => e.color};
  stroke-width: ${(e) => e.$weight};
  stroke-linecap: round;
  animation: ${er} ${(e) => e.speed}s ease-in-out infinite;
  transform-origin: center;
`;
var vr = ({
  size: e = 50,
  color: t = "#000",
  speed: n = 2,
  weight: r = 3,
  style: o
}) => import_react.default.createElement("div", { style: { width: e, height: e, ...o } }, import_react.default.createElement("svg", { viewBox: "0 0 50 50" }, import_react.default.createElement(ar, { color: t, speed: n, $weight: r })));
var cr = _.circle`
  cx: 25;
  cy: 25;
  r: 20;
  fill: none;
  stroke: ${(e) => e.color};
  stroke-width: ${(e) => e.$weight};
  animation: ${nr} ${(e) => e.speed}s linear infinite;
`;
var wr = ({
  size: e = 50,
  color: t = "#000",
  speed: n = 2,
  weight: r = 3,
  style: o
}) => import_react.default.createElement("div", { style: { width: e, height: e, ...o } }, import_react.default.createElement("svg", { viewBox: "0 0 50 50" }, import_react.default.createElement(cr, { color: t, speed: n, $weight: r })));
var lr = _.circle`
  cx: 25;
  cy: 25;
  r: 20;
  fill: none;
  stroke: ${(e) => e.color};
  stroke-width: ${(e) => e.$weight};
  stroke-linecap: round;
  stroke-dasharray: 0 150;
  animation: ${Ae} ${(e) => e.speed}s linear infinite;
  transform-origin: center;
`;
var ur = _.circle`
  cx: 25;
  cy: 25;
  r: 20;
  fill: none;
  stroke: ${(e) => e.color};
  stroke-width: ${(e) => e.$weight};
  opacity: 0.25;
`;
var br = ({
  size: e = 50,
  color: t = "#000",
  speed: n = 2,
  weight: r = 3,
  style: o
}) => import_react.default.createElement("div", { style: { width: e, height: e, ...o } }, import_react.default.createElement("svg", { viewBox: "0 0 50 50" }, import_react.default.createElement(ur, { color: t, $weight: r }), import_react.default.createElement(lr, { color: t, speed: n, $weight: r })));
var Mt = _.circle`
  cx: 25;
  cy: 25;
  r: 20;
  fill: none;
  stroke: ${(e) => e.color};
  stroke-width: ${(e) => e.$weight};
  animation: ${rr} ${(e) => e.speed}s linear infinite;
`;
var pr = _(Mt)`
  animation-delay: -${(e) => e.speed ? e.speed / 2 : 1}s;
`;
var Sr = ({
  size: e = 50,
  color: t = "#000",
  speed: n = 2,
  weight: r = 3,
  style: o
}) => import_react.default.createElement("div", { style: { width: e, height: e, ...o } }, import_react.default.createElement("svg", { viewBox: "0 0 50 50" }, import_react.default.createElement(Mt, { color: t, speed: n, $weight: r }), import_react.default.createElement(pr, { color: t, speed: n, $weight: r })));
var dr = _.circle`
  cx: 25;
  cy: 25;
  r: 20;
  fill: none;
  stroke: ${(e) => e.color};
  stroke-width: ${(e) => e.$weight};
  stroke-linecap: round;
  stroke-dasharray: 35 150;
  animation: ${Ae} ${(e) => e.speed}s linear infinite;
  transform-origin: center;
`;
var hr = _.circle`
  cx: 25;
  cy: 25;
  r: ${(e) => e.$weight ? 19 - e.$weight : 16};
  fill: none;
  stroke: ${(e) => e.color};
  stroke-width: ${(e) => e.$weight};
  stroke-linecap: round;
  stroke-dasharray: 35 150;
  animation: ${Jn} ${(e) => e.speed}s linear infinite;
  transform-origin: center;
`;
var kr = ({
  size: e = 50,
  color: t = "#000",
  speed: n = 2,
  weight: r = 3,
  style: o
}) => import_react.default.createElement("div", { style: { width: e, height: e, ...o } }, import_react.default.createElement("svg", { viewBox: "0 0 50 50" }, import_react.default.createElement(dr, { color: t, speed: n, $weight: r }), import_react.default.createElement(hr, { color: t, speed: n, $weight: r })));
export {
  mr as ArcSpinner,
  gr as BreatheSpinner,
  yr as CircadianSpinner,
  vr as CircularSpinner,
  wr as HeartbeatSpinner,
  br as OrbitalSpinner,
  Sr as PulseSpinner,
  kr as RingSpinner,
  Jn as anticlockwise,
  tr as breathe,
  Ae as clockwise,
  er as dashrotate,
  nr as heartbeat,
  rr as pulse
};
//# sourceMappingURL=infinity-spinners.js.map
