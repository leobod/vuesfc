const si = require('systeminformation');
si.cpu()
.then(data => console.log(data))
.catch(error => console.error(error));
si.mem()
.then(data => console.log(data))
.catch(error => console.error(error));
// 可以使用其他方法获取更多系统信息，如磁盘、网络等


const os = require('os');
console.log(os.platform()); // 获取操作系统平台
console.log(os.release()); // 获取操作系统版本
console.log(os.totalmem()); // 获取系统总内存大小
