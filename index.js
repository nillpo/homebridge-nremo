const http = require('http');
let Service;
let Characteristic;

module.exports = homebridge => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory(
    'homebridge-nremo',
    'NatureRemo',
    RemoAccessory
  );
};

class RemoAccessory {
  constructor(log, config) {
    this.log = log;
    this.name = config['name'];
    this.switchService = new Service.Switch(this.name);
    this.informationService = new Service.AccessoryInformation();
    this.config = config;
  }

  request(command) {
    const options = {
      host: this.config['host'],
      path: this.config['path'],
      method: 'POST',
      headers: {
        'X-Requested-With': 'curl',
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(this.config[command]).length
      }
    };

    return new Promise((resolve, reject) => {
      let data = '';
      const req = http.request(options, response => {
        if (response.statusCode != 200) {
          reject(new Error(resolve.statusCode));
        }
        response.on('data', chunk => {
          data += chunk.toString();
        });
        response.on('end', () => {
          resolve({ status: response.statusCode, response: data });
        });
      });
      req.on('error', error => {
        reject(error);
      });
      req.write(JSON.stringify(this.config[command]));
      req.end();
    });
  }

  setState(inputSwitchState, next) {
    this.log(`Swtich: ${inputSwitchState}`);

    let command;
    if (inputSwitchState) {
      command = 'on';
    } else {
      command = 'off';
    }

    setTimeout(() => {
      this.request(command)
        .then(status => {
          this.log(`status code:${status.status} ${status.response}`);
          next();
        })
        .catch(error => {
          this.log(error);
          next(error);
        });
    }, this.config['delay']);
  }

  getServices() {
    this.log(`start homebridge Server ${this.name}`);

    this.informationService
      .setCharacteristic(Characteristic.Manufacturer, 'Nature')
      .setCharacteristic(Characteristic.Model, 'Remo')
      .setCharacteristic(Characteristic.SerialNumber, '123-457-000');

    this.switchService
      .getCharacteristic(Characteristic.On)
      .on('set', this.setState.bind(this));
    return [this.informationService, this.switchService];
  }

  identify(callback) {
    this.log(`called ${this.config['name']}`);
    callback();
  }
}
