import React from "react";
import { TiktokResponse } from "../types";
import { SketchButton } from "./SketchButton";
import {
  Download,
  Music,
  Video,
  Image as ImageIcon,
  User,
  Play,
} from "lucide-react";

interface ResultCardProps {
  data: TiktokResponse;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data, onReset }) => {
  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-3xl bg-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-bottom-4 duration-500 sketch-border relative mt-6">
      {/* Tape effect - styled like the Paste Link box */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-8 bg-yellow-300 border-2 border-black rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sketch-border-sm"></div>

      {/* 1. Username Header (Left Aligned) */}
      <div className="flex items-center justify-start gap-3 mb-6 pt-2">
        <div className="bg-black text-white p-2 sketch-border-sm -rotate-2">
          <User size={20} />
        </div>
        <h3 className="font-bold text-2xl md:text-3xl sketch-font text-black tracking-wide">
          {data.creator || "Unknown Creator"}
        </h3>
      </div>

      {/* 2. Content Row: Thumbnail (Left) + Description (Right) */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Thumbnail Column */}
        {data.cover && data.type === "video" && (
          <div className="flex-shrink-0 w-32 md:w-40 mx-auto md:mx-0">
            <div className="relative w-full aspect-[9/16] bg-gray-100 border-2 border-black sketch-border-sm overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
              <img
                src={data.cover}
                alt="Video Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="w-10 h-10 bg-white/80 rounded-full border-2 border-black flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <Play className="w-5 h-5 text-black ml-0.5 fill-black" />
                </div>
              </div>

              {/* Tape on corner */}
              <div className="absolute -top-2 -left-4 w-12 h-6 bg-red-100/90 rotate-[-45deg] shadow-sm border border-gray-200"></div>
            </div>
          </div>
        )}

        {/* Description Column */}
        <div className="flex-1">
          <div className="h-full p-5 bg-gray-50 border-2 border-black sketch-border-sm relative">
            <div className="absolute -top-3 left-4 bg-white px-3 py-1 border-2 border-black sketch-border-sm text-xs font-bold rotate-[-2deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              DESCRIPTION
            </div>
            <p className="text-base leading-relaxed text-black sketch-font text-left mt-2 whitespace-pre-wrap">
              {data.description || "No description available."}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Separator Line */}
      <div className="w-full border-b-4 border-black border-dashed mb-8"></div>

      {/* Content Area */}
      <div className="space-y-8">
        {/* Video Options */}
        {data.type === "video" && (
          <div className="space-y-4">
            <div className="flex items-center justify-start gap-2 mb-2">
              <Video className="w-6 h-6 text-black" />
              <h4 className="font-bold text-xl sketch-font text-black underline decoration-wavy decoration-2">
                Video Downloads
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.video && (
                <div className="flex flex-col items-start justify-between p-4 border-2 border-black bg-white sketch-border-sm gap-4 hover:-translate-y-1 transition-transform h-full">
                  <span className="font-bold sketch-font text-lg text-black">
                    Standard Quality
                  </span>
                  <SketchButton
                    onClick={() => handleDownload(data.video!)}
                    fullWidth
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Download size={18} /> Download MP4
                    </span>
                  </SketchButton>
                </div>
              )}
              {data.videoHd && (
                <div className="flex flex-col items-start justify-between p-4 border-2 border-black bg-yellow-50 sketch-border-sm gap-4 relative overflow-hidden hover:-translate-y-1 transition-transform h-full">
                  {/* Background scribble effect */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 10px)",
                    }}
                  ></div>

                  <span className="font-bold flex items-center gap-2 sketch-font text-lg text-black relative z-10">
                    HD Quality
                    <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full -rotate-2 border border-white shadow-sm">
                      BEST
                    </span>
                  </span>
                  <SketchButton
                    className="relative z-10"
                    onClick={() => handleDownload(data.videoHd!)}
                    fullWidth
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Download size={18} /> Download HD
                    </span>
                  </SketchButton>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Image Slideshow */}
        {data.type === "image" && data.images.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-start gap-2 mb-2">
              <ImageIcon className="w-6 h-6 text-black" />
              <h4 className="font-bold text-xl sketch-font text-black underline decoration-wavy decoration-2">
                Photo Slides
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative border-2 border-black aspect-[3/4] overflow-hidden sketch-border-sm rotate-1 hover:rotate-0 transition-transform bg-white p-2 shadow-md"
                >
                  <img
                    src={img}
                    alt={`Slide ${idx}`}
                    className="w-full h-full object-cover border border-gray-200"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <SketchButton
                      variant="secondary"
                      onClick={() => handleDownload(img)}
                    >
                      <Download size={16} />
                    </SketchButton>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center pt-4">
              <SketchButton
                onClick={() =>
                  data.images.forEach((img, i) =>
                    window.open(img, `_blank${i}`),
                  )
                }
              >
                Download All Photos
              </SketchButton>
            </div>
          </div>
        )}

        {/* Audio */}
        {data.music && (
          <div
            className="mt-8 pt-6 border-t-4 border-black border-dashed relative"
            style={{ borderTopStyle: "dashed" }}
          >
            <div className="absolute -top-4 right-10 bg-white px-2 border-2 border-black sketch-font font-bold text-xs rotate-3 shadow-sm">
              audio_track.mp3
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="animate-spin-slow border-2 border-black rounded-full p-2 bg-white">
                  <Music size={20} />
                </div>
                <span className="font-bold sketch-font text-xl text-black">
                  Original Sound
                </span>
              </div>
              <SketchButton
                variant="secondary"
                onClick={() => handleDownload(data.music!)}
              >
                <span className="flex items-center gap-2">
                  <Download size={16} /> Download MP3
                </span>
              </SketchButton>
            </div>
            <div className="mt-4 p-2 border-2 border-black sketch-border-sm bg-gray-100">
              <audio controls className="w-full h-8" src={data.music}>
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 pt-6 flex justify-center">
        <button
          onClick={onReset}
          className="sketch-font text-xl font-bold text-gray-600 hover:text-black underline decoration-2 hover:decoration-wavy underline-offset-4 transition-all transform hover:-rotate-2"
        >
          ← Download Another Video
        </button>
      </div>
    </div>
  );
};
