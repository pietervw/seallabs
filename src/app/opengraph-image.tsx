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
          background: "#ffffff",
          color: "#0a0a0a",
          fontFamily: "system-ui, sans-serif",
          border: "12px solid #0a0a0a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            fontSize: 42,
            fontWeight: 800,
          }}
        >
          <span>Seal</span>
          <span
            style={{
              background: "#f5b48a",
              color: "#3a2214",
              border: "3px solid #0a0a0a",
              borderRadius: 10,
              padding: "4px 14px",
            }}
          >
            Labs
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: 920,
            }}
          >
            Production SaaS that ships and stays up
          </div>
          <div style={{ fontSize: 26, color: "#525252", maxWidth: 820 }}>
            Identity · hiring · field ops · education · APIs
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            background: "#f5b48a",
            color: "#3a2214",
            border: "3px solid #0a0a0a",
            borderRadius: 12,
            padding: "10px 18px",
            alignSelf: "flex-start",
            boxShadow: "6px 6px 0 0 #0a0a0a",
          }}
        >
          seallabs.io
        </div>
      </div>
    ),
    { ...size },
  );
}
