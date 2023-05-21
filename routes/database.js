const mongoose = require("mongoose")

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://ekannor006:ekannor006@ericadb.qvzb2ww.mongodb.net/?retryWrites=true&w=majority")
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log(error)
        process.exit(1)      
    }
}

module.exports = connectDB