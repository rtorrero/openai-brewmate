import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  console.log("Body: ", generatePrompt(req.body.style));
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.style),
    temperature: 0.3,
    max_tokens: 400,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(style) {
  const capitalizedStyle =
    style[0].toUpperCase() + style.slice(1).toLowerCase();
  return `
  Write a beer recipe of ${capitalizedStyle} style
  (we don't use Irish Moss for hazy styles)
  Total grain weight should not exceed 3.3 Kilograms
  Batch Size: 1.5 gallons
  Efficiency: 70%
  Ingredients (All grain):`;
}
