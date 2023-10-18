/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/CompanyCookies/index.js":
/*!************************************************!*\
  !*** ./src/components/CompanyCookies/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CompanyCookies; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




function CompanyCookies({
  btmCookieConsent,
  btmCustomCookie,
  onChangeHandler
}) {
  const [cookieConsent, setCookieConsent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [customCookie, setCustomCookie] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  let timeout;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setCustomCookie(btmCustomCookie);
    setCookieConsent(btmCookieConsent === 'true');
  }, []);
  const customCookieHandler = val => {
    setCustomCookie(val);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChangeHandler({
        btmCustomCookie: val
      });
    }, 500);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Dritter Schritt (optional): Cookie Behandlung', 'bottimmo-widget'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "btmCookieConsent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FormToggle, {
    id: "btmCookieConsent",
    checked: cookieConsent,
    onChange: ({
      target
    }) => {
      setCookieConsent(target.checked);
      onChangeHandler({
        btmCookieConsent: target.checked
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "copy",
    style: {
      marginLeft: '16px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ich verwende "Cookiebot" auf meiner Website', 'bottimmo-widget')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ich verwenden ein eigenes Cookie namens:', 'bottimmo-widget'),
    value: customCookie,
    onChange: customCookieHandler
  })));
}

/***/ }),

/***/ "./src/components/CompanySlug/index.js":
/*!*********************************************!*\
  !*** ./src/components/CompanySlug/index.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CompanySlug; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);





const LP_DOMAIN = "immowissen.org";
function CompanySlug({
  onFetchHandler
}) {
  const [companySlug, setCompanySlug] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [isSlugValid, setIsSlugValid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const textDomain = 'bottimmo-widget';
  const adminPath = btmJsVars.adminUrl;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/bottimmo-widget/v1/company-slug'
    }).then(slug => {
      if (!slug) {
        setErrorMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bitte setzen Sie im Admin-Bereich unter <a href="%s">"Einstellungen / BOTTIMMO Widgets"</a> das Firmen-Kürzel', textDomain), adminPath));
        return;
      }
      setCompanySlug(slug);
      fetchCompanyData(slug).then(landingpages => {
        checkAndSaveSlug(landingpages, slug);
      }).catch(error => console.error(error));
    }).catch(error => console.error(error));
  }, []);
  const fetchCompanyData = async companySlug => {
    try {
      setErrorMessage(null);
      if (!validSlug(companySlug)) {
        setErrorMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bitte setzen Sie im Admin-Bereich unter "Einstellungen / BOTTIMMO Widgets" das Firmen-Kürzel', textDomain));
        return;
      }
      const result = await fetch(`https://${companySlug}.${LP_DOMAIN}/landingpages.json`);
      return result.json();
    } catch (error) {
      setIsSlugValid(false);
      setErrorMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Keine Widgets gefunden! Bitte prüfen Sie im Admin-Bereich unter <a href="%s">"Einstellungen / BOTTIMMO Widgets"</a> das Firmen-Kürzel', textDomain), adminPath));
      throw Error(error);
    }
  };
  const validSlug = slug => /^\S+$/.test(slug);
  const checkAndSaveSlug = (landingpages, slug) => {
    if (landingpages) {
      setIsSlugValid(true);
      onFetchHandler({
        companySlug: slug,
        landingpages
      });
    } else {
      setErrorMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Keine Widgets gefunden! Bitte prüfen Sie im Admin-Bereich unter <a href="%s">"Einstellungen / BOTTIMMO Widgets"</a> das Firmen-Kürzel', textDomain), adminPath));
      onFetchHandler({
        companySlug: slug,
        landingpages: null
      });
      setIsSlugValid(false);
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: `${isSlugValid === false ? '🚫 ' : '✅ '}${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ihr Firmenkürzel (Slug)', textDomain)}`,
    initialOpen: !isSlugValid
  }, isSlugValid && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, companySlug), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "promary",
    href: adminPath,
    icon: "edit",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ändern', textDomain)
  })), errorMessage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      color: '#ff0000'
    },
    dangerouslySetInnerHTML: {
      __html: errorMessage
    }
  }));
}

/***/ }),

