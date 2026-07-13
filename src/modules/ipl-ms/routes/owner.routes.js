import { Router } from "express";
import * as controller from "../controllers/owner.controller.js"

const router = Router()

// Create a new Owner
router.post("/", controller.createOwner)

// Get all owners
router.get("/", controller.getAllOwners)

// Get owner by  id
router.get("/:id", controller.getOwnerById)

// Update owner 
router.put("/:id", controller.updateOwner)

// delete owner
router.delete("/:id", controller.deleteOwner)

export default router