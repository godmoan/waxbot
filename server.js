let express = require('express');
let app = express();
const bp = require('body-parser');
const axios = require('axios');
const PORT = process.env.PORT || 9999
//let cors = require('cors');

//app.use(cors());
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist'))
app.use(express.static(__dirname + '/Public')); //__dir and not _dir
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.post('/chkver', (req, res) => {
    var config = {
        url: "https://tonaot.top/chkver",
        method: "POST"
    }
    axios(config)
    .then((response) => {
        res.send(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname,'/public/index.html'));
});


app.listen(PORT, () => {console.log('server run on : ' + PORT)});
