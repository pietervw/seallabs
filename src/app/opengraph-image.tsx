import { ImageResponse } from "next/og";

export const alt = "Seal Labs — software systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(160deg, #05080c 0%, #0a1510 55%, #05080c 100%)",
          color: "#d8ffe8",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#39ffa0",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: "#39ffa0",
              boxShadow: "0 0 18px rgba(57,255,160,0.8)",
            }}
          />
          SEAL LABS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 52,
              lineHeight: 1.1,
              maxWidth: 920,
              color: "#39ffa0",
            }}
          >
            {">_ ./build --target production"}
          </div>
          <div style={{ fontSize: 26, color: "#6f8f7c", maxWidth: 820 }}>
            identity · hiring · field ops · education · apis
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#5ce1ff" }}>seallabs.io</div>
      </div>
    ),
    { ...size },
  );
}
