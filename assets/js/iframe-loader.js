"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var INTERVAL_INITIAL = 1000;
  var INTERVAL_SECOND_PHASE = 5000;
  var TIMEOUT_INITIAL_INTERVAL = 30000;
  var TIMEOUT_SECOND_PHASE = 120000;
  var CONSENT_COOKIE_NAME = getConsentCookieName();
  var isCustomConsentCookieDefined = Boolean(CONSENT_COOKIE_NAME);
  var iframes = [];
  var postIntervalId = null;
  window.addEventListener('bottimmo:element-added', function () {
    initializeIframes();
  });
  initializeIframes();

  if (iframes.length > 0) {
    synchronizeConsent();
  }

  function initializeIframes() {
    var $placeholders = document.querySelectorAll('[data-bottimmo]');

    var _loop = function _loop(i) {
      var $placeholder = $placeholders[i];
      var dataset = $placeholder.dataset;
      var landingpageDomain = "https://" + dataset.company + '.' + window.BOTTIMMO_LP_DOMAIN;

      if ($placeholder.parentElement.tagName === 'HEAD') {
        warn('If iFrame loader script is placed in the <head> section you should remove all data-* attributes and set them on a dummy <div> inside the body exactly where you want the content to be.');
        return "continue";
      }

      if (!dataset.company || !dataset.slug) {
        warn('Missing attributes on placeholder element: data-company, data-slug');
        return "continue";
      }

      if (typeof dataset.initialized !== 'undefined') {
        return "continue";
      }

      var iframe = document.createElement('iframe');
      var srcWithParameters = new URL("".concat(landingpageDomain, "/").concat(dataset.slug, "/embed/"));

      if (dataset.variant) {
        srcWithParameters.searchParams.append('variant', dataset.variant);
      }

      var paramWhitelist = document.location.search.split(/[?&]/).filter(function (key) {
        return /^(utm_|gclid|fbclid)/.test(key);
      });

      var _iterator = _createForOfIteratorHelper(paramWhitelist),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var parameter = _step.value;

          var _parameter$split = parameter.split(/=(.+)/),
              _parameter$split2 = _slicedToArray(_parameter$split, 2),
              key = _parameter$split2[0],
              value = _parameter$split2[1];

          srcWithParameters.searchParams.append(key, value);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      iframe.src = srcWithParameters.href;
      iframe.style.cssText = 'width: 100%; height: 500px; overflow: auto; border: none;';
      $placeholder.parentNode.insertBefore(iframe, $placeholder);
      iframes.push(iframe);
      var script = document.createElement('script');
      script.src = btmJsVars.pluginDir + "/build/assets/js/resizer.js";
      script.async = true;

      script.onload = function () {
        window.iFrameResize({
          checkOrigin: false,
          log: false
        }, iframe);
      };

      $placeholder.parentNode.insertBefore(script, $placeholder);
      $placeholder.setAttribute('data-initialized', '');
    };

    for (var i = 0; i < $placeholders.length; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }
  }

  function synchronizeConsent() {
    var consentReceived = new Map();

    var setConsentReceived = function setConsentReceived(iframe) {
      return consentReceived.set(iframe, true);
    };

    var hasConsentReceived = function hasConsentReceived(iframe) {
      return consentReceived.has(iframe);
    };

    var stopInterval = function stopInterval() {
      clearInterval(postIntervalId);
      postIntervalId = null;
    };

    var postConsent = function postConsent() {
      var consentGivenFor = getGivenConsent();

      if (consentGivenFor !== null) {
        var pendingIframes = iframes.filter(function (iframe) {
          return !hasConsentReceived(iframe);
        });

        if (pendingIframes.length === 0) {
          stopInterval();
        } else {
          pendingIframes.forEach(function (iframe) {
            var message = "bottimmo:consent-given:".concat(consentGivenFor);
            iframe.contentWindow.postMessage(message, '*');
          });
        }
      }
    };

    iframes.forEach(function (iframe) {
      window.addEventListener('message', function (evt) {
        if (evt.source === iframe.contentWindow) {
          if (evt.data === 'bottimmo:consent-ready') {
            postConsent();
          } else if (evt.data === 'bottimmo:consent-received') {
            setConsentReceived(iframe);
          }
        }
      });
    });
    postIntervalId = setInterval(postConsent, INTERVAL_INITIAL);
    setTimeout(function () {
      if (postIntervalId) {
        clearInterval(postIntervalId);
        postIntervalId = setInterval(postConsent, INTERVAL_SECOND_PHASE);
        setTimeout(function () {
          clearInterval(postIntervalId);
        }, TIMEOUT_SECOND_PHASE);
      }
    }, TIMEOUT_INITIAL_INTERVAL);
  }

  function getGivenConsent() {
    if (isCustomConsentCookieDefined) {
      return readCustomConsentCookie();
    } else if (window.Cookiebot) {
      return readCookiebot();
    } else if (window.BorlabsCookie) {
      return readBorlabs();
    }
  }

  function readCustomConsentCookie() {
    var cookie = (document.cookie.split('; ') || []).find(function (cookie) {
      return cookie.startsWith(CONSENT_COOKIE_NAME);
    });

    if (cookie) {
      return cookie.split('=')[1].split(',').map(function (type) {
        return type.trim();
      }).filter(function (type) {
        return Boolean(type);
      }).join(',');
    }

    return null;
  }

  function readCookiebot() {
    try {
      var _window = window,
          Cookiebot = _window.Cookiebot;

      if (Cookiebot.consented || Cookiebot.declined) {
        var consent = Cookiebot.consent;
        return Object.entries({
          mandatory: consent.necessary,
          marketing: consent.marketing,
          analytics: consent.statistics
        }).filter(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return Boolean(value);
        }).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              key = _ref4[0],
              value = _ref4[1];

          return key;
        }).join(',');
      }
    } catch (err) {}

    return null;
  }

  function readBorlabs() {
    try {
      var _window2 = window,
          BorlabsCookie = _window2.BorlabsCookie;

      if (BorlabsCookie.checkCookieGroupConsent('essential')) {
        return Object.entries({
          mandatory: true,
          marketing: BorlabsCookie.checkCookieGroupConsent('marketing'),
          analytics: BorlabsCookie.checkCookieGroupConsent('statistics')
        }).filter(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];

          return Boolean(value);
        }).map(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              key = _ref8[0],
              value = _ref8[1];

          return key;
        }).join(',');
      }
    } catch (err) {}

    return null;
  }

  function getConsentCookieName() {
    var name = null;

    if (document.currentScript) {
      name = document.currentScript.dataset.consentCookie || null;
    }

    return name;
  }

  function warn(message) {
    window.console && console.warn("BOTTIMMO: ".concat(message));
  }
})();
