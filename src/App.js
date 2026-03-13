import { useState, useEffect } from "react";

const questions = [
  {
    id: 1,
    category: "基本情報",
    text: "従業員規模を教えてください",
    options: [
      { label: "1〜5名", value: 1 },
      { label: "6〜20名", value: 2 },
      { label: "21〜50名", value: 3 },
      { label: "51名以上", value: 4 },
    ],
  },
  {
    id: 2,
    category: "業務効率",
    text: "メール・文書作成にかかる時間は？",
    options: [
      { label: "ほぼない", value: 4 },
      { label: "週1〜2時間", value: 3 },
      { label: "週3〜5時間", value: 2 },
      { label: "週5時間以上", value: 1 },
    ],
  },
  {
    id: 3,
    category: "会議・議事録",
    text: "会議の議事録作成はどうしていますか？",
    options: [
      { label: "ツールで自動化済み", value: 4 },
      { label: "担当者が手入力", value: 1 },
      { label: "録音して後で書く", value: 2 },
      { label: "ほぼ記録していない", value: 1 },
    ],
  },
  {
    id: 4,
    category: "顧客対応",
    text: "問い合わせ・顧客対応の処理方法は？",
    options: [
      { label: "AIチャットボット活用", value: 4 },
      { label: "テンプレートで対応", value: 3 },
      { label: "毎回手作業で返信", value: 1 },
      { label: "対応が追いついていない", value: 1 },
    ],
  },
  {
    id: 5,
    category: "データ管理",
    text: "売上・在庫などのデータ集計は？",
    options: [
      { label: "自動化・ダッシュボード化", value: 4 },
      { label: "Excelで手集計", value: 2 },
      { label: "紙や手書き", value: 1 },
      { label: "ほぼ管理していない", value: 1 },
    ],
  },
  {
    id: 6,
    category: "AIツール",
    text: "現在AIツールを使っていますか？",
    options: [
      { label: "複数のAIツールを活用", value: 4 },
      { label: "ChatGPT等を試したことがある", value: 2 },
      { label: "興味はあるが未使用", value: 1 },
      { label: "全く使っていない", value: 1 },
    ],
  },
  {
    id: 7,
    category: "採用・HR",
    text: "採用・社内研修にかかる工数は？",
    options: [
      { label: "少ない（仕組み化済み）", value: 4 },
      { label: "月数時間程度", value: 3 },
      { label: "月10時間以上", value: 1 },
      { label: "手が回っていない", value: 1 },
    ],
  },
  {
    id: 8,
    category: "情報収集",
    text: "業界ニュース・トレンドのキャッチアップは？",
    options: [
      { label: "自動収集・要約化済み", value: 4 },
      { label: "定期的に自分で調べる", value: 2 },
      { label: "気が向いたときだけ", value: 1 },
      { label: "ほぼしていない", value: 1 },
    ],
  },
  {
    id: 9,
    category: "SNS・マーケ",
    text: "SNSや広告運用はどうしていますか？",
    options: [
      { label: "自動化・AIで効率化済み", value: 4 },
      { label: "担当者が手動で運用", value: 2 },
      { label: "不定期に投稿のみ", value: 1 },
      { label: "ほぼやっていない", value: 1 },
    ],
  },
  {
    id: 10,
    category: "導入意向",
    text: "AI導入に対する社内の雰囲気は？",
    options: [
      { label: "積極的・すぐ動ける", value: 4 },
      { label: "興味あり・検討中", value: 3 },
      { label: "やや慎重", value: 2 },
      { label: "懐疑的・反対意見あり", value: 1 },
    ],
  },
];

const getResult = (score) => {
  const pct = Math.round((score / 40) * 100);
  if (pct >= 75) {
    return {
      level: "AI活用先進企業",
      emoji: "🚀",
      color: "#4D9EFF",
      plan: "ライトプラン",
      planPrice: "29,800円/月",
      description: "すでに高い水準でAIを活用されています。最新AIニュースのキャッチアップと定例MTGで、さらなる競争優位を維持しましょう。",
      tops: ["最新AIトレンドの継続インプット", "活用ツールの定期レビュー・最適化", "競合他社のAI動向ウォッチ"],
    };
  } else if (pct >= 50) {
    return {
      level: "AI導入成長期",
      emoji: "📈",
      color: "#FFB800",
      plan: "スタンダード",
      planPrice: "79,800円/月",
      description: "部分的にAIを活用できています。体系的な導入支援で月間20〜40時間の業務削減が見込めます。",
      tops: ["議事録・メール作成の自動化", "データ集計ダッシュボード構築", "AIチャットボット導入"],
    };
  } else {
    return {
      level: "AI導入スタート期",
      emoji: "🌱",
      color: "#00E5A0",
      plan: "顧問",
      planPrice: "198,000円/月",
      description: "AI導入の大きなチャンスが眠っています。専任顧問として実装まで伴走し、月間30〜50時間の業務削減を一緒に実現します。",
      tops: ["ChatGPT基礎〜応用レクチャー", "社内業務のAI実装を直接サポート", "AI導入ロードマップの策定"],
    };
  }
};

