"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posterProcessor = exports.arrayDataProcessor = void 0;
const unwantedWords = ["Je suis", "désolé"];
function arrayDataProcessor(posters) {
    let processedPosters = [];
    posters.forEach(poster => {
        let valid = true;
        if (!poster.valid) {
            valid = false;
        }
        for (const word of unwantedWords) {
            if (poster.frenchText.toLowerCase().includes(word.toLowerCase())) {
                valid = false;
                break;
            }
        }
        processedPosters.push({
            id: poster.id,
            frenchText: poster.frenchText,
            englishText: poster.englishText,
            title: poster.title,
            draft: poster.draft,
            valid: valid,
            posterInfo: poster.posterInfo
        });
    });
    return processedPosters;
}
exports.arrayDataProcessor = arrayDataProcessor;
function posterProcessor(poster) {
    let processedPoster;
    let valid = true;
    if (!poster.valid) {
        valid = false;
    }
    for (const word of unwantedWords) {
        if (poster.frenchText.toLowerCase().includes(word.toLowerCase())) {
            valid = false;
            break;
        }
    }
    processedPoster = {
        id: poster.id,
        frenchText: poster.frenchText,
        englishText: poster.englishText,
        title: poster.title,
        draft: poster.draft,
        valid: valid,
        posterInfo: poster.posterInfo
    };
    return processedPoster;
}
exports.posterProcessor = posterProcessor;
