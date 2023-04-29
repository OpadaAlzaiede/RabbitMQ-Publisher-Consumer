import {Publisher} from './Publisher.js';
import {Consumer} from './Consumer.js';

const publisher = new Publisher();
const consumer = new Consumer();

publisher.sendMessage('queue1', {msg: 'hello'});
consumer.consume('queue1');


