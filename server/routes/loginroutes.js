var mysql = require('mysql')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "secretkey"
const accountSid = 'AC8af88b4d13c32664060caf092ee73a26';
const authToken = '4f833493bfe2e6499d7d93f6a8cb64e4';
const client = require('twilio')(accountSid, authToken);
const axios = require ('axios')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zciea'
});



connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn")
    }else {
        console.log("Error connecting ... nn")
    }
});


function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    console.log(retVal);
    return retVal;
}

//for the image. this can be simplified even better, but i dont have time. im following a tutorial
exports.uploads =function ( req, res) {
    console.log(req.body);
    
    try {
       if(!req.file) {
           res.send({
               "error": true
           })
       }else{
        
        var password = generatePassword()
        var member = {
            "name": req.body.name,
            "id_number": req.body.id_number,
            "territory": req.body.territory,
            "gender": req.body.gender,
            "contact": req.body.contact,
            "address": req.body.address,
            "disability": Number(req.body.disability),
            "date_of_birth": req.body.date_of_birth,
            "gender": req.body.gender,
            "trade": req.body.trade,
            "contact": req.body.contact,
            "email": req.body.email,
            "amount_paid": req.body.amount_paid,
            "image": req.file.filename, 
            "subscription_date": "",
            "member_password": password
        }

        connection.query('INSERT INTO members SET ?', member, function(error, results, fields){
            if(error) {
                console.log("Error ", error)
            }else {
                var phoneNumber = req.body.contact;
                phoneNumber = phoneNumber.replace(/\+/g, "");


                axios.post(`http://rslr.connectbind.com:8080/bulksms/bulksms?username=ntv-zciea&password=pams1234&type=0&dlr=1&destination=${phoneNumber}&source=ZCIEA&message=Hello ${req.body.name}  . Download the app and login using phone number${req.body.contact} ,and password "${password}"`, {
                    members: req.body.name
                    
                  })
                  .then(function (response) {
                    console.log(response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                
                res.send({
                    "code": 200,
                    "error": false,
                    "userid": req.body.id_number,
                    "other": phoneNumber
                    
                })
               
            }
        })

        
       }
       
    }catch(err) {
        res.send(400);
    }
    
    
}

exports.user = function(req, res) {
    var userid = req.body.userid;
    
    connection.query('SELECT * FROM members WHERE id = ?', [userid],
        function(error, results, fields) {
           if(error) {
               res.send({
                   "code": 400,
                    "error": true
               })
           } else {
              res.send({
                  "error": false,
                  "results": results
                })
                
           }
    });
    
}

exports.register = function(req, res){
    var today = new Date()
    var email = req.body.email
    var users = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
        "created": today,
        "modified": today,
        "approved": 0
    }

connection.query('SELECT * FROM users WHERE email = ?', [email], 
function(error, results, fields) {
    if(results.length >0) {
        res.send({
            "code": 204,
            "success": "Email already exist"
        });
    }else {
        connection.query( 'INSERT INTO users SET ?', users, function(error, results, fields){
            if(error) {
                console.log("Error Occured", error)
                res.send({
                    "code": 400,
                    "failed": "error ocuured"
                })
            }else {
                let usersArr = []
                usersArr.push(users)  //this is important in order to make the results an array just as in the login screen. The jwt is decoding an array there
                jwt.sign({user: usersArr}, SECRET_KEY, (err, token) => {
                    res.json({token})
                })
            }
        })
    }
});
}

exports.login =  function(req, res) {
    var email = req.body.email
    var password = req.body.password

    connection.query('SELECT * FROM users WHERE email = ?', [email], 
        function(error, results, fields) {
           if(error) {
               res.send({
                   "code": 400,
                   "message": "An error occurred. Please try again later.",
                   "error": true
               })
               console.log(error);
               
           } else {
               if(results.length >0) {
                   if(results[0].password == password) {
                       jwt.sign({user: results}, SECRET_KEY, (err, token) => {
                           res.send({
                               "token": token,
                               "error": err
                           });
                        
                           res.send({
                            "code": 200,
                            "message": "login successful.",
                            "error": false
                        });  
                           
                    })
                       
                   }else {
                       res.send({
                           "code": 204,
                           "message": "Email and password do not match",
                           "error": true
                       });
                   }
               }else {
                   res.send({
                       "code": 204,
                       "message": "Email does not exist",
                       "error": true
                   });
               }
           }
    });
}

exports.verifyToken = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}

exports.addmember = function(req, res) {
    var today = new Date()
    var member = {
        "name": req.body.name,
        "id_number": req.body.id_number,
        "territory": req.body.territory,
        "gender": req.body.gender,
        "contact": req.body.contact,
        "date_of_birth": req.body.date_of_birth,
        "gender": req.body.gender,
        "trade": req.body.trade,
        "contact": req.body.contact,
        "email": req.body.email,
        "amount_paid": req.body.amount_paid,
        "image": req.body.profile,
        "subscription_date": today
    }

    connection.query('INSERT INTO members SET ?', member, function(error, results, fields){
        if(error) {
            console.log("Error ", error)
            // res.send({
            //     "code": 400,
            //     "failed": "could not add member"
            // })
        }else {
            res.send({
                "code": 200,
                "success": "Member added succesfully"
            })
              
        }
    })
}

exports.addmember = function(req, res) {
    var today = new Date()
    var member = {
        "name": req.body.name,
        "id_number": req.body.id_number,
        "territory": req.body.territory,
        "gender": req.body.gender,
        "contact": req.body.contact,
        "date_of_birth": req.body.date_of_birth,
        "gender": req.body.gender,
        "trade": req.body.trade,
        "contact": req.body.contact,
        "email": req.body.email,
        "amount_paid": req.body.amount_paid,
        "image": req.body.profile,
        "subscription_date": today
    }

    connection.query('INSERT INTO members SET ?', member, function(error, results, fields){
        if(error) {
            console.log("Error ", error)
            // res.send({
            //     "code": 400,
            //     "failed": "could not add member"
            // })
        }else {
            res.send({
                "code": 200,
                "success": "Member added succesfully"
            })
              
        }
    })
}

exports.editmember = function(req, res) {
    let image = "placeholder.png";
    if(req.file) {
        image = req.file.filename;
    }
    //console.log(req.file.filename);
    
    let sqlstring = 'UPDATE members SET name = ?, id_number = ?, territory = ?, gender = ?, contact = ?, date_of_birth = ?, disability =?, address = ?, email = ?,  amount_paid = ?, trade = ?, image = ? WHERE id = ?'
    let member = [
        req.body.name,
        req.body.id_number,
        req.body.territory,
        req.body.gender,
        req.body.contact,
        req.body.date_of_birth,
        Number(req.body.disability),
        req.body.address,
        req.body.email,
        req.body.amount_paid,
        req.body.trade,
        image, 
        req.body.id          
    ]

console.log(sqlstring);


    connection.query(sqlstring, member, function(error, result, rows, fields) {
        if(error) {
            res.send({
                "code": 400,
                "message": error, 
                "error": true                   
            })
        } else {
            console.log(result);
            
         res.send({
             "code": 200,
             "error": false,
             "sql": sqlstring
         })
         
        }
    });
    
    
    
}

exports.deletemultiple = function(req, res) {
    var ids = req.body.ids;
    //console.log(typeof ids);
    
    sqlquery = connection.query('DELETE FROM members WHERE id IN (?)', [ids], function(error, results, fields) {
        if(error) {
            res.send({
                "code": 400,
                "message": "Error Occured",
                "error": true
            })
            //console.log(error);
            
        } else {
            res.send({
                "code": 200,
                "results": results, 
                "message": "Success",
                "error": false
            })
            //console.log(ids);
        }
    });

    console.log(sqlquery.sql);
    
}

exports.deletemember = function(req, res) {
    var id_number = req.body.id_number;
    connection.query("DELETE FROM members WHERE id = ?", [id_number], function(error, results, fields) {
        if(error) {            
            res.send({
                "code": 400,
                "message": "Error Occured",
                "error": true
            })
        }else {
            console.log(results);
            
            res.send({
                "code": 200,
                "message": "Member deleted successfully",
                "error": false
            })    
         }
    })
}

exports.reports = function(req, res) {
    connection.query('SELECT * FROM members ORDER BY id ASC', 
        function(error, results, fields) {
           if(error) {
               res.send({
                   "code": 400,
                   "failed": "Error Occured"                   ///"request": req
               })
           } else {
               if(results.length >0) {
                   res.send({
                       "code": 200,
                       "members": results
                   })
                   
                   //return results
               }else {
                   res.send({
                       "code": 204,
                       "success": "There is no data to show"
                   });
               }
           }
    });
}

exports.editTerritory = function(req, res) {
   let territory = [
    req .body.name, req .body.id
   ];
   let sqlstring = 'UPDATE territories SET name = ? WHERE id = ?';
   connection.query(sqlstring, territory, function(error, results, fields) {
       if(error) {
        res.send({
            "code": 400,
            "message": error, 
            "error": true                   
        })
       } else {
        console.log(results);
        res.send({
            "code": 200,
            "error": false
        })
       }
   })
}
//by gender. var gender is the user selected value
exports.genderReportMale = function(req, res) {
    var gender =  req.body.gender

    connection.query('SELECT territory, COUNT(territory)as population FROM members WHERE gender = "male" GROUP by territory', [gender], 
        function(error, results, fields) {
           if(error) {
               res.send({
                   "code": 400,
                   "failed": error,
               })
           } else {
               if(results.length >0) {
                   res.send({
                       "code": 200,
                       "members": results
                   })
                   //console.log(results);
                   
               }else {
                   res.send({
                       "code": 402,
                       "message": "No data found",
                       "success": fields
                       
                   });
               }
           }
    });

}

exports.genderReportFemale = function(req, res) {
    var gender =  req.body.gender

    connection.query('SELECT territory, COUNT(territory)as population FROM members WHERE gender = "female" GROUP by territory', [gender], 
        function(error, results, fields) {
           if(error) {
               res.send({
                   "code": 400,
                   "failed": error,
               })
           } else {
               if(results.length >0) {
                   res.send({
                       "code": 200,
                       "members": results
                   })
                   
               }else {
                   res.send({
                       "code": 402,
                       "message": "No data found",
                       "success": fields
                       
                   });
               }
           }
    });

}

//age classification by gender
exports.ageReportFemale = function(req, res) {
    try {
        connection.query('CALL genderAgeAnalysis("female")', 
            function(error, results, fields) {
                if(error) {
                    console.log(error.code)
                    res.send({
                        "code": 400,
                        "failed": "Error Occured",
                        "request": req
                    })
                } else {
                    if(results.length >0) {
                        res.send({
                            "code": 200,
                            "members": results
                        })
                        
                        //return results
                    }else {
                        res.send({
                            "code": 204,
                            "success": "There is no data to show"
                        });
                    }
                }
        });
    } catch(err){
        console.log(err);
        
    }
}

//age classification by gender
exports.ageReportMale = function(req, res) {
    try {
        connection.query('CALL genderAgeAnalysis("male")', 
            function(error, results, fields) {
                if(error) {
                    console.log(error.code)
                    res.send({
                        "code": 400,
                        "failed": "Error Occured",
                        "request": req
                    })
                } else {
                    if(results.length >0) {
                        res.send({
                            "code": 200,
                            "members": results
                        })
                        
                        //return results
                    }else {
                        res.send({
                            "code": 204,
                            "success": "There is no data to show"
                        });
                    }
                }
        });
    } catch(err){
        console.log(err);
        
    }
}

exports.totalMale = function(req, res) {
    connection.query('SELECT * FROM members WHERE gender = male'),function(error, results, fields) {
        if(error) {
            res.send({
                "code": 400,
                "error": error
            })
        }else {
            if(results.length >0) {
                res.send({
                    "code": 200,
                    "members": results
                })
                
                return results
            }else {
                res.send({
                    "code": 204,
                    "success": "There is no data to show"
                });
            }
        }
    }
}

exports.addterritory = function(req, res) {
    let territory = req.body.territory;
    connection.query('INSERT INTO territories (name) VALUES(?)', [territory], function(error, results, fields, rows){
        if(error) {
            res.send({
                "code": 400,
                "message": "An error occurred. Please try again later.",
                "error": true
            })
            console.log(error);
        } else {
            console.log(results);
        }
    })
}

exports.sendterritory = function(req, res) {
    let territory = req.body.territory;

    connection.query('SELECT contact FROM members WHERE territory = ?', [territory], function(error, results, fields, rows) {
        if(error) {
            res.send({
                "code": 400,
                "error": error
            })
        }else{
            console.log(results);
            if(results.length >0) {
                res.json({
                    "code": 200,
                    "members": results
                })
                return results
            }else {
                res.send({
                    "code": 204,
                    "success": "There is no data to show"
                });
            }
        }
    })
}

exports.deleteterritory= function(req, res) {
    let id = req.body.id;
    connection.query('DELETE from territories WHERE id = ?', [id], function(error, results, fields) {
        if(error) {
            console.log(error);
            
            res.send({
                "code": 400,
                "error": true
            }) 
        }else {
            res.send({
                "code": 200,
                "error": false
            })
        }
    })
}

exports.territories = function(req, res) {
    connection.query('SELECT * FROM territories', function(error, results, fields) {
        if(error){
            res.send({
                "code": 400,
                "error": error
            })
        }else{
            //console.log(results);
            if(results.length >0) {
                //cd console.log(results);
                
                res.send({
                    "code": 200,
                    "members": results
                })
                
                return results
            }else {
                res.send({
                    "code": 204,
                    "success": "There is no data to show"
                });
            }
        }
    })
}

exports.trades = function(req, res) {
    connection.query('SELECT DISTINCT trade FROM members WHERE trade <> ""',function(error, results, fields) {
        if(error) {
            res.send({
                "code": 400,
                "error": error
            })
        }else {
            if(results.length >0) {
                console.log(results);
                
                res.send({
                    "code": 200,
                    "members": results
                })
                
                return results
            }else {
                res.send({
                    "code": 204,
                    "success": "There is no data to show"
                });
            }
        }
    });
}


// exports.territories = function(req, res) {
//     connection.query('SELECT DISTINCT territory FROM members WHERE territory <> ""',function(error, results, fields) {
//         if(error) {
//             res.send({
//                 "code": 400,
//                 "error": error
//             })
//         }else {
//             if(results.length >0) {
//                 console.log(results);
                
//                 res.send({
//                     "code": 200,
//                     "members": results
//                 })
                
//                 return results
//             }else {
//                 res.send({
//                     "code": 204,
//                     "success": "There is no data to show"
//                 });
//             }
//         }
//     });
// }

  
exports.inactive = function(req, res) {
    connection.query('SELECT territory, COUNT(territory)as inactive FROM members WHERE TIMESTAMPDIFF(month, subscription_date, CURRENT_DATE()) > 6 GROUP BY territory',function(error, results, fields) {
        if(error) {
            res.send({
                "code": 400,
                "error": true
            })
        }else {
            if(results.length >0) {
                res.send({
                    "code": 200,
                    "members": results
                })
                
                return results
            }else {
                res.send({
                    "code": 204,
                    "success": "There is no data to show"
                });
            }
        }
    });
}

exports.active = function(req, res) {
    connection.query('SELECT territory, COUNT(territory)as active FROM members WHERE TIMESTAMPDIFF(month, subscription_date, CURRENT_DATE()) < 6 GROUP BY territory',function(error, results, fields) {
        if(error) {
            res.send({
                "code": 400,
                "error": true
            })
        }else {
            if(results.length >0) {
                res.send({
                    "code": 200,
                    "members": results
                })
                
                return results
            }else {
                res.send({
                    "code": 204,
                    "success": "There is no data to show"
                });
            }
        }
    });
}

//all member report data
exports.systemusers = function(req, res) {
    connection.query('SELECT * FROM users ORDER BY id DESC', 
        function(error, results, fields) {
           if(error) {
               res.send({
                   "code": 400,
                   "failed": "Error Occured"                   ///"request": req
               })
           } else {
               if(results.length >0) {
                   res.send({
                       "code": 200,
                       "members": results
                   })
                   
                   //return results
               }else {
                   res.send({
                       "code": 204,
                       "success": "There is no data to show"
                   });
               }
           }
    });
}

exports.edituser = function(req, res) {
    connection.query('UPDATE users SET first_name = "value1", last_name = "value2", email = "v", password = "l" WHERE id = 13;', function(error, results, fields) {
        if(error) {
            res.send({
                "code": 400,
                "failed": "Error Occured"                   ///"request": req
            })
        } else {
            if(results.length >0) {
                res.send({
                    "code": 200,
                    "members": results
                })
                
                //return results
            }else {
                res.send({
                    "code": 204,
                    "success": "There is no data to show"
                });
            }
        }
    })
}

exports.targetsms = function(req, res){
    let query = req.body.query;
    let param = req.body.param;
    let destinations = '';
    let numbersstring = [];
    let message = req.body.message;

    var sqlquery = connection.query('SELECT contact FROM members WHERE ?? = ?', [query, param], function (error, results, fields) {
            if(error) {
                res.send({
                    "code": 400,
                    "message": "An error occurred. Please try again later.",
                    "error": true
                }) 
            } else {
                results.map((contact)=> {
                    destinations = "263".concat(Object.values(contact));
                    numbersstring.push(destinations);
                })
                destinations = numbersstring.join("%2C");
               console.log(`http://rslr.connectbind.com:8080/bulksms/bulksms?username=ntv-zciea&password=pams1234&type=0&dlr=1&destination=${destinations}&source=ZCIEA&message=Second Attempt.`);
    
                // axios.post(`http://rslr.connectbind.com:8080/bulksms/bulksms?username=ntv-zciea&password=pams1234&type=0&dlr=1&destination=${destinations}&source=ZCIEA&message=${message}`, {
                //     members: req.body.name
                    
                //   })
                //   .then(function (response) {
                //     res.send({
                //         "code": 200,
                //         "message": "Success",
                //         "error": false
                //     }) 
                //   })
                //   .catch(function (error) {
                //     res.send({
                //         "code": 400,
                //         "message": "An error occurred. Please try again later.",
                //         "error": true
                //     }) 
                //     console.log(error);
                //   });
            }
        }
    ); 
    console.log(sqlquery.query);
      

    console.log({
        "query": sqlquery.query,
        "qury": query,
        "param": param,
        "msg": message
    });
    
}

exports.byterritory  = function(req, res) {
    let territory = req.body.territory;
    let destinations = '';
    let numbersstring = [];
    let message = req.body.message;
    connection.query('SELECT contact FROM members WHERE territory = ?',[territory], function(error, results) {
        if(error) {
            res.send({
                "code": 400,
                "message": "An error occurred. Please try again later.",
                "error": true
            }) 
        } else {
            results.map((contact)=> {
                destinations = "263".concat(Object.values(contact));
                numbersstring.push(destinations);
            })


            destinations = numbersstring.join("%2C");
            //console.log(`http://rslr.connectbind.com:8080/bulksms/bulksms?username=ntv-zciea&password=pams1234&type=0&dlr=1&destination=${destinations}&source=ZCIEA&message=Second Attempt.`);

            axios.post(`http://rslr.connectbind.com:8080/bulksms/bulksms?username=ntv-zciea&password=pams1234&type=0&dlr=1&destination=${destinations}&source=ZCIEA&message=${message}`, {
                members: req.body.name
                
              })
              .then(function (response) {
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    } )
}

exports.notifications = function(req, res) {
    connection.query('SELECT * FROM users WHERE approved = 0', function(error, results, fields) {
        if(error) {
            res.send({
                "code": 400,
                "error": true
            })
        }else {
            if(results.length >0) {
                res.send({
                    "code": 200,
                    "users": results,
                    "error": false
                })
                
                return results
            }else {
                res.send({
                    "code": 204,
                    "success": "There is no data to show",
                    "error": false
                });
            }
        }
    })
}


