import { genToken } from "../config/genToken.js";
import { publishToQueue } from "../config/rabbitmq.js";
import TryCatch from "../config/TryCatch.js";
import { redisClient } from "../index.js";
import { User } from "../model/User.js";
export const loginUser = TryCatch(async (req, res) => {
    const { email } = req.body;
    const rateLimitKey = `otp:ratelimit:${email}`;
    const rateLimit = await redisClient.get(rateLimitKey);
    if (rateLimit) {
        res.status(429).json({
            message: "too many requests. please wait before requesting new otp",
        });
        return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpKey = `otp:${email}`;
    await redisClient.set(otpKey, otp, {
        EX: 300,
    });
    await redisClient.set(rateLimitKey, "true", {
        EX: 60,
    });
    const message = {
        to: email,
        subject: "Your Otp Code",
        body: `your chat app otp is ${otp}. it is valid for 5 minutes`,
    };
    await publishToQueue("send-otp", message);
    res.status(200).json({
        message: "otp send to your email",
    });
});
export const verifyUser = TryCatch(async (req, res) => {
    const { email, otp: enteredOtp } = req.body;
    if (!email || !enteredOtp) {
        res.status(400).json({
            message: "Email and Otp required",
        });
        return;
    }
    const otpKey = `otp:${email}`;
    const storedOtp = await redisClient.get(otpKey);
    if (!storedOtp || storedOtp !== enteredOtp) {
        res.status(400).json({
            message: "invalid or expired otp",
        });
        return;
    }
    await redisClient.del(otpKey);
    let user = await User.findOne({ email });
    if (!user) {
        const name = email.slice(0, 8);
        user = await User.create({ name, email });
    }
    const token = genToken(user);
    res.json({
        message: "user verified",
        user,
        token,
    });
});
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    res.json(user);
});
export const updateUser = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(400).json({
            message: "please login first",
        });
        return;
    }
    user.name = req.body.name;
    await user.save();
    const token = genToken(user);
    res.json({
        mesage: "name updated successfully",
        user,
        token,
    });
});
//# sourceMappingURL=user.js.map