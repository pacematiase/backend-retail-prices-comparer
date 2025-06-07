import { Router } from "express";

const retailRouter = Router();

retailRouter.get("/", findAll);
retailRouter.get("/:nombre", findOne);
retailRouter.post("/", add);
retailRouter.put("/:id", update);
retailRouter.delete("/:id", remove);

export default retailRouter;
