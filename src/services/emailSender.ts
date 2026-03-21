import assert from 'assert';
import { getConfig } from '../config';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

export default class EmailSender {
  templateId: string;
  variables: any;
  transporter: any;

  constructor(templateId, variables) {
    this.templateId = templateId;
    this.variables = variables;

    this.transporter = nodemailer.createTransport({
      host: getConfig().SMTP_SERVER,
      port: getConfig().SMTP_PORT,
      secure: true,
      auth: {
        user: getConfig().SMTP_USERNAME,
        pass: getConfig().SMTP_PASSWORD,
      },
    });

    this.transporter.use('compile', hbs({ viewEngine: { extname: '.html', partialsDir: path.resolve('./email-templates'), defaultLayout: false, }, viewPath: path.resolve('./email-templates'), extName: '.html' }))
  }

  static get TEMPLATES() {
    if (!EmailSender.isConfigured) {
      return {};
    }

    return {
      EMAIL_ADDRESS_VERIFICATION: "emailAddressVerification",
      INVITATION: "invitation",
      DELETION: "deletion",
      PASSWORD_RESET: "passwordReset",
      STUDENT_SUBSCRIPTION: "subscription",
    };
  }

  async sendTo(recipient) {
    if (!EmailSender.isConfigured) {
      console.error(`Email provider is not configured.`);
      return;
    }

    assert(recipient, 'to is required');
    assert(
      getConfig().EMAIL_FROM,
      'EMAIL_FROM is required',
    );
    assert(this.templateId, 'templateId is required');

    const msgOptions = {
      to: recipient,
      from: getConfig().EMAIL_FROM,
      subject: this.templateId.toString(), 
      template: this.templateId, 
      context: this.variables, 
    };

    try {
      await this.transporter.verify();
      console.log("SMTP Server is ready to take our messages");
    } catch (error) {
      console.error('Error sending SendGrid email.');
      console.error(error);
      throw error;
    }

    try {
      const info = await this.transporter.sendMail(msgOptions);

      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.error("Error while sending mail", err);
    }
  }

  static get isConfigured() {
    return Boolean(
      getConfig().EMAIL_FROM &&
        getConfig().SMTP_USERNAME &&
          getConfig().SMTP_PASSWORD &&
            getConfig().SMTP_SERVER &&
              getConfig().SMTP_PORT,
    );
  }
}
