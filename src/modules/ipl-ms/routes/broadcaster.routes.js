import { Router } from "express";
import * as broadcasterController from "../controllers/broadcaster.controller.js"

const router = Router()

router.post("/", broadcasterController.createBroadcaster)

router.get("/", broadcasterController.getAllBroadcaster)

router.get("/name/:name", broadcasterController.getBroadcasterByName)

router.get("/search", broadcasterController.searchBroadcasters)

router.get("/:id", broadcasterController.getBroadcasterById)

router.put("/:id", broadcasterController.updateBroadcaster)

router.delete("/:id", broadcasterController.deleteBroadcster)


export default router


