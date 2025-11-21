export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to FluxChat</title>
  </head>

  <body style="font-family: 'Segoe UI', Tahoma, sans-serif; margin:0; padding:0; background:#f0f4f3;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2ECC71, #27AE60); padding: 40px 20px; text-align:center; border-radius:0 0 20px 20px;">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/160/160138.png"
        alt="FluxChat Logo"
        style="width:90px; height:90px; background:white; border-radius:20px; padding:10px; box-shadow:0 4px 12px rgba(0,0,0,0.15);"
      />
      <h1 style="color:white; font-size:30px; margin-top:20px; font-weight:600;">
        Welcome to FluxChat!
      </h1>
      <p style="color:#e8ffe9; font-size:16px; margin:5px 0 0;">
        Real-time messaging. Simple. Fast. Secure.
      </p>
    </div>

    <!-- Main Content -->
    <div style="max-width:600px; margin:0 auto; background:white; padding:30px; border-radius:20px; margin-top:-15px; box-shadow:0 4px 18px rgba(0,0,0,0.08);">
      
      <p style="font-size:18px; color:#27AE60;"><strong>Hello ${name},</strong></p>

      <p style="color:#555; font-size:15px; line-height:1.7;">
        We're excited to welcome you to <strong>FluxChat</strong> — your new home for smooth, fast, and modern conversations. Stay connected with the people that matter most, all in real time.
      </p>

      <!-- Highlight Box -->
      <div style="background:#f3fbf5; border-left:5px solid #2ECC71; padding:22px; border-radius:12px; margin:25px 0;">
        <p style="margin:0 0 12px; font-size:16px; font-weight:600; color:#2ECC71;">
          Here's how to get started:
        </p>
        <ul style="margin:0; padding-left:18px; color:#555;">
          <li style="margin-bottom:8px;">Upload your profile picture</li>
          <li style="margin-bottom:8px;">Find and add your contacts</li>
          <li style="margin-bottom:8px;">Start your first chat instantly</li>
          <li>Share images and enjoy a clean, refreshing UI</li>
        </ul>
      </div>

      <!-- Button -->
      <div style="text-align:center; margin:35px 0;">
        <a href="${clientURL}"
          style="background:#2ECC71; background: linear-gradient(135deg,#2ECC71,#27AE60); color:white; padding:14px 34px; text-decoration:none; border-radius:50px; font-size:16px; font-weight:600; display:inline-block; box-shadow:0 4px 14px rgba(46,204,113,0.4);">
          Open FluxChat
        </a>
      </div>

      <p style="color:#555; font-size:15px; line-height:1.7; margin-top:0;">
        Need help or have questions? The team at FluxChat is always here for you.
      </p>

      <p style="margin-top:25px; font-size:15px; color:#444;">
        Best regards,<br/>
        <strong>The FluxChat Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center; padding:25px 0; color:#999; font-size:12px;">
      <p style="margin:0;">© 2025 FluxChat. All rights reserved.</p>
      <p style="margin:8px 0 0;">
        <a href="#" style="color:#27AE60; margin:0 10px; text-decoration:none;">Privacy Policy</a>
        <a href="#" style="color:#27AE60; margin:0 10px; text-decoration:none;">Terms of Service</a>
        <a href="#" style="color:#27AE60; margin:0 10px; text-decoration:none;">Support</a>
      </p>
    </div>

  </body>
  </html>
  `;
}
