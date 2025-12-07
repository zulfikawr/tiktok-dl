import React, { useState } from "react";
import { SketchInput } from "./components/SketchInput";
import { SketchButton } from "./components/SketchButton";
import { ResultCard } from "./components/ResultCard";
import { fetchTiktokData } from "./services/tiktokService";
import { TiktokResponse, DownloadStatus } from "./types";
import { Loader2, AlertTriangle, Github, Zap } from "lucide-react";

const App: React.FC = () => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<DownloadStatus>(DownloadStatus.IDLE);
  const [data, setData] = useState<TiktokResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus(DownloadStatus.LOADING);
    setError(null);
    setData(null);

    try {
      const result = await fetchTiktokData(url);
      setData(result);
      setStatus(DownloadStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setStatus(DownloadStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(DownloadStatus.IDLE);
    setUrl("");
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-12 left-12 w-24 h-24 border-4 border-black rotate-12 -z-10 hidden lg:block opacity-10 sketch-border"></div>
      <div className="fixed bottom-20 right-20 w-32 h-32 border-4 border-black -z-10 hidden lg:block opacity-10 border-dashed rounded-full"></div>
      <div className="fixed top-1/3 right-10 w-4 h-4 bg-black rounded-full opacity-20 hidden md:block"></div>
      <div className="fixed bottom-1/3 left-10 w-16 h-1 bg-black -rotate-45 opacity-20 hidden md:block"></div>

      {/* Header */}
      <header className="w-full max-w-2xl mb-12 text-center relative pt-8">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-yellow-300 opacity-50 -rotate-2 sketch-border -z-10 transform scale-110"></div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 relative z-10">
            <span className="text-black drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
              TIKTOK
            </span>
            <span
              className="text-white text-stroke-2 relative"
              style={{ WebkitTextStroke: "2px black" }}
            >
              DL
            </span>
          </h1>
        </div>

        <div className="mt-6 transform -rotate-1">
          <p className="sketch-font text-2xl md:text-3xl text-gray-800 bg-white inline-block px-4 py-1 border-2 border-black sketch-border-sm shadow-sm">
            Download TikToks without watermark.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex flex-col items-center gap-8 z-10 pb-10">
        {status === DownloadStatus.IDLE ||
        status === DownloadStatus.LOADING ||
        status === DownloadStatus.ERROR ? (
          <div className="w-full max-w-xl animate-in fade-in zoom-in duration-300">
            <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative sketch-border mt-6">
              {/* Tape-style Label */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                <div className="whitespace-nowrap border-2 border-black px-6 py-2 bg-yellow-300 font-bold text-xl sketch-font transform -rotate-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sketch-border-sm">
                  Paste Link Below ↓
                </div>
              </div>

              {/* Fake screw heads/rivets */}
              <div className="absolute top-4 left-4 w-3 h-3 border-2 border-black rounded-full flex items-center justify-center">
                <div className="w-full h-[1px] bg-black rotate-45"></div>
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 border-2 border-black rounded-full flex items-center justify-center">
                <div className="w-full h-[1px] bg-black rotate-45"></div>
              </div>
              <div className="absolute bottom-4 left-4 w-3 h-3 border-2 border-black rounded-full flex items-center justify-center">
                <div className="w-full h-[1px] bg-black rotate-45"></div>
              </div>
              <div className="absolute bottom-4 right-4 w-3 h-3 border-2 border-black rounded-full flex items-center justify-center">
                <div className="w-full h-[1px] bg-black rotate-45"></div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 mt-4"
              >
                <SketchInput
                  placeholder="https://tiktok.com/@user/video/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={status === DownloadStatus.LOADING}
                  autoFocus
                />

                <SketchButton
                  type="submit"
                  fullWidth
                  disabled={status === DownloadStatus.LOADING}
                  className="h-16 text-2xl"
                >
                  {status === DownloadStatus.LOADING ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 className="animate-spin w-6 h-6" />{" "}
                      <span className="sketch-font">Drawing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 sketch-font font-bold">
                      <Zap size={24} fill="black" /> GET CONTENT
                    </span>
                  )}
                </SketchButton>

                {status === DownloadStatus.ERROR && (
                  <div className="border-2 border-red-600 bg-red-50 p-4 flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] sketch-border-sm rotate-1">
                    <AlertTriangle className="text-red-600 shrink-0 w-6 h-6" />
                    <div>
                      <h4 className="font-bold text-red-700 sketch-font text-2xl">
                        Oops! Error.
                      </h4>
                      <p className="text-sm text-red-800 font-mono mt-1">
                        {error}
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="mt-12 text-center relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/10 -z-10"></div>
              <span className="bg-[#fcfcfc] px-4 text-gray-500 sketch-font text-lg font-bold">
                Supports Video • Photo • Audio
              </span>
            </div>
          </div>
        ) : null}

        {status === DownloadStatus.SUCCESS && data && (
          <ResultCard data={data} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center flex flex-col items-center gap-2">
        <div className="w-full max-w-xs border-b-2 border-black border-dashed mb-4 opacity-20"></div>
        <div className="flex items-center gap-6 font-bold text-sm">
          <a
            href="https://github.com/zulfikar/tiktok-dl"
            className="flex items-center gap-2 hover:text-black text-gray-600 transition-colors group"
          >
            <div className="p-1 border-2 border-black rounded-full group-hover:bg-yellow-300 transition-colors">
              <Github size={16} />
            </div>
            Source Code
          </a>
          <span className="text-gray-300">|</span>
          <span className="sketch-font text-xl text-gray-800">
            TikTokDL v1.0
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
