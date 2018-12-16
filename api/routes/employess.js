const express = require('express');
const router = express.Router();
var xlsx = require('node-xlsx');

//var obj = xlsx.parse(__dirname + 'E:\Dummy Data\BUS_MET_DATAMART.A_SA_EMPLOYEE.xls'); // parses a file
var objEmployeeDetail = xlsx.parse('E:/Dummy Data/BUS_MET_DATAMART.A_SA_EMPLOYEE.xls');
//var objDeskAllocationDetail = xlsx.parse('E:/Dummy Data/BUS_MET_DATAMART.A_SA_BOOKED_DESK.xls');
//var obj = xlsx.parse(fs.readFileSync(__dirname + '/myFile.xlsx')); // parses a buffer

var employeeDetail = []

objProperty = objEmployeeDetail[0].data[0]
//console.log(objProperty);
for (var i in objEmployeeDetail[0].data){
    var tempObj = {}
    // if(i < 2){
    //     console.log(obj[0].data[1])
    // }
    if(i > 0){    
        for(var j = 0; j <  objProperty.length; j++){
            tempObj[objProperty[j]] = objEmployeeDetail[0].data[i][j];            
        }
        employeeDetail.push(tempObj);
    }    
}

console.log("employee.js => Employee count = " +employeeDetail.length);

// var deskDetail = [];

// objPropertyDesk = objDeskAllocationDetail[0].data[0]
// //console.log(objProperty);
// for (var i in objDeskAllocationDetail[0].data){
//     var tempObj = {};    
//     if(i > 0){    
//         for(var j = 0; j <  objPropertyDesk.length; j++){
//             tempObj[objProperty[j]] = objDeskAllocationDetail[0].data[i][j];            
//         }
//         deskDetail.push(tempObj);
//     }    
// }

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request",
        data: employeeDetail
    });
});

// router.get('/desk', (req, res, next) => {
//     res.status(200).json({
//         message: "Handling GET request",
//         data: employeeDetail
//     });
// });

router.get('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;

    if(id == 'special'){
        res.status(200).json({
            message: "You discovered special id",
            id: id
        });
    }
    else{
        res.status(200).json({
            message: "you passed and id"
        });
    }
    
});


router.post('/', (req, res, next) => {
    const employee= {
        name: req.body.name,
        designation: req.body.designation
    }

    res.status(201).json({
        message: "Handling POST request",
        createdEmployee: employee
    });
});


router.patch('/:employeeId', (req, res, next) => {
    res.status(200).json({
        message: "Employee detail updated"
    });
});

router.delete('/:employeeId', (req, res, next) => {
    res.status(200).json({
        message: "Employee detail deleted"
    });
});
module.exports = router;