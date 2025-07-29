import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that I have and suggests a Nigerian or African recipe I could make... : always start with chef Okoro recommends... : do not include <think> </think>tags in your response.: do not include any code blocks in your response. : do not include any links in your response. : do not include any extra text in your response. : just give me the recipe.
`;

const client = new InferenceClient(import.meta.env.VITE_REACT_APP_HF_TOKEN);

export async function getGeneratedRecipe(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await client.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",

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
