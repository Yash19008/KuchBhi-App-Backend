export function otpEmailTemplate(otp: string): string {
    return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Your KuchBhi Login OTP</h2>
      <p>Use the OTP below to login:</p>
      <h1 style="letter-spacing: 3px;">${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
      <p>If you did not request this, please ignore.</p>
    </div>
  `;
}
