console.log('[Daywison] Flappy Bird');


let frames = 0
const somHit = new Audio();
somHit.src = './efeitos/efeitos_hit.wav'


//criando url da image
const sprites = new Image();
sprites.src = './sprites.png';

//declarando canvas como 2d
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d')

//variaveis de posicionamento da imagem flappyBird

function fazcColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.Ycanvas + flappyBird.altura;
    const chaoY = chao.Ycanvas

    if (flappyBirdY >= chaoY) {
        return true
    }
    else {
        return false
    }
}

// cria o passarinho
function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spritey: 0,
        largura: 33,
        altura: 24,
        Xcanvas: 10,
        Ycanvas: 50,
        gravidade:0.25,
        velocidade: 0,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo
        },

        atualiza() {
            if (fazcColisao(flappyBird, globais.chao)) {
                console.log('fez colisao')
                somHit.play();
                setTimeout(() => {
                    mudaParaTela(Telas.Inicio);
                },500)
                return
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.Ycanvas = flappyBird.Ycanvas + flappyBird.velocidade
        }, 
        movimentos: [
            {spriteX: 0, spriteY: 0},   //asa par cima
            {spriteX: 0, spriteY: 26},  // asa no meio
            {spriteX: 0, spriteY: 52}, // asa para baixo
        ],
        
        frameAtual: 0,
        atualizaFrameatual() {
            //intervalo de frames em que o passarinho ira atualizar a troca de sprites, nesse caso de 10 em 10 frames
            const intervaloDeFrames = 10;
            // aqui ele divide o frame por 10 então toda vez que o frame chegar no valo intervalo de frames ele vai retornar para zero
            // e toda vez que chgar no zero ele altera a sprite e assim por diante
            const passoIntervalo = frames % intervaloDeFrames == 0;
            console.log(passoIntervalo);

            if (passoIntervalo) {
                
                //base da soma foi definica como 1
                const baseDoIncremento = 1;
                //o incremento vais er sempre baseado no que ele ja tinha antes
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                // base da repetição vai ser o tamanho da quantodade do movimento que temos,que no caso são 3 asa baixa, meio, alta.
                const baseRepeticao = flappyBird.movimentos.length;
                //quando chega na totalidade do arrai e do incremento, ele divide por ele mesmo retornando para zero, ex: 3%3=0
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        //desenhando o bird
        desenha() {
            flappyBird.atualizaFrameatual()
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            
            contexto.drawImage(
                sprites,
                spriteX, spriteY, //sprite x e y
                flappyBird.largura, flappyBird.altura, //tamanho do recorte na imagem,
                flappyBird.Xcanvas,  flappyBird.Ycanvas,// posicionamento no canvas
                flappyBird.largura, flappyBird.altura // tamanho no canvas
            );
        }
    }
    return flappyBird
}

//[PASSARINHO]


//[CHÃO]
function criaChao() {

    const chao = {
        spriteX: 0,
        spritey: 610,
        largura: 224,
        altura: 112,
        Xcanvas: 0,
        Ycanvas: canvas.height - 112,

        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.Xcanvas - movimentoDoChao;
    
            // console.log(chao.Xcanvas)    
            // console.log(`repete em `+ repeteEm)
            // console.log(`cauculo loco ` + movimentacao % repeteEm) 
            
            chao.Xcanvas = movimentacao % repeteEm;
        },
        //desenhando o bird
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spritey, //sprite x e y
                chao.largura, chao.altura, //tamanho do recorte na imagem,
                chao.Xcanvas, chao.Ycanvas,// posicionamento no canvas
                chao.largura, chao.altura // tamanho no canvas
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spritey, //sprite x e y
                chao.largura, chao.altura, //tamanho do recorte na imagem,
                (chao.Xcanvas + chao.largura), chao.Ycanvas,// posicionamento no canvas
                chao.largura, chao.altura // tamanho no canvas
            );
        }
    }
    return chao;
}

//[PLANO DE FUNDO]
const bg = {
    spriteX: 390,
    spritey: 0,
    largura: 276,
    altura: 206,
    Xcanvas: 0,
    Ycanvas: canvas.height - 204,

    //desenhando o bird
    desenha(){
        //declarando cor pro contexto
        contexto.fillStyle = '#70c5ce'
        //declarando o tamanho do quadro com a cor, parametros:
        //inicio X, inicio Y , largura no x, largura no Y
        contexto.fillRect(0,0, canvas.width, canvas.height)
        //nesse caso foi declarado com largura total do canvas E altura total do canvas


        contexto.drawImage(
            sprites,
            bg.spriteX, bg.spritey, //sprite x e y
            bg.largura, bg.altura, //tamanho do recorte na imagem,
            bg.Xcanvas,  bg.Ycanvas,// posicionamento no canvas
            bg.largura, bg.altura // tamanho no canvas
        );
        contexto.drawImage(
            sprites,
            bg.spriteX, bg.spritey, //sprite x e y
            bg.largura, bg.altura, //tamanho do recorte na imagem,
            (bg.Xcanvas + bg.largura),  bg.Ycanvas,// posicionamento no canvas
            bg.largura, bg.altura // tamanho no canvas
        );
        
    }
}
const mensagemGetReady = {
    spriteX: 134,
    spritey: 0,
    largura: 174,
    altura: 152,
    Xcanvas: (canvas.width / 2) - 174 / 2,
    Ycanvas: 50,

    //desenhando o bird
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spritey, //sprite x e y
            mensagemGetReady.largura, mensagemGetReady.altura, //tamanho do recorte na imagem,
            mensagemGetReady.Xcanvas,  mensagemGetReady.Ycanvas,// posicionamento no canvas
            mensagemGetReady.largura, mensagemGetReady.altura // tamanho no canvas
        );
    }
}

//
// TELAS
//
const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    if (telaAtiva.Inicializa) {
        telaAtiva.Inicializa();
    }
}

const Telas = {
    Inicio: {
        Inicializa() {
            globais.flappyBird = criaFlappyBird()
            globais.chao = criaChao()
        },
        desenha() {
            bg.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.Jogo)
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

Telas.Jogo = {
    desenha() {
        //chamando função de desenhar
        bg.desenha();
        globais.flappyBird.desenha();
        globais.chao.desenha();
    },
    click() {
        globais.flappyBird.pula()
    },
    atualiza() {
        globais.flappyBird.atualiza();
    }
}


//função para renderizar infinitamente
function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames =  frames + 1 
    //fica criando a animação infinita
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
})

mudaParaTela(Telas.Inicio)
loop()