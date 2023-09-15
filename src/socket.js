import Vue from "vue";
import { io } from "socket.io-client";
import { url } from "./constants/config";

export const state = Vue.observable({
  connected: false,
  fooEvents: [],
  barEvents: []
});

const URL = url;

export const socket = io(
  URL,
  {
    transports: ["websocket"],
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    auth: {
      token: localStorage.getItem("authorization")
    }

  }
);

socket.on("connect", () => {
  state.connected = true;
  console.log("connected");
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log("disconnected");
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});