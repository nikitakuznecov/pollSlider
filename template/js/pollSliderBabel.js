"use strict";

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _maxSlides = new WeakMap();

var _thPosition = new WeakMap();

var _basePrice = new WeakMap();

var _resultPrice = new WeakMap();

var _sliderObj = new WeakMap();

var _thisPos = new WeakMap();

var _controlObj = new WeakMap();

var _btnNextObj = new WeakMap();

var _btnStartObj = new WeakMap();

var _btnPrevObj = new WeakMap();

var _prgObj = new WeakMap();

var _prgThisObj = new WeakMap();

var _prgDelimObj = new WeakMap();

var _prgAllObj = new WeakMap();

var _options = new WeakMap();

var _btnFinishObj = new WeakMap();

class pollSlider {
  //Максимальное ко-во слайдов
  //Номер текущей позиции
  //Базовая цена
  //Результат расчетов
  //Обьект слайдера
  //Обьект текущего слайда
  //Обьект блока управления
  //Обьект управления вперед
  //Обьект управления Старт
  //Обьект управления назад
  //Обьект блока прогресс
  //Обьект текущей позиции прогресса
  //Обьект разделителя прогресса
  //Обьект все позиции прогресса
  //Конструктор класса принимает параметр класс обертка слайдов
  constructor(sliderClass, options) {
    _maxSlides.set(this, {
      writable: true,
      value: 0
    });

    _thPosition.set(this, {
      writable: true,
      value: 1
    });

    _basePrice.set(this, {
      writable: true,
      value: 0
    });

    _resultPrice.set(this, {
      writable: true,
      value: 0
    });

    _sliderObj.set(this, {
      writable: true,
      value: null
    });

    _thisPos.set(this, {
      writable: true,
      value: null
    });

    _controlObj.set(this, {
      writable: true,
      value: null
    });

    _btnNextObj.set(this, {
      writable: true,
      value: null
    });

    _btnStartObj.set(this, {
      writable: true,
      value: null
    });

    _btnPrevObj.set(this, {
      writable: true,
      value: null
    });

    _prgObj.set(this, {
      writable: true,
      value: null
    });

    _prgThisObj.set(this, {
      writable: true,
      value: null
    });

    _prgDelimObj.set(this, {
      writable: true,
      value: null
    });

    _prgAllObj.set(this, {
      writable: true,
      value: null
    });

    _options.set(this, {
      writable: true,
      value: null
    });

    _btnFinishObj.set(this, {
      writable: true,
      value: null
    });

    if ($(sliderClass).length > 0) {
      if (options) {
        _classPrivateFieldSet(this, _options, {
          animateCls: options.animateCls || 'animated fadeIn',
          prgAllCls: options.prgAllCls || 'all-positions',
          prgDelimCls: options.prgDelimCls || 'delimiter',
          prgThisCls: options.prgThisCls || 'this-position',
          prgCls: options.prgCls || 'progress-all',
          btnPrevCls: options.btnPrevCls || 'btnPrev',
          btnStartCls: options.btnStartCls || 'btnStart',
          btnNextCls: options.btnNextCls || 'btnNext',
          controlCls: options.controlCls || 'control',
          btnFinishCls: options.btnFinishCls || 'btnFinish'
        });
      } else {
        _classPrivateFieldSet(this, _options, {
          animateCls: 'animated fadeIn',
          prgAllCls: 'all-positions',
          prgDelimCls: 'delimiter',
          prgThisCls: 'this-position',
          prgCls: 'progress-all',
          btnPrevCls: 'btnPrev',
          btnStartCls: 'btnStart',
          btnNextCls: 'btnNext',
          controlCls: 'control',
          btnFinishCls: 'btnFinish'
        });
      } //Создаем и заполняем наши данные


      _classPrivateFieldSet(this, _btnFinishObj, $('.' + _classPrivateFieldGet(this, _options).btnFinishCls));

      _classPrivateFieldSet(this, _btnStartObj, $('.' + _classPrivateFieldGet(this, _options).btnStartCls));

      _classPrivateFieldSet(this, _prgObj, $('.' + _classPrivateFieldGet(this, _options).prgCls));

      _classPrivateFieldSet(this, _prgThisObj, $('.' + _classPrivateFieldGet(this, _options).prgThisCls));

      _classPrivateFieldSet(this, _prgDelimObj, $('.' + _classPrivateFieldGet(this, _options).prgDelimCls));

      _classPrivateFieldSet(this, _prgAllObj, $('.' + _classPrivateFieldGet(this, _options).prgAllCls));

      _classPrivateFieldSet(this, _controlObj, $('.' + _classPrivateFieldGet(this, _options).controlCls));

      _classPrivateFieldSet(this, _btnNextObj, $('.' + _classPrivateFieldGet(this, _options).btnNextCls));

      _classPrivateFieldSet(this, _btnPrevObj, $('.' + _classPrivateFieldGet(this, _options).btnPrevCls));

      _classPrivateFieldSet(this, _maxSlides, $(sliderClass).children().length);

      _classPrivateFieldGet(this, _controlObj).toggleClass('hidden');

      _classPrivateFieldGet(this, _prgObj).toggleClass('hidden');

      _classPrivateFieldSet(this, _sliderObj, $(sliderClass));

      _classPrivateFieldGet(this, _sliderObj).children().removeClass('hidden active ' + _classPrivateFieldGet(this, _options).animateCls).addClass('hidden');

      _classPrivateFieldGet(this, _sliderObj).children().first().removeClass('hidden ' + _classPrivateFieldGet(this, _options).animateCls).addClass('active ' + this._animateCls);

      _classPrivateFieldSet(this, _thisPos, _classPrivateFieldGet(this, _sliderObj).children().first()); //Установка событий на элементы


      var elements = _classPrivateFieldGet(this, _sliderObj).find('input[type=radio]');

      var self = this;

      for (var i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
          self.bindRadio(this);
        };
      }

      _classPrivateFieldGet(this, _btnStartObj).bind('click', function (e) {
        self.start();
      });

      _classPrivateFieldGet(this, _btnNextObj).bind('click', function (e) {
        self.nextSlide();
      });

      _classPrivateFieldGet(this, _btnPrevObj).bind('click', function (e) {
        self.prevSlide();
      });

      _classPrivateFieldGet(this, _btnFinishObj).bind('click', function (e) {
        self.finish();
      }); //Обновляем данные о прогресе


      this.updateProgress();
    } else {
      return false;
    }
  }

  start() {
    this.nextSlide();

    _classPrivateFieldGet(this, _controlObj).toggleClass('hidden');

    _classPrivateFieldGet(this, _prgObj).toggleClass('hidden');

    this.updateProgress();

    _classPrivateFieldGet(this, _btnNextObj).attr('disabled', true);
  }

  updateProgress() {
    _classPrivateFieldGet(this, _prgThisObj).html(_classPrivateFieldGet(this, _thPosition));

    _classPrivateFieldGet(this, _prgAllObj).html(_classPrivateFieldGet(this, _maxSlides));

    if (_classPrivateFieldGet(this, _thPosition) == 2) {
      _classPrivateFieldGet(this, _btnPrevObj).attr('disabled', true);
    } else {
      _classPrivateFieldGet(this, _btnPrevObj).attr('disabled', false);
    }
  }

  get getMaxSlides() {
    return _classPrivateFieldGet(this, _maxSlides);
  }

  get getThisPosition() {
    return _classPrivateFieldGet(this, _thPosition);
  }

  get getBasePrice() {
    return _classPrivateFieldGet(this, _basePrice);
  }

  set setBasePrice(value) {
    if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");

    _classPrivateFieldSet(this, _basePrice, value);
  }

  get getresultPrice() {
    return _classPrivateFieldGet(this, _resultPrice);
  }

  set setResultPrice(value) {
    if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");

    _classPrivateFieldSet(this, _resultPrice, value);
  }

  bindRadio(value) {
    _classPrivateFieldGet(this, _btnNextObj).attr('disabled', false);
  }

  checkAnswers(value) {
    if (value) {
      var isRadioClick = value.find('input[type=radio]').is(':checked');

      if (isRadioClick) {
        _classPrivateFieldGet(this, _btnNextObj).attr('disabled', false);
      } else {
        _classPrivateFieldGet(this, _btnNextObj).attr('disabled', true);
      }
    }
  }

  nextSlide() {
    var _this$_thPosition;

    _classPrivateFieldSet(this, _thPosition, (_this$_thPosition = +_classPrivateFieldGet(this, _thPosition)) + 1), _this$_thPosition;
    this.updateProgress();

    if (_classPrivateFieldGet(this, _thPosition) !== _classPrivateFieldGet(this, _maxSlides)) {
      _classPrivateFieldSet(this, _thisPos, _classPrivateFieldGet(this, _thisPos).next());

      _classPrivateFieldGet(this, _sliderObj).children().removeClass('hidden active ' + _classPrivateFieldGet(this, _options).animateCls).addClass('hidden');

      _classPrivateFieldGet(this, _thisPos).removeClass('hidden').addClass('active ' + _classPrivateFieldGet(this, _options).animateCls);

      this.checkAnswers(_classPrivateFieldGet(this, _thisPos));
    } else {
      _classPrivateFieldGet(this, _controlObj).toggleClass('hidden');

      _classPrivateFieldSet(this, _thisPos, _classPrivateFieldGet(this, _thisPos).next());

      _classPrivateFieldGet(this, _prgObj).toggleClass('hidden');

      _classPrivateFieldGet(this, _sliderObj).children().removeClass('hidden active ' + _classPrivateFieldGet(this, _options).animateCls).addClass('hidden');

      _classPrivateFieldGet(this, _thisPos).removeClass('hidden').addClass('active ' + _classPrivateFieldGet(this, _options).animateCls);

      this.checkAnswers(_classPrivateFieldGet(this, _thisPos));
    }
  }

  prevSlide() {
    this.checkAnswers(_classPrivateFieldGet(this, _thisPos));

    if (_classPrivateFieldGet(this, _thPosition) > 2) {
      var _this$_thPosition2;

      _classPrivateFieldSet(this, _thPosition, (_this$_thPosition2 = +_classPrivateFieldGet(this, _thPosition)) - 1), _this$_thPosition2;

      _classPrivateFieldSet(this, _thisPos, _classPrivateFieldGet(this, _thisPos).prev());

      _classPrivateFieldGet(this, _sliderObj).children().removeClass('hidden active ' + _classPrivateFieldGet(this, _options).animateCls).addClass('hidden');

      _classPrivateFieldGet(this, _thisPos).removeClass('hidden').addClass('active ' + _classPrivateFieldGet(this, _options).animateCls);

      this.updateProgress();
      this.checkAnswers(_classPrivateFieldGet(this, _thisPos));
    }
  }

  addInBasePrice(value) {
    if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");

    _classPrivateFieldSet(this, _basePrice, _classPrivateFieldGet(this, _basePrice) + value);
  }

  formatPrice(data) {
    var price = Number.prototype.toFixed.call(parseFloat(data) || 0, 2);
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }

  finish() {
    var chRadio = _classPrivateFieldGet(this, _sliderObj).find('input[type=radio]:checked');

    var result = 0;

    if (chRadio) {
      for (var i = 0; i < chRadio.length; i++) {
        result += Number(chRadio[i].value);
      }

      _classPrivateFieldSet(this, _resultPrice, result + Number(_classPrivateFieldGet(this, _basePrice)));

      $('.price').html(this.formatPrice(_classPrivateFieldGet(this, _resultPrice)));
      $('.result').toggleClass('hidden');

      _classPrivateFieldGet(this, _btnFinishObj).attr('disabled', true);

      $('.title').toggleClass('hidden');
      $('.price').animateNumber({
        number: _classPrivateFieldGet(this, _resultPrice)
      });
    }
  }

} //Пример вызова класса pollSlider


