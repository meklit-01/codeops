const billRaw = "480"; 
const bill = Number(billRaw); 
const partySize = 4;
let total;
let payment_method = "CBE Birr"


if (bill > 300){
total = bill + (bill*0.1)
} 
else
{
    total = bill + (bill*0.05)
}
const perPerson = total/ partySize
let fee;
let cbe='2'
let tellBirr='1'

switch (payment_method)
{
    case 'CBE Birr':
   let fee = total* Number(cbe)
    break
    case 'tellBirr':
    fee = total *0.7
    break
  default:
    fee = total

}
console.log(`Total ${total} ETB, `+` ${perPerson} ETB each`)


