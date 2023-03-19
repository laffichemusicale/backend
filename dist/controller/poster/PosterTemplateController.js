"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = exports.updateTemplate = exports.deleteTemplate = exports.addTemplate = void 0;
const posterTextTemplate_entity_1 = __importDefault(require("../../entity/posterTextTemplate.entity"));
const MissingProprietiesError_1 = require("../../errors/http/MissingProprietiesError");
const NotFoundError_1 = require("../../errors/http/NotFoundError");
const AccessForbiddenError_1 = require("../../errors/http/AccessForbiddenError");
const database_source_1 = require("../../database/database-source");
const posterTemplateRepository = database_source_1.AppDataSource.getRepository(posterTextTemplate_entity_1.default);
function addTemplate(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { text, templateType, templatePart } = request.body;
        if (templatePart === "GLOBAL") {
            const template = yield posterTemplateRepository.findOneBy({
                templatePart: templatePart,
                templateType: templateType
            });
            if (template) {
                throw new AccessForbiddenError_1.AccessForbiddenError("La template existe déjà.");
            }
        }
        try {
            const posterTemplate = yield posterTemplateRepository.save({
                text,
                templateType: templateType,
                templatePart
            });
            response.status(201).send(posterTemplate);
        }
        catch (error) {
            console.log(error);
            throw new MissingProprietiesError_1.MissingProprietiesError("Missing properties in request or SQL cannot accomplish this.");
        }
    });
}
exports.addTemplate = addTemplate;
function deleteTemplate(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.body;
        const template = yield posterTemplateRepository.findOneBy({
            id: id,
        });
        if (!template)
            throw new NotFoundError_1.NotFoundError("Template not found.");
        yield posterTemplateRepository.remove(template);
        response.status(200).send("");
    });
}
exports.deleteTemplate = deleteTemplate;
function updateTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, templateType, templatePart, text } = req.body;
        const template = yield posterTemplateRepository.findOneBy({
            id: id,
        });
        if (!template)
            throw new NotFoundError_1.NotFoundError("Template not found.");
        template.templateType = templateType;
        template.templatePart = templatePart;
        template.text = text;
        yield posterTemplateRepository.save(template);
        res.status(200).send(template);
    });
}
exports.updateTemplate = updateTemplate;
function getTemplate(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let templates;
        //query
        if (request.query.templateType && request.query.templatePart) {
            const { templatePart, templateType } = request.query;
            try {
                templates = yield posterTemplateRepository.findBy({
                    templatePart: templatePart,
                    templateType: templateType
                });
                response.status(200).send(templates);
                return;
            }
            catch (e) {
                throw new NotFoundError_1.NotFoundError("Template not found.");
            }
        }
        //params
        if (request.params.id) {
            const { id } = request.params;
            if (!id)
                throw new MissingProprietiesError_1.MissingProprietiesError("Missing ID");
            try {
                const template = yield posterTemplateRepository.findOneBy({
                    id: parseInt(id),
                });
                if (!template) {
                    throw new NotFoundError_1.NotFoundError("Template not found.");
                }
                response.status(200).send({
                    template
                });
                return;
            }
            catch (error) {
                throw new NotFoundError_1.NotFoundError("Template not found.");
            }
        }
        if (!request.body) {
            try {
                templates = yield posterTemplateRepository.createQueryBuilder("poster_text_template").getMany();
                response.status(200).send(templates);
            }
            catch (e) {
                console.log(e);
                throw new NotFoundError_1.NotFoundError("Template not found.");
            }
        }
        const { templateType, templatePart } = request.body;
        if (!templateType || !templatePart)
            throw new MissingProprietiesError_1.MissingProprietiesError("Missing templateType or templatePart.");
        try {
            templates = yield posterTemplateRepository.findBy({
                "templateType": templateType,
                "templatePart": templatePart
            });
        }
        catch (e) {
            console.log(e);
            throw new NotFoundError_1.NotFoundError("Template not found with theses arguments.");
        }
        if (!templates) {
            throw new NotFoundError_1.NotFoundError("There are no templates for theses requirements.");
        }
        response.status(200).send(templates);
    });
}
exports.getTemplate = getTemplate;
