import Header from "../components/Header"
import { supabase } from "../supabaseClient"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastrar() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", senha: "" });

    function mudancaValores(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function cadastrar(e) {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: form.email,
                password: form.senha
            });
            navigate("/");
            alert("Conta criada");
            setForm({
                email: "",
                senha: ""
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen bg-[#262B2D]">
            <Header />
            <form
                onSubmit={cadastrar}
                className="space-y-5 max-w-md mx-auto mt-20"
            >
                <div>
                    <label className="text-white text-sm">
                        E-mail
                    </label>
                    <input
                        name="email"
                        type="email"
                        onChange={mudancaValores}
                        className="w-full rounded-lg bg-[#D9D9D9] px-4 py-3"
                    />
                </div>
                <div>
                    <label className="text-white text-sm">
                        Senha
                    </label>
                    <input
                        name="senha"
                        type="password"
                        onChange={mudancaValores}
                        className="w-full rounded-lg bg-[#D9D9D9] px-4 py-3"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#212121] text-white py-3 rounded-lg"
                >
                    Criar conta
                </button>
            </form>
        </div>
    )
}