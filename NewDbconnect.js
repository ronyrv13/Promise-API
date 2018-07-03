var Connection = require('tedious').Connection;  
var TYPES = require('tedious').TYPES;
var Request = require('tedious').Request;
var result = []; 
var fs = require('fs') 
var item ;
var Promise = require('promise');
function executeStatement () {
    return new Promise(function(resolve,reject){     

        var config = {
            userName: 'figmd',  
            password: '2hpu9erS',  
        server: '192.168.105.58',
        database:'POLARIS_FIGMDHQIManagement',
        options: {database: 'POLARIS_FIGMDHQIManagement',encrypt:false},
        }; 
        
    
         openConnection(config).then(result=>{

            resolve(result);

         }).catch(err=>{

            reject(err);
         });

    
});
function openConnection(configParam){
    
    return new Promise((resolve,reject)=>{ 
       var connection = new Connection(configParam);
        connection.on('connect', function(err) {  
        if(err)
        {
          reject(err)
        }
        else
            console.log("Connected"); 
    
            request = new Request('GetProviderDetails', function(err)
             {  
                if (err) {  
                    reject(err);
                }  
            });  
          
            request.on('row', function(columns) { 
                 
                columns.forEach(function(column) {  
                    if (column.value === null) {  
                    console.log('NULL');  
                    } else {  
                       item = {
                            "PracticeUid":'',
                            "NPI":'',
                            "ProviderUid": column.value
                            }
             result.push(item);
                        
                    }  
                });  
               
                console.log(item);  
                //resolve(item);
                
    Writefile(result).then(result=>{

        resolve(result);
    
     }).catch(err=>{
    
        reject(err);
     });
    
            });  
            request.addParameter('PracticeUid', TYPES.VarChar, 'B55E363B-4B17-4013-B922-21CF37F0D9FC');
            request.addParameter('NPI', TYPES.VarChar,'1225351067');
            connection.callProcedure(request);
        });
    
    });


};
function Writefile(item){
    return new Promise((resolve,reject)=>{ 
    fs.writeFile('./users.json', JSON.stringify(result) , 'utf-8', function(err) {
        if (err)
        reject(err);
        console.log('Done!')
        console.log(item);
        resolve(item);
    })
});

}

};
executeStatement();