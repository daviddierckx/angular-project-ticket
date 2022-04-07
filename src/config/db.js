const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://daviddierckx:Tv123456789@cluster0.gbnfj.mongodb.net/api-crud", {
            useNewUrlParser: true,

            useUnifiedTopology: true
        });
        console.log(`Mongo DB Connected : ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;