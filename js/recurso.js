class Recurso {
    #cache = new Map();
    #list = [];
  
    add(name, url) {
      if (arguments.length === 2) {
        this.#list.push({ name, url });
      } else if (arguments.length === 1) {
        this.#list.push({ name, url: name });
      }
      return this;
    }
  
    get cache() {
      return this.#cache;
    }
  
    get(res) {
      return this.cache.get(res) || null;
    }
  
    carregarImagem(callback) {
      if (this.#list.length > 0) {
        const res = this.#list.pop();
        const image = new Image();
        image.onload = () => {
          this.cache.set(res.name, image);
          this.carregarImagem(callback);
        };
        
        image.src = res.url;
      } else {
        if (callback) {
          callback(this);
        }
      }
    }
  }
  
  export default Recurso;
  