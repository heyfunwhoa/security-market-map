import type { UseCase } from "@/lib/schema";

function QuestionList({ questions }: { questions: string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6">
      {questions.map((question) => <li key={question}>{question}</li>)}
    </ul>
  );
}

export function DiscoveryQuestions({ useCase }: { useCase: UseCase }) {
  if (!useCase.discoveryGroups) return <QuestionList questions={useCase.discoveryQuestions} />;
  return (
    <div className="mt-3 space-y-4">
      {useCase.discoveryGroups.map(({ audience, questions }) => (
        <section key={audience}>
          <h3 className="font-semibold">{audience}</h3>
          <QuestionList questions={questions} />
        </section>
      ))}
    </div>
  );
}
