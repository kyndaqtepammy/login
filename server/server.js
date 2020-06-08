var express = require("express")
var login   = require('./routes/loginroutes')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')

//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json() )
app.use(cors());

var router = express.Router()
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null ,   Date.now()+ "_" +file.originalname);
    }
});
var upload = multer({storage: storage});


router.get('/', function(req, res) {
    res.json(
        {
            message: "Hello world"
        }
    )
})

router.post('/deletemember', login.deletemember)
router.post('/register', login.register)
router.post('/login', login.login)
router.post('/addmember', login.addmember)
router.post('/editmember', upload.single('myFile'), login.editmember)
router.get('/reports', login.reports)
router.get('/genderReportMale', login.genderReportMale)
router.get('/genderReportFemale', login.genderReportFemale)
router.get('/ageReportFemale', login.ageReportFemale)
router.get('/ageReportMale', login.ageReportMale)
router.get('/territories', login.territories)
router.get('/totalMale', login.totalMale)
router.post('/uploads',upload.single('myFile'), login.uploads)
router.get('/active', login.active)
router.get('/inactive', login.inactive)
router.post('/user', login.user)
router.get('/systemusers', login.systemusers)
router.get('/edituser', login.edituser)
router.get('/trades', login.trades)
router.post('/sendterritory', login.sendterritory)
router.post('/addterritory', login.addterritory)
router.post('/deleteterritory', login.deleteterritory)
router.post('/deletemultiple', login.deletemultiple)
router.get('/notifications', login.notifications)
//for targeted messaging
router.post('/byterritory', login.byterritory)
router.post('/targetsms', login.targetsms)
router.post('/editTerritory', login.editTerritory)
app.use('/api', router)
app.use('/uploads', express.static(__dirname + '/uploads'))
app.listen(5000)