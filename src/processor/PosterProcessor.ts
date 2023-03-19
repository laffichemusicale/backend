import {Poster} from "../entity/poster.entity";

const unwantedWords: string[] = ["Je suis", "désolé"];

export function arrayDataProcessor(posters: Poster[]): Object[] {
    let processedPosters: Poster[] = [];

    posters.forEach(poster => {

        let valid = true;

        if(!poster.valid) {
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

export function posterProcessor(poster: Poster): Poster {
    let processedPoster: Poster;

    let valid = true;

    if(!poster.valid) {
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
    }

    return processedPoster;
}