///////////////////////////////////////variable///////////////////////////////////////
const resource = ["wood", "gold", "food"];
const resourceColor = ["#B24700", "yellow" , "blue"];
const memType = ["Food", "Wood", "Gold"];
const memColor = {"Food": "blue", "Wood": "#B24700", "Gold": "yellow"};
const memStoreClaim = {"Food": 2, "Wood": 2, "Gold": 4};
const coinsSymbol = ["fwf", "fww", "fwg"];
const coinsColor = {"fwf": "blue", "fww": "#B24700", "fwg": "yellow"};
const endpointJson = {"u1": "https://chain.wax.io", "u2": "https://wax.eu.eosamsterdam.net", "u3": "https://wax.blokcrafters.io", "u4": "https://api.wax.alohaeos.com", "u5": "https://api.waxsweden.org", "u6": "https://wax.pink.gg", "u7": "https://wax.dapplica.io","u8": "https://wax.eosphere.io", "u9": "https://api.wax.greeneosio.com", "u10": "https://wax.cryptolions.io", "u11": "https://wax.eosusa.news", "u12": "https://api.wax.bountyblok.io"};
let selectEndpoint;
const logTextarea = document.getElementById('log');
let getTheme = localStorage.getItem("theme");
let start = false;
let version = "v.4.1.1";
const multiTime = 1000;
const onehrs = 3600000;
const oneday = 86400000;
let toolArr = [];
let toolObj = {};
let toolnameObj = {};
let memnameObj = {};
let memObj = {};
let buildObj = {};
let plantObj = {};
let aniObj = {};
let milkArr = [];
let barleyArr = [];
let text1 = "อ.ไม้ร่ม ได้ออกมาต้อนรับคุณ";
let text2 = "ละละละละ เละๆๆๆ";
let text3 = "ลุงเริง บ่นว่าเงี่ยน";
let wax;
let typeArray = [];
let woodIngame;
let foodIngame;
let goldIngame;


///////////////////////////////////////variable////////////////////////////////////////
////////////////////////////////////////version////////////////////////////////////////
document.getElementById("version").innerHTML = `Romsai Bot ${version}`;

function chkVer() {
  const config = {
    url: "/chkver",
    method: "POST",
  }
  axios(config)
  .then((res) => {
    if(res.data == version) {
      document.getElementById("log").innerHTML += thisTime() +": Bot เป็น Version ล่าสุดแล้ว\n";
    }
    else {
      document.getElementById("log").innerHTML += thisTime() +": มี Bot version " + res.data + " ใหม่กว่า version ที่คุณใช้\n";
      document.getElementById("log").innerHTML += thisTime() +": Link download https://github.com/godmoan/waxbot\n";
      $('#modal-version').modal('show'); 
    }
  })
  .catch((err) => {
    console.log(err);
  })
}  
////////////////////////////////////////version////////////////////////////////////////
////////////////////////////////////////what new///////////////////////////////////////
async function whatNew() {
  $('#modal-update').modal('show'); 
}
////////////////////////////////////////what new///////////////////////////////////////
/////////////////////////////////////////theme////////////////////////////////////////
if(getTheme != null) {
    document.getElementsByTagName("body")[0].setAttribute("data-sa-theme", getTheme);
  }
  else {
    document.getElementsByTagName("body")[0].setAttribute("data-sa-theme", 4);
  }
///////////////////////////////////////////theme/////////////////////////////////////////
/////////////////////////////////////scroll textarea////////////////////////////////////
function scrollTextarea() {
    document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight
  }
//////////////////////////////////////scroll textarea////////////////////////////////////
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
/////////////////////////////////////////start page//////////////////////////////////////
window.onload = async () => {
  const startOnload = new Promise((res) => {
    res();
  })
  .then(() => {
    showSetup();
    
  })
  .then(() => {
    loadSave();
    alcorPrice();
  })
}

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
///////////////////////////////////////start page//////////////////////////////////////
//////////////////////////////////////endpoint/////////////////////////////////////////
modalLoad();
function modalLoad() {
  $('#modal-no-backdrop').modal('show'); 
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
}
let callbackBtn = document.querySelector("#saveModal");
let skipSetupBtn = document.querySelector("#skipSetup");
callbackBtn.addEventListener("click",async function() {
  selectEndpoint = document.getElementById("url").value;
  await waxStart();
  await waxlogin();          
})  

skipSetupBtn.addEventListener("click",async function() {
  selectEndpoint = document.getElementById("url").value;
  await waxStart();
  await waxlogin();   
  await startBtn();       
})  
////////////////////////////////////endpoint///////////////////////////////////////////
async function waxStart() {
 wax = new waxjs.WaxJS({
  rpcEndpoint: selectEndpoint
});
}
//////////////////////////////////////wax login////////////////////////////////////////
async function waxlogin() {
  try {
    wax.rpcEndpoint = selectEndpoint;
    const userAccount = await wax.login();  
    //document.title = userAccount;
    waxWallet = userAccount;   
    document.getElementById('waxId').innerHTML = waxWallet;
    resourcePlayer();
    resourceinGame();
    logTextarea.innerHTML += thisTime() + `: ${userAccount} Login success \n`; 
    chkVer();
    let chkRom = localStorage.getItem("play");
    if(chkRom != "true") {
      rom();
    }
  }
  catch(err) {      
    console.log(err.message);
  }     
}
//////////////////////////////////////wax login////////////////////////////////////////
////////////////////////////////////resource Player////////////////////////////////////
async function resourcePlayer() {
  document.getElementById("acc").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #3498DB;">${waxWallet}</button`;
  document.getElementById("endpoint").innerHTML = `<button class="btn btn-dark" style="width: 250px; color: #F300FF ;">${selectEndpoint}</button`;
  await getTable("config", 1, "").then((res) => {
    document.getElementById("fee").innerHTML = `<button class="btn btn-dark" style="width: 150px;">Fee : ${res.rows[0].fee} %</button`;
  })

  fetch(wax.rpcEndpoint + "/v1/chain/get_account", {
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
      document.getElementById("cpuShow").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #3498DB;">${cpuuse} %</button`;
      document.getElementById("waxcoinShow").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #3498DB;">${parseFloat(json.core_liquid_balance).toFixed(2)} Wax</button`;
  })

  coinsSymbol.forEach((res) => {
    fetchCoin(res);
  })
}

