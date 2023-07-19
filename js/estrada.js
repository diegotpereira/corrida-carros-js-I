import SegmentoLinha from "./segmentoLinha.js";
import { pistas } from "./utils.js";
import Render from "./render.js";

class Estrada {
    
    
    /**
    * @type {SegmentoLinha[]}
    */

    constructor(pistaNome) {

        this.pistaNome = pistaNome;
    }

    #segmentos = [];
    #k = 13;
    #width = 2000;

    #segmentoTamanho = 200;
    segmentosVisiveis =  600;

    get segmentosTamanho() {

        return this.#segmentos.length;
    }

    get segmentoTamanho() {

        return this.#segmentoTamanho;
    }

    get length() {

        return this.segmentosTamanho * this.segmentoTamanho;
    }

    get width() {

        return this.#width;
    }
    
    get k() {

        return this.#k;
    }
    /**
     * 
     * @param {NUmber} cursor;
     * @returns
     */

    getSegmento(cursor) {

        return this.#segmentos[Math.floor(cursor / this.#segmentoTamanho) % this.segmentosTamanho];
    }

    getSegmentoDoIndice(indice) {

        return this.#segmentos[indice % this.segmentosTamanho];
    }

    create() {
        this.#segmentos = [];
        const { k } = this;
        const { tamanhoPista, cores } = pistas[this.pistaNome];

        for (let i = 0; i < tamanhoPista; i += 1) {

            const coresMaisClaras = {
                estrada: cores.estradaClara,
                grama: cores.gramaClara,
                guia: cores.guiaClara,
                faixa: ''
            };

            const coresMaisEscuras = {

                estrada: cores.estradaClara,
                grama: cores.gramaEscura,
                guia: cores.guiaEscura,
                faixa: '#fff',

            };

            const coresClaras = {

                estrada: '#393839',
                grama: cores.gramaEscura,
                guia: cores.guiaClara,
                faixa: ''
            };

            const coresEscuras = {

                estrada: '#393839',
                grama: cores.gramaClara,
                guia: cores.guiaEscura,
                faixa: '#fff'
            }
    
          const segmentoLinha = new SegmentoLinha();
          segmentoLinha.indice = i;

          if(Math.floor(i / k) % 4 === 0) segmentoLinha.cores = coresMaisClaras;
          if(Math.floor(i / k) % 4 === 1) segmentoLinha.cores = coresMaisEscuras;
          if(Math.floor(i / k) % 4 === 2) segmentoLinha.cores = coresClaras;
          if(Math.floor(i / k) % 4 === 3) segmentoLinha.cores = coresEscuras;
    
          if (i <= 11) {
            segmentoLinha.cores.estrada = '#fff'
            i % 4 === 0 || i % 4 === 1 ? segmentoLinha.cores.checkers = 'one' : segmentoLinha.cores.checkers = 'two';
          }
    
          const { mundo } = segmentoLinha.pontos;
          mundo.w = this.width;
          mundo.z = (i + 1) * this.segmentosTamanho;
          this.#segmentos.push(segmentoLinha);
    
        }
    }

