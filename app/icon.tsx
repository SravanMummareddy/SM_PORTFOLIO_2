import { ImageResponse } from "next/og";

/*
  Branded favicon — the site's accent "system node" mark (the same square
  node as the wordmark) glowing on the near-black canvas. Generated at build,
  so it stays in sync with the brand. Replaces the default Next.js favicon.
*/

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090a",
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            width: 58,
            height: 58,
            display: "flex",
            background:
              "radial-gradient(circle at center, rgba(94,139,255,0.5) 0%, rgba(94,139,255,0) 70%)",
          }}
        />
        {/* node mark */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 9,
            background: "#5e8bff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
