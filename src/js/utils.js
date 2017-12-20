let env = (() => {
  var detect = function(agent) {
    var ua = navigator.userAgent.toLowerCase();

    return ua.indexOf(agent) !== -1;
  };

  return {
    ios: detect('iphone') || detect('ipad') || detect('ipod'),
    android: detect('android'),
    wechat: detect('micromessenger')
  };
})();

export {env};