import { Router } from "express";
import { add, findAll, findOne, remove, update
    
 } from "./Retail-Controller.js";
const retailRouter = Router();

retailRouter.get("/", findAll);

retailRouter.get("/:id", findOne);

retailRouter.post("/", add);

retailRouter.put("/:id", update);

retailRouter.delete("/:id", remove);

export default retailRouter;
