from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title='CyberArena AI Service', version='1.0.0')

class AskRequest(BaseModel):
    question: str

@app.get('/health')
def health() -> dict:
    return {'status': 'ok', 'service': 'CyberArena AI'}

@app.post('/ask')
def ask(request: AskRequest) -> dict:
    prompt = request.question.lower()
    if 'sql' in prompt:
        answer = 'SQL injection happens when untrusted input changes the meaning of a SQL query. Use parameterized queries and least-privileged database accounts.'
    elif 'xss' in prompt:
        answer = 'Cross-site scripting injects script into a web page. Escape output and enforce a strict Content Security Policy.'
    elif 'csrf' in prompt:
        answer = 'CSRF tricks a browser into sending a state-changing request. Protect it with anti-CSRF tokens and SameSite cookies.'
    elif 'jwt' in prompt:
        answer = 'JWTs carry identity claims in a signed token. Verify signatures, keep them short-lived, and avoid storing secrets in the client.'
    elif 'hash' in prompt:
        answer = 'Hashing is one-way transformation used for password storage. Use a slow algorithm like bcrypt or Argon2.'
    elif 'encrypt' in prompt:
        answer = 'Encryption protects data in transit or at rest. Use TLS for transport and strong key management for storage.'
    else:
        answer = 'CyberArena teaches these topics through safe, isolated simulations. Ask about SQL injection, XSS, CSRF, JWT, hashing, or encryption.'
    return {'answer': answer}
