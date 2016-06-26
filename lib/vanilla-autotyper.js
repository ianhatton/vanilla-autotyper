'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var AutotyperClass = function () {
  function AutotyperClass(id) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, AutotyperClass);

    var element = document.getElementById(id);

    if (!_.isElement(element)) return;

    this.config = _.defaults(config, {
      element: element
    });
  }

  _createClass(AutotyperClass, [{
    key: '_init',
    value: function _init() {
      this.bodyPosition = 0;
      this.content = this.config.element.querySelector('.auto-typer-content');
      this.currentIndex = 0;
      this.items = [];
      this._render();
    }
  }, {
    key: '_render',
    value: function _render() {
      this._getItems();
    }
  }, {
    key: '_appendCurrentItemLink',
    value: function _appendCurrentItemLink() {
      this.currentItemLink = document.createElement('a');

      this.currentItemLink.setAttribute('href', this.currentItem.path);
      this.content.appendChild(this.currentItemLink);

      this.timer = window.setInterval(function () {
        this._startTyping();
      }.bind(this), 10);
    }
  }, {
    key: '_clearInterval',
    value: function _clearInterval(interval) {
      window.clearInterval(interval);
    }
  }, {
    key: '_erase',
    value: function _erase() {
      if (this.bodyPosition >= 0) {
        var substring = this.currentItem.body.substr(0, this.bodyPosition--);
        this.currentItemLink.innerHTML = substring;
      } else {
        this._clearInterval(this.timer);
        this._removeCurrentItemLink();
        this._setCurrentIndex();
        this._setCurrentItem(this.currentIndex);
      }
    }
  }, {
    key: '_setCurrentIndex',
    value: function _setCurrentIndex() {
      if (this.currentIndex < this.items.length - 1) {
        this.currentIndex = this.currentIndex + 1;
      } else {
        this.currentIndex = 0;
      }
    }
  }, {
    key: '_getItems',
    value: function _getItems() {
      var _this = this;

      var data = this.config.element.getAttribute('data-news-ticker');
      var parsedData = JSON.parse(data);

      _.forEach(parsedData, function (item) {
        _this.items.push(item);
      });

      this._setCurrentItem(this.currentIndex);
    }
  }, {
    key: '_removeCurrentItemLink',
    value: function _removeCurrentItemLink() {
      this.content.removeChild(this.currentItemLink);
    }
  }, {
    key: '_setCurrentItem',
    value: function _setCurrentItem(index) {
      this.currentItem = this.items[index];

      this._appendCurrentItemLink();
    }
  }, {
    key: '_startTyping',
    value: function _startTyping() {
      if (this.bodyPosition < this.currentItem.body.length) {
        var substring = this.currentItem.body.charAt(this.bodyPosition++);
        this.currentItemLink.innerHTML += substring;
      } else {
        this._stopTyping();
      }
    }
  }, {
    key: '_stopTyping',
    value: function _stopTyping() {
      var _this2 = this;

      this._clearInterval(this.timer);

      _.delay(function () {
        _this2.timer = window.setInterval(function () {
          this._erase();
        }.bind(_this2), 10);
      }, 3000);
    }
  }]);

  return AutotyperClass;
}();

module.exports = AutotyperClass;
//# sourceMappingURL=vanilla-autotyper.js.map