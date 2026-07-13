import { Router } from "express";
import * as teamSponsorController from "../controllers/team-sponsor.controller.js"

const router = Router()

router.post("/", teamSponsorController.attachSponsor)

router.delete("/:id", teamSponsorController.detachSponsor)

router.get("/team/:id", teamSponsorController.getSponsorByTeam)

router.get("/sponsor/:id", teamSponsorController.getTeamBySponsor)

router.get("/", teamSponsorController.getAllTeamSponsors)

export default router
