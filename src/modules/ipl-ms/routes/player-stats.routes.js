import { Router } from "express"
import * as playerStatsController from "../controllers/player-stats.controller.js"

const router = Router()

router.get("/", playerStatsController.getAllPlayerStats)
router.get("/:playerId", playerStatsController.getPlayerStats)
router.post("/:playerId", playerStatsController.createPlayerStats)
router.put("/:playerId", playerStatsController.updatePlayerStats)
router.delete("/:playerId", playerStatsController.deletePlayerStats)

export default router