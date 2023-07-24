package util;

public class Program {
    public static void main(String [] args){

        if(args.length == 2){
            String key = args[0];
            String encryptedString = args[1];

            try {
                System.out.println(CryptoUtil.decrypt(key, encryptedString));
            } catch (Exception e) {
                System.out.println("invalid_decrypt");
            };
        }
    }
}
