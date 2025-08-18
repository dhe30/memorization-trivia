//Modified from Infamoustrey at https://github.com/Infamoustrey/bible-gateway-api

import axios from "axios";
import jsdom from "jsdom";

class BibleGatewayAPI {
   parse = null;

  constructor() {
    if (typeof DOMParser !== "undefined") {
      this.parse = (content) =>
        new DOMParser().parseFromString(content, "text/html");
    } else {
      this.parse = (content) => {
        const { JSDOM } = jsdom;
        const { document } = new JSDOM(content).window;
        return document;
      };
    }
  }

  async search(
    query = "John 3:16",
    version = "ESV"
  ) {
    let encodedSearch = encodeURIComponent(query);
    let encoodedVersion = encodeURIComponent(version);

    const url = `https://www.biblegateway.com/passage?search=${encodedSearch}&version=${encoodedVersion}`;

    const result = await axios.get(url);

    const document = this.parse(result.data);

    const verse = document.querySelector(".bcv").textContent;

    const passage = document.querySelector(".passage-text")
    const supElements = passage.querySelectorAll(`sup.crossreference, h3, sup.footnote`);
    supElements.forEach(sup => sup.remove());

    let elements = [].slice.call(passage.querySelectorAll(".text"));

    let content = [];
    for (let i = 0; i < elements.length; i++) {
      let text = elements[i].textContent;
      if (text.substr(0, 4) != "Back") content.push(text);
    }

    if (content.length === 0) throw new Error("Could not find verse");
    // console.log("here", verse, content)

    return Promise.resolve({ verse, content });
  }
}

export { BibleGatewayAPI };
export default BibleGatewayAPI;