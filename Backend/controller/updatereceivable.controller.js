const creditUpdator = require("../service/updatereceivable.service")
 async function updator (req, res)  {
   id = req.params.id;
     console.log("updator " + id);
   const { payment_type, remaining_balance } = req.body;
   try {
     const request = await creditUpdator.updateTransaction(
       payment_type,
       remaining_balance,
       id
     );
     if (!request) {
       res.status(400).json({ error: "Failed to update Transction" });
     } else {
       console.log(request);
       res.status(200).json({
         status: "true",
         message: "Transction updated successfully",
       });
     }
   } catch (error) {
     console.log(error);
     res.status(500).json({ error: "Internal server error" });
   }
 };
 module.exports = {
   updator
 };