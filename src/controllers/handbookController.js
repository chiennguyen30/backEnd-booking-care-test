import handbookServices from "../services/handbookServices";
let postCreateNewHandbook = async (req, res) => {
  try {
    let data = await handbookServices.postCreateNewHandbookServices(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form the server",
    });
  }
};

let getAllHandbook = async (req, res) => {
  try {
    let data = await handbookServices.getHandbookServices();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form the server",
    });
  }
};

let getDetailHandbookById = async (req, res) => {
  try {
    let data = await handbookServices.getDetailHandbookByIdServices(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form the server",
    });
  }
};
module.exports = {
  postCreateNewHandbook,
  getAllHandbook,
  getDetailHandbookById,
};
