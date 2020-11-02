class pollSlider{

   //Максимальное ко-во слайдов
   _maxSlides = 0;

   //Номер текущей позиции
   _thPosition = 1;

   //Базовая цена
   _basePrice = 0

   //Результат расчетов
   _resultPrice = 0;

   //Цена выбранного элемента
   _itemPrice = 0;

  //Обьект слайдера
   _sliderObj = null;

  //Обьект текущего слайда
   _thisPos = null;

   //Применяемая анимация при перелистывании (anamate.css)
   _amimateCls = 'animated fadeIn';

   //Класс блока управления
   _controlCls = 'control';

   //Класс кнопки вперед
   _btnNextCls = 'btnNext';

  //Класс кнопки назад
   _btnPrevCls = 'btnPrev';

  //Обьект блока управления
   _controlObj = null;

  //Обьект управления вперед
   _btnNextObj = null;

  //Обьект управления назад
   _btnPrevObj = null;

  //Класс блока прогресс
   _prgCls = 'progress-all';

   //Обьект блока прогресс
   _prgObj = null;

   //Класс текущей позиции
   _prgThisCls = 'this-position';

   //Обьект текущей позиции прогресса
   _prgThisObj = null;

   //Класс разделитель позиций
   _prgDelimCls = 'delimiter';

   //Обьект разделителя прогресса
   _prgDelimObj = null;

   //Класс все позиции
   _prgAllCls = 'all-positions';

   //Обьект все позиции прогресса
   _prgAllObj = null;

  //Конструктор класса принимает параметр класс обертка слайдов
  constructor( sliderClass )
  {
     if ($(sliderClass).length == 0) throw new Error("Ошибка, класс контейнер слайдера не указан, либо отсутствует на странице");

     if($('.'+ this._controlCls).length == 0) throw new Error("Ошибка, контейнер управления отсутствует на странице");

     if($('.'+ this._btnNextCls).length == 0) throw new Error("Ошибка, управление вперед отсутствует на странице");

     if($('.'+ this._btnPrevCls).length == 0) throw new Error("Ошибка, управление назад отсутствует на странице");

     if($('.'+ this._prgCls).length == 0) throw new Error("Ошибка, контейнер прогресса отсутствует на странице");

     if($('.'+ this._prgDelimCls).length == 0) throw new Error("Ошибка, контейнер разделителя прогресса отсутствует на странице");

     if($('.'+ this._prgThisCls).length == 0) throw new Error("Ошибка, контейнер текущей позиции прогресса отсутствует на странице");

     if($('.'+ this._prgAllCls).length == 0) throw new Error("Ошибка, контейнер всех позиций прогресса отсутствует на странице");

     this._prgObj = $('.'+ this._prgCls);

     this._prgThisObj = $('.'+ this._prgThisCls);

     this._prgDelimObj = $('.'+ this._prgDelimCls);

     this._prgAllObj = $('.'+ this._prgAllCls);

     this._controlObj = $('.'+ this._controlCls);

     this._btnNextObj = $('.'+ this._btnNextCls);

     this._btnPrevObj = $('.'+ this._btnPrevCls);

     this._maxSlides = $(sliderClass).children().length;

     this._controlObj.toggleClass('hidden');

     this._prgObj.toggleClass('hidden');

     this._sliderObj = $(sliderClass);

     this._sliderObj.children().removeClass('hidden active ' + this._amimateCls).addClass('hidden');

     this._sliderObj.children().first().removeClass('hidden ' + this._amimateCls).addClass('active ' + this._amimateCls);

     this._thisPos = this._sliderObj.children().first();

    var elements = this._sliderObj.find('input[type=radio]');

    var self = this;

    for (var i = 0; i < elements.length; i++) {

      elements[i].onclick = function(){

          self.bindRadio(this);

      };

    }
     this.updateProgress();

  }

   start()
   {
      this.nextSlide();

      this._controlObj.toggleClass('hidden');
      this._prgObj.toggleClass('hidden');
      this.updateProgress();
      this._btnNextObj.attr('disabled',true);
   }

   updateProgress()
   {
      this._prgThisObj.html(this._thPosition);
      this._prgAllObj.html(this._maxSlides);
      if(this._thPosition == 2){
        this._btnPrevObj.attr('disabled',true);
      }else{
          this._btnPrevObj.attr('disabled',false);
      }

   }

   get getMaxSlides ()
   {
     return this._maxSlides
   }


   get getThisPosition ()
   {
     return this._thPosition
   }

   get getBasePrice ()
   {
     return this._basePrice
   }

   set setBasePrice ( value )
   {
     if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");
     this._basePrice = value;
   }

   get getresultPrice ()
   {
     return this._resultPrice
   }

   set setResultPrice ( value )
   {
     if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");
     this._resultPrice = value;
   }

   get getItemPrice ()
   {
     return this._itemPrice
   }

   set setItemPrice ( value )
   {
     if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");
     this._itemPrice = value;
   }

   set setAnimateCls ( value )
   {
     if (value){
       this._amimateCls = value;
     }
   }

   set setControlCls ( value )
   {
     if (value){
       this._controlCls = value;
     }
   }

   set setBtnNextCls ( value )
   {
     if (value){
       this._btnNextCls = value;
     }
   }

   set setBtnPrevCls ( value )
   {
     if (value){
       this._btnPrevCls = value;
     }
   }

   set setPrgCls ( value )
   {
     if (value){
       this._prgCls = value;
     }
   }

   set setPrgThisCls ( value )
   {
     if (value){
       this._prgThisCls = value;
     }
   }

   set setPrgDelimCls ( value )
   {
     if (value){
       this._prgDelimCls = value;
     }
   }

   set setPrgAllCls ( value )
   {
     if (value){
       this._prgAllCls = value;
     }
   }

   bindRadio(value)
   {
     this._btnNextObj.attr('disabled',false);
   }

   checkAnswers( value )
   {
      if( value ){

        var isRadioClick = value.find('input[type=radio]').is(':checked');

        if(isRadioClick){

          this._btnNextObj.attr('disabled',false);

        }else{

          this._btnNextObj.attr('disabled',true);

        }
      }
   }

  nextSlide()
  {
    this._thPosition ++;

    this.updateProgress();

    if(this._thPosition !== this._maxSlides){

      this._thisPos = this._thisPos.next();
      this._sliderObj.children().removeClass('hidden active ' + this._amimateCls).addClass('hidden');
      this._thisPos.removeClass('hidden').addClass('active '+ this._amimateCls);
      this.checkAnswers(this._thisPos);

    }else {

      this._controlObj.toggleClass('hidden');
      this._thisPos = this._thisPos.next();
      this._prgObj.toggleClass('hidden');
      this._sliderObj.children().removeClass('hidden active ' + this._amimateCls).addClass('hidden');
      this._thisPos.removeClass('hidden').addClass('active '+ this._amimateCls);
      this.checkAnswers(this._thisPos);

    }

  }

  prevSlide()
  {

    this.checkAnswers(this._thisPos);

    if(this._thPosition > 2){

      this._thPosition --;

      this._thisPos = this._thisPos.prev();
      this._sliderObj.children().removeClass('hidden active ' + this._amimateCls).addClass('hidden');
      this._thisPos.removeClass('hidden').addClass('active ' + this._amimateCls);

      this.updateProgress();
      this.checkAnswers(this._thisPos);
    }

  }

  addInBasePrice( value )
  {
    if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");
    this._basePrice += value;
  }
}

//Пример вызова класса pollSlider
(function($) {

  let poll = new pollSlider('.wrapper-poll-slider');

  poll.setBasePrice = 17000;

  $( ".btnStart" ).click(function() {poll.start();});

  $( ".btnPrev" ).click(function() {poll.prevSlide();});

  $( ".btnNext" ).click(function() {poll.nextSlide();});

})(jQuery);
