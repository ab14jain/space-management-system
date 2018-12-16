const express = require('express');
const router = express.Router();
var xlsx = require('node-xlsx');

var objDeskDetail = xlsx.parse('E:/Dummy Data/BUS_MET_DATAMART.A_SA_DESK.xls');
var objDeskAllocationDetail = xlsx.parse('E:/Dummy Data/BUS_MET_DATAMART.A_SA_BOOKED_DESK.xls');
var objDeskCurrentDetail = xlsx.parse('E:/Dummy Data/BUS_MET_DATAMART.A_SA_OCCUPIED_CURRENT.xls');
var objDeskHistoryDetail = xlsx.parse('E:/Dummy Data/BUS_MET_DATAMART.A_SA_OCCUPIED_HISTORY.xls');

var deskDetail = [];
var bookedDeskDetail = [];
var currentDeskDetail = [];
var historyDeskDetail = [];

objPropertyDesk = objDeskDetail[0].data[0];
for (var i in objDeskDetail[0].data){
    var tempObj = {};    
    if(i > 0){    
        for(var j = 0; j <  objPropertyDesk.length; j++){
            tempObj[objPropertyDesk[j]] = objDeskDetail[0].data[i][j];            
        }
        deskDetail.push(tempObj);
    }    
}

objPropertyBookedDesk = objDeskAllocationDetail[0].data[0];
for (var i in objDeskAllocationDetail[0].data){
    var tempObj = {};    
    if(i > 0){    
        for(var j = 0; j <  objPropertyBookedDesk.length; j++){
            tempObj[objPropertyBookedDesk[j]] = objDeskAllocationDetail[0].data[i][j];            
        }
        bookedDeskDetail.push(tempObj);
    }    
}

objPropertyCurrentDetail = objDeskCurrentDetail[0].data[0];
for (var i in objDeskCurrentDetail[0].data){
    var tempObj = {};    
    if(i > 0){    
        for(var j = 0; j <  objPropertyCurrentDetail.length; j++){
            tempObj[objPropertyCurrentDetail[j]] = objDeskCurrentDetail[0].data[i][j];            
        }
        currentDeskDetail.push(tempObj);
    }    
}
console.log("desk.js => Current data count = "+ currentDeskDetail.length);

objPropertyHistoryDetail = objDeskHistoryDetail[0].data[0];
for (var i in objDeskHistoryDetail[0].data){
    var tempObj = {};    
    if(i > 0){    
        for(var j = 0; j <  objPropertyHistoryDetail.length; j++){
            tempObj[objPropertyHistoryDetail[j]] = objDeskHistoryDetail[0].data[i][j];            
        }
        historyDeskDetail.push(tempObj);        
    }    
}
console.log("desk.js => History data count = "+ historyDeskDetail.length);

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "Handling GET request desk",
        data: deskDetail
    });
});

router.get('/booked', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request booked",
        data: bookedDeskDetail
    });
});

router.get('/current', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request Current",
        data: currentDeskDetail
    });
});

router.get('/history', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request history",
        data: historyDeskDetail
    });
});

module.exports = router;