import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"

import mais from "../assets/mais.png"

export default function Home() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState([]);
    const [formData, setFormData] = useState({ titulo_post: "", conteudo_post: "" });

    useEffect(() => { buscarPosts(); }, []);

    async function buscarPosts() {
        const { data, error } = await supabase
            .from("posts")
            .select("*")
        if (error) {
            console.log(error)
            return;
        }
        setPost(data)
    }
    async function criarPost() {
        try {
            const { data, error } = await supabase
                .from("posts")
                .insert([
                    {
                        titulo_post: formData.titulo_post,
                        conteudo_post: formData.conteudo_post
                    }
                ]);
            if (error) {
                return;
            }
            setFormData({
                titulo_post: "",
                conteudo_post: ""
            });
            setOpen(false);
            await buscarPosts();
        } catch (error) {
            console.log(error);
        }
    }

    async function excluirPost(id) {
        try {
            const { error } = await supabase
                .from("posts")
                .delete()
                .eq("id", id);
            if (error) {
                console.log("Erro ao deletar:", error);
                return;
            }
            await buscarPosts();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-[#262B2D]">
            <Header />
            <main className="container mx-auto px-10">
                <div className="mt-20 flex items-center flex-col">
                    <h1 className="font-semibold text-3xl text-white">Essa é a página Home, crie sua conta</h1>
                    <button
                        className="mt-5 text-2xl text-white w-100 rounded-2xl bg-linear-to-bl from-[#274E5D] to-[#137FA8]"
                        onClick={() => navigate("/Cadastrar")}
                    >
                        Criar Conta
                    </button>
                </div>
                <div className="mt-30">
                    <h1 className="text-white font-bold text-4xl mb-4">Seus Posts</h1>
                    <div className="grid grid-cols-3 gap-4">
                        {post.map((postes) => (
                            <div key={postes.id} className="bg-[#262B2D] border border-[#212121] rounded-xl shadow-md w-100 h-75">
                                <div className="m-5">
                                    <button
                                        onClick={excluirPost}
                                        className="text-white/60 hover:text-white text-xl"
                                    >
                                        ✕
                                    </button>
                                    <h1 className="text-white text-2xl font-semibold rounded-2xl bg-[#212121] p-2">{postes.titulo_post}</h1>
                                    <h1 className="text-white mt-5 border border-[#137FA8] rounded-2xl p-2">{postes.conteudo_post}</h1>
                                </div>
                            </div>
                        ))}
                        <div className="bg-[#262B2D] border border-[#212121] rounded-xl shadow-md w-100 h-75 flex justify-center items-center">
                            <button
                                onClick={() => setOpen(true)}
                                className="rounded-full border border-[#137FA8] w-20 h-20 flex items-center justify-center text-3xl hover:bg-[#137FA8]/20 transition"
                            >
                                <img src={mais} alt="mais" className="w-10" />
                            </button>
                        </div>
                    </div>
                    {open && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                            <div className="bg-[#212121] w-400 p-8 rounded-2xl shadow-xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-semibold text-white">
                                        Criar Post
                                    </h3>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="text-white/60 hover:text-white text-xl"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white/80 text-sm">
                                        Título do Post
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.titulo_post}
                                        placeholder="Digite o título..."
                                        onChange={(e) => setFormData({ ...formData, titulo_post: e.target.value })}
                                        className="bg-[#262B2D] border border-[#212121] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#137FA8]"
                                    />
                                    <label className="text-white/80 text-sm">
                                        Conteúdo do post
                                    </label>
                                    <textarea
                                        value={formData.conteudo_post}
                                        placeholder="Digite o conteúdo do Post"
                                        onChange={(e) => setFormData({ ...formData, conteudo_post: e.target.value })}
                                        className="bg-[#262B2D] border border-[#212121] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#137FA8]"
                                    ></textarea>
                                </div>
                                <button
                                    onClick={criarPost}
                                    className="mt-6 w-full bg-[#137FA8] hover:bg-[#0f6b8e] transition rounded-lg py-2 text-white font-medium">
                                    Publicar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}