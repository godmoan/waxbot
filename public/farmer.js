///////////////////////////////////////variable///////////////////////////////////////
let version = "5.0.3";
const endpointJson = {"u1": "https://chain.wax.io", "u2": "https://wax.eu.eosamsterdam.net", "u3": "https://wax.blokcrafters.io", "u4": "https://api.wax.alohaeos.com", "u5": "https://api.waxsweden.org", "u6": "https://wax.pink.gg", "u7": "https://wax.dapplica.io","u8": "https://wax.eosphere.io", "u9": "https://api.wax.greeneosio.com", "u10": "https://wax.cryptolions.io", "u11": "https://wax.eosusa.news", "u12": "https://api.wax.bountyblok.io", "u13": "https://wax.greymass.com", "u14": "https://wax.eosrio.io", "u15": "https://wax.eosdublin.io"};
const endpointArr = ["https://chain.wax.io", "https://wax.eu.eosamsterdam.net", "https://wax.blokcrafters.io", "https://api.wax.alohaeos.com", "https://api.waxsweden.org", "https://wax.pink.gg", "https://wax.dapplica.io", "https://wax.eosphere.io", "https://api.wax.greeneosio.com", "https://wax.cryptolions.io", "https://wax.eosusa.news", "https://api.wax.bountyblok.io", "https://wax.greymass.com", "https://wax.eosrio.io", "https://wax.eosdublin.io"];
let selectEndpoint;
const logTextarea = document.getElementById('log');
const coinsSymbol = ["fww", "fwf", "fwg"];
const memType = ["Food", "Wood", "Gold"];
const memColor = {"Food": "blue", "Wood": "#B24700", "Gold": "yellow"};
const memStoreClaim = {"Food": 2, "Wood": 2, "Gold": 4};
let memObj = {};
let memnameObj = {};
let buildObj = {};
let plantObj = {};
let aniObj = {};
let milkArr = [];
let eggArr = [];
let barleyArr = [];
let start = false;
let chkFirstTime = true;
let delayTime = 10000;
const multiTime = 1000;
const onehrs = 3600000;
const oneday = 86400000;
let toolArr = [];
let toolnameObj = {};
let savemode = 0;
let woodIngame;
let foodIngame;
let goldIngame;
let tokenJson = {};
let text1 = "อ.ไม้ร่ม ได้ออกมาต้อนรับคุณ";
let text2 = "ละละละละ เละๆๆๆ";
let text3 = "ลุงเริง บ่นว่าเงี่ยน";
////////////////////////////////////////version////////////////////////////////////////
document.getElementById("version").innerHTML = `Romsai Bot ${version}`;
async function chkVer() {
  const config = {
    url: "/chkver",
    method: "POST",
  }
  axios(config)
  .then((res) => {
    if(res.data.version == version) {
      document.getElementById("log").innerHTML += thisTime() +": Bot เป็น Version ล่าสุดแล้ว\n";
    }
    else {
      document.getElementById("log").innerHTML += thisTime() +": มี Bot version " + res.data.version + " ใหม่กว่า version ที่คุณใช้\n";
      document.getElementById("log").innerHTML += thisTime() +": Link download https://github.com/godmoan/waxbot\n";
      $('#modal-version').modal('show'); 
      
    }
  })
  .catch((err) => {
    console.log(err);
  })
}  
////////////////////////////////////////version////////////////////////////////////////
/////////////////////////////////////////sleep///////////////////////////////////////////
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
///////////////////////////////////////sleep///////////////////////////////////////////
///////////////////////////////////////this time///////////////////////////////////////
  function thisTime() {
    let now = new Date(); 
    let dateTime = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',second: 'numeric', hour12: true });
    return dateTime;
  }
///////////////////////////////////////this time///////////////////////////////////////
///////////////////////////////////time function///////////////////////////////////////
  function formatTime(timeStamp){
    const total = timeStamp - Date.now(); 
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
    return { total, days, hours, minutes, seconds };
  }
/////////////////////////////////////time function///////////////////////////////////////
////////////////////////////////////////textarea////////////////////////////////////////
function scrollTextarea() {
  document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
}

function clearText() {
  document.getElementById("log").innerHTML = "";
  logTextarea.innerHTML += thisTime() + `: Clear Log สำเร็จ \n`;  
}
////////////////////////////////////////textarea////////////////////////////////////////
////////////////////////////////////// modal /////////////////////////////////////////
modalLoad();
function modalLoad() {
  $(window).on('load', function() {
    $('#modal-endpoint').modal('show');
    let chkoption = Object.keys(endpointJson).length;
    for(let i = 0; i<chkoption; i++){
      let u = "u"+ (i+1).toString(); 
        let urlDom = document.getElementById("url");
        let option = document.createElement("option");
        option.text = endpointJson[u];
        option.value = endpointJson[u];
        option.style.background = "black";
        urlDom.add(option);
    }        
  });
}

async function checkEndpoint() {
  let getUrl = document.getElementById("url").value;
  document.getElementById("urlStatus").innerHTML = "";

      var config = {
        url: "/chkurl",
        method: "POST",
        data: {
          endpoint: getUrl
        }
      }
      try {
        await axios(config)
          .then((res) => {     
          if(res.data.url === "good") {
            document.getElementById("urlStatus").style.color = "#5EF800";
          }
          else {
            document.getElementById("urlStatus").style.color = "#F80000";
          }
          document.getElementById("urlStatus").innerHTML = res.data.url;
        })
        .catch((err) => {
          //console.log(err);
        })
      }
      catch(err) {
        //console.log(err.message);
      }

    };   
