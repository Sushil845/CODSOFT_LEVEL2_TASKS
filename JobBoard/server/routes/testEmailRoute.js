import express from "express";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

// GET /api/test-email
router.get("/", async (req, res) => {
  try {
    await sendEmail({
      to: "sushil.0202020@gmail.com", // Change if you want to test another email
      subject: "🎉 CareerNest Email Test",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
          <h2 style="color:#2563eb;">CareerNest Email Test</h2>

          <p>Hello Sushil,</p>

          <p>🎉 Congratulations! Your Brevo SMTP integration is working successfully.</p>

          <p>
            This is a test email sent from your
            <strong>CareerNest Backend</strong>.
          </p>

          <hr>

          <p>
            Next step is integrating email notifications for:
          </p>

          <ul>
            <li>✅ Welcome Email</li>
            <li>✅ Job Application</li>
            <li>✅ Application Approved</li>
            <li>✅ Application Rejected</li>
          </ul>

          <p>Happy Coding 🚀</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Test email sent successfully!",
    });
  } catch (error) {
    console.error("Test Email Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
});

export default router;