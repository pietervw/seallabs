import { ImageResponse } from "next/og";

export const alt = "Seal Labs — software studio";
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
          background:
            "linear-gradient(145deg, #eef3f6 0%, #d7ebe8 45%, #f7fafb 100%)",
          color: "#0c1f2e",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 36,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 999,
              background: "linear-gradient(145deg, #1f6f6a, #3a5f7a)",
            }}
          />
          Seal Labs
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 650, lineHeight: 1.05, maxWidth: 900 }}>
            Trustworthy SaaS, built with calm craft.
          </div>
          <div style={{ fontSize: 28, color: "#5a6f7d", maxWidth: 820 }}>
            Education · Identity · Hiring · Field operations · APIs
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#154f4b" }}>seallabs.io</div>
      </div>
    ),
    { ...size },
  );
}
