import Koa from 'koa2'
import http from 'http';
import logsUtil from './utils/logs.js';
import conf from './config'
import { Client } from "./rabbitMQ";
import Constants from './configuration/constants'

const MQ_MSG_CONST = Constants.MQ_MSG;
const MQERR = Constants.ERRORS.MQERR;
const app = new Koa();
new Client().then((res) => {
  logsUtil.logMQ(MQ_MSG_CONST.CONNECT_TYPE, 'MQ连接成功！');
  global.MQ = res.client;
  return global.MQ.startMQ();
}).catch((e) => {
  logsUtil.logMQ(MQERR.ERR_WHEN_CONNECT, e);
});
let server = http.createServer(app.callback());
server.listen(conf.port, function listening() {
  logsUtil.logInfo(`服务器启动成功！端口：${ conf.port}`);
});
