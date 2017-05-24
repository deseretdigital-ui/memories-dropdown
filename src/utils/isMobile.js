export default function () {
  let isMobile = false;
  let userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.indexOf('android') !== -1 ||
      userAgent.indexOf('iphone') !== -1 ||
      userAgent.indexOf('ipad') !== -1 ||
      userAgent.indexOf('windows phone') !== -1
  ) {
    isMobile = true;
  }

  return isMobile;
}
