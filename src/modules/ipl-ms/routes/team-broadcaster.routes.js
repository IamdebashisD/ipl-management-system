import { Router } from "express";
import * as teamBroadcasterController from "../controllers/team-broadcaster.controller.js"

const router = Router()

router.post("/", teamBroadcasterController.assignBroadcaster)

router.get("/", teamBroadcasterController.getAllBroadcasters)

router.put("/:id", teamBroadcasterController.updateBroadcaster)

router.get("/team/:id", teamBroadcasterController.getBroadcasterByTeam)

router.get("/broadcaster/:id", teamBroadcasterController.getTeamByBroadcaster)

router.delete("/:teamId/:broadcasterId", teamBroadcasterController.removeBroadcaster)

export default router