//////////////////////////////////// modal ///////////////////////////////////////////
/////////////////////////////////////get table////////////////////////////////////////
async function getTable(table, pos, range) {
  try {
    const listTable = await wax.api.rpc.get_table_rows({
      json: true,    
      code: "farmersworld",      
      scope: "farmersworld",         
      table: table,       
      key_type: "i64",
      index_position: pos,
      lower_bound: range,
      upper_bound: range,
      limit: 20,
      reverse: false  
      });
      return listTable;
  }
  catch(err) {
    //logTextarea.innerHTML += thisTime() + `: ${err.message} \n`;   
    //console.log(err.message);
  }
}
/////////////////////////////////////get table////////////////////////////////////////
/////////////////////////////////////click start//////////////////////////////////////
async function clickStart() {
  return new Promise((res) => {
    selectEndpoint = document.getElementById("url").value; 
    res(); 
  })
  .then(async() => { await waxStart(); })
  .then(async() => { await waxlogin(); })
  .then(async () => { await loadSave(); })
  .then(async () => { await chkVer(); coinmarketcapWax(); alcorPrice(); })
  .then(async () => { await chkRefill();  await toolTable(); await memTable(); await buildingTable(); })
  .then(async () => { await barleyFetch(); })
  .then(async() => { await farmTable(); animalTable(); }) 
  .then(async() => { await withdrawnResource(); await autoCraft(); await stuckMember();  }) 
  .then(async() => { atomicInven(); await sendResource(); })
  .then(async() => { showCooldown(); })
  .then(async() => { milkFetch(); eggFetch(); autoSell(); })
  .then(() => {
    chkFirstTime = false;
  })
}
/////////////////////////////////////click start//////////////////////////////////////
function showCooldown() {
  let loopCountdown = setInterval(() => {
    countDown();
  }, 1000);
  if(localStorage.getItem("spareram") === "off") {
    savemode = 0; 
  }
  else {
    clearInterval(loopCountdown);
    savemode = 1;
  }
}
/////////////////////////////////////click setup/////////////////////////////////////
function clickSetup() {
  loadSave(); 
}
/////////////////////////////////////click setup/////////////////////////////////////
 //////////////////////////////////////wax login////////////////////////////////////////
 async function waxStart() {
  wax = new waxjs.WaxJS({
   rpcEndpoint: selectEndpoint
 });
 }

 async function waxlogin() {
   try {
     wax.rpcEndpoint = selectEndpoint;
     const userAccount = await wax.login();  
     waxWallet = userAccount;   
     document.getElementById('waxId').innerHTML = waxWallet;
     document.title = wax.userAccount;
     resourcePlayer();
     fwCoins();
     resourceinGame();
      logTextarea.innerHTML += thisTime() + `: ${userAccount} Login success \n`;   
   }
   catch(err) {      
     //console.log(err.message);
   }     
 }
 //////////////////////////////////////wax login////////////////////////////////////////
 ////////////////////////////////////resource player//////////////////////////////////////
 async function resourcePlayer() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 240000;
  }
  setInterval(async() => {
    return new Promise((res) => {
      res();
    })
    .then(async() => {
      document.getElementById("showEndpoint").innerHTML = "Endpoint: " + selectEndpoint;
      await getTable("config", 1, "").then((res) => {
        document.getElementById("fee").innerHTML = `Fee: ${res.rows[0].fee} `;
      })
    })
    .then(async() =>{
      await fetch(wax.rpcEndpoint + "/v1/chain/get_account", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "account_name": wax.userAccount
        }),
        redirect: 'follow'
      }
      )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let cpu = json.cpu_limit;  
        let cpuuse = (cpu.used * 100 / cpu.max).toFixed(2);
        document.getElementById("cpuShow").innerHTML = `CPU: ${cpuuse}%`;
        document.getElementById("waxcoinShow").innerHTML = `Wax Coins: ${parseFloat(json.core_liquid_balance).toFixed(2)} Wax`;
      })
    })
  }, delayTime + setTime); 
}

function fwCoins() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 240000;
  }
  setInterval(() => {
    coinsSymbol.forEach((res) => {
      fetchCoin(res);
    })
  }, delayTime + setTime); 
}

async function fetchCoin(coin) {
    try {
      await fetch(wax.rpcEndpoint +"/v1/chain/get_currency_balance", {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "code": "farmerstoken",
          "account": wax.userAccount,
          "symbol": coin
        }),
        redirect: 'follow'
      })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        tokenJson[coin] = parseInt(res);
        document.getElementById(coin+"coin").innerHTML = res;
      })
    }
    catch(err) {
      //console.log(err);
    }
}

////////////////////////////////////resource player//////////////////////////////////////
////////////////////////////////////resource in game//////////////////////////////////////
function resourceinGame() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 240000;
  }
  setInterval(async () => {
    const source = await getTable("accounts", 1, wax.userAccount)
    typeArray = [];
    for(let i = 0; i <= 2; i++) {
      let getResource = source.rows[0].balances[i];
      let cutResource = getResource.replace(/[0-9|.|\s]/g, '');
      typeArray.push(cutResource);
    }
  
    typeArray.forEach((elem, i) => {
      switch(elem) {
        case "WOOD":
          woodIngame = parseInt(source.rows[0].balances[i]);
          document.getElementById("fww").innerHTML = `Wood Token: ${woodIngame}`;
          break;
        case "FOOD":
          foodIngame = parseInt(source.rows[0].balances[i]);
          document.getElementById("fwf").innerHTML = `Food Token: ${foodIngame}`;
          break;
        case "GOLD":
          goldIngame = parseInt(source.rows[0].balances[i]);
          document.getElementById("fwg").innerHTML = `Gold Token: ${goldIngame}`;
          break;
      }
    });
    await getTable("coinstake", 1, wax.userAccount).then((res) => {
      document.getElementById('coinstake').innerHTML = `Farmer Coin: ${res.rows[0].amount}`; 
    })
  }, delayTime + setTime); 
  
}
////////////////////////////////////resource in game//////////////////////////////////////
//////////////////////////////////repair refill onchange//////////////////////////////////////
function repairOnchange(value) {
  document.getElementById("repair-label").innerHTML = value;
}

function refillOnchange(value) {
  document.getElementById("refill-label").innerHTML = value;
}
//////////////////////////////////repair refill onchange/////////////////////////////////////
//////////////////////////////////////Setup onoff toggle//////////////////////////////////////
async function onoffToggle(typ) {
  let toggle = await document.getElementById('onToggle-'+typ).checked;  
  let toggleValue = document.getElementById('onToggle-'+typ);

  if(toggle != true) {
    toggleValue.value = "off";
    }
  else {
    toggleValue.value = "on";
    }
}
//////////////////////////////////////Setup onoff toggle//////////////////////////////////////
  ///////////////////////////////////////onoff withdrawn////////////////////////////////////////
  async function onoffWithdrawn() {
    let toggle = await document.getElementById('onToggle-withdrawn').checked;  
    let toggleValue = await document.getElementById('onToggle-withdrawn');  

    if(toggle != true) {
      toggleValue.value = "off";
      }
    else {
      toggleValue.value = "on";
      }
  }
  ///////////////////////////////////////onoff withdrawn////////////////////////////////////////
