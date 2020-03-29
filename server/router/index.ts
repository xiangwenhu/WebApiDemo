import { Router } from "express";
import user from "./beacon";

const router: Router = Router();
router.use("/beacon", user);

export default router;
