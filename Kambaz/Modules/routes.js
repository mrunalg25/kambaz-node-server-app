import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  const deleteModule = async (req, res) => {
    const { moduleId } = req.params;
    await modulesDao.deleteModule(moduleId);
    res.sendStatus(204);
  };

  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.json(status);
  };

  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}