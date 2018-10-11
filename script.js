import http from 'k6/http';
import { check, sleep } from 'k6';
//If you want to avoid having to type --vus 10 and --duration 30s
export let options = {
  vus: 500,
  rps: 2000,
  duration: '1m'
};
  

export default function() {
  var num = Math.floor(Math.random() * Math.floor(100));
  let res = http.get(`http://localhost:3003/artist/${num}`);
  check(res, {
    'status was 200': (r) => r.status === 200,
    'transaction time OK': (r) => r.timings.duration < 500
  });
}
