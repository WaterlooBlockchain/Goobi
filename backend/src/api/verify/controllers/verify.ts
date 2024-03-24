import { factories } from '@strapi/strapi';
import jwt from 'jsonwebtoken';
import * as mailchimp from '@mailchimp/mailchimp_transactional'

export default factories.createCoreService('api::verify.verify', ({ strapi }) => ({

  async send(ctx: any) {
    const { email } = ctx.request.query;
    const uWaterlooRegex = new RegExp(/^[a-zA-Z0-9\_\.]+\@uwaterloo\.ca$/i);
    if (!uWaterlooRegex.test(email)) {
      return ctx.badRequest('Invalid email');
    }

    const code = Math.floor(1000 + Math.random() * 9000)

    // Send email
    const message = {
      from_email: "contact@waterlooblockchain.ca",
      subject: "Verify for Mr. Goose",
      text: "Your verification code is " + code + ".",
      to: [
        {
          email,
          type: "to"
        }
      ],
      signing_domain: "waterlooblockchain.ca"
    };
    
    const response = await mailchimp.default(process.env.MAILCHIMP_API).messages.send({
      message
    });

    console.log(response)

    if (response[0].status == 'rejected') {
      return ctx.badRequest('Could not send email');
    }
    // Store the code

    // Create JSON Web Token to use to verify code with later
    const token = jwt.sign({ email, code }, 'your_secret_key', { expiresIn: '10m' });

    // const entry = await strapi.entityService.create('api::verify.verify', {
    //   data: {
    //     code: code
    //   }
    // });
    return ctx.send({ message: 'Verification code sent', token });
  },

  async code(ctx: any) {

  }
}))