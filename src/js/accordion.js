export default function() {
  $(document).on('click', '.accordion-box .accordion-item', function() {

    var _this = $(this),
      accordion = _this.siblings('.accordion-item'),
      parent = _this.parent('.accordion-box');

    var iconClass = '.accordion-item-hd .icon';

    if (!parent.hasClass('accordion-box-all')) {
      accordion.removeClass('accordion-item-unfold').find(iconClass).removeClass('icon-fold').addClass('icon-unfold');
    }

    _this
    .find(iconClass)
    .attr('class', 'icon icon-' + (!_this.hasClass('accordion-item-unfold') ? 'fold' : 'unfold'));

    _this.toggleClass('accordion-item-unfold');

  });
}