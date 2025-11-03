# Consult Tech (Vanilla HTML/CSS/JS)

Abra `index.html` ou `login/login.html` no navegador.

## Telas inclusas
- **Login** (`/login/login.html`) Feito por Gustavo abdo
- **Cadastro** (`/cadastro/cadastro.html`) Feito por Gustavo abdo
- **Home/Dashboard** com popup de Resumo (`/home/home.html`) Feito por Robert Gonçalves 
- **Área Pix** (`/pix/pix.html`) e **Comprovante** (`/pix/comprovante.html`) Feito por Robert Gonçalves 
- **Perfil** (`/perfil/perfil.html`) Feito por Gustavo abdo
- **Chatbot de Crédito** (`/credito/chat.html`) Feito por Robert Gonçalves 

## Integração com backend
Edite `assets/js/api.js` e ajuste `API_BASE` para apontar ao seu Spring Boot.
Endpoints esperados (exemplo):
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/users`
- `GET /api/users/me`
- `PUT /api/users/me`
- `POST /api/pix/send`
- `POST /api/pix/qr`
- (Futuro) `POST /api/credit/analyze`
