import tabSwitch from './tab-switch';
import accordion from './accordion';

export default function () {

  // tab-switch
  $(document).on('click', '.tab-link', function(e) {
    tabSwitch($(this).attr('href'));

    e.preventDefault();
    return false;
  });

  accordion();
}
