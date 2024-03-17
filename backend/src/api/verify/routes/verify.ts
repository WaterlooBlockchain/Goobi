export default {
    routes: [
        {
            method: 'GET',
            path: '/verify/send',
            handler: 'verify.send',
            config: {
                policies: [],
            }
        },
        {
            method: 'POST',
            path: '/verify/code',
            handler: 'verify.code',
            config: {
                policies: [],
            }
        },
    ],
}