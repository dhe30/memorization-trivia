import BlankAlternate from "./BlankAlternate.js";
import BlankRandom from "./BlankRandom.js";
import BlankSemantic from "./BlankSemantic.js";
import { Difference } from "./Difference.js";
import { Loader } from "./Loader.js";
import Quantify from "./Quantify.js";
import QuantifyLetters from "./QuantifyLetters.js";
import QuantifyWords from "./QuantifyWords.js";
import { Questions } from "./Questions.js";
import Recite from "./Recite.js";
import ReciteFirstHalf from "./ReciteFirstHalf.js";
import ReciteFull from "./ReciteFull.js";
import ReciteLastHalf from "./ReciteLastHalf.js";

export default class QuestionFactory {
    createBasic(difficulty, verse) {
        const blankLoader = new Loader(3, new BlankAlternate(), new BlankSemantic("Noun"), new BlankRandom(0.7))
        const reciteLoader = new Loader(2, new ReciteFull(), new ReciteFirstHalf(), new ReciteLastHalf)
        const quantifyLoader = new Loader(2, new Quantify(), new QuantifyLetters(), new QuantifyWords())
        const differenceLoader = new Loader(1, new Difference())
        const mother = new Questions(verse, quantifyLoader, reciteLoader, differenceLoader, blankLoader)
        return mother.generate()
    }
}