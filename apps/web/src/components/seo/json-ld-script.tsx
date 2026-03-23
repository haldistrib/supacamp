interface JsonLdScriptProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  const jsonLdArray = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLdArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
