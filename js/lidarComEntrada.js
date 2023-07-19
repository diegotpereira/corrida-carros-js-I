

class LidarComEntrada {

    constructor() {

        window.addEventListener('keypress', (event) => this.lidar(event));

        this.mapPress = {

            p: true,
            enter: false
        };
    }

    lidar(event) {

        if (event.type === 'keypress') {
            
            const key = event.key.toLowerCase();

            if (!event.repeat) {
                
                this.mapPress[key] = !this.mapPress[key];

                if (event.key === 'p') {
                    
                    this.pause(event);
                }
            }
        }
    }
}

export default LidarComEntrada;