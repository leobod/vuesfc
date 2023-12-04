/**
 * node.js v10.5.0 引入的实验性质API，开启时需要使用 --experimental-worker 参数。
 * node.js v12.0.0 里面默认开启，也预示着您可以将该特性用于生产环境中。
 */

const { Worker, isMainThread, parentPort } = require('worker_threads');
if (isMainThread) {
    // This code is executed in the main thread and not in the worker.

    // Create the worker.
    const worker = new Worker(__filename);
    // Listen for messages from the worker and print them.
    worker.on('message', (msg) => { console.log(msg); });
} else {
    // This code is executed in the worker and not in the main thread.

    // Send a message to the main thread.
    parentPort.postMessage('Hello world!');
}