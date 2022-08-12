const autobind = require("auto-bind");
class Controller {
  constructor() {
    autobind(this);
  }
}

module.exports = Controller;
