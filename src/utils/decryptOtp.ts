import crypto from "crypto";
import dotenv from "dotenv";

// Load environment variables (for server-side Next.js functions)
dotenv.config();

export const decryptOTP = async (
  encryptedOTP: string
): Promise<string | null> => {
  try {
    // Ensure environment variable is available
    const secretKey = process.env.NEXT_PUBLIC_OTP_ENCRYPTION;

    if (!secretKey) {
      throw new Error("OTP_ENCRYPTION is not set in environment variables");
    }

    // Validate the encrypted OTP format
    const [ivHex, encryptedHex] = encryptedOTP.split(":");
    if (!ivHex || !encryptedHex) {
      throw new Error("Invalid encrypted OTP format");
    }

    const iv = Buffer.from(ivHex, "hex");
    const encryptedData = Buffer.from(encryptedHex, "hex");

    // Convert the secret key into a 32-byte key using SHA-256
    const keyBuffer = crypto.createHash("sha256").update(secretKey).digest();

    // Create a decipher instance
    const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);

    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString("utf-8");
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
