const http = require('http');
let Service;
let Characteristic;

module.exports = homebridge => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-nremo', 'NatureRemo', RemoAccessory);
};

class RemoAccessory {
  constructor(log, config) {
    this.log = log;
    this.name = config['name'];
    this.switchService = new Service.Switch(this.name);
    this.informationService = new Service.AccessoryInformation();
    this.config = config;
    this.order_on = config.command_order[0];
    this.order_off = config.command_order[1];
  }

  request(command, delay) {
    const options = {
      host: this.config['host'],
      path: this.config['path'],
      method: 'POST',
      headers: {
        'X-Requested-With': 'curl',
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(this.config[command]).length
      },
      timeout: 2500
    };

    return new Promise((resolve, reject) => {
      let data = '';
      const req = http.request(options, response => {
        if (response.statusCode != 200) {
          reject(new Error(response.statusCode));
        }
        response.on('data', chunk => {
          data += chunk.toString();
        });
        response.on('end', () => {
          setTimeout(
            () => resolve({ status: response.statusCode, response: data }),
            delay
          );
        });
      });
      req.on('timeout', () => {
        reject(new Error('Request Timeout'));
      });
      req.on('error', error => {
        reject(error);
      });
      req.write(JSON.stringify(this.config[command]));
      req.end();
    });
  }

  async setState(input_switch_state, next) {
    this.log(`Swtich: ${input_switch_state}`);

    let command_order;
    if (input_switch_state) {
      command_order = 'on';
    } else {
      command_order = 'off';
    }
    const pre = 'order_' + command_order;

    try {
      for (let i = 0; i < this[pre][command_order].length; i++) {
        const response = await this.request(
          this[pre][command_order][i],
          this.config.delay
        );
        this.log(`${this[pre][command_order][i]}: ${response.status}`);
      }
      next();
    } catch (error) {
      this.log(error.message);
      next(error);
    }
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
