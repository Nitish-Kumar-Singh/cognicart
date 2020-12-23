export default {
  MONGODB_URL:
    process.env.PORT ||
    "mongodb+srv://nitish:nitish@cluster0.apw28.mongodb.net/cognicart?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
};
