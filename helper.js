const curry = fn => {
  const arity = fn.length;
  return function f1(...args){
    if(args.length >= arity){
      return fn(...args);
    }
    else{
      return function f2(...moreArgs){
        const newArgs = [...args,...moreArgs];
        return f1(...newArgs);
      }
    }
  }
}




const Just = x => ({
  map:fn => Just(fn(x)),
  inspect:() => `Just(${x})`,
  chain:fn => fn(x),
  compose:(...fns) => fns.reduceRight((acc,fn) => acc.map(fn), Just(x)),
  pipe:(...fns) => fns.reduce((acc,fn) => acc.map(fn), Just(x)),
  fold:(n,j) => j(x),
  option:(y) => y(x)
})

const Nothing = () => ({
  map:fn => Nothing(),
  inspect:() => `Nothing()`,
  chain:fn => Nothing(),
  compose:(...fns) => fns.reduceRight((acc,fn) => acc.map(fn), Nothing()),
  pipe:(...fns) => fns.reduce((acc,fn) => acc.map(fn), Nothing()),
  fold:(n,j) => [],
  option:(x) => []
})

const Maybe = {
  Just,
  Nothing
}

const _safe = (predicate,val) => {
return predicate(val) ? Maybe.Just(val) : Maybe.Nothing()
}

const Safe = curry(_safe);

const isNumber = num => typeof num === 'number';

const safeNum = Safe(isNumber);

const safeNumMaybe = Safe(isNumber)

const multiplyNumber = num => {
  return safeNum(num)
  .compose(num => num *2, num => num * 7)
  .option(a => a)
}

console.log(multiplyNumber(5))
