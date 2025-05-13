import Retail from './Classes/Retail.js';

const retailList = [];
// TODO Add try-catch block
const retail = new Retail(1, 'Nombre del Retail');
retailList.push(retail);
console.log(JSON.stringify(retailList));