const { SendingEmailError } = require("./errors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendingEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: "o.eyrikh@gmail.com",
    subject: "Please Verify Your Email",
    text: `Let's verify your email so you can start working in app. http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify Your Email</a>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      throw new SendingEmailError("email sending error", error.code);
    }
  }
};
module.exports = {
  sendingEmail,
};
