export function getAdminEmailHTML({ email, phoneNumber, businessStage, challenge }) {
  return `
    <html>
      <body style="background-color:#0d0d0d; color:#ffffff; padding:40px 20px; font-family: 'Segoe UI', sans-serif;">
        <div style="background-color:#1a1a1a; padding:30px; border-radius:12px; max-width:600px; margin:auto; box-shadow:0 0 10px rgba(0,0,0,0.4);">
          <h2 style="color:#c1ff00; margin-bottom:20px;">📨 New Contact Form Submission</h2>
          <p><strong style="color:#c1ff00;">Email:</strong> ${email}</p>
          ${phoneNumber ? `<p><strong style="color:#c1ff00;">Phone Number:</strong> ${phoneNumber}</p>` : ''}
          ${businessStage ? `<p><strong style="color:#c1ff00;">Business Stage:</strong> ${businessStage}</p>` : ''}
          <p><strong style="color:#c1ff00;">Challenge:</strong></p>
          <blockquote style="background-color:#2a2a2a; border-left:4px solid #c1ff00; padding:10px 15px; margin:15px 0; font-style:italic; color:#e0e0e0;">${challenge}</blockquote>
          <div style="margin-top:30px; font-size:12px; color:#777; text-align:center;">You received this email from the Builld contact form.</div>
        </div>
      </body>
    </html>
  `;
}

export function getUserEmailHTML({ email, challenge }) {
  return `
    <html>
      <body style="background-color:#0d0d0d; color:#ffffff; padding:40px 20px; font-family: 'Segoe UI', sans-serif;">
        <div style="background-color:#1a1a1a; padding:30px; border-radius:12px; max-width:600px; margin:auto; box-shadow:0 0 10px rgba(0,0,0,0.4);">
          <h2 style="color:#c1ff00; margin-bottom:20px;">✅ Message Received</h2>
          <p>Hello ${email},</p>
          <p>Thanks for reaching out to Builld! We’ve received your message and will get back to you as soon as possible.</p>
          <div style="background-color:#2a2a2a; padding:10px 15px; border-left:4px solid #c1ff00; font-style:italic; margin:15px 0; color:#e0e0e0;">${challenge}</div>
          <p>In the meantime, feel free to explore more about what we do!</p>
          <p>— The Builld Team</p>
          <div style="margin-top:30px; font-size:12px; color:#777; text-align:center;">This is an automated response. Please do not reply to this email.</div>
        </div>
      </body>
    </html>
  `;
}
