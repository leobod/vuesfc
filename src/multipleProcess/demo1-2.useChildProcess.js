
const { fork } = require('child_process')
const worker = fork(__dirname + '/child_process_worker.js') /* 使用fork */
var numCPUs = require('os').cpus().length

// 接收工作进程计算结果
let max = 1e7
let min = 2
let start = 2
let primes = []

const range = Math.ceil((max - min) / numCPUs)

for (var i = 0; i < numCPUs; i++) {
    worker.send({ start: start, range: range })
    start += range
    worker.on('message', (msg) => {
        primes = primes.concat(msg.data)
        worker.kill()
    })
}


// child_process_worker.js
/**
// 素数的计算
function generatePrimes(start, range) {
    let primes = []
    let isPrime = true
    let end = start + range
    for (let i = start; i < end; i++) {
        for (let j = 2; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false
                break
            }
        }

        if (isPrime) {
            primes.push(i)
        }

        isPrime = true
    }
    return primes
}


// 监听子进程发送的信息
process.on('message', (msg) => {
    const { start, range } = msg
    console.log(msg)
    const data = generatePrimes(start, range)
    // 在工作进程中，这会发送消息给主进程
    process.send({ data: data })
})

// 收到kill信息，进程退出
process.on('SIGHUP', function () {
    process.exit()
})
 */
