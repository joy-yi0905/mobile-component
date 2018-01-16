import './less/mc.less';

<<<<<<< HEAD
=======
let mc = {};

>>>>>>> gh-pages
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

<<<<<<< HEAD
window.mc = {
=======
mc = {
>>>>>>> gh-pages
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

<<<<<<< HEAD
=======
window.mc = mc;

>>>>>>> gh-pages
init();