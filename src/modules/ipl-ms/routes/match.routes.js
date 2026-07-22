import { Router } from "express";
import * as matchController from "../controllers/match.controller.js"

const router = Router()


router.post("/", matchController.scheduleMatch)

router.get("/", matchController.getMatches)
router.get("/upcoming", matchController.getUpcomingMatches)
router.get("/team/:teamId", matchController.getMatchesByTeam)

router.patch("/:matchId/status", matchController.updateMatchStatus)

router.get("/:matchId", matchController.getMatchById)
router.put("/:matchId", matchController.updateMatch)
router.delete("/:matchId", matchController.deleteMatch)

export default router