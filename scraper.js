//const Xray = require('x-ray')
//const x = Xray()
const fs = require('fs');
const webloader = require('./webloader.js');

const tuEnvioHavLogin = "https://www.tuenvio.cu/lahabana/SignIn.aspx";
const loginPanelID = "ctl00_cphPage_Login_loginPanel";
var cookie = "uid=rBQBc2BW59hSHOdfDodpAg==; ASP.NET_SessionId=xwrdvl2oyaaum3ex0w3l2sz3; myCookie=username=&userPsw=; ShopMSAuth=0102DC54F3F8A7ECD808FEDCBCB75AB0ECD808000C530075006E005300680069004E006500580073003900350000012F00FF";

/*
x(tuEnvioHavLogin, '#' + loginPanelID)(function(err, data) {
    //console.log(data);
})
*/
webloader.getPage("https://www.tuenvio.cu/lahabana/captcha.ashx", cookie)
    .then((data) => {
        fs.writeFile("response.txt", data, () => {});
    })
    .catch(error => {
        console.log(error);
    });