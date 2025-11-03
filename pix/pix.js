import { $, $$, on, toast, validate, go, auth, users } from "/assets/js/utils.js";
import { apiPix } from "/assets/js/api.js";

if (!auth.current()) go("/login/login.html");

const tabs = $$(".tab");
const painelEnviar = $("#tab-enviar");
const painelReceber = $("#tab-receber");
tabs.forEach(t => on(t, "click", () => {
  tabs.forEach(x => x.classList.remove("active"));
  t.classList.add("active");
  const tab = t.getAttribute("data-tab");
  painelEnviar.classList.toggle("hidden", tab !== "enviar");
  painelReceber.classList.toggle("hidden", tab !== "receber");
}));

const chave = $("#pixChave");
const valor = $("#pixValor");
on(valor, "input", () => {
  const v = valor.value.replace(/[^\d]/g,"");
  const n = (parseInt(v || "0", 10) / 100).toFixed(2);
  valor.value = n.replace(".", ",");
});

on($("#btnContinuar"), "click", async () => {
  const vChave = chave.value.trim();
  const vValor = valor.value.replace(/\./g,"").replace(",", ".").trim();
  const numVal = Number(vValor);

  if (!validate.required(vChave) || !(numVal > 0)) {
    toast("Informe chave e valor válidos.");
    return;
  }

  try {
    // const resp = await apiPix.send({ chave: vChave, valor: numVal });
    const u = users.getByEmail(auth.current().email) || {};
    const tx = {
      valor: numVal,
      dataHora: new Date().toLocaleString("pt-BR"),
      id: Math.random().toString(36).slice(2),
      de: u.empresa || "Minha Empresa",
      cnpjPagador: u.cnpj || "00.000.000/0001-00",
      para: "Empresa Teste Recebedora",
      chavePix: vChave,
      instituicao: "Consult Tech"
    };
    sessionStorage.setItem("ct.pix.lastTx", JSON.stringify(tx));
    go("/pix/comprovante.html");
  } catch (err) {
    toast(`Falha ao enviar Pix: ${err.message || "erro"}`);
  }
});

on($("#btnCopiar"), "click", async () => {
  const code = "00020126400014BR.GOV.BCB.PIX0114chave@pix.com5204000053039865405100.005802BR5921Empresa Exemplo6009Sao Paulo62130510ABCDEF12345";
  try { await navigator.clipboard.writeText(code); toast("Código copiado!"); } catch { toast("Não foi possível copiar."); }
});
