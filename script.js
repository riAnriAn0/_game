const placar = document.getElementById("pontos");
const setas = document.querySelectorAll(".seta");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let derrota = false;

const jogador = {
  px: 15,
  py: 29,
};

const time = {
  geracao_de_bot: 1000,
  velocidade: 550,
};

function movimentacaoBot() {
  bots.forEach((bot, indece) => {
    if (bot.py > 29) {
      bots.splice(indece, 1);
      derrota = true;
    } else {
      bot.py += 1;
    }
  });
}

const bots = [];

function createBots() {
  const posicao_x = Math.floor(Math.random() * 30);
  const posicao_y = Math.floor(Math.random() * 5); // litmitar a aparição do dos bots

  let newBot = {
    px: posicao_x,
    py: posicao_y,
  };

  bots.push(newBot);
}

const tiros = [];

function createTiro() {
  const tiro = {
    px: jogador.px,
    py: jogador.py - 1,
  };

  tiros.push(tiro);
}

function disparos() {
  tiros.forEach((tiro, indece) => {
    if (tiro.py < 1) {
      tiros.splice(indece, 1);
    } else {
      tiro.py -= 1;
    }
  });
}

const botInterval = setInterval(createBots, time.geracao_de_bot); // tempo de aperição de bots
const botMovimetacaoInterval = setInterval(movimentacaoBot, time.velocidade); // temppo / velocidade dos bots

setas.forEach((seta) => {
  seta.addEventListener("click", joyStick);
});

function joyStick(e) {
  const direcoes = {
    arrow_upward() {
      if (jogador.py < 1) {
        jogador.py = 29;
        return;
      } else {
        jogador.py -= 1;
        return;
      }
    },
    arrow_downward() {
      if (jogador.py < 29) {
        jogador.py += 1;
      }
    },
    arrow_back() {
      if (jogador.px < 1) {
        jogador.px = 29;
        return;
      } else {
        jogador.px -= 1;
        return;
      }
    },
    arrow_forward() {
      if (jogador.px > 29) {
        jogador.px = 0;
        return;
      } else {
        jogador.px += 1;
        return;
      }
    },
    radio_button_checked() {
      createTiro();
    },
  };
  // console.clear();
  // console.log(`jogador_1 x: ${jogador.px}  y:${jogador.py}`);

  const seta = e.target.innerText;
  const acao = direcoes[seta];
  if (acao) {
    acao();
  }
}

document.addEventListener("keydown", movimentacao);

function movimentacao(e) {
  const direcoes = {
    ArrowUp() {
      if (jogador.py < 1) {
        jogador.py = 29;
        return;
      } else {
        jogador.py -= 1;
        return;
      }
    },
    ArrowDown() {
      if (jogador.py < 29) {
        jogador.py += 1;
      }
    },
    ArrowLeft() {
      if (jogador.px < 1) {
        jogador.px = 29;
        return;
      } else {
        jogador.px -= 1;
        return;
      }
    },
    ArrowRight() {
      if (jogador.px >= 29) {
        jogador.px = 0;
        return;
      } else {
        jogador.px += 1;
        return;
      }
    },
    s() {
      createTiro();
    },
  };

  const arrow = e.key;
  const acao = direcoes[arrow];
  if (acao) {
    acao();
  }
  // console.clear();
  // console.log(`jogador_1 x: ${jogador.px}  y:${jogador.py}`);
}

function placarIncremento() {
  let pontosAtual = Number(placar.value);
  placar.value = pontosAtual + 1;
}

function colisao() {
  bots.forEach((bot, indeceBot) => {
    tiros.forEach((tiro, indece) => {
      if (tiro.px == bot.px && tiro.py == bot.py) {
        bots.splice(indeceBot, 1);
        tiros.splice(indece, 1);
        placarIncremento();
      }
    });
  });
  bots.forEach((bot) => {
    if (jogador.px == bot.px && jogador.py == bot.py) {
      derrota = true;
      gameOver();
    }
  });
}

