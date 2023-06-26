require("dotenv").config();
require("../Database/database");
const express = require("express");
const userData = require("../Models/user");
const videodata = require("../Models/videos");
const Likes = express.Router();

Likes.post("/like/:id/:email", async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.params.email;

    const video = await videodata.findOne({ "VideoData._id": id });
    const user = await userData.findOne({ email });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const videoIndex = video.VideoData.findIndex(
      (data) => data._id.toString() === id
    );

    if (videoIndex === -1) {
      return res.status(404).json({ error: "Video not found" });
    }

    const likedData = video.VideoData[videoIndex];

    const existingLikedVideo = user.likedVideos.find(
      (likedVideo) => likedVideo.likedVideoID === likedData._id.toString()
    );

    if (!existingLikedVideo) {
      user.likedVideos.push({
        videoURL: likedData.videoURL,
        thumbnailURL: likedData.thumbnailURL,
        uploader: likedData.uploader,
        ChannelProfile: likedData.ChannelProfile,
        Title: likedData.Title,
        videoLength: likedData.videoLength,
        views: likedData.views,
        uploaded_date: likedData.uploaded_date,
        likedVideoID: likedData._id,
      });
      video.VideoData[videoIndex].likes += 1;
    } else {
      user.likedVideos = user.likedVideos.filter(
        (likedVideo) => likedVideo.likedVideoID !== likedData._id.toString()
      );
      video.VideoData[videoIndex].likes -= 1;
    }

    await user.save();
    await video.save();
  } catch (error) {
    res.json(error.message);
  }
});

Likes.get("/getlike/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const video = await videodata.findOne({ "VideoData._id": id });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    const videoIndex = video.VideoData.findIndex(
      (data) => data._id.toString() === id
    );

    if (videoIndex === -1) {
      return res.status(404).json({ error: "Video not found" });
    }

    const likes = video.VideoData[videoIndex].likes;

    res.json(likes);
  } catch (error) {
    res.json(error.message);
  }
});

Likes.get("/getuserlikes/:id/:email", async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.params.email;

    const video = await videodata.findOne({ "VideoData._id": id });
    const user = await userData.findOne({  });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const videoIndex = video.VideoData.findIndex(
      (data) => data._id.toString() === id
    );

    if (videoIndex === -1) {
      return res.status(404).json({ error: "Video not found" });
    }

    const likedData = video.VideoData[videoIndex];

    const existingLikedVideo = user.likedVideos.find(
      (likedVideo) => likedVideo.likedVideoID === likedData._id.toString()
    );

    res.json({ existingLikedVideo });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = Likes;
