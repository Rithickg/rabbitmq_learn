import amqplib from 'amqplib'

const queueName = "Task"

const receiveMessage = async () => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {
        durable: true
    })
    console.log("Waiting for the messages in queue :", queueName)
    channel.prefetch(1)
    channel.consume(queueName, (msg) => {
        const secs = msg.content.toString().split('.').length - 1
        console.log("Received:", msg.content.toString())
        setTimeout(() => {
            console.log("Done the work process")
            channel.ack(msg)
        }, secs * 1000)
    }, { noAck: false })
}

receiveMessage()