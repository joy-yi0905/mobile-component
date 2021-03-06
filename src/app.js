import './less/mc.less';

import Zepto from 'n-zepto';

import {
  toast,
  showLoader,
  hideLoader,
  showDialog,
  hideDialog,
  showPopup,
  hidePopup
} from './js/pop';

import {
  env
} from './js/utils';

import numPad from './js/num-pad';
import imgUpload from './js/img-upload';
import datePicker from './js/date-picker';
import slide from './js/slide';
import countdown from './js/countdown';

import init from './js/init';

var mc = {
  toast,
  showLoader,
  hideLoader,
  showDialog,
  hideDialog,
  showPopup,
  hidePopup,
  env,
  numPad,
  imgUpload,
  datePicker,
  slide,
  countdown
};

window.mc = mc;

init();
