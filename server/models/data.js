const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    
     firstname: {
            type: String
        },
     lastname: {
            type: String
        },
   

    wheels: {
        type: Number,
        
    },

    vehicletype: {
       type: String
    },

    model: {
     type: String
    },

    date: {
        type:String
    }

})


module.exports = mongoose.model('rentalDatas', DataSchema);