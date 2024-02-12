const mongoose = require('mongoose')
const Live_URL = 'mongodb+srv://iankitasingh1908:ram123@cluster0.mapdmu6.mongodb.net/admissionPortal?retryWrites=true&w=majority'
const Local_URL = 'mongodb://127.0.0.1:27017/admission123'

const connectdb = () => {
    mongoose.connect(Live_URL)
        .then(() => {
            console.log("connected sucessfully");
        }).catch((err) => {
            console.log(err);
        })
}

module.exports = connectdb