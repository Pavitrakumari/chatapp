/**create instance of schema*/
    var mongoose    =   require("mongoose");

var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = new mongoSchema({
            'fname'  : {
                        type : String,
                         required: true
                        
                    },
            'lname':{
                        type: String,
                        required: true
                        
                    },
            'email':  {
                        type: String,
                        required: true
                    },
            'password':{
                            type: String, 
                            required: true
                        }
});
// create model if not exists.
module.exports = mongoose.model('user',userSchema);
