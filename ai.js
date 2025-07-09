import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make...
`;

const client = new InferenceClient(import.meta.env.VITE_REACT_APP_HF_TOKEN);

export async function getGeneratedRecipe(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await client.chatCompletion({
      model: "HuggingFaceTB/SmolLM3-3B",

      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error("Hugging Face API error:", err.message);
  }
}
