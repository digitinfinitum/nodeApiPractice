const Page = require("../models/pageModel");
const slugify = require("slugify");

module.exports = {
  //get all pages
  getPages: async (req, res, next) => {
    const pages = await Page.find({});
    res.status(200).json(pages);
  },
  //get one page by slug
  getPageBySlug: async (req, res, next) => {
    const { slug } = req.value.param;
    const page = await Page.find({ slug: slug });
    res.status(200).json({ page });
  },
  //create a new page
  newPage: async (req, res, next) => {
    const { name, content } = req.value.body;
    const page  = await Page.findOne({name});
    if(page)  return res.status(400).json({msg:"Page existante"})
    const newPage = new Page({
      name,
      content,
      slug: slugify(name.toLowerCase())
    });
    const savedPage = await newPage.save();
    res.status(201).json({ savedPage });
  },
  //edit page
  editPage: async (req, res, next) => {
    const { pageId } = req.value.param;
    const { name, content } = req.value.body;
    const newPage = {
      name,
      content,
      slug: slugify(name.toLowerCase())
    };
    await Page.findan(pageId, newPage);
    res.status(200).json({ msg: "Page Edited" });
  },
  //delete a page
  deletePage: async (req, res, next) => {
    const { pageId } = req.value.param;
    await Page.findByIdAndDelete(pageId);
    res.status(204).json({ msg: "Page deleted" });
  }
};
