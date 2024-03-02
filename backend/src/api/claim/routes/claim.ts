import { factories } from '@strapi/strapi';

export default {
    routes: [
        {
            method: 'POST',
            path: '/claim/initClaim',
            handler: 'claim.initClaim',
            config: {
                policies: [],
            }
        },
        {
            method: 'POST',
            path: '/claim/burn',
            handler: 'claim.burn',
            config: {
                policies: [],
            }
        },
    ],
}