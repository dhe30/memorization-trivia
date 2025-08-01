import nlp from "compromise";
export class Questions {
    amount = 0
    questions = []
    loaders = []
    terms = []
    constructor(verse = {content: [{numverse: "16", content: "gas"}], source: "Bible 1:1"}, ...loaders) {
        //verse param is now an array, 
        this.loaders = loaders
        if (verse.content?.length != 0) {
            this.loadVerse(verse.content)
        }
    }

    loadVerse(verseContent) {
        for (const ver of verseContent) {
            const doc = nlp(ver);
            for (const d of doc.terms().data()) {
                this.terms.push({...d, numverse: ver.numverse})
            }
        }
        if (this.loaders.length) {
            this.loaders.forEach((loader) => {
                this.amount += loader.amount
                loader.loadTerms(this.terms)
            })
        }
    }

    generate() {
        if (this.amount) {
            for (const loader of this.loaders) {
                for (let i = 0; i < loader.amount; i++) {
                    const res = loader.ask()
                    console.log("AAAAAAAAAAA", res)
                    if (res.question && res.answer) {
                        this.amount--
                        this.questions.push(res)
                    } else {
                        console.log("hit")
                        i--
                    }
                }
            }
        }
        return [...this.questions]
    }

}