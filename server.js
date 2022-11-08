let express = require('express');
let app = express();
const bp = require('body-parser');
const axios = require('axios');
let path = require('path');
const PORT = process.env.PORT || 9999;
//let cors = require('cors');

//app.use(cors());
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist'))
app.use(express.static(__dirname + '/public')); //__dir and not _dir
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


app.post('/chkver', (req, res) => {
    var config = {
        url: "https://wax-bot-1804d-default-rtdb.asia-southeast1.firebasedatabase.app/data.json",
        method: "GET"
    }
    axios(config)
    .then((response) => {
        res.send(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
})


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.post('/chkurl', (req, res) => {
    let url = req.body.endpoint+"/v1/chain/get_table_rows"
    try {
    let data = JSON.stringify({
        json: true,    
        code: "farmersworld",      
        scope: "farmersworld",         
        table: "tools",       
        key_type: "i64",
        index_position: 2,
        limit: 50,
        reverse: false  
      });
      let config = {
        method: 'get',
        url: url,
        data : data
      };

      axios(config)
      .then((response) => {
        if(response.data.rows.length === 50) {
            res.json({ url: "good"}); 
        }
        else {
            throw err;
        }     
      })
      .catch((err) => {
        console.log(err.message);
        res.json({ url: "poor"}); 
      })
    }
    catch(err) {
        console.log(err.message);
    }
    //console.log(req.body);
})


app.listen(PORT, () => {console.log('server run on : ' + PORT)});
