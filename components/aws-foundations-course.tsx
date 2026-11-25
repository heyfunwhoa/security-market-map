"use client";

import { useState } from "react";
import Link from "next/link";
import { awsFoundationsPassCount, awsFoundationsSteps } from "@/lib/data/aws-foundations-course";

const linkClass = "inline-flex min-h-11 items-center text-primary underline underline-offset-4";
const buttonClass = "min-h-11 rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const lessonSize = awsFoundationsSteps.length;

export function AwsFoundationsCourse() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [showReference, setShowReference] = useState(false);
  const [selfAssessment, setSelfAssessment] = useState("");
  const lesson = awsFoundationsSteps[stepIndex];
  const selected = answers[lesson.id];
  const checked = Boolean(revealed[lesson.id]);
  const correct = Object.entries(answers).filter(([id, choice]) => {
    const matching = awsFoundationsSteps.find((item) => item.id === id);
    return matching && revealed[id] && matching.correctIndex === choice;
  }).length;
  const attempted = Object.values(revealed).filter(Boolean).length;

  function jump(index: number) {
    setStepIndex(index);
    setSelfAssessment("");
  }

  function reset() {
    setAnswers({});
    setRevealed({});
    setSelfAssessment("");
    setStepIndex(0);
  }

  return (
    <section id="aws-foundations-course" aria-labelledby="aws-course-heading" className="mt-8 rounded-xl border border-border bg-card p-4 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Learning course · Synthetic data only</p>
      <h2 id="aws-course-heading" className="mt-2 text-2xl">AWS Security Foundations: Cedar Ridge</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6">Learn the architecture first, make an evidence-based decision, and connect the AWS service to the broader cybersecurity market. Your answers stay only in this page session; no account or AWS resources are required.</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p role="status" aria-live="polite">Lesson {stepIndex + 1} of {lessonSize} · {attempted} checked · {correct} correct</p>
        <button type="button" className={buttonClass} onClick={() => setShowReference((value) => !value)} aria-pressed={showReference}>
          {showReference ? "Hide reference overview" : "Show reference overview"}
        </button>
      </div>

      <nav aria-label="AWS foundation lesson navigation" className="mt-4">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {awsFoundationsSteps.map((item, index) => (
            <li key={item.id}>
              <button type="button" className={buttonClass + " h-full w-full"} aria-current={stepIndex === index ? "step" : undefined} aria-pressed={stepIndex === index} onClick={() => jump(index)}>
                <span className="block text-xs text-muted-foreground">Module {index + 1} {revealed[item.id] ? "· reviewed" : ""}</span>
                <span className="mt-1 block font-medium">{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {showReference && (
        <section className="mt-5 rounded-lg border border-border p-4" aria-label="AWS course quick reference">
          <h3 className="font-semibold">The security architecture in five stages</h3>
          <ol className="mt-2 list-inside list-decimal space-y-2 text-sm leading-6">
            <li>ECS runs the application and uses an IAM task role with STS temporary credentials.</li>
            <li>The role and S3 resource controls determine which object requests are authorized.</li>
            <li>GuardDuty can flag anomalous behavior; separately scoped CloudTrail data events can retain object access history.</li>
            <li>Security Hub brings together supported findings; CSPM contributes configuration control context.</li>
            <li>The SOC validates findings, gets approval for containment and verifies least-privilege remediation.</li>
          </ol>
          <p className="mt-3 text-sm text-muted-foreground">Security Lake may centralize supported data for analysis. Neither Security Hub nor Security Lake is interchangeable with the entire SOC workflow.</p>
          <Link className={linkClass} href="/learn?scenario=cedar-ridge&mode=reference#cedar-ridge">Open full Cedar Ridge reference</Link>
        </section>
      )}

      <article className="mt-6 max-w-4xl" aria-labelledby="current-aws-lesson">
        <p className="text-xs text-muted-foreground">Learning objective: {lesson.objective}</p>
        <h3 id="current-aws-lesson" className="mt-2 text-xl font-semibold">{lesson.title}</h3>
        <div className="mt-4 space-y-3 text-sm leading-6">
          <p><strong>What it means.</strong> {lesson.concept}</p>
          <p><strong>How it works.</strong> {lesson.mechanics}</p>
          <p><strong>Cedar Ridge example.</strong> {lesson.example}</p>
          <p><strong>Important limitation.</strong> {lesson.caveat}</p>
          <a href={lesson.source.url} target="_blank" rel="noreferrer" className={linkClass}>Official AWS reference: {lesson.source.label}</a>
        </div>
      </article>

      <fieldset className="mt-6 max-w-4xl rounded-xl border border-border p-4">
        <legend className="px-1 text-base font-semibold">Decision checkpoint</legend>
        <p className="mt-2 text-sm leading-6">{lesson.question}</p>
        <div className="mt-3 grid gap-2">
          {lesson.options.map((option, index) => (
            <label key={option.label} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-3 text-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring">
              <input
                type="radio"
                name={"aws-foundations-" + lesson.id}
                className="mt-1 accent-primary"
                checked={selected === index}
                disabled={checked}
                onChange={() => setAnswers((current) => ({ ...current, [lesson.id]: index }))}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {!checked && (
          <button
            type="button"
            className="mt-4 min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            disabled={selected === undefined}
            onClick={() => setRevealed((current) => ({ ...current, [lesson.id]: true }))}
          >Check reasoning</button>
        )}
        {checked && (
          <div className="mt-4 rounded-lg border border-border p-4 text-sm" role="status" aria-live="polite">
            <p className="font-semibold">{selected === lesson.correctIndex ? "Correct reasoning" : "Review the decision"}</p>
            <p className="mt-2 leading-6">{selected === undefined ? "No answer selected." : lesson.options[selected].reason}</p>
            {selected !== lesson.correctIndex && (
              <p className="mt-2 leading-6"><strong>Better answer:</strong> {lesson.options[lesson.correctIndex].label}. {lesson.options[lesson.correctIndex].reason}</p>
            )}
          </div>
        )}
      </fieldset>

      <section className="mt-6 max-w-4xl rounded-lg border border-border p-4" aria-labelledby="market-connection">
        <h4 id="market-connection" className="font-semibold">Market connection</h4>
        <p className="mt-2 text-sm leading-6">{lesson.market.context}</p>
        <Link href={lesson.market.href} className={linkClass}>{lesson.market.label}</Link>
      </section>

      <section className="mt-6 max-w-4xl" aria-labelledby="teach-back">
        <h4 id="teach-back" className="font-semibold">Teach it back</h4>
        <label htmlFor="aws-teach-back" className="mt-2 block text-sm leading-6">{lesson.teachBack}</label>
        <textarea
          id="aws-teach-back"
          rows={4}
          value={selfAssessment}
          onChange={(event) => setSelfAssessment(event.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          placeholder="Use your own words. This is a local scratchpad and is cleared when you change lessons."
        />
        <p className="mt-1 text-xs text-muted-foreground">Not automatically graded or saved. Compare your response to the lesson, then explain it aloud.</p>
      </section>

      <nav aria-label="AWS course progression" className="mt-6 flex flex-wrap gap-3">
        <button type="button" className={buttonClass} disabled={stepIndex === 0} onClick={() => jump(Math.max(0, stepIndex - 1))}>Previous lesson</button>
        <button type="button" className={buttonClass} disabled={stepIndex === lessonSize - 1} onClick={() => jump(Math.min(lessonSize - 1, stepIndex + 1))}>Next lesson</button>
        <button type="button" className={buttonClass} onClick={reset}>Reset practice</button>
      </nav>
      {attempted === lessonSize && (
        <div className="mt-6 rounded-lg border border-border p-4 text-sm" role="status">
          <h4 className="font-semibold">Checkpoint summary</h4>
          <p className="mt-2">You answered {correct} of {lessonSize} questions correctly. {correct >= awsFoundationsPassCount ? "Knowledge checkpoint met; complete the teach-back before marking the lesson mastered." : "Review the concepts and try again to reach the four-answer checkpoint."}</p>
          <Link className={linkClass} href="/learn?scenario=cedar-ridge#cedar-ridge">Continue the full Cedar Ridge investigation</Link>
        </div>
      )}
    </section>
  );
}
