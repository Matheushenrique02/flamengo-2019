"use client";

import Image from "next/image";
import { useState } from "react";
import { Share2 } from "lucide-react";

// Tipo do jogador
interface Jogador {
  name: string;
  posicao: string;
  foto: string;
}

export default function Home() {
  const jogadores: Jogador[] = [
    { name: "Diego alves", posicao: "gol", foto: "/imagens/diego-alves.png" },
    { name: "Cesar", posicao: "gol", foto: "/imagens/cesar.png" },
    { name: "Pablo Mari", posicao: "zag", foto: "/imagens/mari.png" },
    { name: "Rodrigo Caio", posicao: "zag", foto: "/imagens/rodrigo-caio.png" },
    { name: "Rhodolfo", posicao: "zag", foto: "/imagens/rhodolfo.png" },
    { name: "M.thuler", posicao: "zag", foto: "/imagens/thuler.png" },
    { name: "Filipe Luis", posicao: "le", foto: "/imagens/filipe.png" },
    { name: "Rene", posicao: "le", foto: "/imagens/rene.png" },
    { name: "Rafinha", posicao: "ld", foto: "/imagens/rafinha.png" },
    { name: "Rodinei", posicao: "ld", foto: "/imagens/rodinei.png" },
    { name: "W.arão", posicao: "vol", foto: "/imagens/arao.png" },
    { name: "Gerson", posicao: "vol", foto: "/imagens/gerson.png" },
    { name: "P.Da Motta", posicao: "vol", foto: "/imagens/piris.png" },
    { name: "V.Souza", posicao: "vol", foto: "/imagens/vinicius.png" },
    { name: "Arrascaeta", posicao: "mc", foto: "/imagens/arrascaeta.png" },
    { name: "Diego", posicao: "mc", foto: "/imagens/diego.jpg" },
    { name: "Reinier", posicao: "mc", foto: "/imagens/reinier.png" },
    { name: "Berrio", posicao: "ata", foto: "/imagens/berrio.png" },
    { name: "Vitinho", posicao: "mc", foto: "/imagens/vitinho.png" },
    { name: "B.Henrique", posicao: "ata", foto: "/imagens/bruno.png" },
    { name: "E.Ribeiro", posicao: "ata", foto: "/imagens/everton.png" },
    { name: "Gabriel B.", posicao: "ata", foto: "/imagens/gabigol.png" },
    { name: "Lincoln", posicao: "ata", foto: "/imagens/lincon.png" },
  ];

  // Estado do campo (4-2-3-1)
  const [campo, setCampo] = useState<{ posicao: string; jogador: Jogador | null }[]>([
    { posicao: "gol", jogador: null },
    { posicao: "le", jogador: null },
    { posicao: "zag", jogador: null },
    { posicao: "zag", jogador: null },
    { posicao: "ld", jogador: null },
    { posicao: "vol", jogador: null },
    { posicao: "vol", jogador: null },
    { posicao: "ata", jogador: null },
    { posicao: "mc", jogador: null },
    { posicao: "ata", jogador: null },
    { posicao: "ata", jogador: null },
  ]);

  const [banco, setBanco] = useState<Jogador[]>([...jogadores]);
  const [posicaoSelecionada, setPosicaoSelecionada] = useState<number | null>(null);

  // Seleciona jogador
  function selecionarJogador(jogador: Jogador) {
    if (posicaoSelecionada === null) return;

    const novoCampo = [...campo];
    const jogadorAntigo = novoCampo[posicaoSelecionada].jogador;

    novoCampo[posicaoSelecionada].jogador = jogador;
    setCampo(novoCampo);

    const novoBanco = banco.filter((j) => j !== jogador);
    if (jogadorAntigo) novoBanco.push(jogadorAntigo);
    setBanco(novoBanco);

    setPosicaoSelecionada(null);
  }

  // Compartilhar montagem
  const compartilharTime = async () => {
    try {
      await navigator.share({
        title: "Monte o Flamengo de 2019",
        text: "Esse foi o meu time do Flamengo de 2019! Monte o seu também 🔥⚽",
        url: window.location.href,
      });
    } catch (error) {
      console.log("Compartilhamento cancelado ou não suportado.");
    }
  };

  // Renderiza posição
  function renderPosicao(index: number) {
    const pos = campo[index];

    const placeholder = (() => {
      switch (pos.posicao) {
        case "gol": return "GOL";
        case "le": return "LE";
        case "ld": return "LD";
        case "zag": return "ZAG";
        case "vol": return "VOL";
        case "mc": return "MC";
        case "ata": return "ATA";
        default: return "";
      }
    })();

    return (
      <div
        className="flex flex-col items-center justify-center cursor-pointer transition hover:scale-105"
        onClick={() => setPosicaoSelecionada(index)}
      >
        {pos.jogador ? (
          <div className="flex flex-col items-center">
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-red-800 shadow-md flex items-center justify-center bg-black/20">
              <Image
                src={pos.jogador.foto}
                alt={pos.jogador.name}
                width={60}
                height={60}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xs text-center mt-1 text-white font-bold">{pos.jogador.name}</span>
          </div>
        ) : (
          <div className="text-gray-300 font-bold text-xs h-[50px] w-[50px] flex items-center justify-center border border-red-800 rounded-md">
            {placeholder}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/imagens/fundo.webp')] bg-cover bg-center p-4 sm:p-6">
      <div className="flex items-center justify-between w-full max-w-3xl mb-4">
        <div className="flex justify-center m-[auto] w-[400px] flex-wrap ">
          <h3 className="text-2xl font-bold text-white mr-[10px]">Monte o Flamengo de 2019</h3>
          <button
            onClick={compartilharTime}
            className="bg-red-700 hover:bg-red-600 text-white rounded-full p-2 shadow-md cursor-pointer transition "
            title="Compartilhar"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Campo usando Grid */}
      <div className="campo relative
      w-[90vw] sm:w-[500px] md:w-[650px] lg:w-[750px] xl:w-[850px]
      h-[65vh] sm:h-[550px] md:h-[600px]
      rounded-xl border-4 border-green-900
      bg-[url('/imagens/campo.svg')] bg-cover bg-center
      grid grid-rows-5 grid-cols-4
      gap-2 sm:gap-4 p-3 sm:p-4">
        {/* Goleiro */}
        <div className="row-start-1 col-start-2 col-span-2 m-[-10px]" >{renderPosicao(0)}</div>

        {/* Linha defensiva (4) */}
        <div className="row-start-2 col-start-1 m-[10px]">{renderPosicao(1)}</div>
        <div className="row-start-2 col-start-2">{renderPosicao(2)}</div>
        <div className="row-start-2 col-start-3">{renderPosicao(3)}</div>
        <div className="row-start-2 col-start-4 m-[10px]">{renderPosicao(4)}</div>

        {/* Volantes (2) */}
        <div className="row-start-4 col-start-2 m-[-20px]">{renderPosicao(5)}</div>
        <div className="row-start-4 col-start-3 m-[-20px]">{renderPosicao(6)}</div>

        {/* Meias ofensivos (3) */}
        <div className="row-start-5 col-start-1 ">{renderPosicao(7)}</div>
        <div className="row-start-5 col-start-2 col-span-2 m-[10px]">{renderPosicao(8)}</div>
        <div className="row-start-5 col-start-4">{renderPosicao(9)}</div>

        {/* Atacante (1) */}
        <div className="row-start-8 col-start-2 col-span-2">{renderPosicao(10)}</div>
      </div>

      {/* Banco de reservas */}
      {posicaoSelecionada !== null && (
        <div className="opcoes-banco flex flex-wrap gap-4 mt-6 justify-center bg-red-800/90 p-4 rounded-xl text-black max-w-3xl">
          {banco
            .filter((j) => j.posicao === campo[posicaoSelecionada].posicao)
            .map((jogador) => (
              <div
                key={jogador.name}
                className="flex flex-col items-center cursor-pointer hover:scale-110 transition"
                onClick={() => selecionarJogador(jogador)}
              >
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-red-500 flex items-center justify-center">
                  <Image
                    src={jogador.foto}
                    alt={jogador.name}
                    width={50}
                    height={50}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm text-center mt-1 font-bold text-white">{jogador.name}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
