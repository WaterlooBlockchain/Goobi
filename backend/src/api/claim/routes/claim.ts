import { factories } from '@strapi/strapi';

export default {
    routes: [
        {
            method: 'POST',
            path: '/claim/initClaim',
            handler: 'claim.initClaim',
            config: {
                policies: ['token-gating'],
            }
        },
    ],
}