const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../middlewares/helpers/apiHelpers");

const {
  getAll,
  getOneById,
  postNew,
  deleteById,
  putById,
  patchFavotite,
} = require("../../controllers/contactsControllers");

const {
  addFieldsValidation,
  updateFieldsValidation,
  updateFaforiteValidation,
} = require("../../middlewares/validation");

// const { authMiddleware } = require("../../middlewares/authMiddleware");

// router.use(authMiddleware);
router
  .get("/", asyncWrapper(getAll))
  .get("/:contactId", asyncWrapper(getOneById))
  .post("/", addFieldsValidation, asyncWrapper(postNew))
  .delete("/:contactId", asyncWrapper(deleteById))
  .put("/:contactId", updateFieldsValidation, asyncWrapper(putById))
  .patch(
    "/:contactId/favorite",
    updateFaforiteValidation,
    asyncWrapper(patchFavotite)
  );

module.exports = { contactsRouter: router };
