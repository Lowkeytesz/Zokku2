const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
*╔═🥶══ •༆✯𝑴𝑪𝑹𝑶𝑺𝑺-𝑴𝑫✯༆• ══🥶══╗*
┃   *ᴘʀᴇғɪx* : ${s.PREFIXE}
┃   *ᴏᴡɴᴇʀ* : ${s.OWNER_NAME}
┃   *ᴍᴏᴅᴇ* : ${mode}
┃   *ᴄᴏᴍᴍᴀɴᴅs* : ${cm.length}
┃   *ᴅᴀᴛᴇ* : ${date}
┃   *ʜᴏᴜʀs* : ${temps}
┃   *ᴍᴇᴍᴏʀɪᴇs* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃   *ᴘʟᴀᴛᴇғᴏʀᴍ* : ${os.platform()}
┃   *ᴅᴇᴠᴇʟᴏᴘᴇʀ* : ༆𝑲𝑰𝑵𝑮 𝑴-𝑪𝑹𝑶𝑺𝑺༆
┃   *ᴄᴜsᴛᴏᴍᴇʀ ᴄᴀʀᴇ/ʜᴇʟᴘ*:https://wa.me/2349042566473
*╚═════ •✧✧• ════╝* \n\n`;
    
let menuMsg = `
👋 Hello ${nomAuteurMessage} 👋
𝑰'𝑴 ༆✯𝑴𝑪𝑹𝑶𝑺𝑺-𝑴𝑫✯༆, 𝑨 𝑾𝑯𝑨𝑻𝑺𝑨𝑷𝑷 𝑩𝑶𝑻 𝑫𝑬𝑽𝑬𝑳𝑶𝑷𝑬𝑫 𝑩𝒀 ❝𝗞𝗜𝗡𝗚☆𝗠-𝗖𝗥𝗢𝗦𝗦❞.

*𝐿𝐼𝑆𝑇 𝑂𝐹 𝐶𝑂𝑀𝑀𝐴𝑁𝐷𝑆 𝐹𝑂𝑅 𝑀𝐶𝑅𝑂𝑆𝑆-𝑀𝐷 :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `*╔══✵* *${cat}*  *✵ ══╗*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
*🥷🏽* ${cmd}`;
        }
        menuMsg += `
*╚════ ✯𝐌𝐂𝐑𝐎𝐒𝐒✯ ═══╝* \n`
    }

    menuMsg += `
◇            ◇
*»»—————✯𝐌𝐂𝐑𝐎𝐒𝐒✯—————««*
for use a command, insert  ${prefixe}"command_name"
 
 **
                                                
*»»—————✯𝐌𝐂𝐑𝐎𝐒𝐒✯—————««*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
