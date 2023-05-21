import { Configuration, OpenAIApi } from "openai";
import { Tiktoken } from "@dqbd/tiktoken";
import { load } from "@dqbd/tiktoken/load"

const cl100k_base_obj = {
    "load_tiktoken_bpe": "https://openaipublic.blob.core.windows.net/encodings/cl100k_base.tiktoken",
    "special_tokens": {
        "<|endoftext|>": 100257,
        "<|fim_prefix|>": 100258,
        "<|fim_middle|>": 100259,
        "<|fim_suffix|>": 100260,
        "<|endofprompt|>": 100276
    },
    "pat_str": "(?i:'s|'t|'re|'ve|'m|'ll|'d)|[^\\r\\n\\p{L}\\p{N}]?\\p{L}+|\\p{N}{1,3}| ?[^\\s\\p{L}\\p{N}]+[\\r\\n]*|\\s*[\\r\\n]+|\\s+(?!\\S)|\\s+"
}


async function countTokens(prompt: string) {
    const model = await load(cl100k_base_obj);
    const encoder = new Tiktoken(
        model.bpe_ranks,
        model.special_tokens,
        model.pat_str
    );
    const tokens = encoder.encode(prompt);
    console.log(`The text has ${tokens.length} tokens.`)
    encoder.free();
}


const { OPENAI_API_KEY } = useRuntimeConfig()
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event: any) => {
    const body = await readBody(event)
    const textToSummarize = body.textToSummarize

    countTokens(textToSummarize);


    const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: `Sumarize the following text: ${textToSummarize} in the same language that the text is in.` }],
        temperature: body.temperature || 0.5,
    });
    return data.choices[0].message;
});
