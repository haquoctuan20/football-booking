export const handleOpenPopup = ({ url = "/", title = "Tiêu đề", w = 400, h = 500 }: any) => {
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  // const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const top = 0;
  window.open(
    url,
    title,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
  );
};

export const handleOpenPopup2 = ({ url = "/", title = "Tiêu đề", w = 400, h = 500 }: any) => {
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  // const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const top = 0;
  return window.open(
    url,
    title,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
  );
};
