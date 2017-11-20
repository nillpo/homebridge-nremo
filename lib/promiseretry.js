class PromiseRetry {
  constructor(retries, timeout) {
    this._retries = retries || 3;
    this._timeout = timeout || 2000;
  }

  async run(promise_func) {
    const counter = 1;
    return new Promise((resolve, reject) => {
      const retry = async (promise_func, counter) => {
        try {
          resolve(await promise_func());
        } catch (error) {
          setTimeout(() => {
            console.error(`retry:${counter}`);
            if (counter < this._retries) {
              counter++;
              retry(promise_func, counter);
            } else {
              reject(error);
            }
          }, this._timeout);
        }
      };

      const callback = async promise_func => {
        try {
          resolve(await promise_func());
        } catch (error) {
          retry(promise_func, counter);
        }
      };

      //1st
      callback(promise_func);
    });
  }
}

module.exports = PromiseRetry;
