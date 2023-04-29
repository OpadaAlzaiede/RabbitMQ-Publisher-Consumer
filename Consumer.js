import amqp from 'amqplib';

export class Consumer {

    constructor() {
        this.connection = null;
    }

    async connect() {

        if(this.connection === null) {

            try {
                this.connection = await amqp.connect('amqp://localhost:5672');
            }
            catch(ex) {
                console.error(ex);
            }
        } 
    }

    async consume(queue) {

        try {
            await this.connect();

            const channel = await this.connection.createChannel();
            channel.assertQueue(queue);

            channel.consume(queue, message => {

                const msg = JSON.parse(message.content.toString());
                console.log(`Message: ${JSON.stringify(msg)} Recieved !`);

                channel.ack(message);

            });
        }
        catch(ex) {
            console.error(ex);
        }
    }
}