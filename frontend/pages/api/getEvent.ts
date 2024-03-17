import Strapi from "strapi-sdk-js";

export default async function handler(req: any, res:any) {
    try {
        const strapi = new Strapi({
            url: process.env.BACKEND_URL,
            prefix: "/api",
            store: {
              key: "strapi_jwt",
              useLocalStorage: false,
              cookieOptions: { path: "/" },
            },
            axiosOptions: {},
          })
        
        
        const {data}: any =  await strapi.find("events", {
            populate: ['image']
        });
        res.status(200).json({ data });
    }catch (e) {
        console.log(e)
        res.status(400).json({ error: e });
    }
  }
  