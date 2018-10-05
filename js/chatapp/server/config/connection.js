/**It is used to establish mongo db connection  */
exports=function ConnectDB() {

    console.log("in");
    //Set up default mongoose connection

    var mongoDB = 'mongodb://localhost:27017/data';
    mongoose.connect(mongoDB);
    // var db = mongoose.connection;
    mongoose.connection.on('open',function() {
        console.log(console, 'Successful:')
    });

    mongoose.connection.on('error', function() {
        console.error.bind(console, 'MongoDB connection error:')
    });
}
/**module.exports = {
    url: 'mongodb://localhost:27017/easy-notes'
}*/



	
	
	
