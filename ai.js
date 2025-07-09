import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that I have and suggests a Nigerian or African recipe I could make... : always start with chef Okoro recommends...
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
          content: `I have ${ingredientsString}. Please give me an African recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error("Hugging Face API error:", err.message);
  }
}
