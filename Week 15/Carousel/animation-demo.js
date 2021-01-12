import {TimeLine, Animation} from './animation'

let tl = new TimeLine();

tl.start();


tl.add(new Animation({set a(v) {console.log(v)}}, "a", 0, 100, 1000, null));