import axios from 'axios';
import Strapi from 'strapi-sdk-js';

export async function getMerch() {
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
    
    
      const {data: products}: any = strapi.find("merches");
      return products
    }

export async function getEvent() {
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
    
      const {data: events}:any = strapi.find("events");
    
    return events;
}