function gameOver() {
  clearInterval(botInterval);
  clearInterval(botMovimetacaoInterval);

  tiros.splice(0, tiros.length)
  bots.splice(0, bots.length)

  ctx.clearRect(0, 0, 30, 30);

  const pixels = [
    // G
    { px: 2, py: 4 },
    { px: 3, py: 4 },
    { px: 4, py: 4 },
    { px: 5, py: 4 },
    { px: 6, py: 4 },
    { px: 2, py: 5 },
    { px: 2, py: 6 },
    { px: 2, py: 7 },
    { px: 2, py: 8 },
    { px: 2, py: 9 },
    { px: 3, py: 9 },
    { px: 4, py: 9 },
    { px: 5, py: 9 },
    { px: 6, py: 9 },
    { px: 6, py: 8 },
    { px: 6, py: 7 },
    { px: 4, py: 7 },

    // A
    { px: 8, py: 4 },
    { px: 9, py: 4 },
    { px: 10, py: 4 },
    { px: 11, py: 4 },
    { px: 8, py: 5 },
    { px: 8, py: 6 },
    { px: 8, py: 7 },
    { px: 8, py: 8 },
    { px: 8, py: 9 },
    { px: 11, py: 5 },
    { px: 11, py: 6 },
    { px: 11, py: 7 },
    { px: 11, py: 8 },
    { px: 11, py: 9 },
    { px: 9, py: 7 },
    { px: 10, py: 7 },

    // M
    { px: 13, py: 4 },
    { px: 14, py: 4 },
    { px: 15, py: 4 },
    { px: 16, py: 4 },
    { px: 17, py: 4 },
    { px: 13, py: 5 },
    { px: 13, py: 6 },
    { px: 13, py: 7 },
    { px: 13, py: 8 },
    { px: 13, py: 9 },
    { px: 17, py: 5 },
    { px: 17, py: 6 },
    { px: 17, py: 7 },
    { px: 17, py: 8 },
    { px: 17, py: 9 },
    { px: 15, py: 5 },
    { px: 15, py: 6 },
    { px: 15, py: 7 },

    // E
    { px: 19, py: 4 },
    { px: 20, py: 4 },
    { px: 21, py: 4 },
    { px: 22, py: 4 },
    { px: 23, py: 4 },
    { px: 19, py: 5 },
    { px: 19, py: 6 },
    { px: 19, py: 7 },
    { px: 19, py: 8 },
    { px: 19, py: 9 },
    { px: 20, py: 7 },
    { px: 21, py: 7 },
    { px: 20, py: 9 },
    { px: 21, py: 9 },
    { px: 22, py: 9 },
    { px: 23, py: 9 },

    // O
    { px: 2, py: 12 },
    { px: 3, py: 12 },
    { px: 4, py: 12 },
    { px: 5, py: 12 },
    { px: 6, py: 12 },
    { px: 2, py: 13 },
    { px: 2, py: 14 },
    { px: 2, py: 15 },
    { px: 2, py: 16 },
    { px: 2, py: 17 },
    { px: 6, py: 13 },
    { px: 6, py: 14 },
    { px: 6, py: 15 },
    { px: 6, py: 16 },
    { px: 6, py: 17 },
    { px: 3, py: 17 },
    { px: 4, py: 17 },
    { px: 5, py: 17 },

    // V
    { px: 8, py: 12 },
    { px: 9, py: 12 },
    { px: 10, py: 12 },
    { px: 11, py: 12 },
    { px: 12, py: 12 },
    { px: 8, py: 13 },
    { px: 9, py: 14 },
    { px: 10, py: 15 },
    { px: 11, py: 16 },
    { px: 12, py: 17 },

    // E
    { px: 14, py: 12 },
    { px: 15, py: 12 },
    { px: 16, py: 12 },
    { px: 17, py: 12 },
    { px: 18, py: 12 },
    { px: 14, py: 13 },
    { px: 14, py: 14 },
    { px: 14, py: 15 },
    { px: 14, py: 16 },
    { px: 14, py: 17 },
    { px: 15, py: 15 },
    { px: 16, py: 15 },
    { px: 15, py: 17 },
    { px: 16, py: 17 },
    { px: 17, py: 17 },
    { px: 18, py: 17 },

    // R
    { px: 20, py: 12 },
    { px: 21, py: 12 },
    { px: 22, py: 12 },
    { px: 23, py: 12 },
    { px: 20, py: 13 },
    { px: 20, py: 14 },
    { px: 20, py: 15 },
    { px: 20, py: 16 },
    { px: 20, py: 17 },
    { px: 21, py: 15 },
    { px: 22, py: 15 },
    { px: 23, py: 15 },
    { px: 21, py: 16 },
    { px: 22, py: 17 },
    { px: 23, py: 17 },
  ];

  pixels.forEach((pixel) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(pixel.px, pixel.py, 1, 1);
  });
}

criarCanvas();

function criarCanvas() {
  if (!derrota) {
    ctx.clearRect(0, 0, 30, 30);

    // BOT
    bots.forEach((bot) => {
      ctx.fillStyle = "#000";
      ctx.fillRect(bot.px, bot.py, 1, 1);
    });

    // PLAYER
    ctx.fillStyle = "#fb0";
    ctx.fillRect(jogador.px, jogador.py, 1, 1);

    // TIROS
    tiros.forEach((tiro) => {
      ctx.fillStyle = "#fd4949";
      ctx.fillRect(tiro.px, tiro.py, 1, 1);
    });

    //DISPAROS
    disparos();

    //COLISÕES
    colisao();
  } else {
    gameOver();
  }

  requestAnimationFrame(criarCanvas);
}
