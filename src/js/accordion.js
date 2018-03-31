export default function() {
  $(document).on('click', '.accordion-box .accordion-item .accordion-item-hd', function() {

    var accordionItem = $(this).parent(),
      accordion = accordionItem.siblings('.accordion-item'),
      parent = accordionItem.parent('.accordion-box');

    var iconClass = '.accordion-item-hd .icon';

    if (!parent.hasClass('accordion-box-all')) {
      accordion.removeClass('accordion-item-unfold').find(iconClass).removeClass('icon-fold').addClass('icon-unfold');
    }

    accordionItem
    .find(iconClass)
    .attr('class', 'icon icon-' + (!accordionItem.hasClass('accordion-item-unfold') ? 'fold' : 'unfold'));

    accordionItem.toggleClass('accordion-item-unfold');

  });
}