var slcookie = {
  //Config Settings
  config: {
    container_id: "slcookieconsent",
    cookie_name: "slcookieconsent_accepted",
    expiration:  183, //days (6 mo)
    sleep_delay: 1, //day
    theme: "light",
    message:
      "<div class='inner cookiesbar'>" +
        "<a href='#' id='consent_sleep_cookie' title='Hide Message'>x</a>" +
        "<a href='#' id='consent_accept_cookie' title='Agree and Proceed'>Agree and Proceed</a>" +
        "<p>" +
          "Concurnas Ltd uses necessary cookies on our website to, among other things, fulfill user requests (such as enable users to login to our website) and provide enhanced functionality for our users (such as user accounts and saved preferences). If you continue to use this site, you agree that we can place these types of cookies on your device. For more information, please review our <a href='http://www.concurnas.com/legal/privacy.html'>Privacy Policy</a> and <a href='http://www.concurnas.com/legal/cookies.html'>Cookie Policy</a>" +
        "</p>" +
      "</div>",
    style: '#slcookieconsent {color: #bbb;background: #222;border-bottom: 1px solid #555;position: fixed;top: 0;left: 0;right : 0;font-family: Helvetica, Arial, sans-serif;font-size: 12px;display: none;z-index: 100000;min-height: 75px;top: auto;bottom: 0;border-bottom: 0;border-top: 1px solid #555;}html.show_cookie_consent #slcookieconsent {display: block;}#slcookieconsent p {padding: 0; margin: 0;font-size: inherit;}#slcookieconsent a {color: #fff;}#slcookieconsent .inner {padding: 15px;}#slcookieconsent #consent_sleep_cookie {position: absolute;right: 10px;top: 5px;color: #777;font: 14px/100% arial, sans-serif;text-decoration: none;text-shadow: 0 -1px 0 #aaa;}#slcookieconsent #consent_sleep_cookie: hover {}#slcookieconsent #consent_accept_cookie {float: right;margin: 5px 30px;display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;text-decoration: none;background-color:#4D64AE;color:#fff;}#slcookieconsent #consent_accept_cookie:hover {background-color: #60aec8;}#slcookieconsent #consent_accept_cookie:active {background-color: #60aec8;}'
  },

  init: function() {
    accepted_on = this.cookies.get( this.config.cookie_name );
    if ( !accepted_on ) { this.popup.show(); }
  },
  popup: {
    show: function() {
       //Add the css code
      var style = document.createElement('style')
      style.type = 'text/css'
      style.innerHTML = slcookie.config.style;
      document.getElementsByTagName('head')[0].appendChild(style)

      // Add the html
      var markup = document.createElement("div");
      markup.id = slcookie.config.container_id;
      markup.innerHTML = slcookie.config.message;
      document.body.insertBefore(markup, document.body.firstChild);

      // Show the popup to the user
      document.getElementsByTagName("html")[0].className += " show_cookie_consent";

      // Add click events
      document.getElementById('consent_sleep_cookie').addEventListener("click", function(event){ this.sleep_click(event); }.bind(this));
      document.getElementById('consent_accept_cookie').addEventListener("click", function(event){ this.accept_click(event); }.bind(this));
    },

    hide: function() {
      var html_elm = document.getElementsByTagName("html")[0];
      html_elm.className = html_elm.className.replace( /(?:^|\s)show_cookie_consent(?!\S)/g , '' );
    },

    accept_click: function() {
      var dt = (new Date()).toString();

      //hide for config.expiration length
      slcookie.cookies.set(slcookie.config.cookie_name, dt, slcookie.config.expiration);

      //hide the element from the dom
      slcookie.popup.hide();
      event.preventDefault();
    },

    sleep_click: function() {
      var dt = (new Date()).toString();

      //hide for config.sleep_delay length
      slcookie.cookies.set(slcookie.config.cookie_name, dt, slcookie.config.sleep_delay);

      //hide the element from the dom
      slcookie.popup.hide();
      event.preventDefault();
    }
  },


  // Get/Set Cookies
  cookies: {
    set: function(name, value, days) {
      var domain, domainParts, date, expires, host;

      if (days) {
         date = new Date();
         date.setTime(date.getTime()+(days*24*60*60*1000));
         expires = "; expires="+date.toGMTString();
      } else {
         expires = "";
      }

      host = location.host;
      cookieToken = '';
      if (host.split('.').length === 1) {
         // no "." in a domain - it's localhost or something similar
         cookieToken = name+"="+value+expires+"; path=/";
         document.cookie = cookieToken;
      } else {
         // Remember the cookie on all subdomains.
         domainParts = host.split('.');
         domainParts.shift();
         domain = '.'+domainParts.join('.');

         cookieToken = name+"="+value+expires+"; path=/; domain="+domain;
         document.cookie = cookieToken;

         // check if cookie was successfuly set to the given domain
         // (otherwise it was a Top-Level Domain)
         if (this.get(name) == null || this.get(name) != value)
         {
            // append "." to current domain
            domain = '.'+host;
            cookieToken = name+"="+value+expires+"; path=/; domain="+domain;
            document.cookie = cookieToken;
         }
      }
    },

    get: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i=0; i < ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
         }

         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }

      return null;
    }
  },
}; slcookie.init();