export const decryptOTP = async (
  encryptedOTP: string
): Promise<string | null> => {
  try {
    const [ivHex, encryptedHex] = encryptedOTP.split(":");
    if (!ivHex || !encryptedHex) {
      throw new Error("Invalid encrypted OTP format");
    }

    const iv = new Uint8Array(Buffer.from(ivHex, "hex"));
    const encryptedData = new Uint8Array(Buffer.from(encryptedHex, "hex"));
    const secretKey = process.env.OTP_ENCRYPTION;

    // Convert secretKey to a 32-byte key using SHA-256
    const keyBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(secretKey)
    );
    const key = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );

    // Decrypt the OTP
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      key,
      encryptedData
    );
    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
