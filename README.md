# pollSlider

Список опций установленных по умолчанию

         animateCls  : 'animated fadeIn', - анимация можно указать любую из animate.css
         prgAllCls   : 'all-positions',  - класс на блоке с цифрой все позиции
         prgDelimCls : 'delimiter', - класс на блоке с разделителем позиций
         prgThisCls  : 'this-position', - класс на блоке с цифрой текущей позиции
         prgCls      : 'progress-all', - класс обертка блока с позициями
         btnPrevCls  : 'btnPrev', - класс кнопки назад
         btnStartCls : 'btnStart', - класс кнопки начала опроса
         btnNextCls  : 'btnNext', - класс кнопки вперед
         controlCls  :  'control' - класс обертка блока с управлениями
         
Разметка html
```
<div class="pollSlider">
<div class="progress-all">
 <span class="this-position">0</span>
 <span class="delimiter">/</span>
 <span class="all-positions">0</span>
</div>
 <div class="wrapper-poll-slider">
  <div class="item-poll-slider">
   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </p>
   <center><div class="btn btn-warning btnStart">Старт</div></center>
  </div>
 ....
 </div>
 <div class="control">
  <div class="btn btn-default btnPrev">Назад</div>
  <div class="btn btn-success btnNext">Далее</div>
 </div>
</div>
```
Пример вызова 
```
let poll = new pollSlider('.wrapper-poll-slider',{
  тут параметры если захочется что-то изменить если нет можно и вовсе не использовать
});
```
