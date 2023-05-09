import { Configuration, OpenAIApi } from "openai";

const { OPENAI_API_KEY } = useRuntimeConfig()
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event: any) => {
    const body = await readBody(event)
    const textToSummarize = body.textToSummarize

    const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: `Sumarize the following text: ${textToSummarize} in the same language that the text is in.` }],
        temperature: body.temperature || 0.5,
    });
    return data.choices[0].message;
});
