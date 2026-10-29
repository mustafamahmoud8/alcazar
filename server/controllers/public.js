const Item = require("../models/item");
const Category = require("../models/category");
const Subscription = require("../models/subscription");
const { thanksOnContactWithMe } = require("../mails/thanksOnContactWithMe");
const { sendMail } = require("../utils/sendMail");
const { contactMessageContent } = require("../mails/contactMessageContent");

const getItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findOne({ _id: itemId }).populate("admin");
    if (item) {
      res.status(200).json({ item });
    } else {
      res.status(404).json({ error: "Item isn't Found" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getItems = async (req, res, next) => {
  try {
    const { search, sort, category, dimension, page = 1, limit = 20 } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = {
      title: { $regex: search ? search : "", $options: "i" },
      ...(category && { category: { $regex: category } }),
      ...(dimension && { dimensions: { $in: JSON.parse(dimension) } }),
    };

    const [items, total] = await Promise.all([
      Item.find(filter).populate("admin").sort(sort).skip(skip).limit(parseInt(limit)),
      Item.countDocuments(filter),
    ]);

    res.status(200).json({
      items: items.reverse(),
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getCategories = async (req, res, next) => {
  try {
    const { search, sort } = req.query
    const categories = await Category.find({ title: { $regex: search ? search : "", $options: "i" }, }).populate("admin").sort(sort);
    res.status(200).json({ categories });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getDimensions = async (req, res, next) => {
  try {
    const result = await Item.aggregate([
      { $unwind: "$dimensions" },
      { $group: { _id: "$dimensions" } },
      { $project: { _id: 0, dimension: "$_id" } }
    ]);
    const dimensions = result.map(r => r.dimension);
    res.status(200).json({ dimensions });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const confirmSubscriptedEmail = async (req, res, next) => {
  try {
    const { subscriptedEmailId } = req.params
    const subscriptedEmailIsExist = await Subscription.findOne({ _id: subscriptedEmailId })
    if (subscriptedEmailIsExist) {
      await Subscription.findOneAndUpdate({ _id: subscriptedEmailId }, { confirmed: true })
      return res.status(200).json({ message: "Subscripted Email is Confirmed Successfully!!" });
    } else {
      return res.status(404).json({ error: "Subscripted Email isn't Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const contactWithMe = async (req, res, next) => {
  try {
    const { email, subject, name, message } = req.body
    sendMail(email, "Thank You A lot 😍", thanksOnContactWithMe())
    sendMail(process.env.OFFICIAL_EMAIL, subject, contactMessageContent(name, message))
    res.status(200).json({ message: "Message is Sent Successfully!!" })
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

module.exports = {
  getItems,
  getItem,
  getCategories,
  getDimensions,
  contactWithMe,
  confirmSubscriptedEmail
};
