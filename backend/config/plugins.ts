module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
            region: 'us-1',
          sizeLimit: 250 * 1024 * 1024, // 256mb in bytes
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          endpoint: env('SCALEWAY_ENDPOINT'),
          params: {
            Bucket: env('SCALEWAY_BUCKET'),
          },
          },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  });
  