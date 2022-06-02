console.log('[Daywison] Flappy Bird');

//criando url da image
const sprites = new Image();
sprites.src = './sprites.png';

//declarando canvas como 2d
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d')

//variaveis de posicionamento da imagem flappyBird


//[PASSARINHO]
const flappyBird = {
    spriteX: 0,
    spritey: 0,
    largura: 33,
    altura: 24,
    Xcanvas: 10,
    Ycanvas: 50,
    gravidade:0.25,
    velocidade:0,

    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
        flappyBird.Ycanvas = flappyBird.Ycanvas + flappyBird.velocidade
    },

    //desenhando o bird
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spritey, //sprite x e y
            flappyBird.largura, flappyBird.altura, //tamanho do recorte na imagem,
            flappyBird.Xcanvas,  flappyBird.Ycanvas,// posicionamento no canvas
            flappyBird.largura, flappyBird.altura // tamanho no canvas
        );
    }
}

//[CHÃO]
const chao = {
    spriteX: 0,
    spritey: 610,
    largura: 224,
    altura: 112,
    Xcanvas: 0,
    Ycanvas: canvas.height - 112,

    //desenhando o bird
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spritey, //sprite x e y
            chao.largura, chao.altura, //tamanho do recorte na imagem,
            chao.Xcanvas,  chao.Ycanvas,// posicionamento no canvas
            chao.largura, chao.altura // tamanho no canvas
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spritey, //sprite x e y
            chao.largura, chao.altura, //tamanho do recorte na imagem,
            (chao.Xcanvas+chao.largura),  chao.Ycanvas,// posicionamento no canvas
            chao.largura, chao.altura // tamanho no canvas
        );
    }
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


//função para renderizar infinitamente
function loop() {
    
    //chamando função de desenhar
    bg.desenha();
    flappyBird.desenha();
    flappyBird.atualiza();
    chao.desenha();

    //fica criando a animação infinita
    requestAnimationFrame(loop);
}

loop()