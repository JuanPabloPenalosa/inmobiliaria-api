import { Router } from "express";
const router = Router();

import * as inmueblesCtrl from "../controllers/inmuebles.controller";
import { authJwt } from "../middlewares";

router.get("/", inmueblesCtrl.getInmuebles);

router.get("/:inmuebleId", inmueblesCtrl.getInmuebleById);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdvisor],
  inmueblesCtrl.createInmueble
);

router.put(
  "/:inmuebleId",
  [authJwt.verifyToken, authJwt.isAdvisor],
  inmueblesCtrl.updateInmuebleById
);

router.delete(
  "/:inmuebleId",
  [authJwt.verifyToken, authJwt.isAdmin],
  inmueblesCtrl.deleteInmuebleById
);

export default router;
