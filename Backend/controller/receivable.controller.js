const receivables = require("../service/receivable.service");

async function allCredit(req, res) {
  try {
    const creditData = await receivables.getAllcreditdata();
    res.status(200).json({ data: creditData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getCreditbyid(req,res){
    const id = req.params.id;
    console.log(id);
   try {
     const creditData = await receivables.getsinglecredit(id);
      if (!creditData.length) {
        return res.status(404).json({ msg: "sales not found" });
      }
     return res.status(200).json({ data: creditData });
   } catch (error) {
     console.log(error);
     res.status(500).json({ error: "Internal server error" });
   }
}
module.exports = {
  allCredit,
  getCreditbyid,
};
