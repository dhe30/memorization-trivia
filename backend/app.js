import express from "express"
import cors from "cors"
import { randomUUID } from 'crypto';
import 'dotenv/config';
import QuestionFactory from "./classes/QuestionFactory.js";
import { BibleGatewayAPI } from "./classes/BibleGatewayAPI.js";
import { preprocessVerse } from "./classes/utilities.js";
import { LRUCache } from "lru-cache";



const PORT = process.env.PORT || 3001;
const app = express() 
const trivia = new QuestionFactory()
const data = new LRUCache({
  max: 100,              // number of items
  ttl: 1000 * 60 * 60 * 24 * 2, // 2 day expiration
})

// const verse = "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
let bgw = new BibleGatewayAPI();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/basic/:otis/:version', async (req, res) => {
    console.log("idheudueu")
    const otis = req.params.otis || "John 3:16-17"
    const id = randomUUID();
    let { verse, content } = await bgw.search(otis, req.params.version || "NIV");
    const verseBundle = preprocessVerse({ verse, content })
    console.log(verseBundle)
    const questions = trivia.createBasic(0, verseBundle)
    data.set(id, questions)
    res.status(201).send({game: id, questions: questions.map((question) => {return {question: question.question, answer: question.answer, warning: question.warning}})});
});

app.get('/game/:id', (req, res) => {
  // console.log("get game!")
    const { id } = req.params;
    const result = data.get(id)
    if (result) {
        res.status(201).send({game: id, questions: result});
    } else {
        res.status(404).send("This game does not exist")
    }
});

app.use('/game/:id', (req, res, next) => {
  // console.log("use game!")
    const { id } = req.params;
    const result = data.has(id)
    if (result) {
      next()
    } else {
        res.status(404).send("This game does not exist")
    }
});

app.post('/game/:id/editdifference/:index', (req, res) => {
  const newQuestion = req.body.question
  const { id, index } = req.params;
  const bundle = data.get(id)[index]
  const origin = bundle.origin
  const answer = origin.diff(newQuestion)
  // console.log(answer)
  bundle.question = "Spot the difference:\n" + newQuestion
  bundle.answer = answer 
  bundle.warning = ""
  res.status(201).send({question: bundle.question, answer: bundle.answer, warning: bundle.warning});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

