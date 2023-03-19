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
exports.updateConfig = exports.getConfig = exports.deleteConfig = exports.addConfig = void 0;
const typeorm_1 = require("typeorm");
const config_entity_1 = __importDefault(require("../entity/config.entity"));
const MissingProprietiesError_1 = require("../errors/http/MissingProprietiesError");
const NotFoundError_1 = require("../errors/http/NotFoundError");
//Todo: rework this code
function addConfig(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let { key, value, deletable, editable } = request.body;
        try {
            /*        deletable = deletable? deletable : false
                    editable = editable? editable : false*/
            const posterTemplate = yield (0, typeorm_1.getRepository)(config_entity_1.default).save({
                key: key,
                value: value,
                editable: editable,
                deletable: deletable
            });
            return response.status(201).send(posterTemplate);
        }
        catch (error) {
            console.log(error);
            throw new MissingProprietiesError_1.MissingProprietiesError("Missing properties in request or SQL cannot accomplish this.");
        }
    });
}
exports.addConfig = addConfig;
function deleteConfig(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { key } = request.body;
        const value = yield (0, typeorm_1.getRepository)(config_entity_1.default).findOneBy({
            key: key,
        });
        if (!value)
            throw new NotFoundError_1.NotFoundError("Value not found.");
        yield (0, typeorm_1.getRepository)(config_entity_1.default).remove(value);
        response.status(200).send("");
    });
}
exports.deleteConfig = deleteConfig;
function getConfig(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let values = undefined;
        if (!request.body) {
            try {
                values = yield (0, typeorm_1.getRepository)(config_entity_1.default).createQueryBuilder("config").getMany();
                response.status(200).send(values);
            }
            catch (e) {
                console.log(e);
                throw new NotFoundError_1.NotFoundError("Values not found.");
            }
        }
        const { key } = request.body;
        if (!key) {
            throw new MissingProprietiesError_1.MissingProprietiesError("Missing key.");
        }
        try {
            values = yield (0, typeorm_1.getRepository)(config_entity_1.default).findBy({
                "key": key
            });
        }
        catch (e) {
            console.log(e);
            throw new NotFoundError_1.NotFoundError("Value not found with theses arguments.");
        }
        if (!values) {
            throw new NotFoundError_1.NotFoundError("There are no values for this key.");
        }
        response.status(200).send(values);
    });
}
exports.getConfig = getConfig;
function updateConfig(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { key, value } = req.body;
        const config = yield (0, typeorm_1.getRepository)(config_entity_1.default).findOneBy({
            "key": key,
        });
        if (!config)
            throw new NotFoundError_1.NotFoundError("Config not found.");
        config.value = value;
        yield (0, typeorm_1.getRepository)(config_entity_1.default).save(config);
        res.status(200).send(config);
    });
}
exports.updateConfig = updateConfig;
