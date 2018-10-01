var mongoose=require('mongoose');
var mongoSchema =   mongoose.Schema;

var chatschema  = new mongoSchema({
    'userid'  : {
                type : String,
                 required: true
                
            },
     'username':{
                 type: String,
                required: false
                
            },
    'message':  {
                type: String,
                required: true
            },
    'dateTime':  {
                type: String,
                required: true
            },
    


});

module.exports = mongoose.model('userchat',chatschema);