async function fetchCoin(coin) {
  try {
    fetch(wax.rpcEndpoint +"/v1/chain/get_currency_balance", {
      method: 'POST',
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "code": "farmerstoken",
        "account": "21dre.wam",
        "symbol": coin
      }),
      redirect: 'follow'
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      document.getElementById(coin+"coin").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: ${coinsColor[coin]};">${res}</button`;
    })
  }
  catch(err) {
    console.log(err);
  }
}
////////////////////////////////////resource Player////////////////////////////////////
///////////////////////////////////resource in game///////////////////////////////////
async function resourceinGame() {
  const source = await getTable("accounts", 1, wax.userAccount);
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
        document.getElementById("woodtoken").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #B24700;">${woodIngame}</button>`;
        break;
      case "FOOD":
        foodIngame = parseInt(source.rows[0].balances[i]);
        document.getElementById("foodtoken").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: blue;">${foodIngame}</button>`;
        break;
      case "GOLD":
        goldIngame = parseInt(source.rows[0].balances[i]);
        document.getElementById("goldtoken").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: yellow;">${goldIngame}</button>`;
        break;
    }
  });

  await getTable("coinstake", 1, wax.userAccount).then((res) => {
    document.getElementById('coinstake').innerHTML = `<button class="btn btn-dark" style="width: 150px; color:#FF00C9;">${res.rows[0].amount} coins</button>`;   
  }) 
}
///////////////////////////////////resource in game///////////////////////////////////
///////////////////////////////////////Setup innerhtml/////////////////////////////////////
async function showSetup() {
      memType.forEach((obj) => {
        document.getElementById('listSetup').innerHTML += `<div style="display: flex;">` +
        `<label class="btn btn-dark" style="width: 150px; color: ${memColor[obj]};">Member ${obj}</label>&emsp;` +
        `<select class="btn btn-dark dropdown-toggle" id="select-${obj}" style="width: 70px;" disabled >` +
        `<option style="background: black; text-align: left;" value="0">-</option>` +
        `<option style="background: black; text-align: left;" value="1">1</option>` +
        `<option style="background: black; text-align: left;" value="2">2</option></select>&emsp;&emsp;` +
        `<div class="toggle-switch toggle-switch--green"><input type="checkbox" value="off" class="toggle-switch__checkbox" id="onToggle-${obj}" onclick="onoffToggle('${obj}')"><i class="toggle-switch__helper"></i></div>&emsp;&emsp;` +    
        `<div id="onoff-${obj}"><label class="btn btn-dark" style="width: 50px; color: red;">OFF</label></div>` +
        `</div><br>`;
      })
      document.getElementById('market').innerHTML = `<div>Market (ถ้าของมีต่ำกว่า 5 ชิ้นจะซื้อ)</div><br>` +
      `<p style="color: red;">* ต้องไม่ติดล็อค 2fa market *</p>` +
      `<div style="display: flex;">` +
      `<label class="btn btn-dark" style="width: 150px; color: green;">Barley</label>&emsp;` +
      `<select class="btn btn-dark dropdown-toggle" id="select-barley" style="width: 70px;" disabled >` +
      `<option style="background: black; text-align: left;" value="0">0</option>` +
      `<option style="background: black; text-align: left;" value="5">5</option></select>&emsp;&emsp;` +
      `<div class="toggle-switch toggle-switch--green"><input type="checkbox" value="off" class="toggle-switch__checkbox" id="onToggle-barley" onclick="onoffToggle('barley')"><i class="toggle-switch__helper"></i></div>&emsp;&emsp;` +
      `<div id="onoff-barley"><label class="btn btn-dark" style="width: 50px; color: red;">OFF</label></div>` +
      `</div><br>`;

      document.getElementById('atomicSetup').innerHTML += `<div>AtomicHub</div><br>` +
      `<div style="display: flex;">` +
      `<label class="btn btn-dark" style="width: 150px; color: green;">Show</label>&emsp;` +
      `<select class="btn btn-dark dropdown-toggle" id="select-atomic" style="width: 70px;" disabled >` +
      `<option style="background: black; text-align: left;" value="80">80</option></select>&emsp;&emsp;` +
      `<div class="toggle-switch toggle-switch--green"><input type="checkbox" checked value="on" class="toggle-switch__checkbox" id="onToggle-atomic" onclick="onoffToggle('atomic')"><i class="toggle-switch__helper"></i></div>&emsp;&emsp;` +
      `<div id="onoff-atomic"><label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label></div>` +
      `</div><br>`;

      document.getElementById('withdrawn').innerHTML += `<div>Withdrawn (ถอน Auto เมื่อ fee5%)</div><br>` +
      `<p>เนื้อและทอง จะไม่ถูกถอนจนหมด จะเหลือติดไว้อย่างละ 1000</p>` +
      `<p>ทรัพยากรจะถูกถอน เมื่อทรัพยากรทั้ง 3 ตรงเงื่อนไข</p>` +
      `<p style="color: red;">* ต้องไม่ติดล็อค 2fa withdrawn *</p>` +
      `<div style="display: flex;">` +
      `<div class="toggle-switch toggle-switch--green"><input type="checkbox" value="off" class="toggle-switch__checkbox" id="onToggle-withdrawn" onclick="onoffWithdrawn()"><i class="toggle-switch__helper"></i></div>&emsp;&emsp;` +
      `<div id="onoff-withdrawn"><label class="btn btn-dark" style="width: 50px; color: red;">OFF</label></div>` +
      `</div><br>`;

      memType.forEach((obj) => {
        document.getElementById('withdrawn').innerHTML += `<div style="display: flex;">` +
        `<label class="btn btn-dark" style="width: 150px; color: ${memColor[obj]};">${obj}</label>&emsp;` +
        `<select class="btn btn-dark dropdown-toggle" id="withdrawn-${obj}">` +
        `<option style="background: black; text-align: left;" value="2000">ถอนเมื่อเกิน 2k</option>` +
        `<option style="background: black; text-align: left;" value="3000">ถอนเมื่อเกิน 3k</option>` +
        `<option style="background: black; text-align: left;" value="5000">ถอนเมื่อเกิน 5k</option>` +
        `<option style="background: black; text-align: left;" value="10000">ถอนเมื่อเกิน 10k</option>` +
        `<option style="background: black; text-align: left;" value="15000">ถอนเมื่อเกิน 15k</option>` +
        `<option style="background: black; text-align: left;" value="20000">ถอนเมื่อเกิน 20k</option></select>&emsp;&emsp;` +
        `</div><br>`;
      })
}
///////////////////////////////////////Setup innerhtml///////////////////////////////////////
//////////////////////////////////////Setup onoff toggle//////////////////////////////////////
async function onoffToggle(typ) {
    let toggle = await document.getElementById('onToggle-'+typ).checked;  
    let toggleValue = document.getElementById('onToggle-'+typ);
    let selectValue = document.getElementById('select-'+typ);
    if(toggle != true) {
      document.getElementById('onoff-'+typ).innerHTML= `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
      selectValue.setAttribute("disabled", "");  
      selectValue.value = 0; 
      toggleValue.value = "off";
      }
    else {
      document.getElementById('onoff-'+typ).innerHTML = `<label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label>`;
      selectValue.removeAttribute("disabled"); 
      toggleValue.value = "on";
      }
  }
  //////////////////////////////////////Setup onoff toggle//////////////////////////////////////
  ///////////////////////////////////////onoff withdrawn////////////////////////////////////////
  async function onoffWithdrawn() {
    let toggle = await document.getElementById('onToggle-withdrawn').checked;  
    let toggleValue = await document.getElementById('onToggle-withdrawn');  

    if(toggle != true) {
      document.getElementById('onoff-withdrawn').innerHTML= `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
      toggleValue.value = "off";
      }
    else {
      document.getElementById('onoff-withdrawn').innerHTML = `<label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label>`;
      toggleValue.value = "on";
      }
  }
  ///////////////////////////////////////onoff withdrawn////////////////////////////////////////
  //////////////////////////////////////////Setup save//////////////////////////////////////////
  async function saveSetup() {
    try {
     let canSave = true;
      await Promise.all(memType.map(async (typ) => {
          let selectMem = document.getElementById("select-"+typ).value;
          let onoff = await document.getElementById("onToggle-"+typ).value;
          if(onoff == "on") {
              if(selectMem == "-" ) {
                  canSave = false;
                  logTextarea.innerHTML += thisTime() + `: กรุณาใส่จำนวน Member ${typ} \n`;
                  scrollTextarea();  
              }  
              else {
                let saveStorage = {quan : selectMem, onoff: onoff};
                localStorage.setItem(typ , JSON.stringify(saveStorage));  
              }      
          }
          else {
            let saveStorage = {quan : selectMem, onoff: onoff};
            localStorage.setItem(typ , JSON.stringify(saveStorage));  
          }
      })); 

      await Promise.all(memType.map(async (typ) => {
        let selectType = document.getElementById("withdrawn-"+typ).value;
        localStorage.setItem("withdrawn"+typ, selectType);
      }));

      let play = await document.getElementById("credit").checked; 
      localStorage.setItem("play" , play);

      let buyBarley = await document.getElementById("onToggle-barley").value;
      let selectBarley = document.getElementById("select-barley").value;
      let saveBarley = {quan : selectBarley, onoff: buyBarley};
      localStorage.setItem("barley" , JSON.stringify(saveBarley));

      let withdrawn = await document.getElementById("onToggle-withdrawn").value;
      localStorage.setItem("withdrawn", withdrawn);

      let atomic = await document.getElementById("onToggle-atomic").value;
      localStorage.setItem("atomic", atomic);

      let repair = await document.getElementById("repairRange").value;
      let refill = await document.getElementById("refillRange").value;    
      
      localStorage.setItem("repairFw" , repair);
      localStorage.setItem("refillFw" , refill);
      if(canSave == true) {
        logTextarea.innerHTML += thisTime() + `: Save suscess. \n`;
        scrollTextarea();  
      }  
    }
    catch(err) {
      console.log(err);
      logTextarea.innerHTML += thisTime() + `: Save Fail. !!! (${err}) \n`;
        scrollTextarea(); 
    }
    let themeStorage = document.querySelector('input[name="theme"]:checked').value;
    localStorage.setItem("theme", themeStorage);
  }
  //////////////////////////////////////////Setup save//////////////////////////////////////////
  /////////////////////////////////////////Load setup//////////////////////////////////////////
  async function loadSave() {
    document.getElementById("repairRange").value = localStorage.getItem("repairFw");  
    document.getElementById("refillRange").value = localStorage.getItem("refillFw");  
    document.getElementById("repairValue").innerText = "";
    document.getElementById("refillValue").innerText = "";   
    let play = localStorage.getItem("play"); 
    switch(play) {
      case("true"):
      document.getElementById("credit").checked = true;
      break;
      case("false"):
      document.getElementById("credit").checked = false;
      break;
    }

    let loadWithdrawn = localStorage.getItem("withdrawn");
    if(loadWithdrawn == undefined) {
      localStorage.setItem("withdrawn" , "off");
    }
    switch(loadWithdrawn) {
      case"on":
      document.getElementById("onToggle-withdrawn").checked = true;   
      document.getElementById("onToggle-withdrawn").value = loadWithdrawn;
      document.getElementById('onoff-withdrawn').innerHTML = `<label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label>`;
      break;
      case "off":
        document.getElementById("onToggle-withdrawn").checked = false;   
        document.getElementById("onToggle-withdrawn").value = loadWithdrawn;
        document.getElementById('onoff-withdrawn').innerHTML = `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
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
      console.log(err);
    }

 
    let loadBarley = localStorage.getItem("barley");
    let objBarley = JSON.parse(loadBarley);
    if(loadBarley == undefined) {
      let saveStorage = {quan : 0, onoff: "off"};
      localStorage.setItem("barley" , JSON.stringify(saveStorage));
    }
    switch(objBarley.onoff) {
      case "on":
        document.getElementById("onToggle-barley").checked = true;   
        document.getElementById("onToggle-barley").value = objBarley.onoff;
        document.getElementById('onoff-barley').innerHTML = `<label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label>`;
        document.getElementById("select-barley").value = objBarley.quan;
        document.getElementById("select-barley").removeAttribute("disabled"); 
        break;
      case "off":
        document.getElementById("onToggle-barley").checked = false;   
        document.getElementById("onToggle-barley").value = objBarley.onoff;
        document.getElementById('onoff-barley').innerHTML = `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
        break;
    } 

    let loadAtomic = localStorage.getItem("atomic");
    if(loadAtomic == undefined) {
      localStorage.setItem("atomic", "on");
    }
    switch(loadAtomic) {
      case "on":
        document.getElementById("onToggle-atomic").checked = true;   
        document.getElementById("onToggle-atomic").value = atomic;
        document.getElementById('onoff-atomic').innerHTML = `<label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label>`;
        break;
      case "off":
        document.getElementById("onToggle-atomic").checked = false;   
        document.getElementById("onToggle-atomic").value = atomic;
        document.getElementById('onoff-atomic').innerHTML = `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
        break;
    } 

    try {
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
            document.getElementById('onoff-'+mem).innerHTML = `<label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label>`;
            document.getElementById("select-"+mem).value = obj.quan;
            document.getElementById("select-"+mem).removeAttribute("disabled"); 
          }
          else if(obj.onoff == "off") {
            document.getElementById("onToggle-"+mem).checked = false;   
            document.getElementById("onToggle-"+mem).value = obj.onoff;
            document.getElementById('onoff-'+mem).innerHTML = `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
          }
          else {  
            document.getElementById("onToggle-"+mem).checked = false;   
            document.getElementById("onToggle-"+mem).value = "off";
            document.getElementById('onoff-'+mem).innerHTML = `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
          }
      })
    }
    catch(err) {
      console.log(err);
    }
  }
/////////////////////////////////////////Load setup//////////////////////////////////////////
//////////////////////////////////////start button///////////////////////////////////////////
async function startBtn() {
  if(start == false) {
    try {
      start = true;
      document.title = wax.userAccount;
      document.getElementById("startBtn").innerHTML = `<button class="btn btn-danger btn--icon-text" style="width: 100%;" onclick="startBtn()">Stop Bot</button>`;
      document.getElementById('log').innerHTML += thisTime() + `: Bot กำลังทำงาน \n`;
      scrollTextarea();
   await mainBot();
   buildingTable();
   await farmTable();
   await animalTable();
   await loopChk();
    }
    catch(err) {
      console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: ERROR(${err.message}) \n`;
      scrollTextarea();
    }   
  }
  else {
    start = false;
    stopLoop();
    document.title = `Waiting Start`;
    document.getElementById("startBtn").innerHTML = `<button class="btn btn-success btn--icon-text" style="width: 100%;" onclick="startBtn()">Start Bot</button>`;
    document.getElementById('log').innerHTML += thisTime() + `: Bot ได้หยุดทำงานแล้ว !!! \n`;
    scrollTextarea();
  } 
}
//////////////////////////////////////start button///////////////////////////////////////////
////////////////////////////////////////loop check///////////////////////////////////////////
async function loopChk() {
  setInterval(() => {
    countDown();
  }, 1000);

  setInterval(() => {
    mainBot();
    resourcePlayer();
    resourceinGame();
    farmTable();
    animalTable();
    milkFetch();
    barleyFetch();
    eggFetch();
  }, 20000);

  setInterval(() => {
    chkRefill();
  }, 25000);

  setInterval(() => {
    withdrawnResource();
  }, 300000);

  setInterval(() => {
    buildingTable();
    alcorPrice();
    buyBarleyMarket();
    showStuck();
    console.clear();
  }, 60000);
  if(localStorage.getItem("atomic") == "on") {
    atomicInven();
    setInterval(() => {
      atomicInven();
    }, 60000);
  }
}
////////////////////////////////////////loop check///////////////////////////////////////////
////////////////////////////////////////fetch milk///////////////////////////////////////////
async function milkFetch() {
  let getMilk = await fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=farmersworld&template_id=298593&owner="+wax.userAccount);
  let milk = await getMilk.json();
  document.getElementById("invenMilk").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #DCDCDC;">${milk.data.length} </button`;
  milkArr = [];
  milk.data.forEach(res => {
    milkArr.push(res.asset_id);
  });
}
////////////////////////////////////////fetch milk//////////////////////////////////////////
//////////////////////////////////////fetch egg/////////////////////////////////////////
async function eggFetch() {
  let getEgg = await fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=farmersworld&template_id=298612&owner="+wax.userAccount);
  let egg = await getEgg.json();
  document.getElementById("invenEgg").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #FAEBD7;">${egg.data.length} </button`;
}
//////////////////////////////////////fetch egg/////////////////////////////////////////
//////////////////////////////////////fetch barley/////////////////////////////////////////
async function barleyFetch() {
  let getBarley = await fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=farmersworld&template_id=318606&owner="+wax.userAccount);
  let barley = await getBarley.json();
  document.getElementById("invenBarley").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #006400;">${barley.data.length} </button`;
  barleyArr= [];
  barley.data.forEach(res => {
    barleyArr.push(res.asset_id);
  });
}
//////////////////////////////////////fetch barley/////////////////////////////////////////
///////////////////////////////////////main bot/////////////////////////////////////////////
async function mainBot() {
  if(start == true) {
    await toolTable();
    await memTable();
  }
}
///////////////////////////////////////main bot/////////////////////////////////////////////
///////////////////////////////////////get table rows/////////////////////////////////////////
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
    console.log(err);
  }
}
///////////////////////////////////////get table rows/////////////////////////////////////////
/////////////////////////////////////////tool table///////////////////////////////////////////
async function toolTable() {
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
    await sleep(3000);
    document.getElementById('tool').innerHTML = "";
  
      for (let elem of tools) {
        let startDay = new Date((elem.next_availability * multiTime) - onehrs).toLocaleString('en-US', { day: 'numeric' })
        let startMonth = new Date((elem.next_availability * multiTime) - onehrs).toLocaleString('en-US', { month: 'numeric' })
        let startTime = new Date((elem.next_availability * multiTime) - onehrs).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        document.getElementById('tool').innerHTML += `<label class="btn btn-dark" style="width: 150px; color: ${memColor[elem.type]};">${toolnameObj[elem.asset_id]}</label>&emsp;` +
        `<label class="btn btn-dark" style="width: 100px; color: #00DCFF;">${elem.current_durability}/${elem.durability}</label>&emsp;` +
        `<label id="startTime-${elem.asset_id}" class="btn btn-dark" style="width: 250px;">Last Claim | Day : ${startDay}/${startMonth} Time: ${startTime} </label>&emsp;` +
        `<label id="countDown-${elem.asset_id}" class="btn btn-dark" style="width: 100px;"></label>` +
        `<br>`;

        let repairSetup = localStorage.getItem("repairFw");
        let repairPercen = (elem.durability * repairSetup) / 100;

        if(elem.current_durability < repairPercen) {
          chkRepair(elem.asset_id, toolnameObj[elem.asset_id]);
        }
        }   
    try {    
      for (let elem of tools) {
        let getMem = localStorage.getItem(elem.type);
        let obj = JSON.parse(getMem);
        let memMultipy = memStoreClaim[elem.type];
        let timeStart = elem.next_availability;
        let timeProcess = (timeStart * multiTime) + ((obj.quan * memMultipy) * onehrs);
        if(timeProcess < Date.now()) {      
          let rand = Math.floor(Math.random() * 5) + 1;
          await sleep(1500 * rand);
          claimTool(elem.asset_id, toolnameObj[elem.asset_id], "claim");
        }
      }
    }
    catch(err) {
      console.log(err);
    }
}
/////////////////////////////////////////tool table///////////////////////////////////////////
/////////////////////////////////////////mem table///////////////////////////////////////////
async function memTable() {
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
    await sleep(3000);
    document.getElementById('mem').innerHTML = "";
    try {
      for(let elem of mems) {
            let id = elem.asset_id;
            let timeClaim = elem.next_availability;

            let startDay = new Date((elem.next_availability * multiTime) - oneday).toLocaleString('en-US', { day: 'numeric' })
            let startMonth = new Date((elem.next_availability * multiTime) - oneday).toLocaleString('en-US', { month: 'numeric' })
            let startTime = new Date((elem.next_availability * multiTime) - oneday).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            memObj[id] = {"time": timeClaim};
           
            document.getElementById('mem').innerHTML += `<label class="btn btn-dark" style="width: 150px; color: ${memColor[elem.type]};">${memnameObj[id]}</label>&emsp;` +
            `<label class="btn btn-dark" style="width: 100px; color: ${memColor[elem.type]};">${elem.type}</label>&emsp;` +
            `<label id="startTime-${elem.asset_id}" class="btn btn-dark" style="width: 250px;">Last Claim | วันที่ : ${startDay}/${startMonth} เวลา: ${startTime} </label>&emsp;` +
            `<label id="countDown-${elem.asset_id}" class="btn btn-dark" style="width: 100px;"></label>` +
            `<br>`;
            let timeStart = elem.next_availability;
            let timeProcess = (timeStart * multiTime);
            if(timeProcess < Date.now()) {
              claimTool(id, memnameObj[id], "mbsclaim");
            }
        } 
    }
    catch(err) {
      console.log(err);
    }
}
/////////////////////////////////////////mem table///////////////////////////////////////////
////////////////////////////////////////building table////////////////////////////////////////
async function buildingTable() {
  let listBuild = await getTable("buildings", 2, wax.userAccount);
  let building = listBuild.rows;
  document.getElementById('building').innerHTML = "";

  building.forEach(res => {
    let id = res.asset_id;
    let timeClaim = res.next_availability;
    buildObj[id] = {"time": timeClaim};
    let startDay = new Date((res.next_availability * multiTime) - onehrs).toLocaleString('en-US', { day: 'numeric' });
    let startMonth = new Date((res.next_availability * multiTime) - onehrs).toLocaleString('en-US', { month: 'numeric' });
    let startTime = new Date((res.next_availability * multiTime) - onehrs).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    if(timeClaim == 0) {
      document.getElementById('building').innerHTML += `<label class="btn btn-dark" style="width: 150px; color: white">${id}</label>&emsp;` +
      `<label class="btn btn-dark" style="width: 100px; color: #00DCFF;">${res.name}</label>&emsp;` +   
      `<label id="startTime-${id}" class="btn btn-dark" style="width: 250px;">Build Done</label>&emsp;` +
      `<label class="btn btn-dark" style="width: 100px;">-</label>` +
      `<br>`;
    }
    else {
      document.getElementById('building').innerHTML += `<label class="btn btn-dark" style="width: 150px; color: white">${id}</label>&emsp;` +
    `<label class="btn btn-dark" style="width: 100px; color: #00DCFF;">${res.name}</label>&emsp;` +   
    `<label id="startTime-${id}" class="btn btn-dark" style="width: 250px;">Last Build | วันที่ : ${startDay}/${startMonth} เวลา: ${startTime} </label>&emsp;` +
    `<label id="countDown-${id}" class="btn btn-dark" style="width: 100px;"></label>` +
    `<br>`;
    let timeStart = timeClaim;
            let timeProcess = (timeStart * multiTime);
            if(timeProcess < Date.now()) {
              claimTool(id, res.name, "bldclaim");
            }
    }    
  });
}
////////////////////////////////////////building table////////////////////////////////////////
//////////////////////////////////////////farm table//////////////////////////////////////////
async function farmTable() {
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
    
    if(res.times_claimed == 0) {
      document.getElementById('plant').innerHTML += `<label class="btn btn-dark" style="width: 150px; color: green">${res.name}</label>&emsp;` +
      `<label class="btn btn-dark" style="width: 100px; color: white;">0 | Claimed </label>&emsp;` +   
      `<label id="startTime-${id}" class="btn btn-dark" style="width: 250px;">Last Claim | -</label>&emsp;` +
      `<label id="countDown-${id}" class="btn btn-dark" style="width: 100px;"></label>` +
      `<br>`;
    }
    else {
      document.getElementById('plant').innerHTML += `<label class="btn btn-dark" style="width: 150px; color: green">${res.name}</label>&emsp;` +
      `<label class="btn btn-dark" style="width: 100px; color: white;">${res.times_claimed} | Claimed</label>&emsp;` +   
      `<label id="startTime-${id}" class="btn btn-dark" style="width: 250px;">Last Claim | วันที่ : ${startDay}/${startMonth} เวลา: ${startTime} </label>&emsp;` +
      `<label id="countDown-${id}" class="btn btn-dark" style="width: 100px;"></label>` +
      `<br>`;
    }

    let timeProcess = (timeClaim * multiTime);
    if(timeProcess < Date.now()) {
      claimFarm(id, res.name, "cropclaim");
      }
  });
}
//////////////////////////////////////////farm table//////////////////////////////////////////
////////////////////////////////////////livestock table///////////////////////////////////////
async function animalTable() {
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

    if(res.times_claimed == 0) {
      document.getElementById('animals').innerHTML += `<label class="btn btn-dark" style="width: 150px; color: yellow">${res.name}</label>&emsp;` +
      `<label class="btn btn-dark" style="width: 100px; color: white;">0 | Claimed </label>&emsp;` +   
      `<label id="startTime-${id}" class="btn btn-dark" style="width: 250px;">Last Claim | -</label>&emsp;` +
      `<label id="dayclaim" class="btn btn-dark" style="width: 100px;">-</label>` +
      `<br>`;
    }
    else {
      document.getElementById('animals').innerHTML += `<label class="btn btn-dark" style="width: 150px; color: yellow">${res.name}</label>&emsp;` +
      `<label class="btn btn-dark" style="width: 100px; color: white;">${res.times_claimed} | Claimed</label>&emsp;` +   
      `<label id="startTime-${id}" class="btn btn-dark" style="width: 250px;">Last Claim | วันที่ : ${startDay}/${startMonth} เวลา: ${startTime} </label>&emsp;` +
      `<label id="dayclaim" class="btn btn-dark" style="width: 100px;">-</label>` +
      `<br>`;
    }
    await sleep(3000);
    let timeProcess = (timeClaim * multiTime);
    let barley;
    let memo;
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
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo); 
          }
          else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo); 
          }
          break;
        case "Chicken":
          if(res.day_claims_at.length < 4) {
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo);  
          }
          else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo);  
          }
          break;
        case "Baby Calf":
          if(res.day_claims_at.length < 2) {
            await milkFetch();
            let milk = milkArr[0];  
            memo = "feed_animal:"+id;    
            await sendToken(res.name, milk, "Feed", memo);     
          }    
          else if(res.day_claims_at.length == 2 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            await milkFetch();
            let milk = milkArr[0];  
            memo = "feed_animal:"+id;    
            await sendToken(res.name, milk, "Feed", memo);     
          }  
          break;  
        case "Calf":
          if(res.day_claims_at.length < 4) {
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo);     
          } 
          else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo);     
          }
          break;
        case "Dairy Cow":
          if(res.day_claims_at.length < 6) {
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo);   
          }
          else if(res.day_claims_at.length == 6 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo);   
          }
          break;
          case "Calf (FeMale)":
            if(res.day_claims_at.length < 4) {
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo);   
            }
            else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
              await barleyFetch();
              barley = barleyArr[0];
              memo = "feed_animal:"+id;
              await sendToken(res.name, barley, "Feed", memo);   
              }
          break;
          case "Calf (Male)":
            if(res.day_claims_at.length < 4) {
            await barleyFetch();
            barley = barleyArr[0];
            memo = "feed_animal:"+id;
            await sendToken(res.name, barley, "Feed", memo);    
            }
            else if(res.day_claims_at.length == 4 && res.day_claims_at[0] * multiTime < Date.now() - oneday) {
              await barleyFetch();
              barley = barleyArr[0];
              memo = "feed_animal:"+id;
              await sendToken(res.name, barley, "Feed", memo);    
              }
          break;
      }
    }
  });
}
////////////////////////////////////////livestock table///////////////////////////////////////
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
  /*
  for(let elem in aniObj) {
    let claimTime = aniObj[elem].time;
      timeAni(elem, claimTime);
  }
  */
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
/*
function timeAni(id, timeStart) {
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
*/

