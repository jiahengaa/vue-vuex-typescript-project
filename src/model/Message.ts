export const enum MessageType {
  Undefine = -1,
  Waring = 0,
  Success = 1,
  Info = 2,
  Error = 3
}
export const enum Showtype {
  Message = 0,
  Alert = 1,
  Loading = 2,
  MessageBox = 3,
  Notification = 4
}

export interface Message {
  MsgType: MessageType
  Msg: string
  Duration: number
  Showtype: Showtype
}