    /**
     * @param {Render} render
     * @param { Camera } camera
     */
    render(render, camera) {

        

        const cameraClass = camera;
        const { segmentosTamanho } = this;
        const baseSegmento = this.getSegmento(camera.cursor);
        const posicaoInicial = baseSegmento.indice;

        cameraClass.y = camera.h + baseSegmento.pontos.mundo.y;

        let maxY = camera.tela.height;

        for (let i = posicaoInicial; i < posicaoInicial + this.segmentosVisiveis; i += 1) {

            const atualSegmento = this.getSegmentoDoIndice(i);

            cameraClass.z = camera.cursor - (i >= segmentosTamanho ? this.length : 0);

            const atualTelaPonto = atualSegmento.pontos.tela;

            // if (atualTelaPonto.y >= maxY
                
            //     || camera.deltaZ <= camera.distânciaAtePlanoProjecao
                
            //     ) {
                
            //     continue;
            // }
            
            if (i > 0) {

                
                
                const anteriorSegmento = this.getSegmentoDoIndice(i - 1);
                const anteriorTelaPonto = anteriorSegmento. pontos.tela;
                const { cores } = atualSegmento;
                
                // if (atualTelaPonto.y >= anteriorTelaPonto.y) {
                    
                //     continue;
                // }

                render.drawPolygon(

                    cores.grama,
                    0, anteriorTelaPonto.y,
                    anteriorTelaPonto.x - anteriorTelaPonto.w, anteriorTelaPonto.y,
                    atualTelaPonto.x - atualTelaPonto.w, atualTelaPonto.y,
                    0, atualTelaPonto.y,
                );

                render.drawPolygon(

                    cores.grama,
                    anteriorTelaPonto.x + anteriorTelaPonto.w * 1, anteriorTelaPonto.y,
                    camera.tela.width, anteriorTelaPonto.y,
                    camera.tela.width, atualTelaPonto.y,
                    atualTelaPonto.x + atualTelaPonto.w, atualTelaPonto.y,
                );

                if (atualSegmento.guia) {
                    
                    // guia esquerda
                    render.drawPolygon(

                        cores.guia,
                        anteriorTelaPonto.x - anteriorTelaPonto.w * 1.3, anteriorTelaPonto.y,
                        anteriorTelaPonto.x - anteriorTelaPonto.w, anteriorTelaPonto.y,
                        atualTelaPonto.x - atualTelaPonto.w, atualTelaPonto.y,
                        atualTelaPonto.x - atualTelaPonto.w * 1.3, atualTelaPonto.y,

                    );

                    // guia direita
                    render.drawPolygon(

                        cores.guia,
                        anteriorTelaPonto.x + anteriorTelaPonto.w * 1.3, anteriorTelaPonto.y,
                        anteriorTelaPonto.x + anteriorTelaPonto.w, anteriorTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w, atualTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w * 1.3, atualTelaPonto.y,
                    )
                }

                if (cores.faixa) {

                    // faixa esquerda
                    render.drawPolygon(

                        cores.faixa,
                        anteriorTelaPonto.x + anteriorTelaPonto.w * -0.97, anteriorTelaPonto.y,
                        anteriorTelaPonto.x + anteriorTelaPonto.w * -0.94, anteriorTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w * -0.94, atualTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w * -0.97, atualTelaPonto.y,
                    );

                    render.drawPolygon(

                        cores.faixa,
                        anteriorTelaPonto.x + anteriorTelaPonto.w * -0.91, anteriorTelaPonto.y,
                        anteriorTelaPonto.x + anteriorTelaPonto.w * -0.88, anteriorTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w * -0.88, atualTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w * -0.91, atualTelaPonto.y,
                    );

                    // faixa direita
                    render.drawPolygon(

                        cores.faixa,
                        anteriorTelaPonto.x + anteriorTelaPonto.w * 0.97, anteriorTelaPonto.y,
                        anteriorTelaPonto.x + anteriorTelaPonto.w * 0.94, anteriorTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w * 0.94, atualTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w * 0.97, atualTelaPonto.y,
                    );

                    render.drawPolygon(

                        cores.faixa,
                        anteriorTelaPonto.x + anteriorTelaPonto.w * 0.91, anteriorTelaPonto.y,
                        anteriorTelaPonto.x + anteriorTelaPonto.w * 0.88, anteriorTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w * 0.88, atualTelaPonto.y,
                        atualTelaPonto.x + atualTelaPonto.w * 0.91, atualTelaPonto.y,
                    );

                    const valor = 0.02;

                    // render.drawTrapezium(

                    //     anteriorTelaPonto.x + anteriorTelaPonto.y, anteriorTelaPonto.w * valor,
                    //     atualTelaPonto.x + atualTelaPonto.y, atualTelaPonto.w * valor,
                    //     cores.faixa
                    // );
                    
                    
                    
                    
                }

                if (cores.checkers === 'one') {

                    for (let i = 0; i < 0.9; i++) {
                        
                        render.drawPolygon(
                            'black',
                            anteriorTelaPonto.x + anteriorTelaPonto.w * i, anteriorTelaPonto.y,
                            anteriorTelaPonto.x + anteriorTelaPonto.w * (i + 1 / 3), anteriorTelaPonto.y,
                            atualTelaPonto.x + atualTelaPonto.w * (i + 1 / 3), atualTelaPonto.y,
                            atualTelaPonto.x + atualTelaPonto.w * i, atualTelaPonto.y
                        );
                        
                    }
                    
                }

                if (cores.checkers === 'two') {

                    for (let i = 0; i < 0.9; i++) {
                        
                        render.drawPolygon(
                            'black',
                            anteriorTelaPonto.x + anteriorTelaPonto.w * i, anteriorTelaPonto.y,
                            anteriorTelaPonto.x + anteriorTelaPonto.w * (i + 1 / 3), anteriorTelaPonto.y,
                            atualTelaPonto.x + atualTelaPonto.w * (i + 1 / 3), atualTelaPonto.y,
                            atualTelaPonto.x + atualTelaPonto.w * i, atualTelaPonto.y
                        );
                        
                    }
                    
                }
            }
            
            maxY = atualTelaPonto.y;
        }

    }
}

export default Estrada;