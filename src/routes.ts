import {Router} from "express";
import {AuthenticatedUser, Login, Logout, Refresh, Register} from "./controller/AuthController";
import {addPoster, deletePoster, getFullPoster, getPoster, updatePoster} from "./controller/poster/PosterController";
import {authHandler} from "./middleware/AuthHandler";
import {
    addTemplate,
    deleteTemplate,
    getTemplate,
    updateTemplate
} from "./controller/poster/PosterTemplateController";
import {addConfig, deleteConfig, getConfig, updateConfig} from "./controller/ConfigController";

export const routes = (router: Router) => {

    //Auth
    router.post('/api/auth/register', Register)
    router.post('/api/auth/login', Login)
    router.post('/api/auth/user', authHandler, AuthenticatedUser)
    router.post('/api/auth/refresh', Refresh)
    router.get('/api/auth/refresh', Logout)

    //Config
    router.get("/api/config/", getConfig)
    router.put("/api/config/", addConfig)
    router.delete("/api/config/", deleteConfig)
    router.patch("/api/config/", updateConfig)

    //Template
    router.get("/api/poster/template/:id?", getTemplate)
    router.put("/api/poster/template/", addTemplate)
    router.delete("/api/poster/template/", deleteTemplate)
    router.patch("/api/poster/template/", updateTemplate)

    //Posters
    router.get("/api/poster/full", getFullPoster)
    router.get("/api/poster/:id?", getPoster)
    router.put("/api/poster/", addPoster)
    router.delete("/api/poster/", deletePoster)
    router.patch("/api/poster/", updatePoster)


    //router.delete("api/poster/template/")
}