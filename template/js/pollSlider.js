class pollSlider{

   //Максимальное ко-во слайдов
   #_maxSlides = 0;

   //Номер текущей позиции
   #_thPosition = 1;

   //Базовая цена
   #_basePrice = 0;

   //Результат расчетов
   #_resultPrice = 0;

  //Обьект слайдера
   #_sliderObj = null;

  //Обьект текущего слайда
   #_thisPos = null;

  //Обьект блока управления
   #_controlObj = null;

  //Обьект управления вперед
   #_btnNextObj = null;

   //Обьект управления Старт
   #_btnStartObj = null;

  //Обьект управления назад
   #_btnPrevObj = null;

   //Обьект блока прогресс
   #_prgObj = null;

   //Обьект текущей позиции прогресса
   #_prgThisObj = null;

   //Обьект разделителя прогресса
   #_prgDelimObj = null;

   //Обьект все позиции прогресса
   #_prgAllObj = null;

   #_options = null;

   #_btnFinishObj = null;

  //Конструктор класса принимает параметр класс обертка слайдов
  constructor( sliderClass , options)
  {

    if ($(sliderClass).length > 0){

    if(options){

        this.#_options = {

           animateCls  :  options.animateCls || 'animated fadeIn',
           prgAllCls   :  options.prgAllCls || 'all-positions',
           prgDelimCls :  options.prgDelimCls || 'delimiter',
           prgThisCls  :  options.prgThisCls || 'this-position',
           prgCls      :  options.prgCls || 'progress-all',
           btnPrevCls  :  options.btnPrevCls || 'btnPrev',
           btnStartCls :  options.btnStartCls || 'btnStart',
           btnNextCls  :  options.btnNextCls || 'btnNext',
           controlCls  :  options.controlCls || 'control',
           btnFinishCls:  options.btnFinishCls || 'btnFinish',
        }
    }else{

      this.#_options = {

         animateCls  : 'animated fadeIn',
         prgAllCls   : 'all-positions',
         prgDelimCls : 'delimiter',
         prgThisCls  : 'this-position',
         prgCls      : 'progress-all',
         btnPrevCls  : 'btnPrev',
         btnStartCls : 'btnStart',
         btnNextCls  : 'btnNext',
         controlCls  : 'control',
         btnFinishCls: 'btnFinish',

      }
    }

    //Создаем и заполняем наши данные

     this.#_btnFinishObj = $('.'+ this.#_options.btnFinishCls);

     this.#_btnStartObj = $('.'+ this.#_options.btnStartCls);

     this.#_prgObj = $('.'+ this.#_options.prgCls);

     this.#_prgThisObj = $('.'+ this.#_options.prgThisCls);

     this.#_prgDelimObj = $('.'+ this.#_options.prgDelimCls);

     this.#_prgAllObj = $('.'+ this.#_options.prgAllCls);

     this.#_controlObj = $('.'+ this.#_options.controlCls);

     this.#_btnNextObj = $('.'+ this.#_options.btnNextCls);

     this.#_btnPrevObj = $('.'+ this.#_options.btnPrevCls);

     this.#_maxSlides = $(sliderClass).children().length;

     this.#_controlObj.toggleClass('hidden');

     this.#_prgObj.toggleClass('hidden');

     this.#_sliderObj = $(sliderClass);

     this.#_sliderObj.children().removeClass('hidden active ' + this.#_options.animateCls).addClass('hidden');

     this.#_sliderObj.children().first().removeClass('hidden ' + this.#_options.animateCls).addClass('active ' + this._animateCls);

     this.#_thisPos = this.#_sliderObj.children().first();

    //Установка событий на элементы

    var elements = this.#_sliderObj.find('input[type=radio]');

    var self = this;

    for (var i = 0; i < elements.length; i++) {

      elements[i].onclick = function(){

          self.bindRadio(this);

      };

    }
    this.#_btnStartObj.bind('click', function (e) {self.start();});
    this.#_btnNextObj.bind('click', function (e) {self.nextSlide();});
    this.#_btnPrevObj.bind('click', function (e) {self.prevSlide();});
    this.#_btnFinishObj.bind('click', function (e) {self.finish();});

    //Обновляем данные о прогресе

    this.updateProgress();
   }
  }

   start()
   {
      this.nextSlide();

      this.#_controlObj.toggleClass('hidden');
      this.#_prgObj.toggleClass('hidden');
      this.updateProgress();
      this.#_btnNextObj.attr('disabled',true);
   }

   updateProgress()
   {
      this.#_prgThisObj.html(this.#_thPosition);
      this.#_prgAllObj.html(this.#_maxSlides);
      if(this.#_thPosition == 2){
        this.#_btnPrevObj.attr('disabled',true);
      }else{
          this.#_btnPrevObj.attr('disabled',false);
      }

   }

   get getMaxSlides ()
   {
     return this.#_maxSlides
   }


   get getThisPosition ()
   {
     return this.#_thPosition
   }

   get getBasePrice ()
   {
     return this.#_basePrice
   }

   set setBasePrice ( value )
   {
     if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");
     this.#_basePrice = value;
   }

   get getresultPrice ()
   {
     return this.#_resultPrice
   }

   set setResultPrice ( value )
   {
     if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");
     this.#_resultPrice = value;
   }

   bindRadio(value)
   {
     this.#_btnNextObj.attr('disabled',false);
   }

   checkAnswers( value )
   {
      if( value ){

        var isRadioClick = value.find('input[type=radio]').is(':checked');

        if(isRadioClick){

          this.#_btnNextObj.attr('disabled',false);

        }else{

          this.#_btnNextObj.attr('disabled',true);

        }
      }
   }

  nextSlide()
  {
    this.#_thPosition ++;

    this.updateProgress();

    if(this.#_thPosition !== this.#_maxSlides){

      this.#_thisPos = this.#_thisPos.next();
      this.#_sliderObj.children().removeClass('hidden active ' + this.#_options.animateCls).addClass('hidden');
      this.#_thisPos.removeClass('hidden').addClass('active '+ this.#_options.animateCls);
      this.checkAnswers(this.#_thisPos);

    }else {

      this.#_controlObj.toggleClass('hidden');
      this.#_thisPos = this.#_thisPos.next();
      this.#_prgObj.toggleClass('hidden');
      this.#_sliderObj.children().removeClass('hidden active ' + this.#_options.animateCls).addClass('hidden');
      this.#_thisPos.removeClass('hidden').addClass('active '+ this.#_options.animateCls);
      this.checkAnswers(this.#_thisPos);

    }

  }

  prevSlide()
  {

    this.checkAnswers(this.#_thisPos);

    if(this.#_thPosition > 2){

      this.#_thPosition --;

      this.#_thisPos = this.#_thisPos.prev();
      this.#_sliderObj.children().removeClass('hidden active ' + this.#_options.animateCls).addClass('hidden');
      this.#_thisPos.removeClass('hidden').addClass('active ' + this.#_options.animateCls);

      this.updateProgress();
      this.checkAnswers(this.#_thisPos);
    }

  }

  addInBasePrice( value )
  {
    if (value < 0) throw new Error("Ошибка,  значение не может быть отрицательным");
    this.#_basePrice += value;
  }

  formatPrice(data) {
      var price = Number.prototype.toFixed.call(parseFloat(data) || 0, 2);
      return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }

  finish()
  {

      var chRadio = this.#_sliderObj.find('input[type=radio]:checked');

      var result = 0;

      if(chRadio){

        for (var i = 0; i < chRadio.length; i++) {

           result += Number(chRadio[i].value);

        }

          this.#_resultPrice = result + Number(this.#_basePrice);

          $('.price').html(this.formatPrice(this.#_resultPrice));
          $('.result').toggleClass('hidden');
          this.#_btnFinishObj.attr('disabled',true);
          $('.title').toggleClass('hidden');
          $('.price').animateNumber({ number: this.#_resultPrice });
      }
  }
}

//Пример вызова класса pollSlider
(function($) {

  let poll = new pollSlider('.wrapper-poll-slider');

  poll.setBasePrice = 17000;


})(jQuery);
