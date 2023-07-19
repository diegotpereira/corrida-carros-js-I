import { lidarComEntrada } from "./utils.js";


class Diretor {

    constructor() {

        this.tempoTotal = 0;
        this.pausado = false;
        this.tempoDesdeUltimaTrocaQuadro = 0;
        this.tempoReal = 0;
    }

    create(estrada, pistaNome) {

        lidarComEntrada.mapPress.p = true;

        // const primeiraLinhaSegmento = estrada.getSegmentoDoIndice(0);
        // const segmentoLinhaDez = estrada.getSegmentoDoIndice(pistas[estrada.pistaNome].tamanhoPista - 160);

        // this.pistaNome = pistaNome;

        // this.luzesLargada.offsetX = 0;
        // this.luzesLargada.offsetY = 2;
        // this.luzesLargada.escalaX = 27;
        // this.luzesLargada.escalaY = 27;
        // this.luzesLargada.spritesInX = 6;
        
        
        // this.luzesLargada.imagem = recurso.get('');
        // this.luzesLargada.nome = '';
        

        // primeiraLinhaSegmento.sprites.push(this.luzesLargada);
        // segmentoLinhaDez.sprites.push(this.luzesLargada);
    }

    render(render) {

        if (this.tempoTotal < 2500) {
            
            render.desenharTexto('#FFFAF4', 'Prepare-see...', 320, 135,
                2, 'OutriderCond', 'center', 'black', true);
        }
    }
}

export default Diretor;