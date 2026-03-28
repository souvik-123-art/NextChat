import amqp from "amqplib";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const startSendOtpConsumer = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST,
            port: 5672,
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASS,
        });
        const channel = await connection.createChannel();
        const queueName = "send-otp";
        await channel.assertQueue(queueName, { durable: true });
        console.log("🙌 mail service consumer started, listening for otp emails");
        channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    const { to, subject, body } = JSON.parse(msg.content.toString());
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        auth: {
                            user: process.env.NODEMAILER_USER,
                            pass: process.env.NODEMAILER_PASSWORD,
                        },
                    });
                    await transporter.sendMail({
                        from: "NextChat",
                        to,
                        subject,
                        text: body,
                    });
                    console.log(`otp mail send to ${to}`);
                    channel.ack(msg);
                }
                catch (error) {
                    console.log("failed to send otp", error);
                }
            }
        });
    }
    catch (error) {
        console.log("failed to start rabbitmq consumer", error);
    }
};
//# sourceMappingURL=consumer.js.map