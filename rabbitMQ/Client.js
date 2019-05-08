/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2019/4/26
 * 历史修订：
 */
import amqp from 'amqplib';
import logsUtil from '../utils/logs.js';
import conf from '../config'
import Constants from '../configuration/constants'
import * as Controllers from '../controllers'

const MQ_CONST = Constants.MQ;
const MQ_MSG_CONST = Constants.MQ_MSG;
export default class Client {
  constructor() {
    this.conn = null;
    this.isConnected = false;
    return this.createConnect()
  }

  async createConnect() {
    try {
      const conn = await amqp.connect('amqp://' + conf.mq.user + ':' + conf.mq.password + '@' + conf.mq.host + ':' + conf.mq.port);
      this.isConnected = true;
      this.conn = conn;
      return { client: this };
    } catch (e) {
      logsUtil.logMQ(MQ_MSG_CONST.ERR_WHEN_CONNECT, e)
    }
  }

  async startMQ() {
    try {
      const ch = await this.conn.createChannel()
      return ch.assertQueue(MQ_CONST.QUEUE_COMMON).then(function (ok) {
        return ch.consume(MQ_CONST.QUEUE_COMMON, function (msg) {
          if (msg !== null) {
            const msgJson = JSON.parse(msg.content.toString());
            const { ctrl, func, params } = msgJson;
            Controllers[ctrl][func](ch, msg, params)
          } else {
            // Controllers['BaseController'][''](ch, msg, params)
          }
        });
      });
    } catch (err) {
      return logsUtil.logMQ(MQ_MSG_CONST.ERR_WHEN_SEND, err)
    }
  }
}