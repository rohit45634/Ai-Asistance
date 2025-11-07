import { response } from "express";
import uploadCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/userSchema.js";
import moment from "moment/moment.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "get currentuser error" });
  }
};
export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;
    if (req.file) {
      assistantImage = await uploadCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        assistantName,
        assistantImage,
      },
      { new: true }
    ).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Update assistant error:", error);

    res.status(400).json({ message: "update assitant error" });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    user.history.push(command);
    user.save();
    const username = user.name;
    const assistantName = user.assistantName;
    const result = await geminiResponse(command, assistantName, username);
    console.log(result);
    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.status(400).json({ response: "sorry i cant understand" });
    }
    const gemResult = JSON.parse(jsonMatch[0]);
    console.log(gemResult);
    const type = gemResult.type;
    switch (type) {
      case "get_date":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get_time":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `current time is ${moment().format("hh:mm:ss A")}`,
        });
      case "get_day":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `today  is ${moment().format("dddd")}`,
        });
      case "get_month":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `today is ${moment().format("MMMM")}`,
        });
      case "general":
      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather_show":
      case "chatgpt_open":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });
      default:
        return res.status(500).json({
          response: "I didn't understand that command ",
        });
    }
  } catch (error) {
    return res.status(500).json({ response: "ask assistant Error " });
  }
};