/***/ "./src/components/CompanyWidget/index.js":
/*!***********************************************!*\
  !*** ./src/components/CompanyWidget/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CompanyWidget; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function CompanyWidget({
  availableLP,
  selectedWidget,
  selectedVariant,
  onChangeHandler
}) {
  const [widget, setWidget] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [variant, setVariant] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [checked, setChecked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [availableTools, setAvailableTools] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [availableGuides, setAvailableGuides] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [availableChecklists, setAvailableChecklists] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (selectedWidget) {
      setWidget(selectedWidget);
    }
    if (selectedVariant) {
      setVariant(selectedVariant);
      if (['wizzard', 'extended'].includes(selectedVariant)) {
        setChecked(true);
      }
    }
    const allTools = availableLP.filter(({
      type
    }) => !['GUIDE', 'CHECKLIST'].includes(type));
    setAvailableTools(allTools);
    const allGuides = availableLP.filter(({
      type
    }) => type === 'GUIDE');
    setAvailableGuides(allGuides);
    const allChecklists = availableLP.filter(({
      type
    }) => type === 'CHECKLIST');
    setAvailableChecklists(allChecklists);
  }, []);
  const isWidgetWithVariant = () => widget === 'telefonische-beratung' || [...availableGuides, ...availableChecklists].find(({
    slug
  }) => slug === widget);
  const onWidgetChange = value => {
    if (widget === value) {
      return;
    }
    setWidget(value);
    setChecked(false);
    onChangeHandler({
      widget: value,
      variant: ''
    });
  };
  const onChangeVariant = ({
    target
  }) => {
    setChecked(target.checked);
    let newVariant = '';
    if (target.checked) {
      if (widget === 'telefonische-beratung') {
        newVariant = 'wizzard';
      } else if ([...availableGuides, ...availableChecklists].find(({
        slug
      }) => slug === widget)) {
        newVariant = 'extended';
      }
    }
    onChangeHandler({
      widget,
      variant: newVariant
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: `${widget ? `✅ ` : ''}${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Die Widgetauswahl', 'bottimmo-widget')}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    value: widget,
    onChange: onWidgetChange
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bitte auswählen...', 'bottimmo-widget')), availableTools && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("optgroup", {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tools', 'bottimmo-widget')
  }, availableTools.map(({
    name,
    slug,
    isActive
  }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: slug,
    value: slug,
    disabled: !isActive
  }, name))), availableGuides && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("optgroup", {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Ratgeber', 'bottimmo-widget')
  }, availableGuides.map(({
    name,
    slug,
    isActive
  }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: slug,
    value: slug,
    disabled: !isActive
  }, name))), availableChecklists && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("optgroup", {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Checklisten', 'bottimmo-widget')
  }, availableChecklists.map(({
    name,
    slug,
    isActive
  }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: slug,
    value: slug,
    disabled: !isActive
  }, name))))), isWidgetWithVariant() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "btmVariant"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormToggle, {
    id: "btmVariant",
    checked: checked,
    onChange: onChangeVariant
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "copy",
    style: {
      marginLeft: '16px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('umfangreiche Einbindung', 'bottimmo-widget')))));
}

/***/ }),

/***/ "./src/components/EmbededCode/index.js":
/*!*********************************************!*\
  !*** ./src/components/EmbededCode/index.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EmbededCode; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function EmbededCode({
  btmCompany,
  btmSlug,
  btmVariant,
  btmCookieConsent,
  btmCustomCookie
}) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    "data-company": btmCompany,
    "data-slug": btmSlug,
    "data-variant": btmVariant,
    "data-cookieconsent": btmCookieConsent,
    "data-consent-cookie": btmCustomCookie,
    "data-bottimmo": true
  });
}

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/img/logo.png */ "./assets/img/logo.png");
/* harmony import */ var _components_CompanySlug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/CompanySlug */ "./src/components/CompanySlug/index.js");
/* harmony import */ var _components_CompanyWidget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/CompanyWidget */ "./src/components/CompanyWidget/index.js");
/* harmony import */ var _components_CompanyCookies__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/CompanyCookies */ "./src/components/CompanyCookies/index.js");









