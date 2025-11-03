import { $, on, validate, users, toast, go, masks } from "/assets/js/utils.js";

const form      = $("#formCadastro");
const nome      = $("#nome");
const idade     = $("#idade");
const empresa   = $("#empresa");
const cnpj      = $("#cnpj");
const email     = $("#email");
const telefone  = $("#telefone");
const senha     = $("#senha");
const confirmar = $("#confirmar");

on(telefone, "input", () => masks.phone(telefone));
on(cnpj, "input", () => masks.cnpj(cnpj));
on(idade, "input", () => masks.onlyDigits(idade));

function setError(input, hasError, msg = "") {
  input.classList.toggle("ring-2", hasError);
  input.classList.toggle("ring-rose-500", hasError);
  input.title = hasError ? msg : "";
}
function countDigits(str = "") { return (str.match(/\d/g) || []).length; }

on(form, "submit", (e) => {
  e.preventDefault();
  [nome, idade, empresa, cnpj, email, telefone, senha, confirmar].forEach(i => setError(i, false));

  let ok = true;
  if (!validate.required(nome.value)) { setError(nome, true, "Informe seu nome."); ok = false; }
  if (!validate.number(idade.value) || Number(idade.value) <= 0) { setError(idade, true, "Idade deve conter apenas números."); ok = false; }
  if (!validate.required(empresa.value)) { setError(empresa, true, "Informe o nome da empresa."); ok = false; }
  if (countDigits(cnpj.value) !== 14) { setError(cnpj, true, "CNPJ deve ter 14 dígitos."); ok = false; }
  if (!validate.email(email.value)) { setError(email, true, "E-mail inválido."); ok = false; }
  const telDigits = countDigits(telefone.value);
  if (!(telDigits === 10 || telDigits === 11)) { setError(telefone, true, "Telefone deve ter 10 ou 11 dígitos."); ok = false; }
  if (!validate.min(senha.value, 6)) { setError(senha, true, "Senha mínima de 6 caracteres."); ok = false; }
  if (confirmar.value !== senha.value) { setError(confirmar, true, "As senhas não coincidem."); ok = false; }

  if (!ok) { toast("Verifique os campos destacados."); return; }

  const data = {
    nome: nome.value.trim(),
    idade: idade.value.trim(),
    empresa: empresa.value.trim(),
    cnpj: cnpj.value.trim(),
    email: email.value.trim(),
    telefone: telefone.value.trim(),
    senha: senha.value,
  };

  const added = users.add({ ...data });
  if (!added) { setError(email, true, "Já existe uma conta com este e-mail."); toast("Já existe uma conta com este e-mail."); return; }

  toast("Conta criada com sucesso!");
  go("/login/login.html");
});
