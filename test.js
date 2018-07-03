// const request = require('request');
 
// request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });

 const axios = require('axios');
 var HubServiceURL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
// axios({
//     method: 'POST',
//     url: HubServiceURL
// }).then(response =>{
//     console.log(response.data.url);
//     console.log(response.data.explanation);
// })

axios
.get(HubServiceURL, {
  "headers": {"method": "POST"}
})
.then(response => {
  console.log(response)

})
.catch(err => {
  console.log(err)

})