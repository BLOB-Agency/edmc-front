import EventEmitter from "eventemitter3";

const loginEventEmitter = new EventEmitter();
export const useLoginEventEmitter = () => loginEventEmitter;