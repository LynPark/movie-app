import React, { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const width = 300; // 캔버스 너비 설정
    const height = 400; // 캔버스 높이 설정

    canvas.width = width;
    canvas.height = height;

    // 배경색 설정
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    // 텍스트 추가
    context.fillStyle = "white";
    context.font = "20px Roboto";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Poster Not Found :(", width / 2, 150);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
