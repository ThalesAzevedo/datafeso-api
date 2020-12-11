const { Router, json, text } = require("express");

const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const csvParser = require("./utils/csvparser")
const path = require("path")

const {historicPrice} = require("./models/historicalDataSchema");

routes.post("/upload", multer(multerConfig).single("file"), async (req, res)=>{

  var data = csvParser.toJson(req.file.path)


  if (data){
    await historicPrice.deleteMany({})
    const result = await historicPrice.insertMany(data)
    data = result
  }
  return res.json(data)
});

routes.get("/",async (req, res)=>{

  try {
    const data = await historicPrice.find()
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.json(`${err}`)

  }
})

routes.get("/value",async (req, res)=>{

  productFilter = req.body.product

  dateString = req.body.date
  var date = dateString.split('/')
  var realDate = Date.UTC(parseInt(date[1]),parseInt(date[0])-1)? Date.UTC(parseInt(date[1]),parseInt(date[0])-1):0

  const value = await historicPrice.findOne({
    $and: [
      {date: realDate},
      {"products.name": productFilter}]
    },
    {'products.$': 1})

    return res.json({value: value.products[0].value})
  })

  routes.get("/inflation", async (req, res)=>{

    var initialString = req.body.initialDate;
    var date = initialString.split('/')
    var initialDate = Date.UTC(parseInt(date[1]),parseInt(date[0])-1)? Date.UTC(parseInt(date[1]),parseInt(date[0])-1):0

    var finalString = req.body.finalDate;
    var date = finalString.split('/')
    var finalDate = Date.UTC(parseInt(date[1]),parseInt(date[0])-1)? Date.UTC(parseInt(date[1]),parseInt(date[0])-1):0

    var productFilter = req.body.product;


    const initialValue = await historicPrice.findOne({
      $and: [{date:initialDate},
        {"products.name": productFilter}]
      },
      {id:1, date:1,'products.$': 1})

      const finalValue = await historicPrice.findOne({
        $and: [{date:finalDate},
          {"products.name": productFilter}]
        },
        {dateFilter:1,'products.$': 1})

        console.log(initialValue.products[0].value, finalValue.products[0].value)

        var inflation = (finalValue.products[0].value/initialValue.products[0].value)-1
        console.log(inflation)

        return res.json({inflation: inflation})
      })


      routes.get("/download/IPCFeso.csv", (req, res) => {
        const filename = path.resolve('./uploads/IPCFeso.csv');
        res.download(filename);
      })


      module.exports = routes;
