# homebridge-nremo
Nature RemoをSiriで操作できるようにする(on/offのみ)

# Configuration
```JSON
  "accessories": [
    {
      "name": "Lamp A",
      "accessory": "NatureRemo",
      "host": "Remo-XXXX.local",
      "path": "/messages",
      "delay": "0",
      "on": { "format": "us", "freq": 38, "data": [] },
      "off": { "format": "us", "freq": 38, "data": [] }
    },
    {
      "name": "Lamp B",
      "accessory": "NatureRemo",
      "host": "Remo-XXXX.local",
      "path": "/messages",
      "delay": "800",
      "on": { "format": "us", "freq": 38, "data": [] },
      "off": { "format": "us", "freq": 38, "data": [] }
    }
  ],
```
delayを設定するとシーンで同時にリクエストが送られたときに動くようになる
