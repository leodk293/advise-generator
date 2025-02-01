"use client";
import { useState, useEffect } from "react";
import divider from "../pattern-divider-desktop.svg";
import Image from "next/image";
import dice from "../icon-dice.svg";

const Main = () => {
  const [adviceNumber, setAdviceNumber] = useState(1);
  const [advice, setAdvice] = useState({
    error: false,
    data: undefined,
    loading: false,
  });

  function handleLoading() {
    setAdvice({
      error: false,
      data: undefined,
      loading: true,
    });
  }

  function handleError() {
    setAdvice({
      error: true,
      data: undefined,
      loading: false,
    });
  }

  async function fetchAdvice() {
    handleLoading();
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        throw new Error(`An error has occurred !!!`);
      }
      const result = await res.json();
      setAdvice({
        error: false,
        data: result.slip,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      handleError();
    }
  }
  useEffect(() => {
    fetchAdvice();
  }, []);
  return (
    <main className=" flex flex-col items-center">
      <div className=" mt-[10rem] h-[17rem] mx-auto w-auto flex flex-col items-center p-5 gap-8 border border-transparent rounded-[10px] bg-[#313a49] md:w-[30%]">
        <h1 className=" font-bold text-green-500">Advice # {adviceNumber}</h1>

        {advice.error === true ? (
          <p className="text-xl font-semibold text-red-800">
            Something went wrong !
          </p>
        ) : advice.loading === true ? (
          <p className="text-xl h-[5rem] font-semibold text-orange-800">
            Loading
          </p>
        ) : (
          <p className=" text-white h-[5rem] text-2xl text-center font-semibold">
            "{advice.data && advice.data.advice}"
          </p>
        )}

        <Image
          alt="DIVIDER"
          className=" pt-9 object-cover md:pt-2"
          width={500}
          height={10}
          src={divider}
        />
      </div>
      <button
        onClick={() => {
          fetchAdvice();
          setAdviceNumber((prev) => prev + 1);
        }}
        className=" mt-[-20px] p-3 rounded-[50%] bg-green-500 hover:bg-green-400 duration-300 shadow"
      >
        <Image
          alt="DICE"
          className=" object-cover"
          width={20}
          height={20}
          src={dice}
        />
      </button>
    </main>
  );
};

export default Main;
