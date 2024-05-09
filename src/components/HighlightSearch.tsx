export default function HighlightSearch({
  data,
  highlight,
}: {
  data: string;
  highlight?: string;
}) {
  const highlightWords = highlight && highlight.split(" ").filter(Boolean);
  let highlightedText = data;

  if (highlightWords) {
    for (const word of highlightWords) {
      const regex = new RegExp(`(${word})`, "gi");

      highlightedText = highlightedText.replace(
        regex,
        (match) => `<span class="bg-yellow-200">${match}</span>`
      );
    }
  }

  return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
}
