import confetti from "canvas-confetti";

export const useFlowerRain = () => {
  return (customFlowers = []) => {
    confetti({
      particleCount: 100,
      spread: 90,
      startVelocity: 30,
      origin: { y: 0.6 },
      scalar: 1.2,
      ticks: 200,
      shapes: ["emoji"],
      emojis: [...customFlowers, "🌸", "🌺", "🌼", "🌷"], // you can add more flower emojis
    });
  };
};
