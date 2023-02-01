function textTemplate(title: string, body: string, nav: string = "") {
  return `<!DOCTYPE html>
<html lang="en"><head><title>${title}</title><link rel="stylesheet" type="text/css" href="/css/global.css" /></head><body>${nav === '' ? "" : `<nav>${nav}</nav>`}<main>${body}</main></body></html>`;
}

export {textTemplate};
