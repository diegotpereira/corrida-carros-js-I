import { lidarComEntrada, pistas } from "./utils.js";


class Menu {

    constructor(width, height) {

        this.exibirMenu = 0;
        this.width = width;
        this.height = height;
        this.estado = 'titulo';
        this.menuX = 5;
        this.menuY = 0;

        this.atualizarTempo =  6 / 60;
        this.menuFrase = {

            0: 'Circuito: ',
            1: 'Oponentes: ',
            2: 'Dificuldades: ',
            3: 'Música: ',
            4: 'Volume da Música: ',
            5: 'Iniciar: '
        };

        this.menu = {

            0: Object.keys(pistas),
            1: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19'],
            2: ['novato', 'corredor', 'campeão'],
            3: ['não', 'sim'],
            4: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            5: ['corrida'],
        };

        this.opcaoSelecionada = {

            0: 'teste',
            1: '19',
            2: 'novato',
            3: 'não',
            4: '1',
            5: 'corrida',
        };

        this.menuTitulo = {

            pos: 0,
            direcao: 1
        };
    }

    inciarCorrida(estrada, diretor) {

        const estradaParam = estrada;
        const zero = 0;


        estradaParam.pistaNome = this.opcaoSelecionada[zero];
        estradaParam.create();
        diretor.create(estrada, this.opcaoSelecionada[0]);
    }

    update(estrada, diretor) {

        const maxX = Object.keys(this.menu).length - 1;
        const maxY = this.menu[this.menuX].length - 1;
        
        if (lidarComEntrada.mapPress.enter && !this.exibirMenu) {

            this.opcaoSelecionada[3] = 'sim';
            this.exibirMenu = 1;
            this.menuTitulo.pos = 0;
            lidarComEntrada.mapPress.enter = false;
        }

        if (this.exibirMenu) {
            
            const ultimaOpcao = Object.keys(this.menu).length - 1;

            if (this.menuX !== ultimaOpcao) {
                
                this.opcaoSelecionada[this.menuX] = this.menu[this.menuX][this.menuY];
                lidarComEntrada.mapPress.enter = false;
            }
    
            if (lidarComEntrada.mapPress.enter && this.menuX === ultimaOpcao) {
    
                this.inciarCorrida(estrada, diretor);
                this.estado = 'corrida';
    
                lidarComEntrada.mapPress.enter = false;
                
            }
        }

    }

    render(render) {

        // Renderiza o título do jogo
        render.desenharTexto('#EB4844', 'Corrida de Carros', 320, 30, 4, 'OutriderCondBold');

        // Se o menu não está sendo exibido
        if (!this.exibirMenu) {

            // Efeito de movimento do título do menu
            // if(this.menuTitulo.pos >= 12) this.menuTitulo.direcao = -1;
            // if(this.menuTitulo.pos <= -12) this.menuTitulo.direcao = 1;

            // this.menuTitulo.pos += (this.menuTitulo.direcao / 2);
            
            // Exibe a mensagem 'Aperte OK para iniciar' ou 
            // 'Aperte ENTER para iniciar' dependendo do suporte a toque
            if (window.navigator.maxTouchPoints) {
                
                render.desenharTexto('black', 'Aperte OK para iniciar', 320, 180 + this.menuTitulo.pos);

            } else {

                render.desenharTexto('black', 'Aperte Enter para iniciar', 320, 180 + this.menuTitulo.pos);
            }
        }

        if (this.exibirMenu) {
            
            if(this.menuTitulo.pos >= 4) this.menuTitulo.direcao = -1;
            if(this.menuTitulo.pos <= 4) this.menuTitulo.direcao = 1;

            this.menuTitulo.pos += (this.menuTitulo.direcao / 2);

            const maxX = Object.keys(this.menu).length - 1;

            const menuBaixo = this.menuX - 1 >= 0 ? this.menuX - 1 : maxX;
            const menuAlto = this.menuX + 1 <= maxX ? this.menuX + 1 : 0;

            const textoBaixo = `${this.menuFrase[menuBaixo]} ${this.opcaoSelecionada[menuBaixo].toLocaleUpperCase()}`
            const textoAlto = `${this.menuFrase[menuAlto]} ${this.opcaoSelecionada[menuAlto].toLocaleUpperCase()}`;
            const frase = `${this.menuFrase[this.menuX]} ${this.menu[this.menuX][this.menuY].toLocaleUpperCase()}`;

            render.desenharTexto('FFFAF4', textoBaixo, 320, 180 - 45, 1.6);

            render.desenharTexto('FFFAF4', textoAlto, 320, 180 + 45, 1.6);

            render.desenharTexto('#050B1A', frase, 320, 180 + (this.menuTitulo.pos / 4), 1.6);
        }
    }
}

export default Menu;