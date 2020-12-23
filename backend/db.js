const mongoose = require("mongoose");

const URL =
  "mongodb+srv://nitish:nitish@cluster0.apw28.mongodb.net/cognicart?retryWrites=true&w=majority";
const connectDB = async () => {
  await mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  console.log("Db Connected");
};
module.exports = connectDB;
