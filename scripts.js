// Full keen-js is loaded from the page

// Load keen-tracking.js
!function(name,path,ctx){
  var latest,prev=name!=='Keen'&&window.Keen?window.Keen:false;ctx[name]=ctx[name]||{ready:function(fn){var h=document.getElementsByTagName('head')[0],s=document.createElement('script'),w=window,loaded;s.onload=s.onerror=s.onreadystatechange=function(){if((s.readyState&&!(/^c|loade/.test(s.readyState)))||loaded){return}s.onload=s.onreadystatechange=null;loaded=1;latest=w.Keen;if(prev){w.Keen=prev}else{try{delete w.Keen}catch(e){w.Keen=void 0}}ctx[name]=latest;ctx[name].ready(fn)};s.async=1;s.src=path;h.parentNode.insertBefore(s,h)}}
}('KeenTracker','https://d26b395fwzu5fz.cloudfront.net/keen-tracking-0.0.1.js',this);

Keen.ready(function(){
  KeenTracker.ready(init);
});

// Executes when the library is loaded and ready
function init(){
  // Create a new client instance
  // Use this for query+dataviz
  var client = new Keen({
      projectId: '55a92b06c2266c424c10b0f2',
      readKey: 'bdc0b865844925c1077bf98b3689a29c49a5666573b113ef7d781b45ee9822d1446312af0246919d6358432f8402bb623f7a8242df61e2b374f8938b4960598b9c7f97d9867791156eefb06a9f61f13b1c249df26ca2d123b99a26e8793fd1f2c3568b12040cad8e559fb5804d470c59'
  });

  // Use this for recording events
  var tracker = new KeenTracker({
    projectId: '55a92b06c2266c424c10b0f2',
    writeKey: '92524443b158c41431507ffe1558c9339e1413870179d0262f4799b01c696779be782947d9d7461f8e278e81ecb8f0618788450217e09f0a61104f24b9bfb9f52f2db7f3e0f541c042dd61cd908f51193a89104ac8ad749e3b2e4bbe997533775d43a03af2f297a687b9f4884d912b45'
  });

  var imgOff;

  var highfive = {
  highfive: true
  };

  // keen sending events and drawing graphs
  function queryOne() {
        var query = new Keen.Query("count", {
        eventCollection: "highfive",
        timezone: "UTC"
      });
      client.draw(query, document.getElementById("my_chart"), {
        title: "all time"
      });
    }

    function queryTwo() {
        var query = new Keen.Query("count", {
        eventCollection: "highfive",
        timeframe: "this_1_days",
        timezone: "UTC"
      });
       client.draw(query, document.getElementById("my_chart_two"), {
         title: "just today"
      });
    }

  // logic for the highfive, only enabled once but could be turned into a loop  
  $("button.btn.btn-primary.btn-lg").click(function() {
    for(i=0;i<10;i++) {
      $("h1#title").fadeTo('fast', 0.5).fadeTo('fast', 1.0);
    }
      if (!imgOff) {
        $("img#photo_one").hide();
        $("img#photo_two").show();
        $("body").css("background-color", "black");
        $("h1#title").show();
        $("#title").css("color", "white");
        $("#stats").css("color", "white");
        queryOne();
        queryTwo();
        $("h2#stats").show();
        $("button.btn.btn-primary.btn-lg").hide();
        imgOff = true;
      } else {
        $("img#photo_two").hide();
        $("img#photo_one").show();
        $("body").css("background-color", "white");
        $("#title").css("color", "black");
        $("#stats").css("color", "black");
        imgOff = false;
      }
    });

    var uniqueId; // = KeenTracker.helpers.getUniqueId();
    var userId;

    var sessionCookie = window.sessionCookie = KeenTracker.utils.cookie('track-session');
    if ('string' !== typeof sessionCookie.get('guest_id')) {
        console.log('setting cookie');
        sessionCookie.set('guest_id', KeenTracker.helpers.getUniqueId());
    }
    console.log('guest_id', sessionCookie.get('guest_id'));

    var sessionTimer = KeenTracker.utils.timer();
    sessionTimer.start();

    KeenTracker.listenTo({
      'click button.btn-primary': function(e){
          // 500ms to record an event
          tracker.recordEvent('highfive');
      }
    });

    // THE BIG DATA MODEL!
    tracker.extendEvents(function(){
        return {
            page: {
                title: document.title,
                url: document.location.href
                // info: {} (add-on)
            },
            referrer: {
                url: document.referrer
                // info: {} (add-on)
            },
            tech: {
                browser: KeenTracker.helpers.getBrowserProfile(),
                // info: {} (add-on)
                ip: '${keen.ip}',
                ua: '${keen.user_agent}'
            },
            time: KeenTracker.helpers.getDatetimeIndex(),
            visitor: {
                id: sessionCookie.get('user_id'),
                time_on_page: sessionTimer.value()
            },
            // geo: {} (add-on)
            keen: {
                timestamp: new Date().toISOString(),
                addons: [
                    {
                        name: 'keen:ip_to_geo',
                        input: {
                            ip: 'tech.ip'
                        },
                        output: 'geo'
                    },
                    {
                        name: 'keen:ua_parser',
                        input: {
                            ua_string: 'tech.ua'
                        },
                        output: 'tech.info'
                    },
                    {
                        name: 'keen:url_parser',
                        input: {
                            url: 'page.url'
                        },
                        output: 'page.info'
                    },
                    {
                        name: 'keen:referrer_parser',
                        input: {
                            page_url: 'page.url',
                            referrer_url: 'referrer.url'
                        },
                        output: 'referrer.info'
                    }
                ]
            }
        };
    });

    tracker.recordEvent('pageview');

    // Track errors and messages in the dev console
    Keen.debug = true;
    KeenTracker.debug = true;

    // Observe what's happening in each method
    tracker.on('recordEvent', Keen.log);
    tracker.on('recordEvents', Keen.log);
    tracker.on('deferEvent', Keen.log);
    tracker.on('deferEvents', Keen.log);
    tracker.on('recordDeferredEvents', Keen.log);
    tracker.on('extendEvent', Keen.log);
    tracker.on('extendEvents', Keen.log);
}
