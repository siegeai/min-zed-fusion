/**
 * Tiny pure-CSS mascot for the landing page.
 * Blue blob with big expressive eyes, a little sprout, and a happy open mouth.
 */
const MiniMascot = ({ size = 30 }: { size?: number }) => {
  const b = (v: number) => Math.round(size * v);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Sprout */}
      <div style={{ position: "absolute", top: b(-0.14), left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
        <div style={{ width: b(0.12), height: b(0.14), background: "#4ADE80", borderRadius: "50% 0 50% 0", transform: "rotate(-20deg)" }} />
        <div style={{ width: Math.max(1, b(0.03)), height: b(0.06), background: "#6EE7B7", borderRadius: 1, marginTop: -1 }} />
      </div>

      {/* Body — slightly squished blob shape */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "48% 52% 52% 48% / 50% 46% 54% 50%",
          background: "linear-gradient(145deg, #6C9FFF 0%, #4F7BF7 50%, #3B5EE6 100%)",
          position: "relative",
          boxShadow: "0 3px 10px rgba(79,123,247,0.35)",
          animation: "mascot-idle 2.5s ease-in-out infinite",
          zIndex: 1,
        }}
      >
        {/* Body highlight */}
        <div
          style={{
            position: "absolute",
            top: b(0.08),
            left: b(0.15),
            width: b(0.35),
            height: b(0.18),
            background: "rgba(255,255,255,0.18)",
            borderRadius: "50%",
            transform: "rotate(-15deg)",
          }}
        />

        {/* Left eye */}
        <div
          style={{
            position: "absolute",
            top: b(0.22),
            left: b(0.14),
            width: b(0.24),
            height: b(0.26),
            background: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: b(0.13),
              height: b(0.13),
              background: "#1a1a2e",
              borderRadius: "50%",
              position: "relative",
              animation: "mascot-look 4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: Math.max(1, b(0.02)),
                right: Math.max(1, b(0.02)),
                width: Math.max(1, b(0.045)),
                height: Math.max(1, b(0.045)),
                background: "white",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>

        {/* Right eye */}
        <div
          style={{
            position: "absolute",
            top: b(0.22),
            right: b(0.14),
            width: b(0.24),
            height: b(0.26),
            background: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: b(0.13),
              height: b(0.13),
              background: "#1a1a2e",
              borderRadius: "50%",
              position: "relative",
              animation: "mascot-look 4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: Math.max(1, b(0.02)),
                right: Math.max(1, b(0.02)),
                width: Math.max(1, b(0.045)),
                height: Math.max(1, b(0.045)),
                background: "white",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>

        {/* Happy open mouth */}
        <div
          style={{
            position: "absolute",
            bottom: b(0.18),
            left: "50%",
            transform: "translateX(-50%)",
            width: b(0.22),
            height: b(0.12),
            background: "#1a1a2e",
            borderRadius: "0 0 50% 50%",
            overflow: "hidden",
            zIndex: 3,
          }}
        >
          {/* Tongue */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: b(0.11),
              height: b(0.06),
              background: "#FF7EB3",
              borderRadius: "50% 50% 0 0",
            }}
          />
        </div>

        {/* Left cheek */}
        <div
          style={{
            position: "absolute",
            top: b(0.5),
            left: b(0.04),
            width: b(0.16),
            height: b(0.09),
            background: "rgba(255,130,170,0.3)",
            borderRadius: "50%",
            zIndex: 2,
          }}
        />
        {/* Right cheek */}
        <div
          style={{
            position: "absolute",
            top: b(0.5),
            right: b(0.04),
            width: b(0.16),
            height: b(0.09),
            background: "rgba(255,130,170,0.3)",
            borderRadius: "50%",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

export default MiniMascot;
