
const portscanner = require('portscanner');

// 定义端口范围
const startPort = 1;
const endPort = 65535;

// 检查指定范围内的端口
portscanner.findAPortInUse(startPort, endPort, '127.0.0.1', (error, usedPort) => {
  if (error) {
    console.error(error);
  } else {
    console.log('已被占用的端口:', usedPort);
  }
});
