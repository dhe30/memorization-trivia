import axios from "axios";
import { Loader } from "./Loader.js";
import Quantify from "./Quantify.js";
import QuantifyLetters from "./QuantifyLetters.js";
import QuantifyWords from "./QuantifyWords.js";
import QuestionFactory from "./QuestionFactory.js";
import { Questions } from "./Questions.js";
import Recite from "./Recite.js";
import ReciteFirstHalf from "./ReciteFirstHalf.js";
import ReciteLastHalf from "./ReciteLastHalf.js";
import 'dotenv/config';

// const verse = "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
// const reciteLoader = new Loader(1, new Recite(0, 8, 100))
// const quanitifyLoader = new Loader(1, new QuantifyWords())
// const mother = new Questions(verse, quanitifyLoader)
// const jeopardy = mother.generate()
// const factory = new QuestionFactory()
// console.log(factory.createBasic(0, verse))

console.log(process.env.BG_USERNAME, process.env.BG_PASSWORD)
const resp = await axios.get(
  'https://api.biblegateway.com/2/request_access_token',
  {
    params: {
      username: process.env.BG_USERNAME,
      password: process.env.BG_PASSWORD
    }
  }
);

console.log(resp.data)