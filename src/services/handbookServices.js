import db from "../models";
import _, { includes, reject } from "lodash"; //

let postCreateNewHandbookServices = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.author ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({ errCode: 1, errMessage: "Missing parameter" });
      } else {
        await db.Handbook.create({
          name: data.name,
          image: data.imageBase64,
          author: data.author,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error); // Reject the promise if an error occurs
    }
  });
};

let getHandbookServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Handbook.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errMessage: "ok",
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailHandbookByIdServices = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({ errCode: 1, errMessage: "Missing parameter" });
      } else {
        let data = await db.Handbook.findOne({
          where: { id },
          attributes: [
            "name",
            "author",
            "descriptionHTML",
            "descriptionMarkdown",
            "image",
            "createdAt",
            "updatedAt",
          ],
        });
        if (data && data.length > 0) {
          data.map((item) => {
            item.image = Buffer.from(item.image, "base64").toString("binary");
            return item;
          });
        }
        if (data) {
          let doctorHandbook = [];

          doctorHandbook = await db.Doctor_Infor.findAll({
            where: { handbookId: id },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorHandbook = doctorHandbook;
        } else data = {};
        resolve({
          errCode: 0,
          errMessage: "ok",
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  postCreateNewHandbookServices,
  getHandbookServices,
  getDetailHandbookByIdServices,
};
