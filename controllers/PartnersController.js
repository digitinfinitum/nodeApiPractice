// models
const Partner = require("../models/PartnerModel");

module.exports = {
  //get all parners
  getPartners: async (req, res, next) => {
    const partners = await Partner.find({});
    res.status(200).json(partners);
  },
  //get one partener by id
  getPartnerById: async (req, res, next) => {
    const { partnerId } = req.value.param;
    const Partner = await Partner.findById(partnerId);
    res.status(200).json(partner);
  },
  //add a new parner
  newPartner: async (req, res, next) => {
    const { name, image, link } = req.body;
    const partenr = await Partner.findOne({ name });
    if (partenr)
      return res.status(400).json({ msg: "Parenaire déjà existant" });
    const newPartner = new Partner({
      name,
      image,
      link
    });
    await newPartner.save();
    res.status(201).json({ msg: "Partner created !" });
  },
  //edit a partener  by id
  editPartner: async (req, res, next) => {
    const { partnerId } = req.value.param;
    const { name, image, link } = req.body;
    const newPartner = {
      name,
      image,
      link
    };
    await Partner.findByIdAndUpdate(partnerId, newPartner);
    res.status(200).json({ msg: "Partner Updated !" });
  },

  //delete a partner
  deletePartner: async (req, res, next) => {
    const { partnerId } = req.value.param;
    await Partner.findByIdAndDelete(partnerId);
    res
      .status(204)
      .json({
        msg: "Le partenaire a bien été supprimé !",
        partner: { _id: partenerId }
      });
  }
};
