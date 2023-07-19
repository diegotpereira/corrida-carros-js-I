import { canvas, theta } from "./utils.js";


class Camera {

    x = 0;
    y = 1500;
    z = 0;
    h = this.y;
    cursor = 0;
    deltaZ = 0;

    #distânciaAtePlanoProjecao = 1 / Math.tan(theta);   

    tela = new class {
        meioTela = new class {
            #tela;
            constructor(tela) {

                this.#tela = tela;
        
            }
            get x() {

                return this.#tela.width * 0.5;
            }   
            get y() {

                return this.#tela.height * 0.5;
            }
        }(this);

        get width() {

            return canvas.width;
        }

        get height() {

            return canvas.height;
        }
    };

    get distânciaAtePlanoProjecao() {

        return this.#distânciaAtePlanoProjecao;
    }
}

export default Camera;