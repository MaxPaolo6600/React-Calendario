import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function pegarUsuario() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        }
        pegarUsuario();
    }, []);

    async function sairConta() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error.message)
        } else {
            alert("Você foi deslogado")
        }
    }

    return (
        <header className="flex justify-around items-center bg-[#212121] h-18">
            <div className="bg-[#137FA8] rounded-2xl p-0.5 px-2">
                <img src={logo} alt="logo" className="w-40" onClick={() => navigate("/")} />
            </div>
            <h3 className="text-white">Projeto Interdisciplinar TUIUTI</h3>
            <div>
                {user ? (
                    <div className="flex">
                        <h3 className="text-white font-bold me-2">
                            {user.email}
                        </h3>
                        <button
                            onClick={sairConta}
                            className="border-2 border-[#ff3d3d] bg-[#a81313] px-3 rounded-2xl font-bold"
                        >
                            Sair
                        </button>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/Logar")}
                            className="border-2 border-[#274E5D] bg-[#137FA8] me-4 h-10 px-3 rounded-2xl font-bold text-[#212121]"
                        >
                            Logar
                        </button>
                        <button
                            onClick={() => navigate("/Cadastrar")}
                            className="border-2 border-[#274E5D] bg-[#137FA8] me-4 h-10 px-3 rounded-2xl font-bold text-[#212121]"
                        >
                            Cadastrar
                        </button>
                    </>
                )}
            </div>
        </header>
    )
}