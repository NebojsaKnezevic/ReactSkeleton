"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** @jsx createElement */

//Step I: The createElement Function
function createElement(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  return {
    type: type,
    props: _objectSpread(_objectSpread({}, props), {}, {
      children: children.map(function (child) {
        return _typeof(child) === "object" ? child : createTextElement(child);
      })
    })
  };
}
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
//Step I: The createElement Function

//Step II: The render Function
function render(element, container) {
  var dom = element.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);
  var isProperty = function isProperty(key) {
    return key !== "children";
  };
  Object.keys(element.props).filter(isProperty).forEach(function (name) {
    dom[name] = element.props[name];
  });
  element.props.children.forEach(function (child) {
    render(child, dom);
  });
  container.appendChild(dom);
}
//Step II: The render Function

//Step III: Concurrent Mode

var nextUnitOfWork = null;
function workLoop(deadline) {
  var shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}
function performUnitOfWork() {}

//Step III: Concurrent Mode

var reactLight = {
  createElement: createElement,
  render: render
};
var element = createElement("div", {
  className: "container",
  style: "padding: 20px; font-family: sans-serif; color: #333;"
}, createElement("h1", {
  style: "color: darkblue;"
}, "React Light Demo"), createElement("input", {
  type: "text",
  placeholder: "Unesi ne\u0161to...",
  style: "margin-bottom: 10px; padding: 5px;"
}), createElement("button", {
  style: "padding: 5px 10px; margin-left: 5px;"
}, "Klikni me"), createElement("ul", {
  style: "margin-top: 20px;"
}, createElement("li", null, "Stavka 1"), createElement("li", null, "Stavka 2"), createElement("li", null, "Stavka 3")), createElement("footer", {
  style: "margin-top: 30px; font-size: 0.8rem;"
}, "\xA9 2025 React Light"));
var container = document.getElementById("root");
reactLight.render(element, container);