async function stopLoop() {
  for (var i = 1; i <= loop ; i++) {
    window.clearInterval(i);
    clearInterval(loop);
  }
}
/////////////////////////////////////////countdown///////////////////////////////////////////
/////////////////////////////////////////claim tool//////////////////////////////////////////
async function claimTool(id, toolname, typeClaim) {
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
            asset_id: id,          
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
      console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: Claim (${toolname}) ไม่สำเร็จ ( ${err.message}) !!! \n`;
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
      console.log(err);
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
      console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: Claim (${toolname}) ไม่สำเร็จ ( ${err.message}) !!! \n`;
      scrollTextarea();
    }
}
//////////////////////////////////////claim livestock////////////////////////////////////////
/////////////////////////////////////////check refil/////////////////////////////////////////
async function chkRefill() {
  getTable("accounts", 1, wax.userAccount)
  .then((res) => {
    let obj = res.rows[0];
    let refillSetup = localStorage.getItem("refillFw");
    let refillPercen = (obj.max_energy * refillSetup) / 100;
    let amount = obj.max_energy - obj.energy;
    
    if(obj.energy < (obj.max_energy * 20)/100) {
      document.getElementById("energy").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: red;">${obj.energy}/${obj.max_energy}</button`;
    }
    else {
      document.getElementById("energy").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #00FF36;">${obj.energy}/${obj.max_energy}</button`;
    }

    if(obj.energy < refillPercen) {
      try {
        let result = wax.api.transact({ 
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
          document.getElementById('log').innerHTML += thisTime() + `: เติมเนื้อ สำเร็จ !!! \n`;
          scrollTextarea();   
        }
        catch(err) {
          console.log(err);
          document.getElementById('log').innerHTML += thisTime() + `: เติมเนื้อ ไม่สำเร็จ ( ${err.message}) !!! \n`;
          scrollTextarea();
        }
    }
  })
}
/////////////////////////////////////////check refil/////////////////////////////////////////
/////////////////////////////////////////check repair/////////////////////////////////////////
async function chkRepair(id, name) {
  try {
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
      document.getElementById('log').innerHTML += thisTime() + `: Repair (${name}) สำเร็จ !!! \n`;
      scrollTextarea();

    }
    catch(err) {
      console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: Repair (${name}) ไม่สำเร็จ ( ${err.message}) !!! \n`;
      scrollTextarea();
    }
}
/////////////////////////////////////////check repair/////////////////////////////////////////
//////////////////////////////////////////send token//////////////////////////////////////////
async function sendToken(name, id, ord, memo) {
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
      document.getElementById('log').innerHTML += thisTime() + `: ${ord} ${name} สำเร็จ !!! \n`;
      scrollTextarea();

    }
    catch(err) {
      document.getElementById('log').innerHTML += thisTime() + `: ${ord} ${name} ${err.message} !!! \n`;
      scrollTextarea();
    }
}
//////////////////////////////////////////send token//////////////////////////////////////////
//////////////////////////////////////////send coins/////////////////////////////////////////
async function sendCoin() {
  let inputWallet = document.getElementById("inputWallet").value;
  let inputFwCoins = document.getElementById("inputFwCoins").value;

  try {
    let result = await wax.api.transact({ 
      actions: [{
        account: 'farmersworld',
          name: "sendcoin",
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            from: wax.userAccount,
            to: inputWallet,
            amount: inputFwCoins
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      document.getElementById('log').innerHTML += thisTime() + `: โอน Farmer Coins (${inputFwCoins}) ให้ ${inputWallet} สำเร็จ !!! \n`;
      scrollTextarea();

    }
    catch(err) {
      document.getElementById('log').innerHTML += thisTime() + `: โอน Farmer Coins ไม่สำเร็จ ${err.message} !!! \n`;
      scrollTextarea();
    }
}
//////////////////////////////////////////send coins/////////////////////////////////////////
//////////////////////////////////////////price///////////////////////////////////////////
async function coinmarketcapWax() {
  var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

await fetch("https://api.coingecko.com/api/v3/simple/price?ids=WAX&vs_currencies=THB", requestOptions)
.then((response) => {
        return response.json();
    })
    .then((json) => {
        const waxprice = json.wax;     
        document.getElementById("waxprice").innerHTML = `WAX/THB: ${waxprice.thb} บาท`;
    })
    .catch((error) => {
        console.log(error.message);
    })
}

async function alcorPrice() {
  var requestOptions = {
  method: 'GET',
  redirect: 'follow'
  };

  await fetch("https://wax.alcor.exchange/api/markets/105", requestOptions)
  .then((response) => {
      return response.json();
  })
  .then((json) => {
      const fwfprice = json.last_price;     
      document.getElementById("fwfprice").innerHTML = "FWF/WAX : " + fwfprice.toFixed(7);
  })
  .catch((error) => {
      
  })

  await fetch("https://wax.alcor.exchange/api/markets/104", requestOptions)
  .then((response) => {
      return response.json();
  })
  .then((json) => {
      const fwwprice = json.last_price;     
      document.getElementById("fwwprice").innerHTML = "FWW/WAX : " + fwwprice.toFixed(7);
  })
  .catch((error) => {
      
  })

  await fetch("https://wax.alcor.exchange/api/markets/106", requestOptions)
  .then((response) => {
      return response.json();
  })
  .then((json) => {
      const fwgprice = json.last_price;     
      document.getElementById("fwgprice").innerHTML = "FWG/WAX : " + fwgprice.toFixed(7);
  })
  .catch((error) => {
      
  })
}
//////////////////////////////////////////price///////////////////////////////////////////
///////////////////////////////////////buy barley/////////////////////////////////////////
async function buyBarleyMarket() {
  let getBarley = localStorage.getItem("barley");
  let obj = JSON.parse(getBarley);
  if(obj.onoff == "on" && barleyArr.length <= 5) {
    try {
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
              quantity: 20       
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        });
        document.getElementById('log').innerHTML += thisTime() + `: ซื้อ Barley 20 ต้น สำเร็จ !!! \n`;
        scrollTextarea();
  
      }
      catch(err) {
        console.log(err);
        document.getElementById('log').innerHTML += thisTime() + `: ซื้อ Barley ไม่สำเร็จ ( ${err.message}) !!! \n`;
        scrollTextarea();
      }
  }
}
///////////////////////////////////////buy barley/////////////////////////////////////////
//////////////////////////////////////craft member////////////////////////////////////////
async function craftMember() {
  try {
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
            mname: "Silver Member"      
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      document.getElementById('log').innerHTML += thisTime() + `: Craft Silver Member สำเร็จ !!! \n`;
      scrollTextarea();

    }
    catch(err) {
      console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: Craft Silver Member ไม่สำเร็จ ( ${err.message}) !!! \n`;
      scrollTextarea();
    }
}
//////////////////////////////////////craft member////////////////////////////////////////
//////////////////////////////////////show stuck///////////////////////////////////////////
async function showStuck() {
  getTable("tassets", 2, wax.userAccount).then((res) => {
    document.getElementById("showStuck").innerHTML = `<div style="color: red;">มี Member ที่ค้างอยู่ ${res.rows.length} อัน</div>`;
  })
}
//////////////////////////////////////show stuck///////////////////////////////////////////
//////////////////////////////////////stuck member////////////////////////////////////////
async function stuckMember() {
  getTable("tassets", 2, wax.userAccount).then((res) => {
    if(res.rows.length != 0) {
      res.rows.forEach(async (elem) => {
        try {
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
              expireSeconds: 30
            });
            document.getElementById('log').innerHTML += thisTime() + `: ได้รับ Member แล้ว สามารถเช็คได้จาก Atomic หรือ inventory ใน bot !!! \n`;
            scrollTextarea(); 
          }
          catch(err) {
            console.log(err);
            document.getElementById('log').innerHTML += thisTime() + `: รับ Member ไม่สำเร็จ ( ${err.message}) !!! \n`;
            scrollTextarea();
          }
      })
    }
    else {
      document.getElementById('log').innerHTML += thisTime() + `: ไม่พบ Member ที่ค้างในเกม !!! \n`;
    }
  })
  showStuck();
}
//////////////////////////////////////stuck member////////////////////////////////////////
////////////////////////////////////atomic inventory//////////////////////////////////////
async function atomicInven() {
  let getInven = await fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=farmersworld&limit=80&owner="+wax.userAccount);
  let inven = await getInven.json();
  inven.data.forEach((elem, i) => {
    if(i%8 == 0) {
      document.getElementById("atomic").innerHTML += `<br>`;
    }
    document.getElementById("atomic").innerHTML += `<img src="https://atomichub-ipfs.com/ipfs/${elem.data.img}" style="width: 10%;">&emsp;`;
  })
}
////////////////////////////////////atomic inventory//////////////////////////////////////
////////////////////////////////////////withdrawn/////////////////////////////////////////
async function withdrawnResource() {
  let fee;
  await sleep(3000);
  await getTable("config", 1, "").then((res) => {
    fee = res.rows[0].fee;
  })

  let getToggle = localStorage.getItem("withdrawn");
  let getFood = localStorage.getItem("withdrawnFood");
  let getWood = localStorage.getItem("withdrawnWood");
  let getGold = localStorage.getItem("withdrawnGold");


  if(fee == 5 && getToggle == "on" && foodIngame > getFood && woodIngame > getWood && goldIngame > getGold) {
    let resultWood = woodIngame + ".0000 WOOD";
    let resultGold = (goldIngame - 1000) + ".0000 GOLD";
    let resultFood = (foodIngame - 1000) + ".0000 FOOD";

    try {
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
        document.getElementById('log').innerHTML += thisTime() + `: ถอน ${resultGold} \n`;
        document.getElementById('log').innerHTML += thisTime() + `: ถอน ${resultWood} \n`;
        document.getElementById('log').innerHTML += thisTime() + `: ถอน ${resultFood} \n`;
        document.getElementById('log').innerHTML += thisTime() + `: Withdraw สำเร็จ !!! \n`;
        scrollTextarea();
      }
      catch(err) {
        console.log(err);
        document.getElementById('log').innerHTML += thisTime() + `: Withdraw ไม่สำเร็จ ( ${err.message}) !!! \n`;
        scrollTextarea();
        sleep(20000);
        withdrawnResource()
    }
  }
}
////////////////////////////////////////withdrawn/////////////////////////////////////////
