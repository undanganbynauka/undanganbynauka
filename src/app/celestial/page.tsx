function CelestialContent() {
  const [phase, setPhase] = useState<Phase>("checking");
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  useEffect(() => {
    if (isPreview) {
      setPhase("gate");
    } else if (localStorage.getItem(STORAGE_KEY) === "true") {
      setPhase("inside");
    } else {
      setPhase("gate");
    }
  }, [isPreview]);

  const handleOpen = useCallback(() => {
    if (!isPreview) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, [isPreview]);

  if (phase === "checking") {
    return (
      <main className="celestial-page">
        <StarField />
        <ShootingStar />
      </main>
    );
  }

  return (
    <main className="celestial-page">
      <StarField />
      <ShootingStar />

      {(phase === "gate" || phase === "opening") && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            pointerEvents: phase === "gate" ? "auto" : "none",
            opacity: phase === "gate" ? 1 : 0,
            transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <CelestialHero onOpen={phase === "gate" ? handleOpen : undefined} />
        </div>
      )}

      {phase !== "gate" && (
        <div
          style={{
            opacity: phase === "opening" ? 0 : 1,
            transition: "opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
          }}
        >
          <CelestialSaveTheDate />
          <CelestialSectionReveal><CelestialCountdown /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialBrideGroom /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialEvent /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialJourney /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialRSVP /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialWishes /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialClosing /></CelestialSectionReveal>
          <CelestialNav />
        </div>
      )}

      <CelestialMusic />
    </main>
  );
}
