import { RealtimeAgent } from '@openai/agents/realtime';
import { RealtimeSession } from '@openai/agents/realtime';
import axios from 'axios';




const agent = new RealtimeAgent({
  name: 'girfriend agent',
  instructions: 'you are a energetic girlfriend who is very friendly and helpful.',
});

const session = new RealtimeSession(agent, {
  model: 'gpt-realtime',
});

export const createSession = async (tempKey) => {
    console.log(tempKey)
    await session.connect({ apiKey: tempKey });
}

export const generateTemporaryKey = async() => {
    const response = await axios.get('http://localhost:3000/get-ek')
    
    const {temporaryKey} = response.data.data
    return temporaryKey
}