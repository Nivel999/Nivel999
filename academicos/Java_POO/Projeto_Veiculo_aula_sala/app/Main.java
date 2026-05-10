package app;

import veiculos.aereo.JatoGuerra;
import veiculos.aquatico.Jetski;
import veiculos.terrestre.Carro;

public class Main {
    public static void main(String[] args){
        // Não é possível instanciar objeto de classe abstrata
        //Veiculo veiculo_1 = new Veiculo("Fusca");

        //Terrestre terrestre_1 = new Terrestre("Tanque de Guerra", 8);
        Carro carro_1 = new Carro("Opala", 4, "Gasolina");
        carro_1.acelerar(100);
        carro_1.mover();
        carro_1.desacelerar(20);
        carro_1.mover();

        JatoGuerra jato_1 = new JatoGuerra("F-16", 20);
        jato_1.acelerar(450);
        jato_1.ganharAltitude(250);
        jato_1.mover();
        jato_1.atirarMissel();
        jato_1.mostrarInfo();

        Jetski jetski_1 = new Jetski("Yamahga FX", true, 2);
        jetski_1.acelerar(50);
        jetski_1.mover();
        jetski_1.desacelerar(20);
        jetski_1.mostrarInfo();
    }
}
