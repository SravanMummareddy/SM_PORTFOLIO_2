import { ImageResponse } from "next/og";

/*
  Apple touch icon (iOS home-screen / bookmark). Same accent node mark as the
  favicon, scaled up with more breathing room; iOS applies its own rounded mask.
*/

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        <div
          style={{
            position: "absolute",
            width: 150,
            height: 150,
            display: "flex",
            background:
              "radial-gradient(circle at center, rgba(94,139,255,0.45) 0%, rgba(94,139,255,0) 70%)",
          }}
        />
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 22,
            background: "#5e8bff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
