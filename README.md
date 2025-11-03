# Consult Tech (Vanilla HTML/CSS/JS)

Abra `index.html` ou `login/login.html` no navegador.

## Telas inclusas
- **Login** (`/login/login.html`)
- **Cadastro** (`/cadastro/cadastro.html`)
- **Home/Dashboard** com popup de Resumo (`/home/home.html`)
- **Área Pix** (`/pix/pix.html`) e **Comprovante** (`/pix/comprovante.html`)
- **Perfil** (`/perfil/perfil.html`)
- **Chatbot de Crédito** (`/credito/chat.html`)

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
