import { Router } from "express"
import * as sponsorController from "../controllers/sponsor.controller.js"

const router = Router()

router.post("/", sponsorController.createSponsor)

router.get("/name/:name", sponsorController.getSponsorByName)

router.get("/search", sponsorController.searchSponsors)

router.get("/:id", sponsorController.getSponsorById)

router.get("/", sponsorController.getAllSponsors)

router.put("/:id", sponsorController.updateSponsor)

router.delete("/:id", sponsorController.deleteSponsor)


export default router