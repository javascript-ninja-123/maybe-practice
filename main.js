const {inc, dbl, toUpper}  =require('./index');
const Maybe = require('crocks/Maybe');
const compose = require('crocks/helpers/compose');
const { Just, Nothing } = Maybe

const isNumber = val => typeof val === 'number'
const isString = str => typeof  str === 'string';

const safe = (predicate,val) =>
predicate(val) ? Just(val) : Nothing()




const input = safe(isNumber,2);
const result = input.map(n =>console.log('calling inc') || inc(n));

console.log(result)


const inputS = safe(isString,'yes');
const resultS = inputS.map(toUpper);

console.log(resultS)


const incDbl = n => {
  const safeNum = safe(isNumber,n);
  return safeNum
  .map(compose(dbl,inc))
  .option(0)
}

console.log(incDbl(2))




const qs = {page:3, pageSize:10,totalPage:203 }
const page = qs.pageSize;
const nextPage = inc(page);


console.log(nextPage)
