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
        const reciteLoader = new Loader(5, new ReciteFull(), new ReciteFirstHalf(), new ReciteLastHalf)
        const quantifyLoader = new Loader(3, new Quantify(), new QuantifyLetters(), new QuantifyWords())
        const mother = new Questions(verse, quantifyLoader, reciteLoader)
        return mother.generate()
    }
}