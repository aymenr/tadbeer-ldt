import workerCode from './Worker';

const Eval = (function () {

    var blob = new Blob([workerCode.toString() + 'workerCode()'], {
            type: 'text/javascript'
        }),
        codeUrl = URL.createObjectURL(blob);

    return function (code, arg, cb) {
        if (arguments.length === 2) {
            cb  = arg;
            arg = null;
        }

        var worker = new Worker(codeUrl),
            timeout;

        worker.onmessage = function (evt) {
            

            var type = evt.data.event;

            if (type === 'start') {
                start();
            }
            else {
                finish(null, evt.data);
            }
        };

        worker.onerror = function (error) {
            console.warn(error, 'eval worker.onerror');
            finish(error.message);
        };

        // and it all boils down to this...
        worker.postMessage({
            code: code,
            arg: arg
        });
        // so fucking cool.

        function start () {
            if (timeout) {
                return;
            }

            timeout = setTimeout(function () {
                finish('Maximum execution time exceeded');
            }, 500);
        }

        function finish (err, result) {
            clearTimeout(timeout);
            worker.terminate();

            if (cb && cb.call) {
                cb(err, result);
            }
            else {
                console.warn('eval did not get callback');
            }
        }
    };

}());

export default Eval;
