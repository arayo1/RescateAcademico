// constantes - variables globales

var vida = 5;
var numerodejefe = 0;
const jefesactivos = new Map();
var estadojefe = true;
var click = false;
var poderfran = false;
var podervale = false;
var podersofi = false;
var inmune = false;

const $ana = $("#ana");
const $vida = $("#nota");
const $escenario = $("#fondo");
const $perder = $("#perder");
const $ganar = $("#ganar");

const posicionfinaljefe = "35%";
const posicionfinaljefeder = "35%";
const imagenesvida = [
  'url(./img/HP0.png)',
  'url(./img/HP1.png)',
  'url(./img/HP2.png)',
  'url(./img/HP3.png)',
  'url(./img/HP4.png)',
  'url(./img/HP5.png)'
];

// funciones 

function obtenerposicion(direction) {
  const $jefe = $(jefesactivos.get(direction))
  var posicionjefe = $jefe.offset().left;
  var posicionana = $ana.offset().left;
  return { posicionjefe, posicionana, $jefe };
}

function anafrente() {
  $ana.css("background-image", "url(./img/Anafrente.gif)");
}
function anadano() {
  $ana.css("background-image", "url(./img/Anadano.gif");
  vida = vida - 1;
  $vida.css("background-image", imagenesvida[vida]);
  if (vida == 0) {
    // aca meter lo de la morision
    $perder.css("display", "block");
    sonido5.play();
    $("#ana").css("background-image", "url(./img/Anaderrota.gif");
    
  }
}
function anacaminar() {
  $ana.css("background-image", "url(./img/Anarun.gif)");
}

function aparicionjefe(num, direction) {
  if (direction) {
    $escenario.append(`<div class="personaje jefe" id="jefe${num}"></div>`)
    const $jefe = $(`#jefe${num}`);
    jefesactivos.set(direction, `#jefe${num}`)
    $jefe.animate(
      {
        right: posicionfinaljefeder,
      },
      650
    );
  } else {
    $escenario.append(`<div class="personaje jefe inverted" id="jefe${num}"></div>`)
    const $jefe = $(`#jefe${num}`);
    jefesactivos.set(direction, `#jefe${num}`)
    $jefe.animate(
      {
        left: posicionfinaljefe,
      },
      650
    );
  }
  return `#jefe${num}`;
}

function jefe(sonido4,sonido5,sonido6) {
  if (numerodejefe > 10 && vida != 0 ) {
    $("#ana").css("background-image", "url(./img/Victoria.gif");
    // ganar
    $ganar.css("display", "block");
    sonido6.play();
    return;
  };
  if (vida == 0 || jefesactivos.size >= 2) { return };
  estadojefe = true;

  // se calcula si es par. si lo es el enemigo sale por la derecha.
  const direction = !!(numerodejefe % 2);
  const idjefe = aparicionjefe(numerodejefe, direction);
  const $jefe = $(idjefe);
  setTimeout(() => {
    if (estadojefe) {
      jefemuere($jefe, direction);
      if(inmune)return;
      anadano();
      sonido4.play();
      if (vida == 0) {
        // aca meter lo de la morision
        $("#ana").css("background-image", "url(./img/Anaderrota.gif");
      ;  
      } else{
        setTimeout(anafrente, 1000);
      }
    }
  }, 900)
  numerodejefe = numerodejefe + 1;
}

function jefemuere($jefe, direction) {
  jefesactivos.delete(direction)
  $jefe.stop();
  $jefe.css({
    right: "0%",
  });
  $jefe.css("display", "none");

}

function anapega() {
  $ana.css("background-image", "url(./img/Anagolpe.gif)");
  $ana.css("transform", "scaleX(1)");
}
function izquierda() {
  $ana.css("transform", "scaleX(-1)");
}


function salta() {
  $ana.animate(
    {
      top: "-=350px",
    },
    500
  );
  $ana.animate(
    {
      top: "+=350px",
    },
    500
  );

}

// se inicializa el documento de jquery

$(document).ready(function () {
  $ana.animate(
    {
      left: "42%",
    },
    1500
  );

  // acciones que se repiten durante el funcionamiento del juego

  var sonido4 = document.getElementById('sonido4')
  var sonido5 = document.getElementById('sonido5')
  var sonido6 = document.getElementById('sonido6')

  setInterval(jefe, 1500, sonido4,sonido5,sonido6);

  setTimeout(anafrente, 1000);

  //setTimeout(anafrente, 5000);

  // escuchar el teclado

  var sonido1 = document.getElementById('sonido1')

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
    if (teclado.which == 38) {
      salta();
      var sonido = document.getElementById('sonido2')
      sonido.play();
      setTimeout(anasalta, 500);
    }
  });



  $(document).keydown(function (teclado) {
    if (teclado.which == 90 && !poderfran) {
        $("#franbusto").css("display", "block");
      setTimeout(() => {
        $("#franbusto").css("display", "none");
      }, 2000)

      const $jefe = $(jefesactivos.get(true))
      jefemuere($jefe, true);
      estadojefe = false;

      const $jefe2 = $(jefesactivos.get(false))
      jefemuere($jefe2, false);
      poderfran = true;
      $("#bustofran").css("display", "none");
    }
    });

    $(document).keydown(function (teclado) {
      if (teclado.which == 88 && !podervale) { 
        if(vida>=4)return;
          $("#valebusto").css("display", "block");
        setTimeout(() => {
          $("#valebusto").css("display", "none");
        }, 2000)
        vida = vida+2;
        $vida.css("background-image", imagenesvida[vida]);
        podervale = true;
        $("#bustovale").css("display", "none");
      }
    
      });

      $(document).keydown(function (teclado) {
        if (teclado.which == 67 && !podersofi) { 
            $("#sofibusto").css("display", "block");
            podersofi = true;
            inmune = true;
          setTimeout(() => {
            $("#sofibusto").css("display", "none");
            inmune = false;
          }, 3000)
         
          $("#bustosofi").css("display", "none");
        }
      
        });



  $(document).keyup(function (teclado) {
    if (teclado.which == 65 || teclado.which == 68) {
      try {
        if (teclado.which == 65) {
          anapega();
          var sonido = document.getElementById('sonido3')
          sonido.play();
          izquierda();
          const { posicionjefe, posicionana, $jefe } = obtenerposicion(false);
          if (posicionjefe >= posicionana -200) {
            jefemuere($jefe, false);
            estadojefe = false;
          }
        } else {
          anapega();
           var sonido = document.getElementById('sonido3')
          sonido.play();
          const { posicionjefe, posicionana, $jefe } = obtenerposicion(true);
          if (posicionjefe <= posicionana +200) {
            jefemuere($jefe, true);
            estadojefe = false;
          }
        }

      } finally {
        setTimeout(anafrente, 500);
      }

    }
  });
});
