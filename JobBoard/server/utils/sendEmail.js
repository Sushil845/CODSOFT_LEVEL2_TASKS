import axios from "axios";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.EMAIL_FROM_NAME || "CareerNest",
          email: process.env.EMAIL_FROM,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email Sent");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(
      "❌ Brevo Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default sendEmail;