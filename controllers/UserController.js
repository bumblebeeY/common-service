/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2019/4/25
 * 历史修订：
 */
import BaseController from './BaseController';
import logsUtil from "../utils/logs";

export default class UserController extends BaseController {
  constructor() {
    super();
  }

  /**
   * 查询用户列表
   * @param ch
   * @param msg
   * @param params
   * @returns {Promise<void>}
   */
  static async getUserList(ch, msg, params) {
    try {
      let content = this.generateErrRes(10001);
      this.replyMsg(ch, msg,content)
    } catch (e) {
      let content = this.generateErrRes(10001);
      this.replyMsg(ch, msg, content)
    }
  }
}