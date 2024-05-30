var click = false;

$(document).ready(function () {
  const $ana = $("#ana");

  function izquierda() {
    $ana.css("transform", "scaleX(-1)");
    $ana.css("background-image", "url(./img/Anarun.gif)");
  }

  function derecha() {
    $ana.css("transform", "scaleX(1)");
    $ana.css("background-image", "url(./img/Anarun.gif)");
  }

  function anader() {
    $ana.animate(
      {
        left: "+=500px",
      },
      500
    );
  }
  function anaizq() {
    $ana.animate(
      {
        left: "-=500px",
      },
      500
    );
  }
  function salta() {
    $ana.css("background-image", "url(./img/Anasalta.gif)");
    $ana.animate(
      {
        top: "-=300px",
      },
      500
    );
    $ana.animate(
      {
        top: "+=300px",
      },
      500
    );

  }

  $("#botonsonido").click(function (e) { 
    e.preventDefault();

    if(click){
      click = false;
      sonido1.pause();
      $("#botonsonido").css("background-image", "url(./img/sinsonido.png)");
    } 
    else{
      sonido1.play();
      click = true;
      $("#botonsonido").css("background-image", "url(./img/sonido.png)");
  }
  });
  
  $(document).keydown(function (teclado) {
    $ana.stop();
    if (teclado.which == 37 || teclado.which == 39) {
      if (teclado.which == 37) {
        anaizq();
        izquierda();
      } else {
        anader();
        derecha();
      }
    }
  });

  $("#vale").click(function (e) { 
    e.preventDefault();
    $("#cuadro1").html('<div id="cuadro2"><img src="img/cuadro2.png" alt=""></div>') 

  });

  $("#fran").click(function (e) { 
    e.preventDefault();
    $("#cuadro1").html('<div id="cuadro3"><img src="img/cuadro3.png" alt=""></div>') 

  });

  $("#sofi").click(function (e) { 
    e.preventDefault();
    $("#cuadro1").html('<div id="cuadro4"><img src="img/cuadro4.png" alt=""></div>') 

  });

  $(document).keydown(function (teclado) {
    if (teclado.which == 38) {
      salta();
      var sonido = document.getElementById('sonido2')
      sonido.play();
      setTimeout(anasalta, 500);
    }
  });

  $(document).keyup(function (teclado) {
    if (teclado.which == 37 || teclado.which == 39) {
      setTimeout(analateral, 500);
    }
  });
  setInterval(() => {
    var posicionana = $ana.offset().left;
    console.log(posicionana);
    if (posicionana > $(window).width()-400) {
      window.location.href = "./main.html";
      return;
    }
  }, 1000);
});
