const placar = document.getElementById("pontos");
const setas = document.querySelectorAll(".seta");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const jogador = {
  px: 25,
  py: 49,
};

const bots = [];

function gameOver() {
  ctx.clearRect(0, 0, 50, 50);
}

function movimentacaoBot() {
  bots.forEach((bot, indece) => {
    if (bot.py > 49) {
      bots.splice(indece, 1);
      console.log("GAME OVER");
    } else {
      bot.py += 1;
    }
  });
}

function createBots() {
  const posicao_x = Math.floor(Math.random() * 50);
  const posicao_y = Math.floor(Math.random() * 10); // litmitar a aparição do dos bots

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

function movimentacaoTiro() {
  tiros.forEach((tiro, indece) => {
    if (tiro.py < 1) {
      tiros.splice(indece, 1);
    } else {
      tiro.py -= 1;
    }
  });
}

setInterval(createBots, 2000); // tempo de aperição de bots
setInterval(movimentacaoBot, 500); // temppo / velocidade dos bots
setInterval(movimentacaoTiro, 100);

setas.forEach((seta) => {
  seta.addEventListener("click", joyStick);
});

function joyStick(e) {
  const direcoes = {
    arrow_upward() {
      if (jogador.py < 1) {
        jogador.py = 49;
        return;
      } else {
        jogador.py -= 1;
        return;
      }
    },
    arrow_downward() {
      // if (jogador.py > 49) {
      //   jogador.py = 0;
      //   return;
      // } else {
      //   jogador.py += 1;
      //   return;
      // }
      if (jogador.py < 49) {
        jogador.py += 1;
      }
    },
    arrow_back() {
      if (jogador.px < 1) {
        jogador.px = 49;
        return;
      } else {
        jogador.px -= 1;
        return;
      }
    },
    arrow_forward() {
      if (jogador.px > 49) {
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
  console.clear();
  console.log(`jogador_1 x: ${jogador.px}  y:${jogador.py}`);

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
        jogador.py = 49;
        return;
      } else {
        jogador.py -= 1;
        return;
      }
    },
    ArrowDown() {
      // if (jogador.py >= 49) {
      //   jogador.py = 0;
      //   return;
      // } else {
      //   jogador.py += 1;
      //   return;
      // }
      if (jogador.py < 49) {
        jogador.py += 1;
      }
    },
    ArrowLeft() {
      if (jogador.px < 1) {
        jogador.px = 49;
        return;
      } else {
        jogador.px -= 1;
        return;
      }
    },
    ArrowRight() {
      if (jogador.px >= 49) {
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
  console.clear();
  console.log(`jogador_1 x: ${jogador.px}  y:${jogador.py}`);
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
  bots.forEach((bot, indeceBot) => {
    if (jogador.px == bot.px && jogador.py == bot.py) {
      bots.splice(indeceBot, 1);
      console.log("GAME OVER");
    }
  });
}

criarCanvas();

function criarCanvas() {
  ctx.clearRect(0, 0, 50, 50);

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
  colisao();

  requestAnimationFrame(criarCanvas);
}
