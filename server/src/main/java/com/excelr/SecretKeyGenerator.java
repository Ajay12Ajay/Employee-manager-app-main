package com.excelr;

	
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class SecretKeyGenerator {
   
	 public static void main(String[] args) throws NoSuchAlgorithmException {
	        // Generate a secure random byte array
	        SecureRandom secureRandom = new SecureRandom();
	        byte[] keyBytes = new byte[32]; // 256 bits
	        secureRandom.nextBytes(keyBytes);

	        // Convert the byte array to Base64 encoded string
	        String base64Key = Base64.getEncoder().encodeToString(keyBytes);

	        // Print the secret key
	        System.out.println("Generated Secret Key: " + base64Key);
	    }
}
