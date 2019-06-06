import { Message, MessageType, Showtype } from '@/model/Message'
import Vue from 'vue'

interface IMessageHelper {
  Message: (vm: Vue, message: Message) => void
}

class MessageHelper implements IMessageHelper {
  public static MessageInstance: MessageHelper = new MessageHelper()
  public Message(vm: Vue, message: Message) {
    if (message.Showtype === Showtype.Message) {
      if (message.MsgType === MessageType.Undefine) {
        return
      } else if (message.MsgType === MessageType.Info) {
        vm.$message({
          type: 'info',
          message: message.Msg,
          duration: message.Duration
        })
      } else if (message.MsgType === MessageType.Waring) {
        vm.$message({
          type: 'warning',
          message: message.Msg,
          duration: message.Duration
        })
      } else if (message.MsgType === MessageType.Error) {
        vm.$message({
          type: 'error',
          message: message.Msg,
          duration: message.Duration,
          showClose: true
        })
      } else if (message.MsgType === MessageType.Success) {
        vm.$message({
          type: 'success',
          message: message.Msg,
          duration: message.Duration
        })
      }
    } else if (message.Showtype === Showtype.Notification) {
      if (message.MsgType === MessageType.Undefine) {
        return
      } else if (message.MsgType === MessageType.Info) {
        vm.$notify({
          title: 'info',
          message: message.Msg,
          duration: message.Duration
        })
      } else if (message.MsgType === MessageType.Waring) {
        vm.$notify({
          title: 'warning',
          message: message.Msg,
          duration: message.Duration
        })
      } else if (message.MsgType === MessageType.Error) {
        vm.$notify({
          title: 'error',
          message: message.Msg,
          duration: message.Duration,
          showClose: true
        })
      } else if (message.MsgType === MessageType.Success) {
        vm.$notify({
          title: 'success',
          message: message.Msg,
          duration: message.Duration
        })
      }
    }
  }
}

export default MessageHelper
