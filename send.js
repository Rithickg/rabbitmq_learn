import amqplib from 'amqplib'

const queueName = "Task"
const message = process.argv.slice(2).join('') || "This is RabbitMq"

const sendMessage = async () => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {
        durable: true
    })

    channel.sendToQueue(queueName, Buffer.from(message), {
        persistent: true
    })
    console.log('Sent:', message)

    setTimeout(() => {
        connection.close();
        process.exit(0)
    }, 500)
}

sendMessage()