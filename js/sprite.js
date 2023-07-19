

class Sprite {
    /**
     * @type {HTMLImagemElement}
     */
    constructor() {
      this.imagem = {};
      this.offsetX = 0;
      this.offsetY = 0;
      this.posicaoFolhaX = 0;
      this.posicaoFolhaY = 0;
      this.escalaX = 1;
      this.escalaY = 1;
      this.spritesInX = 1;
      this.spritesInY = 1;
      this.nome = 'sprite';
      // this.runningPower = { speed: 0, mult: 0 };
    }
  
    get width() {
      return this.imagem.width;
    }
  
    get height() {
      return this.imagem.height;
    }
  }
  
  export default Sprite;
  