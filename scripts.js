  var imgOff;

  var highfive = {
  highfive: true
  };

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
        $("button.btn.btn-primary.btn-lg").hide();
        $("#rock").show();
        console.log("hit");
        imgOff = true;
      } else {
        $("img#photo_two").hide();
        $("img#photo_one").show();
        $("body").css("background-color", "white");
        $("#title").css("color", "black");
        imgOff = false;
      }
    });
}