(function ($) {
  //Вызов калькулятора 1
  var poll = new pollSlider('.wrapper-poll-slider');
  poll.setBasePrice = 17000; //Вызов калькулятора 2

  var pollBuh = new pollSlider('.wrapper-poll-slider-buh'); //Преопределение метода finish

  pollBuh.finish = function () {
    var chRadio = $('.wrapper-poll-slider-buh').find('input[type=radio]:checked');
    var result = 0;

    if (chRadio) {
      var type_of_ownership = chRadio[0].attributes[4].value;
      var are_there_activities = chRadio[1].attributes[4].value;
      var tax_regime = chRadio[2].attributes[4].value;
      var data = JSON.parse($('#' + chRadio[3].attributes[3].value).attr('data-' + type_of_ownership));
      var arr = [];

      for (var index = 0; index < data.length; ++index) {
        if (data[index][tax_regime + are_there_activities]) {
          pollBuh.setResultPrice = data[index][tax_regime + are_there_activities];
        }
      }

      $('.price').html(this.formatPrice(pollBuh.getresultPrice));
      $('.result').toggleClass('hidden');
      $('.btnFinish').attr('disabled', true);
      $('.title').toggleClass('hidden');
      $('.price').animateNumber({
        number: pollBuh.getresultPrice
      });
    }
  };
})(jQuery);
