import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);

export async function test() {
  const res = await client.textGeneration({
    model: "gpt2",
    inputs: "My favorite meal is",
  });

  console.log(res.generated_text);
}

test();
