///////////////////////////////////////variable///////////////////////////////////////
const rareType = {"rarity": ["Promo", "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythical"]}
let endpointJson = {"u1": "https://chain.wax.io", "u2": "https://wax.eu.eosamsterdam.net", "u3": "https://wax.blokcrafters.io", "u4": "https://api.wax.alohaeos.com", "u5": "https://api.waxsweden.org", "u6": "https://wax.pink.gg", "u7": "https://wax.dapplica.io","u8": "https://wax.eosphere.io", "u9": "https://api.wax.greeneosio.com", "u10": "https://wax.cryptolions.io", "u11": "https://wax.eu.eosamsterdam.net", "u12": "https://api.wax.bountyblok.io", "u13": "https://wax.greymass.com", "u14": "https://wax.eosrio.io", "u15": "https://wax.eosdublin.io"};
let selectEndpoint;
const logTextarea = document.getElementById('log');
let getTheme = localStorage.getItem("theme");
let start = false;
let toolArr = [];
let version = "1.0.2";
const multiTime = 1000;
const onehrs = 3600000;
let wax;



setInterval(() => {
  coinmarketcapWax();
  alcorPrice();
}, 15000);
///////////////////////////////////////variable///////////////////////////////////////
////////////////////////////////////////version////////////////////////////////////////
document.getElementById("version").innerHTML = `Sailors World Bot ${version}`;
////////////////////////////////////////version////////////////////////////////////////
/////////////////////////////////////////theme////////////////////////////////////////
  if(getTheme != null) {
    document.getElementsByTagName("body")[0].setAttribute("data-sa-theme", getTheme);
  }
  else {
    document.getElementsByTagName("body")[0].setAttribute("data-sa-theme", 4);
  }
/////////////////////////////////////////theme/////////////////////////////////////////
/////////////////////////////////////scroll textarea////////////////////////////////////
function scrollTextarea() {
  document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight
}
/////////////////////////////////////scroll textarea////////////////////////////////////
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
///////////////////////////////////time function///////////////////////////////////////
///////////////////////////////////////count down time/////////////////////////////////
async function countDown() {
  let count = 1;
  await Promise.all(toolArr.map(async (id) => {
    let shipId = localStorage.getItem(id)
    let obj = JSON.parse(shipId);
    count++ ;
    await sleep(count * 700);
      switch(obj.mode) {
        case "Trawls":
          timeTrawl(id, obj.claimHour, obj.timeStart, id);
          break;
        case "Expeditions":
          timeExp(id, obj.duration, obj.timeStart);
          break;
        case "Oil Rig":
          timeOil(id, obj.timeStart);
          break;  
        case "":
          break;
      } 
  }));
}

function timeTrawl(id, claimHour, timeStart) { 
    let sendTime = formatTime((timeStart * multiTime) + (claimHour * onehrs));
    document.getElementById('countDown'+id).innerHTML = `${sendTime.hours} : ${sendTime.minutes} :  ${sendTime.seconds}`;
}

function timeExp(id, duration, timeStart) {
    let sendTime = formatTime((timeStart * multiTime) + (duration * multiTime));
    document.getElementById('countDown'+id).innerHTML = `${sendTime.hours} : ${sendTime.minutes} :  ${sendTime.seconds}`;
}

function timeOil(id, timeStart) {
    let sendTime = formatTime((timeStart * multiTime) + (12 * onehrs));
    document.getElementById('countDown'+id).innerHTML = `${sendTime.hours} : ${sendTime.minutes} :  ${sendTime.seconds}`;
}

