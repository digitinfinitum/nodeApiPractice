const Category = require("../models/CategoryModel");
const Project = require("../models/ProjectModel");
const slugify = require("slugify");
module.exports = {
  //get all categories s
  getCategories: async (req, res, next) => {
    const categories = await Category.find({}).sort({ _id: -1 });
    res.status(200).json(categories);
  },
  //get a category by slug
  getCategoryId: async (req, res, next) => {
    const { categoryId } = req.value.param;
    const category = await Category.findById(categoryId);
    res.status(200).json({ category });
  },
  //get a category by slug
  getCategoryBySlug: async (req, res, next) => {
    const { slug } = req.value.param;
    const category = await Category.find({ slug: slug });
    res.status.json({ category });
  },
  //post a categoy
  postCategory: async (req, res, next) => {
    const { name } = req.value.body;
    const newCategory = new Category({
      name,
      slug: slugify(name.toLowerCase())
    });
    const savedCategory = await newCategory.save();
    res
      .status(201)
      .json({ msg: "La catégorie a bien été ajouté", category: savedCategory });
  },
  //get all projects belongs to a category by category id
  getCategoriesProjects: async (req, res, next) => {
    const { categoryId } = req.value.param;
    const category = await Category.findById(categoryId).populate("projects");
    res.status(200).json(category.projects);
  },
  //post porject with his category
  postCategoryProject: async (req, res, next) => {
    const { name, description, image } = req.value.body;
    const { categoryId } = req.value.param;
    const newProject = new Project({
      name,
      description,
      image,
      slug: slugify(name.toLowerCase())
    });
    const projectCategory = await Category.findById(categoryId);
    newProject.category = projectCategory;
    await newProject.save();
    projectCategory.projects.push(newProject);
    await projectCategory.save();
    res.status(201).json(newProject);
  },
  //edit a category by id
  editCategory: async (req, res, next) => {
    const { name } = req.value.body;
    const { categoryId } = req.value.param;
    const newCategory = {
      name,
      slug: slugify(name.toLowerCase())
    };

    await Category.findByIdAndUpdate(categoryId, newCategory);
    res.status(200).json({
      category: {
        _id: categoryId,
        name: newCategory.name,
        slug: newCategory.slug
      },
      msg: "Category a bien été modifié"
    });
  },
  // delete a category by id
  deleteCategory: async (req, res, next) => {
    const { categoryId } = req.value.param;
    const deleteCategory = await Category.findByIdAndDelete(categoryId);
    res.status(200).json({
      category: { _id: categoryId },
      msg: "La categorie a bien été supprimé"
    });
  }
};
