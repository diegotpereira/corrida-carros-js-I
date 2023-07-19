import { canvas, pistas, recurso, posicaoInicial } from "./utils.js";
import Render from "./render.js";
import Estrada from "./estrada.js";
import Menu from "./menu.js";
import Camera from "./camera.js";
import Diretor from "./diretor.js";
import TelaFundo from "./telafundo.js";


window.onload = () => {
    const containerCanvas = document.querySelector('.container');
    containerCanvas.height = Math.min(window.innerHeight, (0.5625 * window.innerWidth));
};


/**
 * 
 * @param {Render} render
 * @param {Number} width 
 * @param {Number} height 
 */

const loop = (render, camera, estrada, tf, diretor, menu, width, height) => {

    const diretorParam = diretor;
    const cameraParam = camera;
    

    render.clear(0, 0, width, height);
    render.save();

    if (menu.estado === 'corrida') {

        const tempoAgora = window.performance.now();
        const tempoDecorrido = (tempoAgora - diretorParam.tempoReal) / 1000;

        diretorParam.tempoReal = tempoAgora;
        diretorParam.tempoDesdeUltimaTrocaQuadro += tempoDecorrido;
        
        tf.update(cameraParam, estrada, diretorParam);

        tf.render(render, cameraParam, estrada.width);

        estrada.render(render, cameraParam);

        diretorParam.render(render);


        render.restore();
    }
    
    if (menu.estado === 'titulo') {

        const { opcaoSelecionada } = menu;
        const tempoAgora = window.performance.now();
        const tempoDecorrido = (tempoAgora - diretorParam.tempoReal) / 1000;

        diretorParam.tempoReal = tempoAgora;
        diretorParam.tempoDesdeUltimaTrocaQuadro += tempoDecorrido;

        if (diretorParam.tempoDesdeUltimaTrocaQuadro > menu.atualizarTempo) {

            menu.update(estrada, diretorParam);
            diretorParam.tempoDesdeUltimaTrocaQuadro = 0;
        }

        menu.render(render);

        const { tamanhoPista } = pistas[opcaoSelecionada[0]];
        const qualifPos = Number(opcaoSelecionada[1]) + 1;
        cameraParam.cursor = posicaoInicial(tamanhoPista, qualifPos);
    }

    requestAnimationFrame(() => loop(render, camera, estrada, tf, diretorParam, menu, width, height));
}

const init = () => {

    const { width, height } = canvas;

    const render = new Render(canvas.getContext('2d'));

    const camera = new Camera();
    const diretor = new Diretor();
    const estrada = new Estrada(render.ctx, canvas.width, canvas.height);
    const telaFundo = new TelaFundo();

    const menu = new Menu(width, height);
    
    telaFundo.create();

    loop(render, camera, estrada, telaFundo, diretor, menu, width, height);
}

// init();
recurso
  .add('skyClear', './img/tela_fundo/skyClear.png')
  .add('skyDark', './img/tela_fundo/skyDark.png')
  .add('hill', './img/tela_fundo/hill.png')
  .add('tree', './img/tela_fundo/tree.png')
  .carregarImagem(() => requestAnimationFrame(() => init()));

