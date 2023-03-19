"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const AuthController_1 = require("./controller/AuthController");
const PosterController_1 = require("./controller/poster/PosterController");
const AuthHandler_1 = require("./middleware/AuthHandler");
const PosterTemplateController_1 = require("./controller/poster/PosterTemplateController");
const ConfigController_1 = require("./controller/ConfigController");
const routes = (router) => {
    //Auth
    router.post('/api/auth/register', AuthController_1.Register);
    router.post('/api/auth/login', AuthController_1.Login);
    router.post('/api/auth/user', AuthHandler_1.authHandler, AuthController_1.AuthenticatedUser);
    router.post('/api/auth/refresh', AuthController_1.Refresh);
    router.get('/api/auth/refresh', AuthController_1.Logout);
    //Config
    router.get("/api/config/", ConfigController_1.getConfig);
    router.put("/api/config/", ConfigController_1.addConfig);
    router.delete("/api/config/", ConfigController_1.deleteConfig);
    router.patch("/api/config/", ConfigController_1.updateConfig);
    //Template
    router.get("/api/poster/template/:id?", PosterTemplateController_1.getTemplate);
    router.put("/api/poster/template/", PosterTemplateController_1.addTemplate);
    router.delete("/api/poster/template/", PosterTemplateController_1.deleteTemplate);
    router.patch("/api/poster/template/", PosterTemplateController_1.updateTemplate);
    //Posters
    router.get("/api/poster/:id?", PosterController_1.getPoster);
    router.put("/api/poster/", PosterController_1.addPoster);
    router.delete("/api/poster/", PosterController_1.deletePoster);
    router.patch("/api/poster/", PosterController_1.updatePoster);
    //router.delete("api/poster/template/")
};
exports.routes = routes;
