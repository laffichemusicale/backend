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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPoster = exports.updatePoster = exports.deletePoster = exports.getPoster = void 0;
const poster_entity_1 = require("../../entity/poster.entity");
const PosterProcessor_1 = require("../../processor/PosterProcessor");
const NotFoundError_1 = require("../../errors/http/NotFoundError");
const MissingProprietiesError_1 = require("../../errors/http/MissingProprietiesError");
const database_source_1 = require("../../database/database-source");
const posterRepository = database_source_1.AppDataSource.getRepository(poster_entity_1.Poster);
function getPoster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            let posters;
            try {
                posters = yield posterRepository.createQueryBuilder("poster").getMany();
            }
            catch (e) {
                throw new NotFoundError_1.NotFoundError("Poster not found.");
            }
            const treatedPosters = yield (0, PosterProcessor_1.arrayDataProcessor)(posters);
            res.status(200).send({
                posters: treatedPosters
            });
        }
        else {
            const poster = yield posterRepository.findOneBy({
                id: parseInt(id),
            });
            if (!poster) {
                throw new NotFoundError_1.NotFoundError("Poster not found.");
            }
            const treatedPoster = yield (0, PosterProcessor_1.posterProcessor)(poster);
            res.status(200).send({
                poster: treatedPoster
            });
        }
    });
}
exports.getPoster = getPoster;
function deletePoster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        const poster = yield posterRepository.findOneBy({
            id: id,
        });
        if (!poster)
            throw new NotFoundError_1.NotFoundError("Poster not found.");
        yield posterRepository.remove(poster);
        res.status(200).send("");
    });
}
exports.deletePoster = deletePoster;
function updatePoster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, frenchText, englishText, title, draft, valid } = req.body;
        const poster = yield posterRepository.findOneBy({
            id: id,
        });
        if (!poster)
            throw new NotFoundError_1.NotFoundError("Poster not found.");
        poster.title = title;
        poster.frenchText = frenchText;
        poster.englishText = englishText;
        poster.draft = draft;
        poster.valid = valid;
        yield posterRepository.save(poster);
        res.status(200).send(poster);
    });
}
exports.updatePoster = updatePoster;
function addPoster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { frenchText, englishText, title, draft, valid, posterInfo } = req.body;
        try {
            const poster = yield posterRepository.save({
                title,
                frenchText,
                englishText,
                valid,
                draft,
                posterInfo
            });
            res.status(201).send(poster);
        }
        catch (error) {
            console.log(error);
            throw new MissingProprietiesError_1.MissingProprietiesError("Missing properties in request or SQL cannot accomplish this.");
        }
    });
}
exports.addPoster = addPoster;