export default function App() {
  const [step, setStep] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [score, setScore] = useState(0);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    const value = questions[current].options[selectedIndex].value;
    setAnimating(true);
    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [current]: value }));
      if (current + 1 >= questions.length) {
        setScore(Object.values({ ...answers, [current]: value }).reduce((a, b) => a + b, 0));
        setStep("result");
      } else {
        setCurrent((c) => c + 1);
        setSelectedIndex(null);
      }
      setAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (current === 0) return;
    const prevValue = answers[current - 1];
    const prevIndex = prevValue !== undefined
      ? questions[current - 1].options.findIndex((o) => o.value === prevValue)
      : null;
    setCurrent((c) => c - 1);
    setSelectedIndex(prevIndex >= 0 ? prevIndex : null);
  };

  const reset = () => {
    setStep("intro");
    setCurrent(0);
    setAnswers({});
    setSelectedIndex(null);
    setCompanyName("");
  };

  const finalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const finalPct = Math.round((finalScore / 40) * 100);
  const finalResult = getResult(finalScore);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0E1A",
      fontFamily: "'Noto Sans JP', sans-serif",
      color: "#E8EAF0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(77,158,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(77,158,255,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      {/* Glow */}
      <div style={{
        position: "fixed", top: "-200px", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(77,158,255,0.12) 0%, transparent 70%)",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "620px" }}>

        {/* INTRO */}
        {step === "intro" && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease" }}>
            <div style={{
              display: "inline-block",
              background: "rgba(77,158,255,0.1)",
              border: "1px solid rgba(77,158,255,0.3)",
              borderRadius: "100px",
              padding: "6px 18px",
              fontSize: "12px",
              color: "#4D9EFF",
              letterSpacing: "0.1em",
              marginBottom: "24px",
            }}>AI BUSINESS DIAGNOSIS</div>

            <h1 style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}>
              貴社の<span style={{ color: "#4D9EFF" }}>AI化スコア</span>を<br />無料で診断します
            </h1>

            <p style={{ color: "#8890A4", fontSize: "15px", lineHeight: 1.7, marginBottom: "36px" }}>
              10の質問に答えるだけで、業務効率化の<br />可能性と最適なプランをご提案します。
            </p>

            <div style={{ marginBottom: "32px" }}>
              <input
                type="text"
                placeholder="会社名（任意）"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  padding: "14px 20px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "12px",
                  color: "#E8EAF0",
                  fontSize: "15px",
                  outline: "none",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              onClick={() => setStep("quiz")}
              style={{
                background: "linear-gradient(135deg, #4D9EFF, #3B7FE0)",
                color: "#fff",
                border: "none",
                borderRadius: "14px",
                padding: "16px 48px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.05em",
                boxShadow: "0 8px 32px rgba(77,158,255,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(77,158,255,0.5)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 32px rgba(77,158,255,0.35)"; }}
            >
              診断スタート →
            </button>

            <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "40px" }}>
              {["所要時間 約2分", "完全無料", "10問"].map((t) => (
                <div key={t} style={{ fontSize: "12px", color: "#5A6075", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#4D9EFF" }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QUIZ */}
        {step === "quiz" && (
          <div style={{ opacity: animating ? 0 : 1, transition: "opacity 0.25s" }}>
            {/* Progress */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px", color: "#5A6075", letterSpacing: "0.1em" }}>
                  {questions[current].category}
                </span>
                <span style={{ fontSize: "13px", color: "#4D9EFF", fontWeight: 700 }}>
                  {current + 1} / {questions.length}
                </span>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "100px" }}>
                <div style={{
                  height: "100%",
                  width: `${((current + 1) / questions.length) * 100}%`,
                  background: "linear-gradient(90deg, #4D9EFF, #00E5A0)",
                  borderRadius: "100px",
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>

            {/* Question */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "32px",
              marginBottom: "16px",
            }}>
              <p style={{ fontSize: "20px", fontWeight: 700, lineHeight: 1.5, marginBottom: "28px", letterSpacing: "-0.01em" }}>
                Q{current + 1}. {questions[current].text}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {questions[current].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: selectedIndex === i
                        ? "1px solid #4D9EFF"
                        : "1px solid rgba(255,255,255,0.08)",
                      background: selectedIndex === i
                        ? "rgba(77,158,255,0.12)"
                        : "rgba(255,255,255,0.02)",
                      color: selectedIndex === i ? "#4D9EFF" : "#C8D0E0",
                      fontSize: "15px",
                      fontWeight: selectedIndex === i ? 700 : 400,
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span style={{
                      width: "24px", height: "24px",
                      borderRadius: "50%",
                      border: selectedIndex === i ? "2px solid #4D9EFF" : "2px solid rgba(255,255,255,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "12px",
                      color: selectedIndex === i ? "#4D9EFF" : "transparent",
                    }}>
                      {selectedIndex === i ? "●" : ""}
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              {current > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "#8890A4",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                >
                  ← 戻る
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={selectedIndex === null}
                style={{
                  flex: 3,
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background: selectedIndex !== null
                    ? "linear-gradient(135deg, #4D9EFF, #3B7FE0)"
                    : "rgba(255,255,255,0.06)",
                  color: selectedIndex !== null ? "#fff" : "#4A5068",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: selectedIndex !== null ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                  boxShadow: selectedIndex !== null ? "0 6px 24px rgba(77,158,255,0.3)" : "none",
                }}
              >
                {current + 1 === questions.length ? "診断結果を見る →" : "次の質問 →"}
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && (
          <div style={{ animation: "fadeIn 0.8s ease" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              {companyName && (
                <p style={{ color: "#5A6075", fontSize: "14px", marginBottom: "8px" }}>
                  {companyName} の診断結果
                </p>
              )}
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>{finalResult.emoji}</div>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: finalResult.color, marginBottom: "4px" }}>
                {finalResult.level}
              </h2>
            </div>

            {/* Score */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${finalResult.color}33`,
              borderRadius: "20px",
              padding: "32px",
              textAlign: "center",
              marginBottom: "20px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse at center, ${finalResult.color}08 0%, transparent 70%)`,
              }} />
              <div style={{ position: "relative" }}>
                <div style={{
                  fontSize: "72px",
                  fontWeight: 900,
                  color: finalResult.color,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}>
                  {finalPct}
                  <span style={{ fontSize: "28px", fontWeight: 600 }}>点</span>
                </div>
                <div style={{ color: "#5A6075", fontSize: "13px", marginTop: "8px" }}>AI化スコア（100点満点）</div>

                <div style={{
                  height: "6px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "100px",
                  margin: "20px 0",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${finalPct}%`,
                    background: `linear-gradient(90deg, ${finalResult.color}, ${finalResult.color}99)`,
                    borderRadius: "100px",
                    transition: "width 1s ease",
                  }} />
                </div>

                <p style={{ color: "#A0A8B8", fontSize: "14px", lineHeight: 1.7 }}>
                  {finalResult.description}
                </p>
              </div>
            </div>

            {/* TOP3 */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "20px",
            }}>
              <h3 style={{ fontSize: "14px", color: "#5A6075", letterSpacing: "0.1em", marginBottom: "16px" }}>
                今すぐ改善できる業務 TOP3
              </h3>
              {finalResult.tops.map((t, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "14px",
                  padding: "12px 0",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <span style={{
                    width: "28px", height: "28px",
                    background: `${finalResult.color}22`,
                    color: finalResult.color,
                    borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "13px", flexShrink: 0,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: "15px", lineHeight: 1.5, color: "#C8D0E0" }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Recommended Plan */}
            <div style={{
              background: `linear-gradient(135deg, ${finalResult.color}18, ${finalResult.color}08)`,
              border: `1px solid ${finalResult.color}44`,
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}>
              <div>
                <p style={{ fontSize: "12px", color: finalResult.color, letterSpacing: "0.1em", marginBottom: "4px" }}>
                  推奨プラン
                </p>
                <p style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.02em" }}>
                  {finalResult.plan}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "11px", color: "#5A6075", marginBottom: "2px" }}>月額</p>
                <p style={{ fontSize: "24px", fontWeight: 900, color: finalResult.color }}>
                  {finalResult.planPrice}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href="mailto:info@example.com?subject=AI顧問サービスのご相談"
                style={{
                  display: "block",
                  background: "linear-gradient(135deg, #4D9EFF, #3B7FE0)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "16px",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  textAlign: "center",
                  textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(77,158,255,0.35)",
                  letterSpacing: "0.03em",
                }}
              >
                無料相談を申し込む →
              </a>
              <button
                onClick={reset}
                style={{
                  background: "transparent",
                  color: "#5A6075",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "14px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                もう一度診断する
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;800;900&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #3A4055; }
      `}</style>
    </div>
  );
}
