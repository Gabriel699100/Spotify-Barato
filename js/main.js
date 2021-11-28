let listasong = document.getElementById("listasong");
let im = document.getElementById("im");
let tsong = document.getElementById("tsong");
let asong = document.getElementById("asong");
let dp = document.getElementById("dp");
let barrita = document.getElementById("barrita");

let song_selected = {};
let is_playing = false;
let canciones = [
  {
    id: 1,
    caratula: "caratulas/imauno.jpg",
    cancion: "canciones/Daft Punk-Instant Crush.mp3",
    artista: "Julian Casablancas",
    titulo: "Instant Crush",
  },
  {
    id: 2,
    caratula: "caratulas/imados.jpg",
    cancion: "canciones/Tuesday.mp3",
    artista: "Danelle Sandoval",
    titulo: "Tuesday",
  },
  {
    id: 3,
    caratula: "caratulas/imacuatro.jpg",
    cancion: "canciones/LP-Lost on you.mp3",
    artista: "LP",
    titulo: "Lost On You",
  },
  {
    id: 4,
    caratula: "caratulas/imatres.jpg",
    cancion: "canciones/The_Weeknd.mp3",
    artista: "The Weekend",
    titulo: "The Starboy",
  },
  {
    id: 5,
    caratula: "caratulas/imacinco.jpg",
    cancion: "canciones/Eladio.mp3",
    artista: "Eladio Carrión",
    titulo: "Eladio Carrión BZRP"
  },
  {
    id: 6,
    caratula: "caratulas/imaseis.jpg",
    cancion: "canciones/mil horas.mp3",
    artista: "Andrés Calamaro",
    titulo: "Mil Horas"
  },
];

const BuildList = (canciones) => {
  listasong.innerHTML = "";
  canciones.forEach((e) => {
    listasong.insertAdjacentHTML(
      "beforeend",
      `
       <article class="list-item" id="item-${e.id}">
          <img src="${e.caratula}" alt="" />
          <div class="data-song-container">
            <h2>${e.titulo}</h2>
            <div class="artist-name">${e.artista}</div>
          </div>
        </article>
    `
    );
  });
};

const select_song = (id) => {
  let res = canciones.find((e) => e.id == id);
  if (res) {
    im.src = res.caratula;
    tsong.innerHTML = res.titulo;
    asong.innerHTML = res.artista;
    dp.src = res.cancion;
    play_song();
  }
};

const pause_effects = () => {
  play_btn.innerHTML = "Play";
  im.style.animationPlayState = "paused";
};

const play_effects = () => {
  play_btn.innerHTML = "Pausa";
  im.style.animationPlayState = "running";
};

const play_song = () => {
  barrita.value = dp.currentTime;
  window.setTimeout(() => {
    barrita.max = dp.duration;
  }, 500);
  dp.play();
  play_effects();
};

let id_aux = 1;

const next_song = () => {
  if (id_aux < canciones.length) {
    select_song(++id_aux);
  }
};
const prev_song = () => {
  if (id_aux > 0) {
    select_song(--id_aux);
  }
};
const first_song = () => {
  im.src = canciones[0].caratula;
  tsong.innerHTML = canciones[0].titulo;
  asong.innerHTML = canciones[0].artista;
  dp.src = canciones[0].cancion;
};

let play_btn = document.getElementById("play-btn");
let next_btn = document.getElementById("next-btn");
let prev_btn = document.getElementById("prev-btn");

play_btn.addEventListener("click", () => {
  if (is_playing) {
    dp.pause();
    pause_effects();
    is_playing = false;
  } else {
    dp.play();
    play_effects();
    is_playing = true;
  }
});

window.addEventListener("load", () => {
  first_song();
  barrita.value = 0;

  window.setTimeout(() => {
    barrita.max = dp.duration;
  }, 500);

  window.setInterval(() => {
    barrita.value = dp.currentTime;
  }, 1000);
  barrita.addEventListener("change", () => {
    dp.currentTime = barrita.value;
  });

  next_btn.addEventListener("click", () => {
    next_song();
  });
  prev_btn.addEventListener("click", () => {
    prev_song();
  });
  listasong.addEventListener("click", (event) => {
    if (event.target.matches("img")) {
      select_song(event.target.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".data-song-container")) {
      console.log(event.target.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".artist-name")) {
      select_song(event.target.parentElement.parentElement.id.slice(5, 6));
    } else if (event.target.matches("h2")) {
      select_song(event.target.parentElement.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".list-item")) {
      select_song(event.target.id.slice(5, 6));
    }
  });

  dp.addEventListener("ended", () => {
    next_song();
  });
});

BuildList(canciones);

let search = document.getElementById("search");

search.addEventListener("keyup", () => {
  let res = canciones.filter((e) =>
    e.titulo.toLowerCase().includes(search.value.toLowerCase())
  );
  if (res) {
    BuildList(res);
  }
});

let volumen = document.getElementById('volume-control');
let estado = true;
volumen.value  = 1;

volumen.addEventListener('change',()=>{
  cancion.volume = volumen.value;
})
let vol = 1;
addEventListener('keydown',(event)=>{

  if(event.key === 'ArrowUp'&&vol<1)
  {
      try{
          vol = vol + 0.01;
          cancion.volume = vol;
          volumen.value = cancion.volume;
      }catch(error)
      {
          console.log(error);
      };
  };
  if(event.key === 'ArrowDown'&&vol>0)
  {
      try {
          vol = vol - 0.01;
          cancion.volume = vol;
          volumen.value = cancion.volume;

      } catch (error) {
          console.log(error);
      };

  };
});