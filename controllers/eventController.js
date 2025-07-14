const Event = require("../models/event");

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, user: req.userId });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user", "email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!event)
      return res.status(404).json({ error: "Not found or unauthorized" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!event)
      return res.status(404).json({ error: "Not found or unauthorized" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
