import { Multimap } from "./Multimap";

const multimap = new Multimap();
const val3 = ['val5', 'val6'];
multimap.put('key', ['val1', 'val2']);
multimap.put('key', ['val3', 'val4']);
multimap.put('key', val3);
multimap.put('key1', val3);
console.log(multimap);
console.log(multimap.entries());
console.log(multimap.remove('key', val3))
console.log(multimap.keys());
console.log('Has key1?', multimap.hasKey('key1'));