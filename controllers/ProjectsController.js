// models
const Category = require("../models/CategoryModel");
const Project = require("../models/ProjectModel");
const slugify = require("slugify");
module.exports = {
  //get all project s
  getProjects: async (req, res, next) => {
    const projects = await Project.find({}).sort({ _id: -1 });
    res.status(200).json({ projects });
  },
  //get a  project by id
  getProjectById: async (req, res, next) => {
    const { projectId } = req.value.param;
    const project = await Project.findById(projectId);
    res.status(200).json(project);
  },
  //get projects by slug
  getProjectBySlug: async (req, res, next) => {
    const { slug } = req.value.param;
    const project = await Project.findById({ slug: slug });
    res.status(200).json(project);
  },
  // add a new project
  newProject: async (req, res, next) => {
    const { name, description, image, link, category } = req.value.body;
    const isProjectExits = await Project.findOne({ name });
    if (isProjectExits)
      return response.status(400).json({ msg: "Projet déjà existant" });
    const cat = await Category.findById(category);
    const newProject = {
      name,
      description,
      image,
      link,

      slug: slugify(name.toLowerCase())
    };
    const project = new Project(newProject);
    await project.save();
    cat.projects.push(project);
    await cat.save();
    res.status(201).json({ msg: "Project created" });
  },
  editProject: async (req, res, next) => {
    const { projectId } = req.value.param;
    const { name, description, image, link } = req.valye.body;
    const newProject = {
      name,
      description,
      image,
      link
    };
    await Project.findByIdAndUpdate(projectId, newProject);
    res.status(200).json({
      project: {
        _id: projectId,
        name,
        description,
        image,
        link
      }
    });
  },
  deleteProject: async (req, res, next) => {
    const { projectId } = req.value.param;
    await Project.findByIdAndDelete(projectId);
    return res.status(200).json({
      msg: "Le projet a bien été supprimé",
      project: { _id: projectId }
    });
  }
};
