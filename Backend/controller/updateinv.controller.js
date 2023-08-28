const serviceupdator = require("../service/updateinv.service");

async function quantityUpdator(req, res) {
  const id = req.params.id;
  const { quantity} = req.body; // Get quantity and price from the request body
  console.log("updator" + id);

  try {
    const adjust = await serviceupdator.quantityUpdator(id, quantity);

    if (!adjust) {
      res.status(400).json({ error: "Failed to update inventory_quantity" });
    } else {
      console.log(adjust);
      res.status(200).json({
        status: "true",
        message: "quantity updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }


}

async function priceUpdator(req, res) {
    const id = req.params.id;
    const { inventory_price } = req.body; // Get quantity and price from the request body
    console.log("updator" + id);
  try {
    const adjust = await serviceupdator.priceUpdator(id, inventory_price);

    if (!adjust) {
      res.status(400).json({ error: "Failed to update inventory_price" });
    } else {
      console.log(adjust);
      res.status(200).json({
        status: "true",
        message: "inventory_price updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  quantityUpdator,
  priceUpdator,
};
