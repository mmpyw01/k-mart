const Card = require("../models/Card");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newCard = new Card(req.body);

  try {
    const savedCard = await newCard.save();
    res.status(200).json(savedCard);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCard);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json("Card has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CARD
router.get("/find/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CARDS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let cards;

    if (qNew) {
      cards = await Card.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      cards = await Card.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      cards = await Card.find();
    }

    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;