import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://administrator:admin12345678@mintic.vjryn.mongodb.net/Mintic?retryWrites=true&w=majority",
  PORT: process.env.PORT || 4000,
  SECRET: 'Mintic'
};
