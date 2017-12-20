import * as func from './func';

export default function(tab, tabLink)  {
  let tabId = tab.replace(/#/g, ''),
    currentTab = $(`#${tabId}`),
    currentTabLink = $(`.tab-link[href="${tab}"]`),
    tabs = currentTab.parent().find('.tab'),
    tabLinks = currentTabLink.parent().find('.tab-link'),
    index = tabLinks.index(currentTabLink);

  if (currentTabLink.hasClass('active')) {
    return;
  }

  if (currentTab.parents().hasClass('tab-group-slide')) {
    currentTab.parents('.tab-group-slide').find('.tabs').css({
      '-webkit-transform': `translateX(-${index * 100}%)`,
      'transform': `translateX(-${index * 100}%)`
    });
  } else {
    tabs.removeClass('active');
    currentTab.addClass('active');
  }

  tabLinks.removeClass('active');
  currentTabLink.addClass('active');

}

