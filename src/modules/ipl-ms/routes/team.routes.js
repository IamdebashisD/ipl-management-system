import { Router } from "express";
import * as teamController from "../controllers/team.controller.js";

const router = Router()

router.post("/", teamController.createTeam)

router.get("/:id", teamController.getTeamById)

router.get("/", teamController.getAllTeam)

router.put("/:id", teamController.updateTeam)

router.delete("/:id", teamController.deleteTeam)

export default router