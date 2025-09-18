import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const navigate = useNavigate();

  // 🔹 recupera o email do localStorage
  const email = localStorage.getItem("resetUserEmail") || "";

  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (novaSenha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const res = await api.post("/validar-codigo", { email, codigo, novaSenha });
      if (res.data.success) {
        alert("Senha redefinida com sucesso!");
        localStorage.removeItem("resetUserEmail"); // limpa dado temporário
        navigate("/");
      } else {
        alert(res.data.message || "Erro ao redefinir senha.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro no servidor. Tente novamente.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código recebido"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
          <button type="submit">Alterar senha</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
