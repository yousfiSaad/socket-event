import MultiEvent from 'multi-event';

class SocketEvent extends MultiEvent{
  constructor({io, socket}){
    super();
    this._io = io;
    this._socket = socket;
    this._pipedEventsSet = new Set();
  }

  remoteEmit(eventName, arg){
    // FIXME:
    (this._io || this._socket).emit(eventName, arg);
  }

  localEmit(eventName, arg){
    super.emit(eventName, args);
  }

  emit(...args) {
    this.remoteEmit(...args);
    this.localEmit(...args);
  }

  on(eventName, callBack){
    super.on(eventName, callBack);
    this.pipeFromRemote({eventName});
  }
  //private
  pipeFromSocket({eventName, socket = this._socket}){
    socket.on(eventName, (...args)=>{
      super.emit(eventName, ...args);
    });
  }
  pipeFromRemote({eventName}){
    if(! this._pipedEventsSet.has(eventName)){
      if(this._socket){
        this.pipeFromSocket({eventName})
      }else{
        this._io.on('connection', (socket)=>{
          this.pipeFromSocket({eventName, socket});
        });
      }
      this._pipedEventsSet.add(eventName);
    }
  }
}

export default SocketEvent;