////////////////////////////////////////Setup save////////////////////////////////////////
async function saveSetup() {
  try {
    await Promise.all(memType.map(async (typ) => {
      let selectMem = document.getElementById("select-"+typ).value;
      let onoff = await document.getElementById("onToggle-"+typ).value;
      let saveStorage = {quan : selectMem, onoff: onoff};
      localStorage.setItem(typ , JSON.stringify(saveStorage));    
    })); 

      let store = document.getElementById("store").value;
      localStorage.setItem("store" , store);   

    await Promise.all(memType.map(async (typ) => {
      let selectType = document.getElementById("withdrawn-"+typ).value;
      localStorage.setItem("withdrawn"+typ, selectType);
    }));
      let withdrawn = await document.getElementById("onToggle-withdrawn").value;
      localStorage.setItem("withdrawn", withdrawn);

      let repair = await document.getElementById("repairRange").value;
      let refill = await document.getElementById("refillRange").value;       
      localStorage.setItem("repairFw" , repair);
      localStorage.setItem("refillFw" , refill);

      let buyBarley = await document.getElementById("onToggle-barley").value;
      localStorage.setItem("barley" , buyBarley);

      let sellMilk = await document.getElementById("onToggle-milk").value;
      localStorage.setItem("milk" , sellMilk);

      let sellEgg = await document.getElementById("onToggle-egg").value;
      localStorage.setItem("egg" , sellEgg);

      let autoCraft = await document.getElementById("onToggle-craft").value;
      localStorage.setItem("craft" , autoCraft);

      let autoSend = await document.getElementById("onToggle-send").value;
      localStorage.setItem("autosend" , autoSend);
      
      let sendId = await document.getElementById("autoSend").value;
      localStorage.setItem("sendId" , sendId);

      let spareram = await document.getElementById("onToggle-spareram").value;
      localStorage.setItem("spareram" , spareram);

      let chkplay = await document.getElementById("chkplay").checked;
      localStorage.setItem("play",  chkplay);

      logTextarea.innerHTML += thisTime() + `: Save suscess. \n`;
  }
  catch(err) {
    logTextarea.innerHTML += thisTime() + `: ${err.message} \n`;   
  }
}
////////////////////////////////////////Setup save////////////////////////////////////////
/////////////////////////////////////////Load setup///////////////////////////////////////
async function loadSave() {
    /////////////// repair ///////////
    document.getElementById("repairRange").value = localStorage.getItem("repairFw");  
    document.getElementById("repair-label").innerHTML = localStorage.getItem("repairFw");  
    document.getElementById("refillRange").value = localStorage.getItem("refillFw");  
    document.getElementById("refill-label").innerHTML = localStorage.getItem("refillFw");  
    /////////////// repair ///////////
    /////////////// load member ///////////
    memType.forEach(async (mem) => {
      let getLoad = localStorage.getItem(mem);
      let obj = JSON.parse(getLoad);
      if(getLoad == undefined) {
        let saveStorage = {quan : 0, onoff: "off"};
        localStorage.setItem(mem , JSON.stringify(saveStorage));
      }
        if(obj.onoff == "on") {
          document.getElementById("onToggle-"+mem).checked = true;   
          document.getElementById("onToggle-"+mem).value = obj.onoff;
          document.getElementById("select-"+mem).value = obj.quan;
        }
        else if(obj.onoff == "off") {
          document.getElementById("onToggle-"+mem).checked = false;   
          document.getElementById("onToggle-"+mem).value = obj.onoff;
          document.getElementById("select-"+mem).value = obj.quan;
        }
        else {  
          document.getElementById("onToggle-"+mem).checked = false;   
          document.getElementById("onToggle-"+mem).value = "off";
        }
    })
    /////////////// load member ///////////
    /////////////// load store ///////////
   let loadStore = localStorage.getItem("store");
    if(loadStore == undefined ) {
      document.getElementById("store").value = 1000;
    }
    document.getElementById("store").value = loadStore;

    let loadWithdrawn = localStorage.getItem("withdrawn");
    if(loadWithdrawn == undefined) {
      localStorage.setItem("withdrawn" , "off");
    }

    switch(loadWithdrawn) {
      case"on":
      document.getElementById("onToggle-withdrawn").checked = true;   
      document.getElementById("onToggle-withdrawn").value = loadWithdrawn;

      break;
      case "off":
        document.getElementById("onToggle-withdrawn").checked = false;   
        document.getElementById("onToggle-withdrawn").value = loadWithdrawn;
        break;
    }

    try {
      memType.forEach(async (typ) => {
        let getWithdrawn = localStorage.getItem("withdrawn"+typ);
        if(getWithdrawn == undefined) {
          localStorage.setItem("withdrawn"+typ, 0);
        }
        document.getElementById("withdrawn-"+typ).value = getWithdrawn;
      })
    }
    catch(e) {
      //console.log(err);
    }
     /////////////// load store ///////////

    /////////////// load barley ///////////
    let loadBarley = localStorage.getItem("barley");
    if(loadBarley == undefined) {
      localStorage.setItem("barley" , "off");
    }

    switch(loadBarley) {
      case "on":
        document.getElementById("onToggle-barley").checked = true;   
        document.getElementById("onToggle-barley").value = loadBarley

        break;
      case "off":
        document.getElementById("onToggle-barley").checked = false;   
        document.getElementById("onToggle-barley").value = loadBarley;
        break;
    } 
    /////////////// load barley ///////////

    /////////////// load milk ///////////
    let loadMilk = localStorage.getItem("milk");
    if(loadMilk == undefined) {
      localStorage.setItem("milk" , "off");
    }
    switch(loadMilk) {
      case "on":
        document.getElementById("onToggle-milk").checked = true;   
        document.getElementById("onToggle-milk").value = loadMilk;
        break;
      case "off":
        document.getElementById("onToggle-milk").checked = false;   
        document.getElementById("onToggle-milk").value = loadMilk;
        break;
    } 
    /////////////// load milk ///////////

    /////////////// load egg ///////////
    let loadEgg = localStorage.getItem("egg");
    if(loadEgg == undefined) {
      localStorage.setItem("egg" , "off");
    }
    switch(loadEgg) {
      case "on":
        document.getElementById("onToggle-egg").checked = true;   
        document.getElementById("onToggle-egg").value = loadEgg;
        break;
      case "off":
        document.getElementById("onToggle-egg").checked = false;   
        document.getElementById("onToggle-egg").value = loadEgg;
        break;
    } 
    /////////////// load egg ///////////

     /////////////// auto craft  ///////////
     let autoCraft = localStorage.getItem("craft");
     if(autoCraft == undefined) {
       localStorage.setItem("craft" , "off");
     }
     switch(autoCraft) {
       case "on":
         document.getElementById("onToggle-craft").checked = true;   
         document.getElementById("onToggle-craft").value = autoCraft;
         break;
       case "off":
         document.getElementById("onToggle-craft").checked = false;   
         document.getElementById("onToggle-craft").value = autoCraft;
         break;
     } 
     /////////////// auto craft  ///////////

     /////////////// auto send  ///////////
     let autoSend = localStorage.getItem("autosend");
     if(autoSend == undefined) {
       localStorage.setItem("autosend" , "off");
     }
     switch(autoSend) {
       case "on":
         document.getElementById("onToggle-send").checked = true;   
         document.getElementById("onToggle-send").value = autoSend;
         break;
       case "off":
         document.getElementById("onToggle-send").checked = false;   
         document.getElementById("onToggle-send").value = autoSend;
         break;
     } 
    /////////////// auto send  ///////////

    /////////////// send id  ///////////
    document.getElementById("autoSend").value = localStorage.getItem("sendId");

    /////////////// send id  ///////////

      /////////////// spare ram  ///////////
      let spareram = localStorage.getItem("spareram");
      if(spareram == undefined) {
        localStorage.setItem("spareram" , "off");
      }
      switch(spareram) {
        case "on":
          document.getElementById("onToggle-spareram").checked = true;   
          document.getElementById("onToggle-spareram").value = spareram;
          break;
        case "off":
          document.getElementById("onToggle-spareram").checked = false;   
          document.getElementById("onToggle-spareram").value = spareram;
          break;
      } 
    /////////////// spare ram  ///////////
    
    /////////////// check play  ///////////
      let loadplay = localStorage.getItem("play");
      
       switch(loadplay) {
        case "true":
          document.getElementById("chkplay").checked = true; 
          break;
        case "false":
          document.getElementById("chkplay").checked = false; 
           rom();
      }
    /////////////// check play  ///////////
    

  }
