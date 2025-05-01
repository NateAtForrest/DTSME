from typing import List, Dict
import json
import openai
from config import OPENAI_API_KEY, SME_PERSONAS

# Configure OpenAI
openai.api_key = OPENAI_API_KEY

async def generate_response(
    messages: List[Dict],
    contexts: List[str],
    persona_key: str = None
) -> str:
    """
    Generate a response using the chat model:
    1. Format prompt with context and conversation history
    2. Call chat model
    3. Return generated response
    """
    try:
        # Get persona configuration
        persona = SME_PERSONAS.get(persona_key) if persona_key else None
        
        # Format system message with persona and context
        system_message = format_system_message(contexts, persona)
        
        # Prepare messages for API call
        api_messages = [
            {"role": "system", "content": system_message}
        ]
        
        # Add conversation history
        api_messages.extend([
            {"role": msg["role"], "content": msg["content"]}
            for msg in messages
        ])
        
        # Call OpenAI API
        response = await openai.ChatCompletion.acreate(
            model="gpt-4",  # or your chosen model
            messages=api_messages,
            temperature=0.7,
            max_tokens=1000,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        raise Exception(f"Error generating response: {str(e)}")

def format_system_message(contexts: List[str], persona: Dict = None) -> str:
    """Format system message with context and persona information"""
    # Base system message
    system_message = "You are an AI assistant with access to the following knowledge:"
    
    # Add context
    if contexts:
        system_message += "\n\nRelevant context:\n"
        for i, context in enumerate(contexts, 1):
            system_message += f"\n{i}. {context}"
    
    # Add persona configuration
    if persona:
        system_message += f"\n\nYou are {persona['name']}, a {persona['role']}. "
        system_message += f"Your expertise includes {', '.join(persona['expertise'])}. "
        system_message += f"Maintain a {persona['tone']} tone and {persona['style']} style in your responses."
    
    # Add response guidelines
    system_message += "\n\nGuidelines:"
    system_message += "\n- Only provide information that is supported by the given context"
    system_message += "\n- If you're unsure or don't have enough context, say so"
    system_message += "\n- Keep responses clear, concise, and professional"
    system_message += "\n- Cite specific sources when possible"
    
    return system_message

def validate_response(response: str, contexts: List[str]) -> bool:
    """
    Validate that the generated response is grounded in the provided context
    This helps prevent hallucination
    """
    # TODO: Implement response validation
    return True