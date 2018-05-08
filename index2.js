const {isNil, not, compose,lensPath,view} = require('ramda');
const axios = require('axios');
const safe = require('crocks/Maybe/safe');
const {inc} = require('./index');
const propPath = require('crocks/Maybe/propPath');

// const isNotNil = compose(not, isNil)
// const qs = {page:3, pageSize:10, totalPages:203};
//
// const prop = (propName, obj) => safe(isNotNil, obj[propName])
//
// const page = prop('page', qs);
//
// const nextPage = page.map(inc).option(1)
//
// console.log(nextPage)


const getAPI = async (url) => {
  const {data} = await axios(url)
  return data;
}


getAPI('https://jsonplaceholder.typicode.com/users')
.then(data => {
  const isNotNill = compose(not,isNil);
  const prop = (propName,obj) => safe(isNotNill, obj[propName]);
  const emailArray = data.map(user => {
    const safeUser = prop('email',user);
    return safeUser.map(str => str.toLowerCase()).option('nothing')
  })

  // console.log(emailArray)
})


const user = {
    username: 'tester',
    email: 'test@gmail.com',
    address: {
        street: '111 E. West St',
        city: 'Anywhere',
        state: 'PA',
        postalCode: '19123-4567'
    }
}

const zip = propPath(['address','postalCode'],user).option('nothing')


console.log(zip)


console.log(
  view(lensPath(['address','postalCode']))(user)
)
