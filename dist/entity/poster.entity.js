"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poster = void 0;
const typeorm_1 = require("typeorm");
const posterInfo_entity_1 = __importDefault(require("./posterInfo.entity"));
let Poster = class Poster {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Poster.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Poster.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], Poster.prototype, "frenchText", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], Poster.prototype, "englishText", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Poster.prototype, "valid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Poster.prototype, "draft", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => posterInfo_entity_1.default, { cascade: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "poster_info" }),
    __metadata("design:type", posterInfo_entity_1.default)
], Poster.prototype, "posterInfo", void 0);
Poster = __decorate([
    (0, typeorm_1.Entity)("poster")
], Poster);
exports.Poster = Poster;
