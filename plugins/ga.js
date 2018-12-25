export default ({ app }) => {
  /*
    ** Only run on client-side and only in production mode
    */
  // if (process.env.NODE_CONFIG !== 'prod') return
  /*
    ** Include Google Analytics Script
    */
  (function (i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    "script",
    "https://www.googletagmanager.com/gtag/js?id=UA-129672999-1",
    "ga"
  );
  /*
    ** Set the current page
    */
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "UA-129672999-1");

  gtag({Category:'share_btn_click',Action:'sharebtnClick'});
};