/////////////////////////////////////////Load setup////////////////////////////////////////
///////////////////////////////////////// rom ////////////////////////////////////////
function rom() {
  let rand = Math.floor(Math.random() * 3);
  let rom = new Audio('demo/js/pee.mp3');
  let wow = new Audio('demo/js/wow.mp3');
  let loong = new Audio('demo/js/loong.mp3');
  
  switch(rand) {
    case 0:
      rom.play();
      document.getElementById('log').innerHTML += thisTime() + `: ${text1} !!! \n`;
      break;
    case 1:
      wow.play();
      document.getElementById('log').innerHTML += thisTime() + `: ${text2} !!! \n`;
      break;
    case 2:
      loong.play();
      document.getElementById('log').innerHTML += thisTime() + `: ${text3} !!! \n`;
      break;
  }
}
///////////////////////////////////////// rom ////////////////////////////////////////
//////////////////////////////////////////price///////////////////////////////////////////
 async function coinmarketcapWax() {
  let setTime = 600000;
  /*if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 600000;
  }*/
  setInterval(async () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

  fetch("https://api.coingecko.com/api/v3/simple/price?ids=WAX&vs_currencies=THB", requestOptions)
  .then((response) => {
          return response.json();
      })
      .then((json) => {
          const waxprice = json.wax;     
          document.getElementById("waxprice").innerHTML = `WAX/THB: ${waxprice.thb} บาท`;
      })
      .catch((error) => {
          //console.log(error.message);
      })
    }, delayTime + setTime); 
  
}

 async function alcorPrice() {
  
  let setTime = 600000;
  /*if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 600000;
  }*/

  setInterval(async () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
      };
    
      fetch("https://wax.alcor.exchange/api/markets/105", requestOptions)
      .then((response) => {
          return response.json();
      })
      .then((json) => {
          const fwfprice = json.last_price;     
          document.getElementById("fwfprice").innerHTML = "FWF/WAX : " + fwfprice.toFixed(7);
      })
      .catch((error) => {
          
      })
      await sleep(5000);
      fetch("https://wax.alcor.exchange/api/markets/104", requestOptions)
      .then((response) => {
          return response.json();
      })
      .then((json) => {
          const fwwprice = json.last_price;     
          document.getElementById("fwwprice").innerHTML = "FWW/WAX : " + fwwprice.toFixed(7);
      })
      .catch((error) => {
          
      })
      await sleep(5000);
      fetch("https://wax.alcor.exchange/api/markets/106", requestOptions)
      .then((response) => {
          return response.json();
      })
      .then((json) => {
          const fwgprice = json.last_price;     
          document.getElementById("fwgprice").innerHTML = "FWG/WAX : " + fwgprice.toFixed(7);
      })
      .catch((error) => {
          
      })
    }, delayTime + setTime); 
  
}
//////////////////////////////////////////price///////////////////////////////////////////
////////////////////////////////////////fetch milk///////////////////////////////////////////
async function milkFetch() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 900000;
  }

  setInterval(async() => {
    await axios.get("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=farmersworld&template_id=298593&owner="+wax.userAccount)
    .then((res) => {
       let milk = res.data.data;
       document.getElementById("invenMilk").innerHTML = `Milk: ${milk.length}`;
       milkArr = [];
       milk.forEach(res => {
         milkArr.push(res.asset_id);
       });  
    })
    .catch((err) => {
      //console.log(err.message);   
    })   
  }, delayTime + setTime); 
  
}
////////////////////////////////////////fetch milk//////////////////////////////////////////
//////////////////////////////////////fetch egg/////////////////////////////////////////
async function eggFetch() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 900000;
  }
  setInterval(async() => {
    await axios.get("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=farmersworld&template_id=298612&owner="+wax.userAccount)
    .then((res) => {
       let egg = res.data.data;
       document.getElementById("invenEgg").innerHTML = `Egg: ${egg.length}`;
       eggArr = [];
       egg.forEach(res => {
         eggArr.push(res.asset_id);
       });
       
    })
    .catch((err) => {
      //console.log(err.message); 
    })
  
   
  }, delayTime + setTime); 
}
//////////////////////////////////////fetch egg/////////////////////////////////////////
//////////////////////////////////////fetch barley/////////////////////////////////////////
async function barleyFetch() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 350000;
  }
  setInterval(async() => {
    await axios.get("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=farmersworld&template_id=318606&owner="+wax.userAccount)
    .then((res) => {
       let barley = res.data.data;
       document.getElementById("invenBarley").innerHTML = `Barley: ${barley.length}`;
       barleyArr = [];
       barley.forEach(res => {
         barleyArr.push(res.asset_id);
       });
       
    })
    .catch((err) => {
      //console.log(err.message); 
    })
   
  }, delayTime + setTime); 
}
//////////////////////////////////////fetch barley/////////////////////////////////////////
/////////////////////////////////////////tool table///////////////////////////////////////////
async function toolTable() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 90000;
  }
  else {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 10000;
  }
  setInterval(async() => {
    
    //chkRefill();  
    const listTool = await getTable("tools", 2, wax.userAccount);
    await Promise.all(listTool.rows.map(async (id) => {
      if(toolArr.includes(id) === false) {
        toolArr.push(id);
      }    
    }))

    let tools = listTool.rows;
    tools.sort((a, b) => b.type.localeCompare(a.type));

    tools.forEach(async (elem) => {
      await getTable("toolconfs", 1, elem.template_id).then((res) => {
        let toolname =  res.rows[0].template_name;
        toolnameObj[elem.asset_id] = toolname;
      })
    })
    document.getElementById('tool').innerHTML = "";

    for (let elem of tools) {
        let startDay = new Date((elem.next_availability * multiTime) - onehrs).toLocaleString('en-US', { day: 'numeric' })
        let startMonth = new Date((elem.next_availability * multiTime) - onehrs).toLocaleString('en-US', { month: 'numeric' })
        let startTime = new Date((elem.next_availability * multiTime) - onehrs).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        document.getElementById('tool').innerHTML += `<div class="row container d-flex align-items-center justify-content-center"><label class="tagtool" style="width: 150px;">${toolnameObj[elem.asset_id]}</label>` +
        `<label class="tagtool" style="width: 100px; ">${elem.current_durability}/${elem.durability}</label>` +
        `<label id="startTime-${elem.asset_id}" class="tagtool" style="width: 250px;">Last Claim | Day : ${startDay}/${startMonth} Time: ${startTime} </label>` +
        `<label id="countDown-${elem.asset_id}" class="tagtool" style="width: 100px;"></label>` +
        `</div><br>`; 
      }  
      
        for (let elem of tools) {          
          let repairSetup = localStorage.getItem("repairFw");
          let repairPercen = (elem.durability * repairSetup) / 100;

          let getMem = localStorage.getItem(elem.type);
          let obj = JSON.parse(getMem);
          let memMultipy = memStoreClaim[elem.type];
          let timeStart = elem.next_availability;
          let timeProcess = (timeStart * multiTime) + ((obj.quan * memMultipy) * onehrs);
          let rand = Math.floor(Math.random() * 20) + 1;
          await sleep(3000 * rand); 
          if(timeProcess < Date.now()) {                
            claimTool(elem.asset_id, toolnameObj[elem.asset_id], "claim");
          }

          if(elem.current_durability < repairPercen) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            chkRepair(elem.asset_id, toolnameObj[elem.asset_id]);
          }

          if(savemode === 1) {
            document.getElementById("countDown-"+elem.asset_id).innerHTML = "Save Mode"
          }
        }

      
  }, delayTime + setTime); 
  console.clear();
}

