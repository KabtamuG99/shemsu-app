const statement = require("../service/statement.service")

async function allsales(req, res) {
  try {
    const statementdata = await statement.getAllsalesdata();
    res.status(200).json({ data: statementdata });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports ={
allsales
} 
