webpackHotUpdate("main",{"./src/components/destination.jsx":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Destination\", function() { return Destination; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nclass Destination extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n  constructor(props) {\n    super(props);\n    this.state = {\n      userAttending: props.userAttending\n    };\n  }\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n      'div',\n      { className: 'row' },\n      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n        'div',\n        { className: 'col-6' },\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('img', { src: this.props.image_url || 'http://via.placeholder.com/200x200' })\n      ),\n      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n        'div',\n        { className: 'col-6' },\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n          'div',\n          { className: 'h5' },\n          this.props.name\n        )\n      ),\n      this.state.userAttending ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n        'div',\n        null,\n        'You\\'re Going!'\n      ) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n        'button',\n        { onClick: this.userGoing.bind(this) },\n        'I\\'m Going!'\n      )\n    );\n  }\n\n  userGoing() {\n    let time = new Date();\n    axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/dest/going', { destinationId: this.props.id, timeOffset: time.getTimezoneOffset() }).then(resp => {\n      if (resp.data.status) {\n        this.setState({\n          userAttending: true\n        });\n      }\n    }, err => {\n      console.log(err);\n    });\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/components/destination.jsx?")}});