/////////////////////////////////////////tool table///////////////////////////////////////////
/////////////////////////////////////////mem table///////////////////////////////////////////
async function memTable() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 60000;
  }
  setInterval(async() => {
  const listMem = await getTable("mbs", 2, wax.userAccount);
    let mems = listMem.rows;

    await mems.sort((a, b) => {
      return a.template_id - b.template_id;
    })

    mems.forEach(async (elem) => {
      await getTable("mbsconf", 1, elem.template_id).then((res) => {
        let memname =  res.rows[0].name;
        memnameObj[elem.asset_id] = memname;
      })
    })
    document.getElementById('mem').innerHTML = "";
    
      for(let elem of mems) {
            let id = elem.asset_id;
            let timeClaim = elem.next_availability;

            let startDay = new Date((elem.next_availability * multiTime) - oneday).toLocaleString('en-US', { day: 'numeric' })
            let startMonth = new Date((elem.next_availability * multiTime) - oneday).toLocaleString('en-US', { month: 'numeric' })
            let startTime = new Date((elem.next_availability * multiTime) - oneday).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            memObj[id] = {"time": timeClaim};
           
            document.getElementById('mem').innerHTML += `<div class="row container d-flex align-items-center justify-content-center"><label class="tagtool" style="width: 150px;">${memnameObj[id]}</label>` +
            `<label class="tagtool" style="width: 100px; ">${elem.type}</label>` +
            `<label id="startTime-${elem.asset_id}" class="tagtool" style="width: 250px;">Last Claim | Day : ${startDay}/${startMonth} Time: ${startTime} </label>` +
            `<label id="countDown-${elem.asset_id}" class="tagtool" style="width: 100px;"></label>` +
            `</div><br>`;  
           
        } 

      for(let elem of mems) {
          let id = elem.asset_id;
          let timeStart = elem.next_availability;
          let timeProcess = (timeStart * multiTime);
          let rand = Math.floor(Math.random() * 8) + 1;
          if(timeProcess < Date.now()) {
            await sleep(5000 * rand);
            claimTool(id, memnameObj[id], "mbsclaim");
          }  
          if(savemode === 1) {
            document.getElementById("countDown-"+elem.asset_id).innerHTML = "Save Mode"
          }    
      }

  }, delayTime + setTime); 
}
/////////////////////////////////////////mem table///////////////////////////////////////////
////////////////////////////////////////building table////////////////////////////////////////
async function buildingTable() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 60000;
  }
  setInterval(async() => {
  let listBuild = await getTable("buildings", 2, wax.userAccount);
  let building = listBuild.rows;
  document.getElementById('building').innerHTML = "";

  building.forEach(async (res) => {
    let id = res.asset_id;
    let timeClaim = res.next_availability;
    buildObj[id] = {"time": timeClaim};
    let startDay = new Date((res.next_availability * multiTime) - onehrs).toLocaleString('en-US', { day: 'numeric' });
    let startMonth = new Date((res.next_availability * multiTime) - onehrs).toLocaleString('en-US', { month: 'numeric' });
    let startTime = new Date((res.next_availability * multiTime) - onehrs).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });


    document.getElementById('building').innerHTML += `<div class="row container d-flex align-items-center justify-content-center"><label class="tagtool" style="width: 150px;">${id}</label>` +
    `<label class="tagtool" style="width: 100px; ">${res.name}</label>` +
    `<label id="startTime-${id}" class="tagtool" style="width: 250px;">Last Build | Day : ${startDay}/${startMonth} Time: ${startTime} </label>` +
    `</div><br>`;  

    if(timeClaim != 0) {
      let timeStart = timeClaim;
      let timeProcess = (timeStart * multiTime);
      if(timeProcess < Date.now()) {
        let rand = Math.floor(Math.random() * 8) + 1;
        await sleep(1000 * rand);
        claimTool(id, res.name, "bldclaim");
      }
    }      
  });
  }, delayTime + setTime); 
}
////////////////////////////////////////building table////////////////////////////////////////
//////////////////////////////////////////farm table//////////////////////////////////////////
async function farmTable() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 60000;
  }
  setInterval(async() => {
  const listFarm = await getTable("crops", 2, wax.userAccount);
  let plant = listFarm.rows;
  document.getElementById('plant').innerHTML = "";
  plant.forEach(res => {
    let id = res.asset_id;
    let timeClaim = res.next_availability;
    plantObj[id] = {"time": timeClaim};
    let startDay = new Date(res.last_claimed * multiTime).toLocaleString('en-US', { day: 'numeric' });
    let startMonth = new Date(res.last_claimed * multiTime).toLocaleString('en-US', { month: 'numeric' });
    let startTime = new Date(res.last_claimed * multiTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });


  document.getElementById('plant').innerHTML += `<div class="row container d-flex align-items-center justify-content-center"><label class="tagtool" style="width: 150px;">${res.name}</label>` +
  `<label class="tagtool" style="width: 100px; ">${res.times_claimed} | Claimed </label>` +
  `<label id="startTime-${id}" class="tagtool" style="width: 250px;">Last Claim | วันที่ : ${startDay}/${startMonth} เวลา: ${startTime} </label>` +
  `<label id="countDown-${id}" class="tagtool" style="width: 100px;"></label>` +
  `</div><br>`; 



    let timeProcess = (timeClaim * multiTime);
    if(timeProcess < Date.now()) {
      let rand = Math.floor(Math.random() * 5) + 1;
      sleep(2000 * rand);
      claimFarm(id, res.name, "cropclaim");
      }
  });
  }, delayTime + setTime); 
}
//////////////////////////////////////////farm table//////////////////////////////////////////
////////////////////////////////////////livestock table///////////////////////////////////////
async function animalTable() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 80000;
  }
  setInterval(async() => {
  const listAni = await getTable("animals", 2, wax.userAccount);
  let animals = listAni.rows;
  document.getElementById('animals').innerHTML = "";

  animals.forEach(async (res) => {
    let id = res.asset_id;
    let timeClaim = res.next_availability;
    aniObj[id] = {"time": timeClaim};
    let startDay = new Date(res.last_claimed * multiTime).toLocaleString('en-US', { day: 'numeric' });
    let startMonth = new Date(res.last_claimed * multiTime).toLocaleString('en-US', { month: 'numeric' });
    let startTime = new Date(res.last_claimed * multiTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });


      document.getElementById('animals').innerHTML += `<div class="row container d-flex align-items-center justify-content-center"><label class="tagtool" style="width: 100px;">${res.name}</label>` +
      `<label class="tagtool" style="width: 100px; ">0 | Claimed </label>` +
      `<label id="startTime-${id}" class="tagtool" style="width: 250px;">Last Claim | วันที่ : ${startDay}/${startMonth} เวลา: ${startTime}</label>` +
      `</div><br>`; 

    let timeProcess = (timeClaim * multiTime);
    //let barley;
    //let memo;
    if(timeProcess < Date.now()) { //&& res.day_claims_at[0] * multiTime < Date.now() - oneday
      switch(res.name) {
        case "Chicken Egg":
          if(res.day_claims_at.length < 3) {
            claimAni(id, res.name, "anmclaim");   
          }  
          else if(res.day_claims_at.length == 3 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            claimAni(id, res.name, "anmclaim");   
          }  
          break;
        case "Chick":
          if(res.day_claims_at.length < 4) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo); 
          }
          else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo); 
          }
          break;
        case "Chicken":
          if(res.day_claims_at.length < 4) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo);  
          }
          else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo);  
          }
          break;
        case "Baby Calf":
          if(res.day_claims_at.length < 2) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await milkFetch();
            let milk = milkArr[0];  
            let memo = "feed_animal:"+id;    
            sendToken(res.name, milk, "Feed", memo);     
          }    
          else if(res.day_claims_at.length == 2 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await milkFetch();
            let milk = milkArr[0];  
            let memo = "feed_animal:"+id;    
            sendToken(res.name, milk, "Feed", memo);     
          }  
          break;  
        case "Calf":
          if(res.day_claims_at.length < 4) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo);     
          } 
          else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo);     
          }
          break;
        case "Dairy Cow":
          if(res.day_claims_at.length < 6) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo);   
          }
          else if(res.day_claims_at.length == 6 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            let rand = Math.floor(Math.random() * 5) + 1;
            await sleep(2000 * rand);
            await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo);   
          }
          break;
          case "Calf (FeMale)":
            if(res.day_claims_at.length < 4) {
              let rand = Math.floor(Math.random() * 5) + 1;
              await sleep(2000 * rand);
              await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo);   
            }
            else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
              let rand = Math.floor(Math.random() * 5) + 1;
              await sleep(2000 * rand);
              await buyBarleyMarket();
              let barley = barleyArr[0];
              let memo = "feed_animal:"+id;
              sendToken(res.name, barley, "Feed", memo);   
              }
          break;
          case "Calf (Male)":
            if(res.day_claims_at.length < 4) {
            await buyBarleyMarket();
            let barley = barleyArr[0];
            let memo = "feed_animal:"+id;
            sendToken(res.name, barley, "Feed", memo);    
            }
            else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
              let rand = Math.floor(Math.random() * 5) + 1;
              await sleep(2000 * rand);
              await buyBarleyMarket();
              let barley = barleyArr[0];
              let memo = "feed_animal:"+id;
              sendToken(res.name, barley, "Feed", memo);    
              }
          break;
      }
    }
  });
  }, delayTime + setTime); 
}
////////////////////////////////////////livestock table///////////////////////////////////////
/////////////////////////////////////////check repair/////////////////////////////////////////
async function chkRepair(id, name) {
  await sleep(5000);
    let result = await wax.api.transact({ 
      actions: [{
        account: 'farmersworld',
          name: "repair",
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            asset_owner: wax.userAccount,
            asset_id: id,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      if (result.processed.receipt.status === "executed") {
        document.getElementById('log').innerHTML += thisTime() + `: Repair (${name}) สำเร็จ !!! \n`;
        scrollTextarea();
      }
      else {
        document.getElementById('log').innerHTML += thisTime() + `: Repair (${name}) ไม่สำเร็จ ( ${result.processed.receipt.status}) !!! \n`;
        scrollTextarea();
      }




    
}
/////////////////////////////////////////check repair/////////////////////////////////////////
/////////////////////////////////////////check refil/////////////////////////////////////////
async function chkRefill() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 60000;
  }
  setInterval(async() => {
    await getTable("accounts", 1, wax.userAccount)
    .then(async (res) => {
      let obj = res.rows[0];
      let refillSetup = localStorage.getItem("refillFw");
      let refillPercen = (obj.max_energy * refillSetup) / 100;
      let amount = obj.max_energy - obj.energy;
      document.getElementById("energy").innerHTML = `${obj.energy}/${obj.max_energy}`;
      await sleep(5000);

          if(obj.energy < refillPercen) {
            let result = await wax.api.transact({ 
              actions: [{
                account: 'farmersworld',
                  name: "recover",
                  authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                  }],
                  data: {
                    owner: wax.userAccount,
                    energy_recovered: amount,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30
              });
              if (result.processed.receipt.status === "executed") {
                document.getElementById('log').innerHTML += thisTime() + `: เติมเนื้อ สำเร็จ !!! \n`;
                scrollTextarea(); 
              }
              else {
                document.getElementById('log').innerHTML += thisTime() + `: เติมเนื้อ ไม่สำเร็จ ( ${result.processed.receipt.status}) !!! \n`;
                scrollTextarea();
              }
          }   
    })
  }, delayTime + setTime); 
}
/////////////////////////////////////////check refil/////////////////////////////////////////
/////////////////////////////////////////minus btn/////////////////////////////////////////
async function minusBtn(val)  {
  let getValue = document.getElementById(val+"Range").value;
  document.getElementById(val+"Range").value  =  getValue -1;
  document.getElementById(val+"-label").innerHTML = getValue -1;
}
/////////////////////////////////////////minus btn/////////////////////////////////////////
/////////////////////////////////////////plus btn/////////////////////////////////////////
async function plusBtn(val)  {
  let getValue = document.getElementById(val+"Range").value;
  document.getElementById(val+"Range").value  =   parseInt(getValue)+1;
  document.getElementById(val+"-label").innerHTML = parseInt(getValue)+1;
}
/////////////////////////////////////////minus btn/////////////////////////////////////////
/////////////////////////////////////////claim tool//////////////////////////////////////////
async function claimTool(id, toolname, typeClaim) {
  //try {
    await sleep(5000);
    let result = await wax.api.transact({ 
      actions: [{
        account: 'farmersworld',
          name: typeClaim,
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            owner: wax.userAccount,
            asset_id: id,          
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 120
      });
      if (result.processed.receipt.status === "executed") {
        document.getElementById('log').innerHTML += thisTime() + `: Claim (${toolname}) สำเร็จ !!! \n`;
        scrollTextarea();
      }
      else {
        document.getElementById('log').innerHTML += thisTime() + `: Claim (${toolname}) ไม่สำเร็จ ( ${result.processed.receipt.status}) !!! \n`;
        scrollTextarea();
      }   
}
/////////////////////////////////////////claim tool//////////////////////////////////////////
/////////////////////////////////////////claim farm//////////////////////////////////////////
async function claimFarm(id, toolname, typeClaim) {
  try {
    let result = await wax.api.transact({ 
      actions: [{
        account: 'farmersworld',
          name: typeClaim,
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            owner: wax.userAccount,
            crop_id: id,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      document.getElementById('log').innerHTML += thisTime() + `: Claim (${toolname}) สำเร็จ !!! \n`;
      scrollTextarea();

    }
    catch(err) {
      //console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: Claim (${toolname}) ไม่สำเร็จ ( ${err.message}) !!! \n`;
      scrollTextarea();
    }
}
/////////////////////////////////////////claim farm//////////////////////////////////////////

//////////////////////////////////////claim livestock////////////////////////////////////////
async function claimAni(id, toolname, typeClaim) {
  try {
    let result = await wax.api.transact({ 
      actions: [{
        account: 'farmersworld',
          name: typeClaim,
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            owner: wax.userAccount,
            animal_id: id,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      document.getElementById('log').innerHTML += thisTime() + `: Claim (${toolname}) สำเร็จ !!! \n`;
      scrollTextarea();

    }
    catch(err) {
      //console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: Claim (${toolname}) ไม่สำเร็จ ( ${err.message}) !!! \n`;
      scrollTextarea();
    }
}
//////////////////////////////////////claim livestock////////////////////////////////////////

/////////////////////////////////////////countdown///////////////////////////////////////////
async function countDown() {
    toolArr.forEach(async (elem) => {
      let getTime = elem.next_availability;
      let getType = elem.type;
      timeTool(elem.asset_id, getTime, getType);
    })
    
    for(let elem in memObj) {
      let claimTime = memObj[elem].time;
      timeMem(elem, claimTime);   
    }
    
    for(let elem in buildObj) {
      let claimTime = buildObj[elem].time;
      if(claimTime != 0) {
        timeBuild(elem, claimTime);
      }  
    }

    for(let elem in plantObj) {
      let claimTime = plantObj[elem].time;
        timeFarm(elem, claimTime);
    }
}

function timeTool(id, timeStart, typ) { 
  let getMem = localStorage.getItem(typ);
  let obj = JSON.parse(getMem);
  let memMultipy = memStoreClaim[typ];
  let timeProcess = (timeStart * multiTime) + ((obj.quan * memMultipy) * onehrs);
  
  if(timeProcess > Date.now()) {
    document.getElementById('countDown-'+id).style.color = "#3AFF00";
  }
  else {
    document.getElementById('countDown-'+id).style.color = "red";
  }
  let sendTime = formatTime(timeProcess);
  document.getElementById('countDown-'+id).innerHTML = `${sendTime.hours} : ${sendTime.minutes} :  ${sendTime.seconds}`;
  
}

function timeMem(id, timeStart) {
  let timeProcess = (timeStart * multiTime);
  if(timeProcess > Date.now()) {
    document.getElementById('countDown-'+id).style.color = "#3AFF00";
  }
  else {
    document.getElementById('countDown-'+id).style.color = "red";
  }
  let sendTime = formatTime(timeProcess);
  document.getElementById('countDown-'+id).innerHTML = `${sendTime.hours} : ${sendTime.minutes} :  ${sendTime.seconds}`;
}

function timeBuild(id, timeStart) {
  let timeProcess = (timeStart * multiTime);
  if(timeProcess > Date.now()) {
    document.getElementById('countDown-'+id).style.color = "#3AFF00";
  }
  else {
    document.getElementById('countDown-'+id).style.color = "red";
  }
  let sendTime = formatTime(timeProcess);
  document.getElementById('countDown-'+id).innerHTML = `${sendTime.hours} : ${sendTime.minutes} :  ${sendTime.seconds}`;
}

function timeFarm(id, timeStart) {
  let timeProcess = (timeStart * multiTime);
  if(timeProcess > Date.now()) {
    document.getElementById('countDown-'+id).style.color = "#3AFF00";
  }
  else {
    document.getElementById('countDown-'+id).style.color = "red";
  }
  let sendTime = formatTime(timeProcess);
  document.getElementById('countDown-'+id).innerHTML = `${sendTime.hours} : ${sendTime.minutes} :  ${sendTime.seconds}`;
}
/////////////////////////////////////////countdown///////////////////////////////////////////
////////////////////////////////////////withdrawn/////////////////////////////////////////
async function withdrawnResource() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 300000;
  }
  setInterval(async() => {
  let fee;
  await getTable("config", 1, "").then((res) => {
    fee = res.rows[0].fee;
  })
  let getStore = localStorage.getItem("store");
  let getToggle = localStorage.getItem("withdrawn");
  let getFood = localStorage.getItem("withdrawnFood");
  let getWood = localStorage.getItem("withdrawnWood");
  let getGold = localStorage.getItem("withdrawnGold");


  if(fee == 5 && getToggle == "on" && foodIngame > getFood && woodIngame > getWood && goldIngame > getGold) {
    let resultWood = (woodIngame - 1) + ".0000 WOOD";
    let resultGold = ((goldIngame - 1) - getStore) + ".0000 GOLD";
    let resultFood = ((foodIngame - 1) - getStore) + ".0000 FOOD";

      let result = await wax.api.transact({ 
        actions: [{
          account: 'farmersworld',
            name: "withdraw",
            authorization: [{
              actor: wax.userAccount,
              permission: 'active',
            }],
            data: {
              owner: wax.userAccount,
              quantities: [
                resultGold,
                resultFood,
                resultWood
              ],
              fee: 5      
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        });
        if (result.processed.receipt.status === "executed") {
          document.getElementById('log').innerHTML += thisTime() + `: ถอน ${resultGold} \n`;
          document.getElementById('log').innerHTML += thisTime() + `: ถอน ${resultWood} \n`;
          document.getElementById('log').innerHTML += thisTime() + `: ถอน ${resultFood} \n`;
          document.getElementById('log').innerHTML += thisTime() + `: Withdraw สำเร็จ !!! \n`;
          scrollTextarea();
        }
        else {
          document.getElementById('log').innerHTML += thisTime() + `: Withdraw ไม่สำเร็จ ( ${result.processed.receipt.status}) !!! \n`;
          scrollTextarea();
          await sleep(60000);
          withdrawnResource()
        }

  }
  }, delayTime + setTime); 
}
////////////////////////////////////////withdrawn/////////////////////////////////////////
///////////////////////////////////////buy barley/////////////////////////////////////////
async function buyBarleyMarket() {
  try {
    await barleyFetch();
  }
  catch(err) {   
  }
  
  let getBarley = localStorage.getItem("barley");
  if(getBarley === "on" && barleyArr.length <= 7 ) {

      let result = await wax.api.transact({ 
        actions: [{
          account: 'farmersworld',
            name: "mktbuy",
            authorization: [{
              actor: wax.userAccount,
              permission: 'active',
            }],
            data: {
              owner: wax.userAccount,
              template_id: 318606,   
              quantity: 25       
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        });
        if (result.processed.receipt.status === "executed") {
          document.getElementById('log').innerHTML += thisTime() + `: ซื้อ Barley 25 ต้น สำเร็จ !!! \n`;
          scrollTextarea();
        }
        else {
          document.getElementById('log').innerHTML += thisTime() + `: ซื้อ Barley ไม่ สำเร็จ (${result.processed.receipt.status}) \n`;
          scrollTextarea();
        }
  }
}
///////////////////////////////////////buy barley/////////////////////////////////////////
////////////////////////////////////////auto sell////////////////////////////////////////
async function autoSell() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 600000;
  }
  setInterval(async() => {
  await milkFetch();
  await eggFetch();
  let getMilk = localStorage.getItem("milk");
  let getEgg = localStorage.getItem("egg");

  if(getMilk == "on" && milkArr.length >= 20) {
    try {
      let result = await wax.api.transact({ 
        actions: [{
          account: "atomicassets",
            name: "transfer",
            authorization: [{
              actor: wax.userAccount,
              permission: 'active',
            }],
            data: {
              from: wax.userAccount,
              to: "farmersworld",
              asset_ids: milkArr,  
              memo: "burn"
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        });
        document.getElementById('log').innerHTML += thisTime() + `: ขาย milk สำเร็จ !!! \n`;
        scrollTextarea();
      }
      catch(err) {
        document.getElementById('log').innerHTML += thisTime() + `: ขาย milk ไม่สำเร็จ ${err.message} !!! \n`;
        scrollTextarea();
      }
  }

  if(getEgg == "on" && eggArr.length >= 20) {
    try {
      let result = await wax.api.transact({ 
        actions: [{
          account: "atomicassets",
            name: "transfer",
            authorization: [{
              actor: wax.userAccount,
              permission: 'active',
            }],
            data: {
              from: wax.userAccount,
              to: "farmersworld",
              asset_ids: eggArr,  
              memo: "burn"
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        });
        document.getElementById('log').innerHTML += thisTime() + `: ขาย egg สำเร็จ !!! \n`;
        scrollTextarea();
      }
      catch(err) {
        document.getElementById('log').innerHTML += thisTime() + `: ขาย egg ไม่สำเร็จ ${err.message} !!! \n`;
        scrollTextarea();
      }
  }
  }, delayTime + setTime); 
}
////////////////////////////////////////auto sell////////////////////////////////////////
////////////////////////////////////////auto craft///////////////////////////////////////
async function autoCraft() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 1200000;
  }
  setInterval(async() => {
  let getfwCoin;
  let getGold;
  let getLoadCraft = localStorage.getItem("craft");

  await getTable("accounts", 1, wax.userAccount)
    .then((res) => {
     getGold = parseInt(res.rows[0].balances[0]);
  })

  await getTable("coinstake", 1, wax.userAccount).then((res) => {
    getfwCoin = res.rows[0].amount;
  })
  
  if(getfwCoin >= 120 && getGold >= 1000 && getLoadCraft === "on") {

        let result = await wax.api.transact({ 
          actions: [{
            account: 'farmersworld',
              name: "mintmbs",
              authorization: [{
                actor: wax.userAccount,
                permission: 'active',
              }],
              data: {
                user: wax.userAccount,
                mname: "Silver Member",          
              },
            }]
          }, {
            blocksBehind: 3,
            expireSeconds: 60
          });
          
          if (result.processed.receipt.status === "executed") {
            document.getElementById('log').innerHTML += thisTime() + `: Craft Silver Member สำเร็จ !!! \n`;
            scrollTextarea();
          }
          else {
            document.getElementById('log').innerHTML += thisTime() + `: Craft Silver Member ไม่สำเร็จ !!! ( ${result.processed.receipt.status}) \n`;
          }
  
  }
  }, delayTime + setTime); 
}
////////////////////////////////////////auto craft///////////////////////////////////////
//////////////////////////////////////stuck member////////////////////////////////////////
async function stuckMember() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 1200000;
  }
  setInterval(async() => {
  let getStuck;
  await getTable("tassets", 2, wax.userAccount).then((res) => {
    getStuck = res.rows.length;
  })
  if(getStuck > 0) {
    //await getTable("accounts", 1, wax.userAccount)
    await getTable("tassets", 2, wax.userAccount).then((res) => {
      if(res.rows.length != 0) {  
          res.rows.forEach(async (elem) => {

              let result = await wax.api.transact({ 
                actions: [{
                  account: 'farmersworld',
                    name: "claimasset",
                    authorization: [{
                      actor: wax.userAccount,
                      permission: 'active',
                    }],
                    data: {
                      asset_owner: wax.userAccount,
                      asset_id: elem.asset_id     
                    },
                  }]
                }, {
                  blocksBehind: 3,
                  expireSeconds: 60
                });

                if (result.processed.receipt.status === "executed") {
                  document.getElementById('log').innerHTML += thisTime() + `: ได้รับ Silver Member จากการ Craft แล้ว !!! \n`;
                  scrollTextarea(); 
                }
                else {
                  document.getElementById('log').innerHTML += thisTime() + `: ยังไม่ได้รับ Silver Member !!! ( ${result.processed.receipt.status}) \n`;
                  scrollTextarea(); 
                }
          })
      }     
    })   
  }
  atomicInven()
  }, delayTime + setTime); 
}
//////////////////////////////////////stuck member////////////////////////////////////////
//////////////////////////////////////////send token//////////////////////////////////////////
async function sendToken(name, id, ord, memo) {
  await sleep(5000);
    let result = await wax.api.transact({ 
      actions: [{
        account: "atomicassets",
          name: "transfer",
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            from: wax.userAccount,
            to: "farmersworld",
            asset_ids: [
              id
            ],  
            memo: memo
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      if (result.processed.receipt.status === "executed") {
        document.getElementById('log').innerHTML += thisTime() + `: ${ord} ${name} สำเร็จ !!! \n`;
        scrollTextarea();
      }
      else {
        document.getElementById('log').innerHTML += thisTime() + `: ${ord} ${name} ${err.message} !!! \n`;
        scrollTextarea();
      }
}
//////////////////////////////////////////send token//////////////////////////////////////////
////////////////////////////////////atomic inventory//////////////////////////////////////
async function atomicInven() {
  let getInven = await fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=farmersworld&schema_name=memberships&template_data:text.rarity=Uncommon&limit=10&owner="+wax.userAccount);
  let inven = getInven.json();
  document.getElementById("inventory").innerHTML = "";
  inven.data.forEach((elem, i) => { 
    document.getElementById("inventory").innerHTML += `<img class="center mx-2" src="https://atomichub-ipfs.com/ipfs/${elem.data.img}" style="width: 7%;">`;
  })
}
////////////////////////////////////atomic inventory//////////////////////////////////////
////////////////////////////////////send resource//////////////////////////////////////
async function sendResource() {
  let setTime = 0;
  if(chkFirstTime === false) {
    setTime = ((Math.floor(Math.random() * 10) + 1)*10000) + 300000;
  }
  setInterval(async() => {
    let autoSend = localStorage.getItem("autosend");
    let wallet = localStorage.getItem("sendId");

   for(let i = 0; i <= 2; i++) {
    if(tokenJson[coinsSymbol[i]] > 0 && autoSend === "on") {
      let upper = coinsSymbol[i].toUpperCase();
      let amount = `${tokenJson[coinsSymbol[i]]}.0000 ${upper}`;
      await sleep(5000);
      await sendResourcetoId(amount, wallet)
    }
   }

  }, delayTime + setTime); 
}

async function sendResourcetoId(amount, wallet) {
  try {
    let result = await wax.api.transact({ 
      actions: [{
        account: 'farmerstoken',
          name: "transfer",
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            from: wax.userAccount,
            to: wallet,
            quantity: amount,
            memo: ""    
          },
        }]
      }, {
        blocksBehind: 30,
        expireSeconds: 60
      });
      document.getElementById('log').innerHTML += thisTime() + `:  โอน ${amount} ไปที่ ${wallet} สำเร็จ !!! \n`;
      scrollTextarea(); 
    }
    catch(err) {
      document.getElementById('log').innerHTML += thisTime() + `:  ${err.message} !!! \n`;
      scrollTextarea();
    }      
}

////////////////////////////////////send resource//////////////////////////////////////