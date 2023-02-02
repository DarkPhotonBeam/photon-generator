function textTemplate(title: string, body: string, nav: string = "") {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${title}</title>
    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">
    <link rel="stylesheet" type="text/css" href="/css/global.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
<body>
    ${nav === '' ? "" : `<aside class="aside"><nav>${nav}</nav></aside>`}
    <main>${body}</main>
    <script>window.texme = { style: 'none' }</script>
     <script src="https://cdn.jsdelivr.net/npm/texme@1.2.2"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
    <header class="header">
        <div class="hamburger" onclick="toggleHamburger()">
            <div class="bar-1"></div>
            <div class="bar-2"></div>
            <div class="bar-3"></div>
        </div>    
    </header>
    <script>
        const hamburger = document.querySelector(".hamburger");
        function toggleHamburger() {
            if (document.querySelector(".hamburger").classList.contains("open")) {
                document.querySelector(".hamburger").classList.remove("open");
                document.querySelector(".aside").classList.remove("open");
                document.querySelector(".hamburger").classList.add("close");
            }
            else {
                document.querySelector(".hamburger").classList.remove("close");
                document.querySelector(".hamburger").classList.add("open");
                document.querySelector(".aside").classList.add("open");
            }
        }
        window.addEventListener("scroll", (e) => {
            if (window.scrollY > 0 && !document.querySelector(".header").classList.contains("opaque")) {
                document.querySelector(".header").classList.add("opaque");
            } else if (window.scrollY === 0 && document.querySelector(".header").classList.contains("opaque")) {
                document.querySelector(".header").classList.remove("opaque");
            }
        });
    </script>
</body>
</html>`;
}

export {textTemplate};
