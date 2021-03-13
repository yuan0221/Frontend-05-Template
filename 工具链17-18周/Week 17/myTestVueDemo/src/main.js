import HelloWorld from "./HelloWorld.vue";
import Vue from "Vue";

new Vue({
  el: "#app",
  // template: "<HelloWorld/>",
  // components: { HelloWorld }
  render: h => h(HelloWorld)
});