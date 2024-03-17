import axios from "axios";
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
          const response = strapi.request('GET', `/verify/send?email=${req.query.email}`).catch((e) => {
            res.status(400).json({ error: e });
        })

        res.status(200).json({ response });
    }catch (e) {
        console.log(e)
        res.status(400).json({ error: e });
    }
  }
  