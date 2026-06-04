import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Decision scoring. Each logged decision — a situation plus the action
 * taken — is compared against the optimal action from a strategy
 * reference. A match counts as optimal play; a mismatch is recorded as a
 * deviation. Both roll up into a per-session decision-accuracy score.
 */
export function DecisionScoringDiagram() {
  const engine = { x: 210, y: 104, w: 150, h: 58 };
  const engineMid = engine.y + engine.h / 2;

  const decision = { x: 24, y: 66, w: 126, h: 50 };
  const strategy = { x: 24, y: 150, w: 126, h: 50 };
  const optimal = { x: 410, y: 56, w: 140, h: 44 };
  const deviation = { x: 410, y: 156, w: 140, h: 44 };
  const accuracy = { x: 590, y: 104, w: 110, h: 58 };

  const optimalMid = optimal.y + optimal.h / 2;
  const deviationMid = deviation.y + deviation.h / 2;
  const accuracyMid = accuracy.y + accuracy.h / 2;

  return (
    <DiagramFrame title="Decision scoring flow" viewBox="0 0 720 244">
      <Caption x={24} y={24} anchor="start">
        every decision scored against optimal strategy · accuracy rolls up per session
      </Caption>

      <Wire x1={decision.x + decision.w} y1={decision.y + decision.h / 2} x2={engine.x} y2={engineMid - 12} arrow />
      <Wire x1={strategy.x + strategy.w} y1={strategy.y + strategy.h / 2} x2={engine.x} y2={engineMid + 12} arrow />

      <Wire x1={engine.x + engine.w} y1={engineMid} x2={optimal.x} y2={optimalMid} accent arrow />
      <Wire x1={engine.x + engine.w} y1={engineMid} x2={deviation.x} y2={deviationMid} arrow />

      <Wire x1={optimal.x + optimal.w} y1={optimalMid} x2={accuracy.x} y2={accuracyMid - 10} accent arrow />
      <Wire x1={deviation.x + deviation.w} y1={deviationMid} x2={accuracy.x} y2={accuracyMid + 10} arrow />

      <Box {...decision} title="Decision" sub="situation + action" />
      <Box {...strategy} title="Strategy ref" sub="optimal action" />
      <Box {...engine} title="Score engine" sub="compare" accent />
      <Box {...optimal} title="Optimal play" accent />
      <Box {...deviation} title="Deviation" sub="flagged" />
      <Box {...accuracy} title="Accuracy" sub="session %" />

      <Caption x={388} y={50} accent>
        match
      </Caption>
      <Caption x={388} y={214}>
        mismatch
      </Caption>
    </DiagramFrame>
  );
}
