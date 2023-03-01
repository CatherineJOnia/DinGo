const router = require("express").Router();
const { User } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "isAdmin", "firstName", "lastName"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    res.json(
      await User.findByPk(req.params.userId, {
        attributes: ["id", "email", "isAdmin", "firstName", "lastName"],
      })
    );
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.send(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.send(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const deletedUser = await User.findByPk(req.params.userId);
    if (deletedUser) {
      await deletedUser.destroy();
      res.json(deletedUser);
    } else {
      console.log("nothing to be deleted");
    }
  } catch (error) {
    next(error);
  }
});