function Edit({
  attributes,
  setAttributes
}) {
  const [availableLP, setAvailableLP] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [btmCompany, setBtmCompany] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [btmSlug, setBtmSlug] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(attributes.btmSlug);
  const [btmVariant, setBtmVariant] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(attributes.btmVariant);
  const [btmCookieConsent, setBtmCookieConsent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(attributes.btmCookieConsent);
  const [btmCustomCookie, setBtmCustomCookie] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(attributes.btmCustomCookie);
  const [reloadElementId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Math.random());
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const $previewWrapper = document.getElementById(reloadElementId);
    $previewWrapper.innerHTML = '';
    if (btmCompany && btmSlug) {
      const $widget = document.createElement('div');
      $widget.setAttribute('data-company', btmCompany);
      $widget.setAttribute('data-slug', btmSlug);
      $widget.setAttribute('data-variant', btmVariant);
      $widget.setAttribute('data-cookieconsen', btmCookieConsent);
      $widget.setAttribute('data-consent-cookie', btmCustomCookie);
      $widget.setAttribute('data-bottimmo', true);
      $previewWrapper.append($widget);
      window.dispatchEvent(new Event('bottimmo:element-added'));
    }
  }, [btmCompany, btmSlug, btmVariant, btmCookieConsent, btmCustomCookie]);
  const companySlugFetchHandler = ({
    companySlug,
    landingpages
  }) => {
    setAvailableLP(landingpages);
    setAttributes({
      btmCompany: companySlug
    });
    setBtmCompany(companySlug);
  };
  const companyWidgetChangeHandler = ({
    widget,
    variant
  }) => {
    setAttributes({
      btmSlug: widget,
      btmVariant: variant
    });
    setBtmSlug(widget);
    setBtmVariant(variant);
  };
  const companyCookiesHandler = ({
    btmCookieConsent,
    btmCustomCookie
  }) => {
    setAttributes({
      btmCookieConsent,
      btmCustomCookie
    });
    setBtmCookieConsent(btmCookieConsent);
    setBtmCustomCookie(btmCustomCookie);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Panel, {
    header: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_5__,
      alt: "BOTTIMMO Logo"
    }),
    className: "mb-l"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CompanySlug__WEBPACK_IMPORTED_MODULE_6__["default"], {
    onFetchHandler: companySlugFetchHandler
  }), availableLP && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CompanyWidget__WEBPACK_IMPORTED_MODULE_7__["default"], {
    selectedWidget: btmSlug,
    selectedVariant: btmVariant,
    availableLP: availableLP,
    onChangeHandler: companyWidgetChangeHandler
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CompanyCookies__WEBPACK_IMPORTED_MODULE_8__["default"], {
    btmCookieConsent: btmCookieConsent,
    btmCustomCookie: btmCustomCookie,
    onChangeHandler: companyCookiesHandler
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: reloadElementId
  }));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./block.json */ "./src/block.json");

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_6__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_4__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_5__["default"],
  icon: {
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      version: "1.0",
      xmlns: "http://www.w3.org/2000/svg",
      width: "500.000000pt",
      height: "500.000000pt",
      viewBox: "0 0 500.000000 500.000000",
      preserveAspectRatio: "xMidYMid meet"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
      transform: "translate(0.000000,500.000000) scale(0.100000,-0.100000)",
      fill: "#000000",
      stroke: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M777 4874 c-1 -1 -22 -4 -47 -7 -276 -35 -516 -260 -584 -549 -13 -55 -15 -299 -15 -1818 0 -1693 1 -1758 19 -1828 54 -206 186 -369 375 -462 163 -81 -10 -74 1945 -77 1869 -2 1809 -4 1944 47 94 36 176 90 251 166 82 83 135 168 173 279 l27 80 3 1731 2 1732 -272 -1 c-150 0 -284 3 -298 8 -42 12 -91 56 -108 94 -13 30 -16 85 -18 316 -1 154 -2 283 -3 286 -1 5 -3387 9 -3394 3z m2588 -609 c75 -19 175 -66 214 -102 14 -12 29 -19 34 -16 6 3 7 1 4 -4 -4 -6 6 -21 21 -34 67 -58 142 -187 159 -274 4 -22 8 -260 8 -530 0 -474 -1 -492 -21 -552 -28 -79 -32 -76 106 -98 114 -19 197 -59 263 -127 54 -56 77 -97 104 -183 16 -55 18 -103 18 -585 0 -289 -3 -544 -7 -567 -15 -86 -85 -218 -151 -285 -50 -50 -129 -105 -188 -132 -110 -51 -113 -51 -1470 -50 -1393 1 -1344 -1 -1475 64 -128 63 -220 194 -247 351 -11 60 -13 354 -12 1435 l2 1359 22 53 c23 57 44 93 76 130 36 43 70 77 80 80 23 8 65 37 65 45 0 4 5 5 10 2 6 -4 17 -1 25 5 38 32 149 35 1221 34 990 -1 1074 -2 1139 -19z"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M1279 3878 c-49 -9 -105 -50 -134 -99 -19 -33 -20 -53 -20 -536 l0 -501 1050 -1 c691 0 1063 4 1089 10 54 15 101 52 123 100 18 38 19 68 19 474 l-1 433 -31 39 c-16 21 -52 49 -78 62 l-49 24 -962 1 c-530 1 -983 -2 -1006 -6z"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M1125 1803 c1 -590 -1 -567 62 -624 60 -55 0 -52 1312 -52 926 0 1225 3 1253 12 45 15 86 54 109 106 16 36 18 79 17 490 0 481 -1 489 -51 544 -12 13 -40 32 -62 42 -38 18 -98 19 -1341 19 l-1301 0 2 -537z"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M4538 4860 c-21 -16 -22 -27 -23 -151 -1 -128 5 -165 29 -181 6 -4 74 -8 152 -8 183 0 174 -10 174 182 0 123 -3 148 -17 159 -12 10 -54 14 -155 15 -119 1 -142 -1 -160 -16z"
    })))
  }
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_EmbededCode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/EmbededCode */ "./src/components/EmbededCode/index.js");

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */



