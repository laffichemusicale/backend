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
exports.getStatistics = void 0;
var StatisticsEnum;
(function (StatisticsEnum) {
    StatisticsEnum[StatisticsEnum["PYTHON"] = 0] = "PYTHON";
    StatisticsEnum[StatisticsEnum["GLOBAL"] = 1] = "GLOBAL";
    StatisticsEnum[StatisticsEnum["TRANSLATE"] = 2] = "TRANSLATE";
})(StatisticsEnum || (StatisticsEnum = {}));
function getStatistics(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.getStatistics = getStatistics;
