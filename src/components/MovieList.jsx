import React, { useEffect, useRef } from "react";
import { BookmarkHeart, BookmarkX } from "react-bootstrap-icons";

const MovieList = (props) => {
  const CanvasImage = ({ movie }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const width = 300; // 캔버스 너비 설정
      const height = 300; // 캔버스 높이 설정

      canvas.width = width;
      canvas.height = height;

      // 배경색 설정
      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);

      // 텍스트 스타일 설정
      context.fillStyle = "white";
      context.font = "20px Roboto";
      context.textAlign = "center"; // 텍스트 가운데 정렬
      context.textBaseline = "middle"; // 텍스트 수직 가운데 정렬

      // 텍스트 줄바꿈 함수
      const wrapText = (text, x, y, maxWidth, lineHeight) => {
        const words = text.split(" ");
        let line = "";
        const lines = [];

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + " ";
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + " ";
          } else {
            line = testLine;
          }
        }
        lines.push(line);

        for (let k = 0; k < lines.length; k++) {
          context.fillText(
            lines[k],
            x,
            y + (k - lines.length / 2) * lineHeight
          );
        }
      };

      // 텍스트 추가 (캔버스 중앙에 위치)
      const maxWidth = width; // 텍스트 최대 너비 (패딩 고려)
      const lineHeight = 25; // 줄 간격
      const x = width / 2;
      const y = height / 2;
      wrapText(movie.Title, x, y, maxWidth, lineHeight);
    }, [movie.Title]);

    return <canvas ref={canvasRef} />;
  };

  return (
    <>
      {props.movies.map((m) => (
        <div className="image-container d-flex m-3" key={m.imdbID}>
          {m.Poster !== "N/A" ? (
            <img src={m.Poster} alt="movie"></img>
          ) : (
            <CanvasImage movie={m} />
          )}

          <span className="fav overlay" onClick={() => props.handleClick(m)}>
            {props.addMovie ? <BookmarkHeart /> : <BookmarkX />}
          </span>

          <div className="info overlay">
            {m.Title}({m.Year})
          </div>

          {/* <div className="overlay align-items-center justify-content-center">
            <div className="info">
              {m.Title}({m.Year})
            </div>

            {props.addMovie ? (
              <div className="fav" onClick={() => props.handleClick(m)}>
                <span className="me-2">Save to Your Favorites</span>
                <span>🤍</span>
              </div>
            ) : (
              <div className="fav" onClick={() => props.handleClick(m)}>
                <span className="me-2">Delete from Favorites</span>
                <span>❌</span>
              </div>
            )}
          </div> */}
        </div>
      ))}
    </>
  );
};

export default MovieList;
