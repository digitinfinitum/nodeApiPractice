const User = require("../models/UserModel");
const Category = require("../models/CategoryModel");
const Project = require("../models/ProjectModel");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
const jwt = require("jsonwebtoken");
module.exports = {
  //get all users
  getUsers: async (req, res, next) => {
    const users = await User.find({}).sort({ _id: -1 });
    res.status(200).json(users);
  },
  //get users by id
  getUserById: async (req, res, next) => {
    const { userId } = req.value.param;
    const user = await User.findById(userId);
    res.status(200).json({ user: user });
  },
  //edit the user by id
  editUser: async (req, res, next) => {
    const { firstName, secondName, email, userName, password } = req.value.body;
    const { userId } = req.value.param;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      firstName,
      secondName,
      email,
      userName,
      password: hashedPassword
    };
    await User.findByIdAndUpdate(userId, newUser);

    res.status(200).json({
      user: {
        _id: userId,
        firstName: newUser.firstName,
        secondName: newUser.secondName,
        email: newUser.email,
        userName: newUser.userName
      },
      msg: "L'Utilisateur a bien été modifié !"
    });
  },
  //delete user by id
  deleteUser: async (req, res, next) => {
    const { userId } = req.value.param;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json({ msg: "User deleted", user: { _id: userId } });
  },
  //get all users pages
  getUserPages: async (req, res, next) => {
    const { userId } = req.value.param;
    const userPages = await User.findById(userId).populate("pages");
    res.status(200).json(userPages);
  },
  //user regilstation
  postUser: async (req, res, next) => {
    const { firstName, secondName, email, userName, password } = req.value.body;
    const user = await User.findOne({ userName: userName });
    if (user) return res.status(400).json({ msg: "Utilisateur déjà existant" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      secondName,
      email,
      userName,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({
      msg: "Utlisateur a bien été crée",
      user: newUser
    });
  },
  //post a page by a authenticated  user
  postUserPage: async (req, res, next) => {
    const { name, content } = req.value.body;
    const { userId } = req.value.param;
    const newPage = {
      name,
      content,
      slug: slugify(name.toLowerCase())
    };
    const userPage = User.findById(userId);
    newPage.user = userPage;
    await newPage.save();
    userPage.pages.push(newPage);
    await userPage.save();
    res.stauts(201).json({ msg: "Page created !" });
  },
  //create a category by athenticated user
  postUserCategory: async (req, res, next) => {
    const { name } = req.value.body;
    const { userId } = req.value.param;
    const newCategory = new Category({
      name,
      slug: slugify(name.toLowerCase())
    });
    const userPage = User.findById(userId);
    newCategory.user = userPage;
    await newCategory.save();
    userPage.categories.push(newCategory);
    await userPage.save();
    res.status(201).json({ msg: "Categorie created !" });
  },
  // add a made project  by autenticated user
  postUserProject: async (req, res, next) => {
    const { name, description, image, link } = req.value.body;
    const { userId } = req.value.param;
    const newProject = new Project({
      name,
      description,
      image,
      link,
      slug: slugify(name.toLowerCase())
    });
    const user = await User.findById(userId);
    newProject.user = user;
    await newProject.save();
    user.projects.push(newProject);
    await user.save();
    res.status(201).json({ msg: "Project created !" });
  },
  //add a new partener by authentocated user
  postUserPartner: async (req, res, next) => {
    const { userId } = req.value.param;
    const newPartner = req.value.body;
    const user = User.findById(userId);
    newPartner.user = user;
    await newPartner.save();
    user.partners.push(newPartner);
    await user.save();
    res.status(201).json({ msg: "Partner created !" });
  },
  //function allows us to make authentication to connect to the backoffice
  login: async (req, res, next) => {
    const { userName, password } = req.value.body;
    const user = await User.findOne({ userName });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Les pseudo ou mot de passse sont inccorect !" });
    const validPassord = await bcrypt.compare(password, user.password);

    if (!validPassord)
      return res.status(400).json({ msg: "Mot de passe inccorect !" });
    const token = jwt.sign({ _id: user._id }, process.env.salt, {
      expiresIn: 3600
    });

    res.header("token", token).send({
      token,
      user: {
        firestName: user.firstName,
        secondName: user.secondName,
        email: user.email
      }
    });
  },

  getAuthUser: async (req, res, next) => {
    console.log(req.user);

    const { _id } = req.user;
    const user = await User.findOne({ _id: _id }).select("-password");
    res.status(200).json(user);
  }
};
