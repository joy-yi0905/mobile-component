;(function($) {

  const dateRegExp = /^\d{4}(-\d{2}){2}( \d{2}:\d{2})?$/;

  const isSupportTouch = (function() {
    return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  })();

  const eventStart = isSupportTouch ? 'touchstart' : 'mousedown',
    eventMove = isSupportTouch ? 'touchmove' : 'mousemove',
    eventEnd = isSupportTouch ? 'touchend' : 'mouseup',
    eventCancel = 'touchcancel';

  const now = new Date();

  const picker = {
    id: '',
    display: false,
    datePickerEleClass: '.date-picker',
    contentColClass: '.col',
    contentPickerItemH: 40,
    contentPickerItemShowNum: 5,
    dateFormatStr: 'YYYY-MM-DD-hh-mm',

    yearCols: createDateItem('year'),
    monthCols: createDateItem('month'),
    dayCols: createDateItem('day'),
    hourCols: createDateItem('hour'),
    minuteCols: createDateItem('minute')
  };

  const dateGroup = {
    now: {
      YYYY: padZero(now.getFullYear(), 4),
      MM: padZero(now.getMonth() + 1),
      DD: padZero(now.getDate()),
      hh: padZero(now.getHours()),
      mm: padZero(now.getMinutes()),
    },

    select: {
      YYYY: padZero(now.getFullYear(), 4),
      MM: padZero(now.getMonth() + 1),
      DD: padZero(now.getDate()),
      hh: padZero(now.getHours()),
      mm: padZero(now.getMinutes()),
    }
  };

  const drag = {
    start: 0,
    offset: 0,
    end: 0,
    eleOffsetY: 0,
    doing: false
  };

  function padZero(str, digit) {

    while(('' + str).length < (digit || 2)) {
      str = '0' + str;
    }

    return '' + str;
  }

  function eleIsView(ele, coverH) {
    const screenH = $(window).height();
    const eleBottom = ele.get(0).getBoundingClientRect().bottom;

    return !(screenH - eleBottom < coverH + 10);
  }

  function createMask (){
    let maskEle = $('<div class="pop-mask">');

    $('.pop-mask').remove();

    maskEle.appendTo('body');
  }

  function showMask (isTransparent){
    createMask();

    setTimeout(() => {
      $('.pop-mask').addClass(isTransparent ? 'pop-mask-in pop-mask-transparent' : 'pop-mask-in');
    }, 0);
  }

  function hideMask (isDelay) {
    $('.pop-mask').removeClass('pop-mask-in pop-mask-transparent');

    setTimeout(() => {
      $('.pop-mask').remove();
    }, isDelay ? 0 : 300);
  }

  function getMonthDays(year, month) {
    let nowMonth = 0,
      nextMonth = 0;

    year = year/1;
    month = month/1;

    nowMonth = new Date(year + '/' + parseInt(month) + '/' + 1);

    if (month === 12) { // year increase: 2013-12 -> 2014-01
      year += 1;
      month = 0;
    }

    nextMonth = new Date(year + '/' + (parseInt(month)+1) + '/' + 1);

    return parseInt(nextMonth - nowMonth)/(24*60*60*1000);
  }

  function createDateItem(dateType) {
    let dateMap = {
      year: 30,
      month: 12,
      day: 31,
      hour: 23,
      minute: 59
    };

    let dateItems = [];

    let i = 0;

    if (dateType === 'month' || dateType === 'day') {
      i = 1;
    }

    for (i; i < dateMap[dateType] + 1; i++) {
      dateItems.push((dateType === 'year' ? '20' : '') + padZero(i));
    }

    return dateItems;
  }

  function createPicker() {
    let datePickerEle = $('<div class="date-picker"/>');

    datePickerEle
    .html(
      `<div class="date-picker-toolbar">
        <a class="cancel" href="javascript:;">取消</a>
        <a class="confirm" href="javascript:;">确认</a>
      </div>
      <div class="date-picker-title">
        <div class="col-group"></div>
      </div>
      <div class="date-picker-content">
        <div class="col-group"></div>
        <div class="picker-highlight"></div>
      </div>`
    )
    .appendTo(document.body);

    return datePickerEle;
  }

  function DatePicker(
    input,
    options,
    defaults = {
      type: 'date',
      date: `${dateGroup.now.YYYY}-${dateGroup.now.MM}-${dateGroup.now.DD} ${dateGroup.now.hh}:${dateGroup.now.mm}`,
      yearCols: picker.yearCols,
      monthCols: picker.monthCols,
      dayCols: picker.dayCols,
      hourCols: picker.hourCols,
      minuteCols: picker.minuteCols,
      contentPickerItemH: picker.contentPickerItemH,
      contentPickerItemShowNum: picker.contentPickerItemShowNum,
      titleDisplay: true,
      callback: () => {}
    }) {

    this.input = input;
    this.opts = $.extend({}, defaults, options);

    this.showPicker();
  }

  $.extend(DatePicker.prototype, {
    showPicker() {
      const that = this;

      let input = that.input,
        inputId = input.data('id');

      let inputVal = '';

      let datePickerEle;

      let {type, titleDisplay, yearCols, monthCols, dayCols, hourCols, minuteCols, date} = that.opts;

      let colClass = 'col-' + (type === 'date' ? '33' : '20');

      let pickerId = new Date()/1;

      let isSwitchInput = false;

      let pickerTitleColArr = picker.dateFormatStr.split('-');

      let pickerContentColArr = [yearCols, monthCols, dayCols, hourCols, minuteCols];

      let defaultDateArr = [],
        defaultDateColArr = [];

      if (that.opts.contentPickerItemShowNum % 2 === 0) {
        return alert('显示行数必须为奇数！');
      }

      showMask();

      if (input.val() && dateRegExp.test(input.val())) {
        inputVal = input.val();
      } else {
        inputVal = date;
      }

      defaultDateArr = inputVal.split(' ');

      defaultDateColArr = defaultDateArr[1] ?
        defaultDateArr[0].split('-').concat(defaultDateArr[1].split(':')) :
        defaultDateArr[0].split('-');

      this.setSelectDate(defaultDateColArr);

      if (picker.display) {
        if (inputId === picker.id) { // same input
          return;
        } else {
          isSwitchInput = true;

          that.hidePicker($(picker.datePickerEleClass));

          datePickerEle = createPicker();
        }
      } else {
        datePickerEle = createPicker();
      }

      picker.display = true;
      picker.id = pickerId;

      input
      .data('id', pickerId)
      .addClass('focus');

      if (type === 'date') {
        pickerTitleColArr.length = pickerContentColArr.length = defaultDateColArr.length = 3;
      }

      titleDisplay && that.createPickerTitleCol(datePickerEle, colClass, pickerTitleColArr);

      that.createPickerContentCol(datePickerEle, colClass, pickerTitleColArr, pickerContentColArr);

      $.each(defaultDateColArr, (index, item) => {
        that.setPickerGroupPos(datePickerEle, index, item, that);
      });

      datePickerEle
      .removeClass('top bottom')
      .addClass(!eleIsView(input, 196) ? 'top' : 'bottom')
      .data('id', pickerId)
      .on(eventStart, () => {
        return false;
      });

      setTimeout(() => {
        datePickerEle.addClass('in transition');

        $(document).off();

        $(document).on(eventStart, () => {
          that.hidePicker(datePickerEle);
        });
      }, 10);

      let dragPickerCol;

      datePickerEle.find(picker.contentColClass).on(eventStart, function(e) {
        dragPickerCol = $(this);

        that.handleStart(e, dragPickerCol);

        $(document).off();

        $(document).on(eventStart, () => {
          that.hidePicker(datePickerEle);
        });

        $(document).on(eventMove, function(e) {
          that.handleMove(e, dragPickerCol);
        });

        $(document).on(eventEnd, function(e) {
          that.handleEnd(e, dragPickerCol);
        });
      });

      let datePickerCancel = datePickerEle.find('.cancel'),
        datePickerConfirm = datePickerEle.find('.confirm');

      datePickerCancel.on(eventStart, () => {
        this.hidePicker(datePickerEle);
      });

      datePickerConfirm.on(eventStart, () => {
        this.setInputVal(true);
        this.hidePicker(datePickerEle);
      });

    },

    hidePicker(datePickerEle) {

      picker.display = false;

      $('input[data-type="date-picker"]').removeClass('focus');

      datePickerEle.removeClass('in');

      hideMask();

      setTimeout(() => {
        datePickerEle.remove();
      }, 400);
    },

    createPickerTitleCol(datePickerEle, colClass, pickerTitleColArr) {
      let pickerTitleColHtml = '';

      $.each(pickerTitleColArr, (index, item) => {
        pickerTitleColHtml += `<div class="${colClass}"><strong>${item}</strong></div>`;
      });

      datePickerEle.find('.date-picker-title .col-group').html(pickerTitleColHtml);
    },

    createPickerContentCol(datePickerEle, colClass, pickerTitleColArr, pickerContentColArr) {
      let pickerContentColHtml = '';

      $.each(pickerContentColArr, (index, item) => {
        pickerContentColHtml += `<div class="col ${colClass}" data-type="${pickerTitleColArr[index]}"><div class="picker-group">`;

        $.each(item, (index, item) => {
          pickerContentColHtml += `<div class="picker-item">${item}</div>`;
        });

        pickerContentColHtml += `</div></div>`;
      });

      datePickerEle
      .find('.date-picker-content')
      .height(this.opts.contentPickerItemShowNum * this.opts.contentPickerItemH)
      .find('.col-group')
      .html(pickerContentColHtml);
    },

    setPickerGroupPos(datePickerEle, index, dateItem) {
      datePickerEle.find('.col').eq(index).find('.picker-item').each((index, item) => {
        if ($(item).html() === dateItem) {
          this.setPickerGroupAttr($(item).parent(), -(index - Math.floor(this.opts.contentPickerItemShowNum / 2))*this.opts.contentPickerItemH);
        }
      });
    },

    setPickerGroupAttr(pickerGroup, eleOffsetY) {
      pickerGroup.css({
        '-webkit-transform': `translateY(${eleOffsetY}px)`,
        'transform': `translateY(${eleOffsetY}px)`
      })
      .data('offsetY', `${eleOffsetY}`);
    },

    setInputVal(isSelect) {

      let input = this.input,
        inputVal = '';

      let {date, type} = this.opts;

      if (isSelect) {
        inputVal = dateGroup.select.YYYY + '-' + dateGroup.select.MM + '-' + dateGroup.select.DD;

        if (type === 'date-time') {
          inputVal += ' ' + dateGroup.select.hh + ':' + dateGroup.select.mm;
        }

        input.val(inputVal);

        this.opts.callback(inputVal);

      } else {
        if (input.val() && dateRegExp.test(input.val())) {
          inputVal = input.val();
        } else {
          inputVal = date;
        }

        let dateArr = inputVal.split(' ');

        if (type === 'date') { // YYYY-MM-DD hh:mm => YYYY-MM-DD
          inputVal = inputVal.replace(/\s.+/g, '');

          dateArr = dateArr[0].split('-')
        } else {
          dateArr = dateArr[0].split('-').concat(dateArr[1].split(':'));
        }

        this.setSelectDate(dateArr);
      }
    },

    setSelectDate(dateArr) {
      dateGroup.select.YYYY = dateArr[0];
      dateGroup.select.MM = dateArr[1];
      dateGroup.select.DD = dateArr[2];
      dateGroup.select.hh = dateArr[3];
      dateGroup.select.mm = dateArr[4];
    },

    updateMonthDays(year, month) {
      let days = getMonthDays(year, month);

      let DDpickerCol = $('.date-picker .col').eq(2);
      let DDpickerGroup = DDpickerCol.find('.picker-group');
      let DDpickerItem = DDpickerCol.find('.picker-item');

      let maxBottomMoveOffset = -(days - (Math.floor(this.opts.contentPickerItemShowNum / 2) + 1)) * this.opts.contentPickerItemH;

      let eleOffsetY = DDpickerGroup.data('offset-y');

      let offsetDays = Math.abs(days - DDpickerItem.length);

      if (days > DDpickerItem.length) { // add day
        for (let i = 0; i < offsetDays; i++) {
          let pickerItem = $('<div class="picker-item" />');

          pickerItem.html(DDpickerItem.length + 1 + i).appendTo(DDpickerGroup);
        }
      } else if (days < DDpickerItem.length) { // reduce day
        for (let j = 0; j < offsetDays; j++) {
          DDpickerGroup.find('.picker-item').eq(-1).remove();
        }

        if (eleOffsetY <  maxBottomMoveOffset) {
          this.setPickerGroupAttr(DDpickerGroup, maxBottomMoveOffset);

          dateGroup.select.DD = days;
        }
      }
    },

    handleStart(e, ele) {

      if (!isSupportTouch) drag.doing = true;

      let pickerGroup = ele.find('.picker-group');

      drag.start = isSupportTouch ? e.targetTouches[0].pageY : e.clientY;
      drag.eleOffsetY = pickerGroup.data('offset-y') || 0;
    },

    handleMove(e, ele) {

      if (!ele) return;

      if (!isSupportTouch && !drag.doing) return;

      let pickerGroup = ele.find('.picker-group');

      drag.offset = (isSupportTouch ? e.targetTouches[0].pageY : e.clientY) - drag.start;

      let moveOffset = drag.eleOffsetY + drag.offset;

      this.setPickerGroupAttr(pickerGroup, moveOffset);
    },

    handleEnd(e, ele) {

      if (!ele) return;

      let pickerGroup = ele.find('.picker-group');
      let pickerItem = ele.find('.picker-item');
      let eleOffsetY = pickerGroup.data('offset-y') || 0;

      let {contentPickerItemH, contentPickerItemShowNum} = this.opts;

      let maxTopMoveOffset = Math.floor(contentPickerItemShowNum / 2) * contentPickerItemH,
        maxBottomMoveOffset = -(pickerItem.length - (Math.floor(contentPickerItemShowNum / 2) + 1)) * contentPickerItemH;

      let index = 0;

      let type = ele.data('type');

      if (eleOffsetY >= maxTopMoveOffset) {
        index = 0;
        eleOffsetY = maxTopMoveOffset;
      } else if (eleOffsetY <= maxBottomMoveOffset) {
        index = pickerItem.length - 1;
        eleOffsetY = maxBottomMoveOffset;
      } else {
        if (eleOffsetY >= 0) { // swipe down
          index = Math.floor(contentPickerItemShowNum / 2) - Math.round(Math.abs(eleOffsetY) / contentPickerItemH);
          eleOffsetY = (Math.floor(contentPickerItemShowNum / 2) - index) * contentPickerItemH;
        } else { // swipe up
          index = Math.round(Math.abs(eleOffsetY) / contentPickerItemH) + Math.floor(contentPickerItemShowNum / 2);
          eleOffsetY = -(index - Math.floor(contentPickerItemShowNum / 2)) * contentPickerItemH;
        }
      }

      pickerGroup.addClass('transition');

      setTimeout(() => {
        pickerGroup.removeClass('transition');
      }, 400);

      this.setPickerGroupAttr(pickerGroup, eleOffsetY);

      dateGroup.select[`${type}`] = pickerItem.eq(index).html();

      drag.doing = false;

      if (type === 'YYYY' || type === 'MM') {
        this.updateMonthDays(dateGroup.select.YYYY, dateGroup.select.MM);
      }
    }
  });

  $.fn.datePicker = function(options) {
    $(this).attr({
      'readonly': 'readonly',
      'data-type': 'date-picker'
    });

    return $(this).on(eventStart, function() {
      new DatePicker($(this), options);

      return false;
    });
  };

})(Zepto);

export default function(pickerInput, opt) {
  $(pickerInput).datePicker(opt);
}