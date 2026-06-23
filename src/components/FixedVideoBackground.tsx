"use client";

export default function FixedVideoBackground() {
  return (
    <video
      className="fixed top-0 left-0 w-full h-screen object-cover"
      style={{ zIndex: 0 }}
      autoPlay
      muted
      loop
      playsInline
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4"
    />
  );
}
