const serviceinv = require("../service/inventory.service");


async function addinventory(req, res, next) {
  console.log(req.body);
  const inventorydata = req.body;
       const check = await serviceinv.checkinventory(inventorydata);
       if (check) {
        res.status(400).json({
          error: "This inventory alrady exist !",
        });
       }else try {
    const additem = await serviceinv.adder(inventorydata);
    if (!additem) {
      res.status(400).json({
        error: "Failed to add the inventory!",
      });
    } else if (additem) {
      console.log(additem);
      res.status(200).json({
        status: "true",
        message: "inventory added sucessesfuly",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}
async function allinventory(req, res) {
  try {
    const inventoryData = await serviceinv.getAllinventory();
    res.status(200).json({ data: inventoryData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}



async function getinventorybyid(req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const inventoryData = await serviceinv.inventorybyid(id);
    if (!inventoryData.length) {
      return res.status(404).json({ msg: "Inventory not found" });
    }
    return res.status(200).json({ data: inventoryData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function updator(req, res) {
  const id = req.params.id;
  console.log("updator" + id);
  try {
    const adjust = await serviceinv.dataupdator(quan, post);
    if (!adjust) {
      res.status(400).json({ erroe: "failed to update data" });
    } else adjust;
    console.log(adjust);
    res.status(200).json({
      status: "true",
      message: "inventory updated sucessesfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

  module.exports = {
    addinventory,
    allinventory,
    getinventorybyid,
    updator,
  };
