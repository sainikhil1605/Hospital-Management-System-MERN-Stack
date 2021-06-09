const express = require("express")
const router = express.Router();
const deptController = require("../controllers/deptController");
router.get("/deptList", deptController.getDepts);
router.post("/deptList", deptController.postDepts);
router.delete("/deptList/:dept_id", deptController.deleteDepts);
module.exports = router;