import LidarComEntrada from "./lidarComEntrada.js";
import Recurso from "./recurso.js";

const canvas = document.querySelector('#gameCanvas');

const lidarComEntrada = new LidarComEntrada

const recurso = new Recurso();

const fieldOfView = (120 / 180) * Math.PI;

const theta = fieldOfView * 0.5;

const posicaoInicial = (tamanhoPista, posicao) => (tamanhoPista - (posicao * 16)) * 200;

const pistas = {

    teste: {
        pistaNome: 'teste', 
        tamanhoPista: 6656,
        voltas: 78,
        cores: {
            estradaClara: '#424142',
            estradaEscura: '#393839',
            gramaClara: '#008800',
            gramaEscura: '#006600',
            guiaClara: '#ffffff',
            guiaEscura: '#ff0000'
        }
    }
}

export {

    lidarComEntrada,
    recurso,
    canvas,
    pistas,
    theta,
    posicaoInicial
}