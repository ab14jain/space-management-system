const express = require('express');
const router = express.Router();
var xlsx = require('node-xlsx');


var objLocationDetail = xlsx.parse('E:/Dummy Data/BUS_MET_DATAMART.A_SA_LOCATION.xls');
var locationDetail = [];

objPropertyLocation = objLocationDetail[0].data[0];

for (var i in objLocationDetail[0].data){
    var tempObj = {};    
    if(i > 0){    
        for(var j = 0; j <  objPropertyLocation.length; j++){
            tempObj[objPropertyLocation[j]] = objLocationDetail[0].data[i][j];            
        }
        locationDetail.push(tempObj);
    }    
}

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request location",
        data: locationDetail
    });
});

module.exports = router;