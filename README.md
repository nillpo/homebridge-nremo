# homebridge-nremo
[![npm package](https://nodei.co/npm/homebridge-nremo.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/homebridge-nremo/)

Nature RemoをSiriで操作できるようにする(on/offのみ)

# Configuration
```JSON
  "accessories": [
    {
      "name": "Room Lamp A",
      "accessory": "NatureRemo",
      "host": "Remo-XXXX.local",
      "path": "/messages",
      "delayBefore": 0,
      "delayAfter": 0,
      "timeout": 2000,
      "retry_interval": 500,
      "retry": 3,
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
      "delayBefore": 1000,
      "delayAfter": 1000,
      "timeout": 2000,
      "retry_interval": 500,
      "retry": 3,
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
      "delayBefore": 500,
      "delayAfter": 800,
      "timeout": 2000,
      "retry_interval": 500,
      "retry": 3,
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
on/off時にcommand_orderのon/offごとの[]で指定したコマンドをdelayAfterで指定した時間ごとに送信する
* delayBefore: コマンド送信前に指定時間分だけ待つ(Aアクセサリ実行後に実行後Bアクセサリ実行などのシーン利用時に便利)
* delayAfter: on/off実行時に[]内のコマンドを指定時間ごとに送信できる(同時に送るとNature Remoが反応しない)
* retry: リクエストが失敗したときに再試行する回数
* retry_interval: 再試行するまでの時間
* timeout: リクエストがタイムアウトするまでの時間

**Nature Remoにアクセスがしばらくないと1回目のリクエスト時にタイムアウトするのでtimeoutで短めに設定するのがよさそう**