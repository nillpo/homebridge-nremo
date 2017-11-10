# homebridge-nremo
Nature RemoをSiriで操作できるようにする(on/offのみ)

# Configuration
```JSON
  "accessories": [
    {
      "name": "Room Lamp A",
      "accessory": "NatureRemo",
      "host": "Remo-XXXX.local",
      "path": "/messages",
      "delay": "0",
      "on": { "format": "us", "freq": 38, "data": [] },
      "off": { "format": "us", "freq": 38, "data": [] },
      "command_order": [
        { "on": ["on"] },
        { "off": ["off"] }
      ]
    },
    {
      "name": "Lamp A",
      "accessory": "NatureRemo",
      "host": "Remo-XXXX.local",
      "path": "/messages",
      "delay": "1000",
      "on": { "format": "us", "freq": 38, "data": [] },
      "off": { "format": "us", "freq": 38, "data": [] },
      "command_order": [
        { "on": ["on", "off", "on", "off"] },
        { "off": ["on", "off"] }
      ]
    },
    {
      "name": "Lamp B",
      "accessory": "NatureRemo",
      "host": "Remo-XXXX.local",
      "path": "/messages",
      "delay": "800",
      "s_on": { "format": "us", "freq": 38, "data": [] },
      "s_middle": { "format": "us", "freq": 38, "data": [] },
      "s_off": { "format": "us", "freq": 38, "data": [] },
      "command_order": [
        { "on": ["s_on", "s_middle", "s_off"] },
        { "off": ["s_off"] }
      ]
    }
  ],
```
on/off時にcommand_orderのon/offごとの[]で指定したコマンドをdelayで指定した時間ごとに送信する