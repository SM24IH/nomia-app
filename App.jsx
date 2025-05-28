// Nomia App - M Score now displayed as 1–100% with visual gauge
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function NomiaApp() {
  const [view, setView] = useState("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    age: 48,
    height: 165,
    weight: 65,
    fitnessLevel: "Moderate"
  });
  const [inputs, setInputs] = useState({
    sleep: 70,
    glucoseSpikes: 2,
    hrv: 60,
    restingHR: 65,
    hydration: 80,
    stress: 60,
    hormonalPhase: 2,
    weightChange: 0,
    bodyFat: 30,
    vo2Max: 38,
    bmr: 1500,
    lactateBaseline: 1.2,
    lactateClearance: 30,
    glucoseCV: 15,
    spO2: 96,
    menopauseStage: 3
  });
  const [mScore, setMScore] = useState(null);
  const [activity, setActivity] = useState("");

  const normalizeToSubscore = (value, min, max) => {
    const ratio = (value - min) / (max - min);
    return Math.max(0, Math.min(5, ratio * 5));
  };

  const calculateMScore = () => {
    const shortTermScores = [
      normalizeToSubscore(inputs.sleep, 0, 100),
      normalizeToSubscore(inputs.hrv, 0, 100),
      normalizeToSubscore(inputs.restingHR, 40, 90),
      normalizeToSubscore(inputs.glucoseSpikes, 0, 5),
      normalizeToSubscore(inputs.hydration, 0, 100),
      normalizeToSubscore(inputs.stress, 0, 100),
      normalizeToSubscore(inputs.hormonalPhase, -2, 2)
    ];
    const longTermScores = [
      normalizeToSubscore(inputs.weightChange, -5, 5),
      normalizeToSubscore(inputs.bodyFat, 15, 45),
      normalizeToSubscore(inputs.vo2Max, 30, 60),
      normalizeToSubscore(inputs.bmr, 1200, 2000),
      normalizeToSubscore(inputs.lactateBaseline, 0.5, 2.5),
      normalizeToSubscore(inputs.lactateClearance, 10, 60),
      normalizeToSubscore(inputs.glucoseCV, 10, 30),
      normalizeToSubscore(inputs.spO2, 90, 100),
      normalizeToSubscore(inputs.menopauseStage, 1, 5)
    ];
    const total = shortTermScores.reduce((a, b) => a + b, 0) + longTermScores.reduce((a, b) => a + b, 0);
    const finalScore = Math.round((total / 50) * 100); // Convert to percentage
    setMScore(finalScore);
  };

  if (view === "welcome") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-[#FAF6F2] to-[#e3ecf4] text-[#002B45] font-serif">
        <img src="/images/nomia-logo-placeholder.png" alt="Nomia Logo" className="w-24 mb-6" />
        <h1 className="text-4xl font-bold mb-2">Nomia</h1>
        <p className="mb-6 text-[#5B7F95] text-lg">Your metabolic health companion</p>
        <Button className="bg-[#5B7F95] text-white rounded-full px-6 py-2 text-lg" onClick={() => setView("login")}>Get Started</Button>
      </div>
    );
  }

  if (view === "login") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#FAF6F2] text-[#002B45] font-serif text-center">
        <h1 className="text-3xl font-bold mb-4">Log in to Nomia</h1>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-4 rounded-xl w-full max-w-sm" />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4 rounded-xl w-full max-w-sm" />
        <Button className="bg-[#5B7F95] text-white px-6 py-2 rounded-full w-full max-w-sm" onClick={() => setView("dashboard")}>Login</Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-gradient-to-b from-[#FAF6F2] to-[#f2f6f8] text-[#002B45] font-serif min-h-screen">
      {/* App content here */}
    </div>
  );
}