async function stopLoop() {
  for (var i = 1; i <= loop ; i++) {
    window.clearInterval(i);
    clearInterval(loop);
  }
}
///////////////////////////////////////count down time/////////////////////////////////
///////////////////////////////////////sleep///////////////////////////////////////////
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
///////////////////////////////////////sleep///////////////////////////////////////////
///////////////////////////////////////start page//////////////////////////////////////
window.onload = async () => {
  const startOnload = new Promise((res) => {
    res();
  })
  .then(() => {
    showSetup();
  })
  .then(() => {
    loadSave();
  })
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
////////////////////////////////////endpoint///////////////////////////////////////////
async function waxStart() {
  wax = new waxjs.WaxJS({
   //rpcEndpoint: 'https://wax.pink.gg'
   rpcEndpoint: selectEndpoint
 });
 }
//////////////////////////////////////wax login////////////////////////////////////////
  async function waxlogin() {
    try {
      wax.rpcEndpoint = selectEndpoint;
      const userAccount = await wax.login();  
      document.title = userAccount;
      waxWallet = userAccount;   
      document.getElementById('waxId').innerHTML = waxWallet;
      resourcePlayer();
      logTextarea.innerHTML += thisTime() + `: ${userAccount} Login success \n`;
    }
    catch(err) {      
      console.log(err.message);
      waxlogin();
    }     
}
//////////////////////////////////////wax login////////////////////////////////////////
///////////////////////////////////////Setup innerhtml///////////////////////////////////////
async function showSetup() {
    rareType.rarity.forEach(rare => {
    document.getElementById('listSetup').innerHTML += `<div style="display: flex;">` +
    `<label class="btn btn-dark" style="width: 150px; color: #0023FF;">${rare}</label>&emsp;` +
    `<select class="btn btn-dark dropdown-toggle" id="selectMode-${rare}" style="width: 180px;" disabled onchange="dropdownMode(this.value, '${rare}')">` +
    `<option style="background: black; text-align: left;" value="-">Select Mode</option>` +
    `<option style="background: black; text-align: left;" value="expeditions">Expeditions</option>` +
    `<option style="background: black; text-align: left;" value="trawls">Trawls</option></select>&emsp;&emsp;` +
    `<div class="toggle-switch toggle-switch--green"><input type="checkbox" value="off" class="toggle-switch__checkbox" id="onToggle-${rare}" onclick="onoffToggle('${rare}')"><i class="toggle-switch__helper"></i></div>&emsp;&emsp;` +           
    `<div id="onoff-${rare}"><label class="btn btn-dark" style="width: 50px; color: red;">OFF</label></div>` +
    `</div><br>` +
    `<div style="display: none;" id="exp-${rare}">` +
    `<label class="btn btn-light" style="width: 150px;">Expeditions</label>&emsp;` +
    `<select class="btn btn-dark dropdown-toggle" id="land-${rare}" style="width: 180px;">` +
    `<option style="background: black; text-align: left;" value="-">Select Land</option>` +
    `<option style="background: black; text-align: left;" value="1">Ice Islands-DUB-1days</option>` +
    `<option style="background: black; text-align: left;" value="2">Stone Islands-WRECK-1days</option>` +
    `<option style="background: black; text-align: left;" value="3">Tropical Islands-DUB-2days</option></select><br><br>` +
    `</div><br>` +
    `<div style="display: none;" id="trawl-${rare}">` +
    `<label class="btn btn-light" style="width: 150px;">Trawls</label>&emsp;` +
    `<select class="btn btn-dark dropdown-toggle" id="token-${rare}" style="width: 180px;">` +
    `<option style="background: black; text-align: left;" value="-">Select Token</option>` +
    `<option style="background: black; text-align: left;" value="DUB">DUB</option>` +
    `<option style="background: black; text-align: left;" value="WRECK">WRECK</option>` +
    `<option style="background: black; text-align: left;" value="random">Random</option>` +
    `</select>&emsp;` +
    `<input id="coor-x${rare}" value="0" type="number" class="form-control form-control-sm" style="width: 70px;" placeholder="พิกัด X">&emsp;` +
    `<input id="coor-y${rare}" value="0" type="number" class="form-control form-control-sm" style="width: 70px;" placeholder="พิกัด y">&emsp;` + 
    `</div>` +
    `<br><hr>`;
    })
    document.getElementById('listSetup').innerHTML += `<div style="display: flex;">` +
    `<label class="btn btn-outline-primary" style="width: 150px; color: white;">Oil Rigs</label>&emsp;` +
    `<label class="btn btn-dark" style="width: 180px; color: white;"></label>&emsp;` +
    `<div class="toggle-switch toggle-switch--green"><input type="checkbox" value="off" class="toggle-switch__checkbox" id="onToggle-oilrig" onclick="onoffToggle('oilrig')"><i class="toggle-switch__helper"></i></div>&emsp;&emsp;` +           
    `<div id="onoff-oilrig"><label class="btn btn-dark" style="width: 50px; color: red;">OFF</button></label>` +
    `</div>` +
    `<br><hr>`;
}
////////////////////////////////////////Setup innerhtml///////////////////////////////////////
//////////////////////////////////////Setup dropdownMode///////////////////////////////////////
function dropdownMode(value, rare) {
  if(value == "expeditions") {
    document.getElementById("exp-"+rare).style.display = "flex";
    document.getElementById("trawl-"+rare).style.display = "none";
  }
  else if(value == "trawls") {
    document.getElementById("exp-"+rare).style.display = "none";
    document.getElementById("trawl-"+rare).style.display = "flex";
  }
  else {
    document.getElementById("exp-"+rare).style.display = "none";
    document.getElementById("trawl-"+rare).style.display = "none";
  }
} 
//////////////////////////////////////Setup dropdownMode///////////////////////////////////////
//////////////////////////////////////Setup onoff toggle//////////////////////////////////////
async function onoffToggle(rare) {
  let toggle = await document.getElementById('onToggle-'+rare).checked;  
  let toggleValue = document.getElementById('onToggle-'+rare);
  let selectMode = document.getElementById('selectMode-'+rare);
  if(toggle != true) {
    document.getElementById('onoff-'+rare).innerHTML= `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
    if(rare != "oilrig") {
      document.getElementById("selectMode-"+rare).value = "-";
      selectMode.setAttribute("disabled", "");   
      dropdownMode("", rare);
      }
      toggleValue.value = "off";
    }
  else {
    document.getElementById('onoff-'+rare).innerHTML = `<label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label>`;
    if(rare != "oilrig") {
      selectMode.removeAttribute("disabled"); 
    }
    toggleValue.value = "on";
    }
}
//////////////////////////////////////Setup onoff toggle//////////////////////////////////////
//////////////////////////////////////////Setup save//////////////////////////////////////////
async function saveSetup() {
  try {
    let canSave = true;
    await Promise.all(rareType.rarity.map(async (rare) => {
      let mode = await document.getElementById("selectMode-"+rare).value;
      let land = await document.getElementById("land-"+rare).value;
      let token = await document.getElementById("token-"+rare).value;
      let coorX = await document.getElementById("coor-x"+rare).value;
      let coorY = await document.getElementById("coor-y"+rare).value;
      let onoff = await document.getElementById("onToggle-"+rare).value;

      if(onoff == "on") {
        const savePromise = new Promise((res, rej) => {
          if(mode != "-") {
            res();
          }
          else if (mode == "-") {
            logTextarea.innerHTML += thisTime() + `:( ${rare} ) กรุณาเลือก Mode \n`;
            scrollTextarea();
            canSave = false;
          }
        })  
        savePromise.then(() => {
          if(mode == "expeditions" && land == "-") {
            logTextarea.innerHTML += thisTime() + `:( ${rare} ) กรุณาเลือก Land \n`;
            scrollTextarea();
            canSave = false;
          }
        })
        savePromise.then(() => {
          if(mode == "trawls" && token == "-") {
            logTextarea.innerHTML += thisTime() + `:( ${rare} ) กรุณาเลือก Token \n`;
            scrollTextarea();
            canSave = false;
          }
          else if(mode == "trawls" && coorX == "0") {
            logTextarea.innerHTML += thisTime() + `:( ${rare} ) กรุณาเลือก พิกัด X \n`;
            scrollTextarea();
            canSave = false;
          }
          else if(mode == "trawls" && coorY == "0") {
            logTextarea.innerHTML += thisTime() + `:( ${rare} ) กรุณาเลือก พิกัด Y \n`;
            scrollTextarea();
            canSave = false;
          }
        })
        savePromise.finally(() => {
          if(canSave == true) {
            let saveStorage = {rare: rare, mode: mode, land: land, token: token, coorX: coorX, coorY: coorY, onoff: onoff};
            localStorage.setItem(rare , JSON.stringify(saveStorage));    
          }      
        })
      }
      else {
        let saveStorage = {rare: rare, mode: mode, land: land, token: token, coorX: coorX, coorY: coorY, onoff: onoff};
        localStorage.setItem(rare , JSON.stringify(saveStorage));
      }
    }))
    let oilrig = await document.getElementById("onToggle-oilrig").value;
    let repair = await document.getElementById("repairRange").value;
    let refill = await document.getElementById("refillRange").value;    
    localStorage.setItem("oilrig" , oilrig);
    localStorage.setItem("repair" , repair);
    localStorage.setItem("refill" , refill);
    logTextarea.innerHTML += thisTime() + `: Save suscess. \n`;
    scrollTextarea();   
  }
  catch(err) {
    console.log(err);
  }
  let themeStorage = document.querySelector('input[name="theme"]:checked').value;
  localStorage.setItem("theme", themeStorage);
}
//////////////////////////////////////////Setup save//////////////////////////////////////////
/////////////////////////////////////////Load setup//////////////////////////////////////////
  async function loadSave() {
    let oilrigSave = localStorage.getItem("oilrig");
    if(oilrigSave == "on") {
      document.getElementById("onToggle-oilrig").checked = true;
      document.getElementById("onToggle-oilrig").value = "on";
      document.getElementById('onoff-oilrig').innerHTML = `<label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label>`;
    }
    else {
      document.getElementById("onToggle-oilrig").checked = false;
      document.getElementById("onToggle-oilrig").value = "off";
      document.getElementById('onoff-oilrig').innerHTML = `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
    }
    document.getElementById("repairRange").value = localStorage.getItem("repair");  
    document.getElementById("refillRange").value = localStorage.getItem("refill");  
    document.getElementById("repairValue").innerText = "";
    document.getElementById("refillValue").innerText = "";    
    try {
      await Promise.all(rareType.rarity.map(async (element) => {
        let rare = element;
        let keyrare = localStorage.getItem(rare);
        let obj = JSON.parse(keyrare);
        document.getElementById("selectMode-"+obj.rare).value = obj.mode;
        document.getElementById("land-"+obj.rare).value = obj.land;
        document.getElementById("token-"+obj.rare).value = obj.token;
        document.getElementById("coor-x"+obj.rare).value = obj.coorX;
        document.getElementById("coor-y"+obj.rare).value = obj.coorY;

        if(obj.onoff == "on") {
          document.getElementById("onToggle-"+obj.rare).checked = true;   
          document.getElementById("onToggle-"+obj.rare).value = obj.onoff;
          document.getElementById('onoff-'+obj.rare).innerHTML = `<label class="btn btn-dark" style="width: 50px; color: #22E119;">ON</label>`;
          document.getElementById("selectMode-"+obj.rare).removeAttribute("disabled"); 
          dropdownMode(obj.mode, obj.rare);
        }
        else if(obj.onoff == "off") {
          document.getElementById("onToggle-"+obj.rare).checked = false;   
          document.getElementById("onToggle-"+obj.rare).value = obj.onoff;
          document.getElementById('onoff-'+obj.rare).innerHTML = `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
        }
        else {
          document.getElementById("onToggle-"+obj.rare).checked = false;   
          document.getElementById("onToggle-"+obj.rare).value = "off";
          document.getElementById('onoff-'+obj.rare).innerHTML = `<label class="btn btn-dark" style="width: 50px; color: red;">OFF</label>`;
        }
      }))
      document.getElementById('log').innerHTML += thisTime()+ ": Load Setup done. \n";
    }
    catch(err) {
      console.log(err);
    }
  }
/////////////////////////////////////////Load setup//////////////////////////////////////////
/////////////////////////////////////////Resource///////////////////////////////////////////
async function resourcePlayer() {
  document.getElementById("acc").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #3498DB;">${waxWallet}</button`;
  document.getElementById("endpoint").innerHTML = `<button class="btn btn-dark" style="width: 250px; color: #F300FF ;">${selectEndpoint}</button`;
  const fee = await getFee();
  await Promise.all(fee.rows.map(async (element) => {
    document.getElementById("fee").innerHTML = `<button class="btn btn-dark" style="width: 150px;">Fee : ${element.withdraw_fee} %</button`;
  }));
  
  const resource = await getResource();
  await Promise.all(resource.rows.map(async (element) => {
    document.getElementById("tank").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #714F04 ;">${element.tank}</button`;
    document.getElementById("dub").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #FFF000">${element.dub}</button`;
    document.getElementById("wreck").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #C87900;">${element.wreck}</button`;
    document.getElementById("fuel").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #F14D3F ;">${element.fuel}</button`;
  }));

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      "account_name": waxWallet
    });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(wax.rpcEndpoint + "/v1/chain/get_account", requestOptions)
    .then((response) => {
    return response.json();
    })
    .then((json) => {
        let cpu = json.cpu_limit;  
        let cpuuse = (cpu.used * 100 / cpu.max).toFixed(2);
        document.getElementById("cpuShow").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #3498DB;">${cpuuse} %</button`;
        document.getElementById("waxcoinShow").innerHTML = `<button class="btn btn-dark" style="width: 150px; color: #3498DB;">${parseFloat(json.core_liquid_balance).toFixed(2)} Coins</button`;
    })
    .catch((error) => {
        console.log(error.message);
    })
}
//////////////////////////////////////////Resource////////////////////////////////////////////
////////////////////////////////////////////fee//////////////////////////////////////////////
async function getFee() { 
  const fee = await wax.api.rpc.get_table_rows({
    json: true,         
    code: "sailorsworld",      
    scope: "sailorsworld",         
    table: "configs",       
    key_type: "i64",
    index_position: 1,
    });
    return fee;
}
////////////////////////////////////////////fee//////////////////////////////////////////////
//////////////////////////////////////////resource///////////////////////////////////////////
async function getResource() { 
  const resource = await wax.api.rpc.get_table_rows({
    json: true,         
    code: "sailorsworld",      
    scope: "sailorsworld",         
    table: "players",       
    key_type: "i64",
    index_position: 1,
    lower_bound: wax.userAccount,
    upper_bound: wax.userAccount,
    });
    return resource;
}
//////////////////////////////////////////resource///////////////////////////////////////////
//////////////////////////////////////start button///////////////////////////////////////////
async function startBtn() {
  if(start == false) {
    try {
      start = true;
      document.getElementById("startBtn").innerHTML = `<button class="btn btn-danger btn--icon-text" style="width: 100%;" onclick="startBtn()">Stop Bot</button>`;
      let startPromise = new Promise((res) => {
      res();
    })
    .then(() => {
      mainBot();
      sleep(2000);
    })
    .then(() => {
      loopChk(); 
    })
    }
    catch(err) {
      console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: ERROR(${err.message}) \n`;  
    }
    
  }
  else {
    start = false;
    stopLoop();
    document.getElementById("startBtn").innerHTML = `<button class="btn btn-success btn--icon-text" style="width: 100%;" onclick="startBtn()">Start Bot</button>`;
    document.getElementById('log').innerHTML += thisTime() + `: Bot ได้หยุดทำงานแล้ว !!! \n`;
    scrollTextarea();
  } 
}
//////////////////////////////////////start button///////////////////////////////////////////
////////////////////////////////////////loop check///////////////////////////////////////////
async function loopChk() {
  setInterval(() => {
    chkclaim();
  }, 40000);
  
  setInterval(() => {
    chkrefill();
    chkrepair();
    toolChk();
  }, 30000);

  setInterval(() => {
    resourcePlayer();
  }, 60000);

  setInterval(() => {
    countDown();
  }, 1000);
}
////////////////////////////////////////loop check///////////////////////////////////////////
////////////////////////////////////////tool check///////////////////////////////////////////
  async function toolChk() {
    const listship = await duraFunc();
      await Promise.all(listship.rows.map(async (element) => {
        let id = element.asset_id;
        updateTool(id);
      })) 
  }
////////////////////////////////////////tool check///////////////////////////////////////////
//////////////////////////////////////////check refill//////////////////////////////////////
async function chkrefill() {
  let refillSetup = localStorage.getItem("refill");
  let player = await playerDetail();
  let refilPercen = (500 * refillSetup) / 100;
  await Promise.all(player.rows.map(async (element) => {  
    try {
      let refillNeed = 500 - element.tank;
      if(element.tank <= refilPercen) {
        if(element.fuel < refillNeed) {
          document.getElementById('log').innerHTML += thisTime() + `: Refill ไม่สำเร็จ มีเน้ำมันไม่พอ !!! \n`;
          scrollTextarea();
        }
        let result = await wax.api.transact({ 
          actions: [{
            account: 'sailorsworld',
              name: 'filltank',
              authorization: [{
                actor: wax.userAccount,
                permission: 'active',
              }],
              data: {
                user: wax.userAccount,
                value: refillNeed
              },
            }]
          }, {
            blocksBehind: 3,
            expireSeconds: 30
          });
          document.getElementById('log').innerHTML += thisTime() + `: Refill สำเร็จ !!! \n`;
          scrollTextarea();
      } 
    }
    catch(err) {
      document.getElementById('log').innerHTML += thisTime() + `: Refill ไม่สำเร็จ !!! (${err.message}) \n`;
      scrollTextarea();
    }  
  })) 
} 
//////////////////////////////////////////check refill//////////////////////////////////////
//////////////////////////////////////////check repair//////////////////////////////////////
async function chkrepair() {
  let repairSetup = localStorage.getItem("repair");
  const listship = await duraFunc();
  let count = 20;
  await Promise.all(listship.rows.map(async (element) => {
    try {
      count++ ;
      await sleep(count * 1000);
      let id = element.asset_id;
      let dura = element.durability;
      let maxDura = element.max_durability;
      if(dura < (repairSetup * maxDura) / 100) {
        let result = await wax.api.transact({ 
          actions: [{
            account: 'sailorsworld',
              name: 'repair',
              authorization: [{
                actor: wax.userAccount,
                permission: 'active',
              }],
              data: {
                user: wax.userAccount,
                asset_id: id,
                value: maxDura - dura
              },
            }]
          }, {
            blocksBehind: 3,
            expireSeconds: 30
          });
          document.getElementById('log').innerHTML += thisTime() + `: Repair ${id} สำเร็จ !!! \n`;
          scrollTextarea();
      }      
    }
    catch(err) {
      document.getElementById('log').innerHTML += thisTime() + `: Repair ${id} ไม่สำเร็จ !!! (${err.message}) \n`;
      scrollTextarea();
    }
  }));
} 
//////////////////////////////////////////check repair//////////////////////////////////////
////////////////////////////////////////update tool/////////////////////////////////////////
async function updateTool(getid) {
  let count;
  const listship = await duraFunc();
  await Promise.all(listship.rows.map(async (element) => {
    count ++;
    await sleep(count * 1000);  
    let id = element.asset_id;
    let dura = element.durability;
    let maxDura = element.max_durability;
    if(id == getid) {
      await chkMode(id).then((mode) => {   //check mode from id
        getMode = mode;  
        detail(id, getMode[0], getMode[1], getMode[2], dura, maxDura);    
        if(getMode[0] != "") {
          let keyId = localStorage.getItem(id);
          let obj = JSON.parse(keyId);
          let startDay = new Date(getMode[0] * 1000).toLocaleString('en-US', { day: 'numeric' })
          let startTime = new Date(getMode[0] * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
          document.getElementById("dura"+id).innerText = `Durability: ${obj.durability}/${obj.maxDura}`;
          document.getElementById("mode"+id).innerText = `${obj.mode}`;
          document.getElementById("startTime"+id).innerText = `Start Time | วันที่ : ${startDay} เวลา : ${startTime}`;
        }   
        
      });  
    }
  }));
}
////////////////////////////////////////update tool/////////////////////////////////////////
/////////////////////////////////////////get tool///////////////////////////////////////////
async function getTool() {
  try {
    const listItem = await wax.api.rpc.get_table_rows({
      json: true,    
      code: "sailorsworld",      
      scope: "sailorsworld",         
      table: "bags",       
      key_type: "i64",
      index_position: 1,
      lower_bound: wax.userAccount,
      upper_bound: wax.userAccount,
      limit: 100,
      reverse: false  
      });
      //return listItem;
    await Promise.all(listItem.rows[0].asset_ids.map(async (id) => {
      if(toolArr.includes(id) === false) {
        toolArr.push(id);
      }    
    }))
  }
  catch(err) {
    console.log(err);
    sleep(1000);
    getTool();
  }
}
/////////////////////////////////////////get tool///////////////////////////////////////////
////////////////////////////////////get durability//////////////////////////////////////////
function duraFunc() { 
  try {
    const listItem = wax.api.rpc.get_table_rows({
      json: true,       
      code: "sailorsworld",      
      scope: "sailorsworld",         
      table: "durabilities",       
      key_type: "i64",
      index_position: 2,
      lower_bound: wax.userAccount,
      upper_bound: wax.userAccount,
      limit: 100,
      reverse: false  
      });
      return listItem;
  }
  catch(err) {
    console.log(err);
    sleep(1000);
    duraFunc();
  }
}
////////////////////////////////////get durability//////////////////////////////////////////
///////////////////////////////////////get dura////////////////////////////////////////////
function dura(id) { 
  try {
    const listItem = wax.api.rpc.get_table_rows({
      json: true,       
      code: "sailorsworld",      
      scope: "sailorsworld",         
      table: "durabilities",       
      key_type: "i64",
      index_position: 1,
      lower_bound: id,
      upper_bound: id,
      limit: 100,
      reverse: false  
      });
      return listItem;
  }
  catch(err) {
    console.log(err);
    sleep(1000);
    duraFunc();
  }
}
///////////////////////////////////////get dura////////////////////////////////////////////
/////////////////////////////////////player table///////////////////////////////////////////
async function playerDetail() {
  const player = await wax.api.rpc.get_table_rows({
    json: true,      
    code: "sailorsworld",      
    scope: "sailorsworld",         
    table: "players",       
    key_type: "i64",
    index_position: 1,
    lower_bound: wax.userAccount,
    upper_bound: wax.userAccount,
    limit: 2,
    reverse: false  
    });
    return player;
  }
/////////////////////////////////////player table///////////////////////////////////////////
///////////////////////////////////////main bot/////////////////////////////////////////////
async function mainBot() {
  await getTool();
  if(start == true) {
    //const listship = await duraFunc();
    document.getElementById('inventory').innerHTML = "";
    try {
      //await Promise.all(listship.rows.map(async (element) => {
        await Promise.all(toolArr.map(async (elem) => {
          await dura(elem)
          .then((res) => {
            let row = res.rows[0]
            let id = row.asset_id;
            let dura = row.durability;
            let maxDura = row.max_durability;
            let count = Math.floor(Math.random() * 10) + 1;
            let arr = [id, dura, maxDura, count]
            //sleep(count * 2000); 
            return arr;          
          })
          .then((res) => {
            //console.log(res);
            chkMode(res[0]).then((mode) => {
              getMode = mode;  
              let id = res[0]
              detail(id, getMode[0], getMode[1], getMode[2], res[1], res[2]);       
              let keyId = localStorage.getItem(id);
              let obj = JSON.parse(keyId);
              let startDay = new Date(getMode[0] * 1000).toLocaleString('en-US', { day: 'numeric' })
              let startTime = new Date(getMode[0] * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
              
              document.getElementById('inventory').innerHTML += `<label class="btn btn-light" id="${id}" "style=width: 150px;">${id}</label>&emsp;&emsp;` +
              `<label class="btn btn-dark" id="name${id}" style="width: 130px; color: #8B00DF">${obj.name}</label>&emsp;&emsp;` +
              `<label class="btn btn-primary" id="rare${id}" style="width: 130px;">${obj.rare}</label>&emsp;&emsp;` +
              `<label class="btn btn-light" id="dura${id}" style="width: 160px;">Durability: ${obj.durability}/${obj.maxDura}</label>&emsp;&emsp;` +
              `<label class="btn btn-dark" id="mode${id}" style="width: 180px; color: #FC5D07">${obj.mode}</label>&emsp;&emsp;` +
              `<label class="btn btn-light" id="startTime${id}" style="width: 250px;">Start Time | วันที่ : ${startDay} เวลา : ${startTime}</label>&emsp;&emsp;` +
              `<label class="btn btn-dark" id="countDown${id}" style="width: 150px;"></label><br><br>`;   
            })
          })
      }))
       document.getElementById('log').innerHTML += thisTime() + `: Connect Api done. \n`;
    }
    catch(err) {
      console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: เชื่อมต่อ API ไม่สำเร็จ กำลังเชื่อมต่ออีกครั้ง !!! (${err.message}) \n`;
      sleep(2500);
      mainBot();
    }
  }
}
///////////////////////////////////////main bot/////////////////////////////////////////////
////////////////////////////////////////check mode//////////////////////////////////////////
async function chkMode(id) {
  const chkExped = await wax.api.rpc.get_table_rows({
  json: true,     
  code: "sailorsworld",      
  scope: "sailorsworld",         
  table: "expeditions",       
  key_type: "i64",
  index_position: 1,
  lower_bound: id,
  upper_bound: id,
  limit: 100,
  reverse: false  
  });

  const chkTrawls = await wax.api.rpc.get_table_rows({
  json: true,       
  code: "sailorsworld",      
  scope: "sailorsworld",         
  table: "trawls",       
  key_type: "i64",
  index_position: 1,
  lower_bound: id,
  upper_bound: id,
  limit: 100,
  reverse: false  
  });

  const chkOilrig = await wax.api.rpc.get_table_rows({
    json: true,          
    code: "sailorsworld",      
    scope: "sailorsworld",         
    table: "oilclaims",       
    key_type: "i64",
    index_position: 1,
    lower_bound: id,
    upper_bound: id,
    limit: 100,
    reverse: false  
    });
  sleep(1000);
  if(chkExped.rows != "" && chkTrawls.rows == "" && chkOilrig.rows == "") {
    return [chkExped.rows[0].start, "Expeditions", chkExped.rows[0].duration];  
  }
  else if (chkExped.rows == "" && chkTrawls.rows != "" && chkOilrig.rows == "") {
    return [chkTrawls.rows[0].timestamp, "Trawls", "none"];  
  }
  else if (chkExped.rows == "" && chkTrawls.rows == "" && chkOilrig.rows != "") {
    return [chkOilrig.rows[0].last_claim, "Oil Rig", "none"];  
  }
  else {
    return ["", "", ""];
  }
}
////////////////////////////////////////check mode//////////////////////////////////////////
//////////////////////////////////////////detail ship//////////////////////////////////////
function detail(id, time, mode, duration, durability, maxDura) {
  fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?asset_id="+id)
  .then((response) => {
      return response.json();
  })
  .then((json) => {
    let saveShip = { id: id, name: json.data[0].data.name, claimHour: json.data[0].data.claims, rare: json.data[0].data.rarity, timeStart: time, mode: mode, duration: duration, durability: durability, maxDura: maxDura };
    localStorage.setItem(id , JSON.stringify(saveShip));
  })
  .catch(error => console.log('error', error));
}
//////////////////////////////////////////detail ship//////////////////////////////////////
//////////////////////////////////////////check claim//////////////////////////////////////
async function chkclaim() {
  let count = 1; 
  try {
    await Promise.all(toolArr.map(async (id) => {
      count ++;
      await sleep(count * 1000);   
      let shipId = localStorage.getItem(id)
      let obj = JSON.parse(shipId);
      if(obj.mode == "Trawls") {    
        checkTrawl(id, "trawlstop", obj.claimHour);
      }
      else if(obj.mode == "Expeditions") { 
        checkExped(id, "expedstop");
      }
      else if(obj.mode == "Oil Rig") { 
        checkOilrig(id, "pump");
      }
      else {
        await toolChk();
        await sleep(1000);
        await startShip(id);
      }
    }));
  }
  catch(err) {
    console.log(err);
  }
}

async function checkTrawl(id, mode, claimHour) {
  const trawlMode = await wax.api.rpc.get_table_rows({
    json: true,        
    code: "sailorsworld",      
    scope: "sailorsworld",         
    table: "trawls",       
    key_type: "i64",
    index_position: 1,
    lower_bound: id,
    upper_bound: id,
    limit: 50,
    reverse: false 
    }); 
    let timeStamp = trawlMode.rows[0].timestamp;
    if(timeStamp * 1000 + (claimHour * onehrs) <= Date.now()) {
      claim(id, mode);
    }
}

async function checkExped(id, mode) {
  const expMode = await wax.api.rpc.get_table_rows({
    json: true,           
    code: "sailorsworld",      
    scope: "sailorsworld",         
    table: "expeditions",       
    key_type: "i64",
    index_position: 1,
    lower_bound: id,
    upper_bound: id,
    limit: 50,
    reverse: false 
    }); 
    var start = expMode.rows[0].start;
    var duration = expMode.rows[0].duration;
    if(((start + duration) * 1000) <= Date.now()) {
      claim(id, mode);  
    }
}
async function checkOilrig(id, mode) {
  const oilMode = await wax.api.rpc.get_table_rows({
    json: true,        
    code: "sailorsworld",      
    scope: "sailorsworld",         
    table: "oilclaims",       
    key_type: "i64",
    index_position: 1,
    lower_bound: id,
    upper_bound: id,
    limit: 50,
    reverse: false 
    }); 
    var last_claim = oilMode.rows[0].last_claim;
    if(last_claim * 1000 + (12 * onehrs) <= Date.now()) {
      claim(id, mode);
    }
}
//////////////////////////////////////////check claim//////////////////////////////////////
////////////////////////////////////////////claim/////////////////////////////////////////
async function claim(id, mode) {
  try {
    let result = await wax.api.transact({ 
      actions: [{
        account: 'sailorsworld',
          name: mode,
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            user: wax.userAccount,
            asset_id: id,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      document.getElementById('log').innerHTML += thisTime() + `: Claim (${id}) สำเร็จ !!! \n`;
      scrollTextarea();
    }
    catch(err) {
      console.log(err);
      document.getElementById('log').innerHTML += thisTime() + `: Claim (${id}) ไม่สำเร็จ ( ${err.message}) !!! \n`;
      scrollTextarea();
    }
}
////////////////////////////////////////////claim/////////////////////////////////////////
//////////////////////////////////////////start mine///////////////////////////////////////
async function startShip(id) {
  
  let shipId = localStorage.getItem(id);
  let obj = JSON.parse(shipId);
  let rare = obj.rare;
  let timeStart = obj.timeStart;
  let idMode = obj.mode;
  
  let shipRare = localStorage.getItem(rare);
  let objType = JSON.parse(shipRare);
  let rareMode = objType.mode;


  let land = objType.land;
  let token = objType.token;
  let x_cor = objType.coorX;
  let y_cor = objType.coorY;
  
  if(token == "random") {
    let tokenRand = Math.floor(Math.random() * 2);
    switch(tokenRand) {
      case 0: 
        token = "DUB";
        break;
      case 1:
        token = "WRECK";
        break;
      default:
    }
  }

  if(rareMode == "expeditions" && idMode == "") {
    await expedStart(id, land);
    }
  else if(rareMode == "trawls" && idMode == "") {;
    await trawlsStart(id, token, x_cor, y_cor);
    }
}

async function expedStart(id, land) {
  try {
    let result = await wax.api.transact({ 
      actions: [{
        account: 'sailorsworld',
          name: 'exped',
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            user: wax.userAccount,
            asset_id: id,
            land_id: land 
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      document.getElementById('log').innerHTML += thisTime() + ": (" + id + ") ออกเรือใน Mode expeditions Land(" + land  +") แล้ว \n";  
      scrollTextarea();     
    }
  catch(err) {
    console.log(err);
    document.getElementById('log').innerHTML += thisTime() + `: (${id}) ออกเรือ ล้มเหลว ( ${err.message} ) !!! \n`;
    scrollTextarea();
  }         
}

async function trawlsStart(id, token, x_cor, y_cor) {
  let count;
  count = Math.floor(Math.random() * 15) + 2;
  await sleep(count * 1000);
  try {
    let result = await wax.api.transact({ 
      actions: [{
        account: 'sailorsworld',
          name: 'trawlstart',
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            user: wax.userAccount,
            asset_id: id,
            currency: token,
            coord_x: x_cor,
            coord_y: y_cor
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
        document.getElementById('log').innerHTML += thisTime() + `: (${id}) ออกเรือใน Mode Trawls พิกัด (${x_cor}/${y_cor}) token (${token}) แล้ว \n`; 
        scrollTextarea();
      }
  catch(err) {
      console.log(err);
        document.getElementById('log').innerHTML += thisTime()+ `: (${id}) ออกเรือ ล้มเหลว !!! ( ${err.message} ) \n`;
        scrollTextarea();
        }        
}

//////////////////////////////////////////start mine///////////////////////////////////////
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

  await fetch("https://wax.alcor.exchange/api/markets/416", requestOptions)
  .then((response) => {
      return response.json();
  })
  .then((json) => {
      const dubprice = json.last_price;     
      document.getElementById("dubprice").innerHTML = "DUB/WAX : " + dubprice.toFixed(5);
  })
  .catch((error) => {
      
  })

  await fetch("https://wax.alcor.exchange/api/markets/418", requestOptions)
  .then((response) => {
      return response.json();
  })
  .then((json) => {
      const wreckprice = json.last_price;     
      document.getElementById("wreckprice").innerHTML = "WRECK/WAX : " + wreckprice.toFixed(5);
  })
  .catch((error) => {
      
  })

  await fetch("https://wax.alcor.exchange/api/markets/417", requestOptions)
  .then((response) => {
      return response.json();
  })
  .then((json) => {
      const fuelprice = json.last_price;     
      document.getElementById("fuelprice").innerHTML = "FUEL/WAX : " + fuelprice.toFixed(5);
  })
  .catch((error) => {
      
  })
}
//////////////////////////////////////////price///////////////////////////////////////////
//////////////////////////////////////////delete//////////////////////////////////////////
async function delShip(id) {
  localStorage.removeItem(id)
}
//////////////////////////////////////////delete//////////////////////////////////////////
