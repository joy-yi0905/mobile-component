import * as func from './func';
import $ from 'n-zepto';

let popText = {
  confirm: '确定',
  cancel: '取消'
};

let createMask = (isTransparent) => {
  let maskEle = $('<div class="pop-mask '+ (isTransparent ? 'pop-mask-transparent' : '') +'">');

  maskEle.appendTo('body');
};

let showMask = (isTransparent) => {
  createMask(isTransparent);

  setTimeout(() => {
    $('.pop-mask').addClass('pop-mask-in');
  }, 0);
};

let hideMask = (isTransparent, callback) => {
  $(isTransparent ? '.pop-mask-transparent' : '.pop-mask').removeClass('pop-mask-in');

  setTimeout(() => {
    $(isTransparent ? '.pop-mask-transparent' : '.pop-mask').remove();

    func.isFunction(callback) && callback();
  }, 300);
};

let toast = (text, callback) => {
  let toastEle = $('<div class="pop-toast">');
  let toastText = text || 'toast';

  $('.pop-toast').remove();

  toastEle.html(
    `<div class="pop-toast-content">
      <div class="pop-toast-text">${toastText}</div>
    </div>`
  ).appendTo('body');

  setTimeout(() => {
    toastEle.addClass('pop-toast-in');
  }, 0);

  showMask(true);

  setTimeout(() => {
    $('.pop-toast').remove();
    hideMask(true);
    func.isFunction(callback) && callback();
  }, 3000);
};

let showLoader = (text) => {
  let loaderEle = $('<div class="pop-loading">');
  let loaderText = text || '加载中...';

  $('.pop-loading').remove();

  loaderEle.html(
    `<div class="pop-loading-content">
      <i class="icon icon-loading icon-loading-white"></i>
      <div class="pop-loading-text">${loaderText}</div>
    </div>`
  ).appendTo('body');

  showMask(true);
};

let hideLoader = (callback) => {
  $('.pop-loading').remove();
  hideMask(true, callback);
};

let createDiglog = (params) => {
  let dialogEle = $('<div class="pop-dialog">'),
    dialogTop,
    dialogMain,
    dialogExtra,
    buttonHtml = '';

  dialogTop =
    params.title ?
    `<div class="pop-dialog-top">
        <h3 class="pop-dialog-title">${params.title}</h3>
      </div>`
    :
    '';

  dialogMain =
    `<div class="pop-dialog-main">
        ${params.text}
      </div>`;

  $.each(params.button, (index, item) => {
    buttonHtml += `<a href="javascript:;" class="button button-big">${item.text}</a>`;
  });

  dialogExtra =
    `<div class="button-row button-row-round">
      ${buttonHtml}
    </div>`;

  dialogEle.html(
    `<div class="pop-dialog-content">
      ${dialogTop}
      ${dialogMain}
    </div>
    <div class="pop-dialog-extra">
      ${dialogExtra}
    </div>`
  ).appendTo('body');

  setTimeout(() => {
    dialogEle.addClass('pop-dialog-in');

    func.isFunction(params.callback) && params.callback();
  }, 0);

  showMask();

  $('.pop-dialog .button').on('click', function() {
    let index = $('.pop-dialog .button').index(this);

    func.isFunction(params.button[index]['click']) && params.button[index]['click']();
  });
};

let showDialog = (params) => {
  let isString = func.isString(params),
    param = isString ? {} : params;

  if (isString) {
    param = {};
    param.text = params;
    param.button = [{text: popText.confirm, click: hideDialog}];
  } else {
    if (!func.isArray(param.button)) {
      param.button = [{text: popText.confirm, click: hideDialog}];
    }
  }

  createDiglog(param);
};

let hideDialog = (callback) => {
  $('.pop-dialog').removeClass('pop-dialog-in');
  hideMask();

  setTimeout(() => {
    $('.pop-dialog').remove();
  }, 100);

  setTimeout(() => {
    func.isFunction(callback) && callback();
  }, 400);
};

let createPopup = (params, direction) => {
  let popupType = direction ? `pop-popup-${direction}` : '';

  let popupEle = $(`<div class="pop-popup ${popupType}">`),
    popupTop,
    popupMain,
    popupExtra,
    buttonHtml = '';

  popupTop =
    params.title ?
    `<div class="pop-popup-top">
        <h3 class="pop-popup-title">${params.title}</h3>
      </div>`
    :
    '';

  popupMain =
    `<div class="pop-popup-main">
        ${params.text}
      </div>`;

  $.each(params.button, (index, item) => {
    buttonHtml += `<a href="javascript:;" class="button button-big">${item.text}</a>`;
  });

  popupExtra =
    `<div class="button-row">
      ${buttonHtml}
    </div>`;

  popupEle.html(
    `<div class="pop-popup-content">
      ${popupTop}
      ${popupMain}
    </div>
    <div class="pop-popup-extra">
      ${popupExtra}
    </div>`
  ).appendTo('body');

  setTimeout(() => {
    popupEle.addClass('pop-popup-in');

    func.isFunction(params.callback) && params.callback();
  }, 0);

  showMask();

  $('.pop-popup .button').on('click', function() {
    let index = $('.pop-popup .button').index(this);

    func.isFunction(params.button[index]['click']) && params.button[index]['click']();
  });
};

let showPopup = (params, direction) => {
  let isString = func.isString(params),
    param = isString ? {} : params;

  if (isString) {
    param = {};
    param.text = params;
    param.button = [{text: popText.confirm, click: hidePopup}];
  } else {
    if (!func.isArray(param.button)) {
      param.button = [{text: popText.confirm, click: hidePopup}];
    }
  }

  createPopup(param, direction);
};

let hidePopup = (callback) => {
  $('.pop-popup').removeClass('pop-popup-in');
  hideMask();

  setTimeout(() => {
    $('.pop-popup').remove();
    func.isFunction(callback) && callback();
  }, 300);
};

export {toast, showLoader, hideLoader, showDialog, hideDialog, showPopup, hidePopup};