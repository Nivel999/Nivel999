package veiculos.aquatico;

public class Jetski extends Aquatico{
    protected int capacidadePessoas;

    public Jetski(String nome, boolean possuiHelice, int capacidadePessoas){
        super(nome, possuiHelice);
        this.capacidadePessoas = capacidadePessoas;
    }

    @Override
    public void mover(){
        System.out.println(String.format("O Jetski %s está se movendo com a velocidade %.2f km/h", nome, velocidade));

    } 

    @Override
    public void mostrarInfo(){
        super.mostrarInfo();
        System.out.println("Possui Helice" + possuiHelice);
        System.out.println("Pessoas a bordo" + capacidadePessoas);
    }
}
 