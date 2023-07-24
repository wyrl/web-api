package util;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class CryptoUtil {
    private final static String CIPHER_TRANS = "AES/ECB/PKCS5Padding";
    private final static int AES_KEY_SIZE = 256;
    public static String decrypt(String key, String encryptedData) throws NoSuchAlgorithmException, 
        NoSuchPaddingException, InvalidKeyException, 
        UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException {
        
        
        Cipher cipher = Cipher.getInstance(CIPHER_TRANS);
        cipher.init(Cipher.DECRYPT_MODE, generateAESKey(key));
        byte[] decodedData = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedData = cipher.doFinal(decodedData);
        return new String(decryptedData, "UTF-8");
    }

    private static SecretKey generateAESKey(String key) throws NoSuchAlgorithmException, UnsupportedEncodingException{
        byte[] keyBytes = key.getBytes("UTF-8");
        return new SecretKeySpec(getValidKeyBytes(keyBytes), "AES");
    }

    private static byte[] getValidKeyBytes(byte[] key) throws NoSuchAlgorithmException{
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        byte[] digest = messageDigest.digest(key);
        int keySizeInBytes = AES_KEY_SIZE / 8;
        byte[] validKeyBytes = new byte[keySizeInBytes];
        System.arraycopy(digest, 0, validKeyBytes, 0, keySizeInBytes);
        return validKeyBytes;
    }
}