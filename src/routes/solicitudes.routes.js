import { Router } from "express";
const router = Router();

import * as solicitudesCtrl from "../controllers/solicitudes.controller";
import { authJwt } from "../middlewares";

router.get("/", solicitudesCtrl.getSolicitudes);

router.get("/:solicitudId", solicitudesCtrl.getSolicitudById);

router.post(
  "/",
  [authJwt.verifyToken],
  solicitudesCtrl.createSolicitud
);

router.put(
  "/:solicitudId",
  [authJwt.verifyToken, authJwt.isAdvisor],
  solicitudesCtrl.updateSolicitudById
);

router.delete(
  "/:solicitudId",
  [authJwt.verifyToken, authJwt.isAdmin],
  solicitudesCtrl.deleteSolicitudById
);

export default router;
