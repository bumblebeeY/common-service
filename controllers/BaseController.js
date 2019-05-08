/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2019/5/5
 * 历史修订：
 */
import logsUtil from '../utils/logs.js';
import Constants from '../configuration/constants'

const MQ_MSG_CONST = Constants.MQ_MSG;
const CODEERR = Constants.ERRORS.CODEERR;
export default class BaseController {
  constructor() {

  }

  /**
   * 回复MQ消息
   * @param ch
   * @param msg
   * @param content
   */
  static replyMsg(ch, msg, content) {
    try {
      logsUtil.logMQ(MQ_MSG_CONST.SEND_TYPE, JSON.stringify(content))
      ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(content)),
        { correlationId: msg.properties.correlationId });
      //ack表示消息确认机制。这里我们告诉rabbitmq消息接收成功。
      ch.ack(msg);
    } catch (e) {
      logsUtil.logMQ(MQ_MSG_CONST.ERR_WHEN_SEND, JSON.stringify(content))
    }
  }

  static generateErrRes(code) {
    return {
      code: code,
      data: "",
      msg: CODEERR[code]
    }
  }
}