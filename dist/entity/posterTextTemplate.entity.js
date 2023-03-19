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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateType = exports.TemplatePart = void 0;
const typeorm_1 = require("typeorm");
var TemplatePart;
(function (TemplatePart) {
    TemplatePart["INTRODUCTION_PART_1"] = "INTRODUCTION_PART_1";
    TemplatePart["INTRODUCTION_PART_2"] = "INTRODUCTION_PART_2";
    TemplatePart["CONCLUSION"] = "CONCLUSION";
    TemplatePart["GENERAL"] = "GENERAL";
})(TemplatePart = exports.TemplatePart || (exports.TemplatePart = {}));
var TemplateType;
(function (TemplateType) {
    TemplateType["ALBUM"] = "ALBUM";
    TemplateType["VENUE"] = "VENUE";
})(TemplateType = exports.TemplateType || (exports.TemplateType = {}));
let PosterTextTemplateEntity = class PosterTextTemplateEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PosterTextTemplateEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], PosterTextTemplateEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PosterTextTemplateEntity.prototype, "templateType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PosterTextTemplateEntity.prototype, "templatePart", void 0);
PosterTextTemplateEntity = __decorate([
    (0, typeorm_1.Entity)("poster_text_template")
], PosterTextTemplateEntity);
exports.default = PosterTextTemplateEntity;
