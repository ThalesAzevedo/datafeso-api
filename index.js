require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require('cors')

const app = express();

// "mongodb://localhost/datafeso" Conectando o app ao MongoDB Server pela string e Passando parametros para revover alguns avisos.
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    }
)

app.use(express.json());

app.use(cors());

app.options('*', cors());


app.use(require("./src/routes"));
app.use(express.urlencoded({extended:true}));

// app.use('/download', express.static('./uploads'));

app.listen(process.env.PORT, ()=> {console.log("DB Connected on port 3333")});
