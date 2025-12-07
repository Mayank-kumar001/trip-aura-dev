import axios from 'axios'
let data = JSON.stringify({
  "q": "bro my logitude and latitude is 27 and 77 could you sugest some places to eat",
  "gl": "in"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://google.serper.dev/maps',
  headers: { 
    'X-API-KEY': 'b637bbedbeac098ece5f20485fe25d3511bc537c', 
    'Content-Type': 'application/json'
  },
  data : data
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();