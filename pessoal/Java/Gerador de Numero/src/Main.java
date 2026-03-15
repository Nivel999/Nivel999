import java.util.Enumeration;

public class Main {

    public static void main(String[] args) {
        PalindromoCheck pc = new PalindromoCheck();
        pc.Palindromo_maker(Number());
        
    }
    
    public static int Number() {
        double NumDec = Math.round(Math.random() * 10);
        double NumP = 0;
        if (NumDec < 5) {
            NumP = Math.round(Math.random() * 100 *(-1));
        } else if (NumDec > 4) {
            NumP = Math.round(Math.random() * 1000);
        }
        return (int) NumP;
    }
}
