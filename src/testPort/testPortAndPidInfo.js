const ps = require('ps-node');

function getProcessByPort(port) {
  return new Promise((resolve, reject) => {
    ps.lookup({ port }, (err, resultList) => {
      if (err) {
        reject(err);
      } else {
        console.log(resultList)
        const processInfo = resultList[0];
        if (processInfo) {
          resolve(processInfo);
        } else {
          resolve(null); // 没有找到占用端口的进程
        }
      }
    });
  });
}

// 获取指定端口被占用的进程信息
getProcessByPort(22)
.then(processInfo => {
  if (processInfo) {
    console.log('占用端口的进程信息:', processInfo);
  } else {
    console.log('指定端口未被占用');
  }
})
.catch(error => console.error(error));
