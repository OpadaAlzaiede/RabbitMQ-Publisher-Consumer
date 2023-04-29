import amqp from 'amqplib'

export class Publisher {

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

    async sendMessage(queue, message) {

        try {
            await this.connect();

            const channel = await this.connection.createChannel();
            channel.assertQueue(queue);
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

            console.log(`Message: ${JSON.stringify(message)} Sent Successfully !`);
        }
        catch(ex) {
            console.error(ex);
        }
    }
}
