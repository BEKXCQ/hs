
const fetch = require('node-fetch');
const moment = require('moment');
const gradient = require('gradient-string');
const chalk = require('chalk');
const rs = require('readline-sync');
const delay = ('6000'); // 1000 = 1 detik


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
console.log(gradient('gray', 'white')(
`\n\n
RRRRRRR    II    ZZZZZZZZZZ
R       R    II                Z
R       R    II               Z
RRRRRRR    II             Z
RR           II           Z
R R          II          Z
R  R         II         Z
R   R        II        ZZZZZZZZZ
            
`
));
console.log(chalk.bold.white('              Bye : RIZKI\n\n'));

  const auth = rs.question(chalk.green(`\n[ ${chalk.red('+')} ] ${chalk.bold.white('auth : ')}`));
  const check = !auth.includes('DeviceId');
  if (check) {
     console.log(chalk.bold.red(`\n[ ${chalk.bold.white('!')} ] Mana Ada Auth Kek Gitu`));
  } else {
  
  const round = rs.question(chalk.bold.gray(`\n[ ${chalk.bold.white('+')} ] ${chalk.bold.white('Round : ')}`));
  const anjay = [ "0", "1", "2", "3" ]
  const checks = !anjay.includes(round)
  if (checks) {
      console.log(chalk.bold.red(`\n[ ${chalk.bold.white('!')} ] Gak Ada Round `+round+`,  Pilih Round : No 1 (Exp) , 2 (Trophy) , 3 (Crown)`));
  } else {

  const url = ('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/'+round)
  
  const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch(url, {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  let counter = 0;
  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.bold.red(`\n[ ${moment().format('HH:mm:ss')} ] Authentication Code Not Valid`));
      await sleep(2000);
      console.log(chalk.bold.gray(`Reconnecting`))
      await sleep(1000);
      console.log(chalk.gray(`Do "CTRL + Z" To Exit`))

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;


  counter = counter + 1;
console.log(chalk.green(`
[ ${chalk.green(counter)} ]
[ ${chalk.green('Time')} ]: ${moment().format('HH:mm:ss')}
[ ${chalk.green('Username')} ] : ${username}
[ ${chalk.green('Country')} ] : ${country}
[ ${chalk.green('Trophy')} ] : ${trophy}
[ ${chalk.green('Crown')} ] : ${crown}`));
      await sleep(3000)
    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`[ ! ] Account Got Banned LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL`));
     break;
    }
  }


})()}}
