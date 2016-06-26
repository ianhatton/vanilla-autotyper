const _ = require('lodash');

class AutotyperClass{
  constructor(id, config = {}){
    let element = document.getElementById(id);

    if (!_.isElement(element)) return;

    this.config = _.defaults(config,
      {
        element: element
      }
    );
  }

  _init(){
    this.bodyPosition = 0;
    this.content = this.config.element.querySelector('.auto-typer-content');
    this.currentIndex = 0;
    this.items = [];
    this._render();
  }

  _render(){
    this._getItems();
  }

  _appendCurrentItemLink(){
    this.currentItemLink = document.createElement('a');

    this.currentItemLink.setAttribute('href', this.currentItem.path);
    this.content.appendChild(this.currentItemLink);

    this.timer = window.setInterval(function(){
      this._startTyping();
    }.bind(this), 10);
  }

  _clearInterval(interval){
    window.clearInterval(interval);
  }

  _erase(){
    if (this.bodyPosition >= 0){
      let substring = this.currentItem.body.substr(0, this.bodyPosition--);
      this.currentItemLink.innerHTML = substring;
    } else {
      this._clearInterval(this.timer);
      this._removeCurrentItemLink();
      this._setCurrentIndex();
      this._setCurrentItem(this.currentIndex);
    }
  }

  _setCurrentIndex(){
    if (this.currentIndex < (this.items.length - 1)){
      this.currentIndex = (this.currentIndex + 1);
    } else {
      this.currentIndex = 0;
    }
  }

  _getItems(){
    let data = this.config.element.getAttribute('data-news-ticker');
    let parsedData = JSON.parse(data);

    _.forEach(parsedData, (item)=>{
      this.items.push(item);
    });

    this._setCurrentItem(this.currentIndex);
  }

  _removeCurrentItemLink(){
    this.content.removeChild(this.currentItemLink);
  }

  _setCurrentItem(index){
    this.currentItem = this.items[index];

    this._appendCurrentItemLink();
  }

  _startTyping(){
    if ((this.bodyPosition < this.currentItem.body.length)){
      let substring = this.currentItem.body.charAt(this.bodyPosition++);
      this.currentItemLink.innerHTML += substring;
    } else {
      this._stopTyping();
    }
  }

  _stopTyping(){
    this._clearInterval(this.timer);

    _.delay(()=>{
      this.timer = window.setInterval(function(){
        this._erase();
      }.bind(this), 10);
    }, 3000);
  }
}

module.exports = AutotyperClass;
