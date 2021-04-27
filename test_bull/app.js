const axios = require('axios');
const moment = require('moment');
const Bull = require('bull');

const myFirstQueue = new Bull('my-first-queue');

const ulrBull = 'http://localhost:3001';
let i = 1;

const getTimePost = () => {
  const toDay = new Date();
  const time = moment(toDay).format('LTS');
  return time
}

const postBull = async (numTets) => {
  try {
    const timePost = getTimePost()
    axios({
      method: 'POST',
      url: ulrBull + '/bulls',
      data: {
        text: 'looping ke-' + i + ' and time: ' + timePost,
        LoopNumber: numTets,
        createdAt: timePost
      }
    })
    .then(({ data  }) => {
      console.log('>>>>>>> SUCSES <<<<<<<<');
      // console.log(data.ops[0], '<<<<<<<<')
    })
  } catch (err) {
    console.log('>>>>>>> ERROR <<<<<<<<');
    console.log(err, '<<<<<<<<<');
  }
}

const deleteMany = async () => {
  try {
    axios({
      method: 'DELETE',
      url: ulrBull + '/bulls'
    })
    .then(({ data }) => {
      console.log(data)
    })
  } catch (err) {
    console.log(err)
  }
}

function runApp() {
  setTimeout(function() {
    console.log('Loop ke-' + i);
    console.log(getTimePost())
    postBull(i);
    if (i < 5) {
      runApp();
    }
    i++;
  }, 100000)
}


// function runApp() {
//   setTimeout(function() {
//       myFirstQueue.process( async (job) => {
//       console.log('Loop ke-' + i);
//       console.log(getTimePost())
//       // console.log(job.data)
//       postBull(i);
//       if (i < 5) {
//         runApp();
//       }
//       i++;
//     });
//   }, 1000)
//   myFirstQueue.on('completed', (job, result) => {
//     console.log(`Job completed with result ${result}`);
//   })
// }

runApp();
// deleteMany();