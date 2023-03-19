"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataProcessor = void 0;
function dataProcessor(posters) {
    const unwantedWords = ["Je suis", "désolé", "AI"];
    let processedPosters = [];
    posters.forEach(poster => {
        let invalid = false;
        for (const word of unwantedWords) {
            if (poster.frenchText.toLowerCase().includes(word.toLowerCase())) {
                invalid = true;
                break;
            }
        }
        processedPosters.push({
            id: poster.id,
            frenchText: poster.frenchText,
            englishText: poster.englishText,
            title: poster.title,
            draft: poster.draft,
            valid: invalid
        });
    });
    return processedPosters;
}
exports.dataProcessor = dataProcessor;