/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
function save({
  attributes
}) {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_EmbededCode__WEBPACK_IMPORTED_MODULE_2__["default"], {
    ...attributes
  }));
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/img/logo.png":
/*!*****************************!*\
  !*** ./assets/img/logo.png ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/logo.c11339f1.png";

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"create-block/bottimmo-widget","version":"0.1.0","title":"BOTTIMMO Widget","category":"widgets","description":"Die einfachste Weise BOTTIMMO Widgets einzubinden.","attributes":{"btmCompany":{"type":"string","source":"attribute","selector":"div[data-bottimmo]","attribute":"data-company","default":""},"btmSlug":{"type":"string","source":"attribute","selector":"div[data-bottimmo]","attribute":"data-slug","default":""},"btmCookieConsent":{"type":"string","source":"attribute","selector":"div[data-bottimmo]","attribute":"data-cookieconsent","default":"false"},"btmCustomCookie":{"type":"string","source":"attribute","selector":"div[data-bottimmo]","attribute":"data-consent-cookie","default":""},"btmVariant":{"type":"string","source":"attribute","selector":"div[data-bottimmo]","attribute":"data-variant","default":""}},"supports":{"html":false},"textdomain":"bottimmo-widget","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
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
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
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
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkbottimmo_widget"] = self["webpackChunkbottimmo_widget"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map