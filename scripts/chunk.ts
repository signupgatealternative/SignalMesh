// // scripts/chunk.ts

// import { docs } from "@/lib/docs-data";



// export function chunkDocs() {
//   const chunks = [];

//   for (const slug in docs) {
//     const doc = docs[slug];

//     const parts = doc.content.split('\n\n');

//     let buffer = '';

//     for (const part of parts) {
//       if ((buffer + part).length > 400) {
//         chunks.push({
//           title: doc.title,
//           content: `# ${doc.title}\n${buffer}`,
//           url: `/docs/${slug}`,
//         });
//         buffer = part;
//       } else {
//         buffer += '\n\n' + part;
//       }
//     }

//     if (buffer) {
//       chunks.push({
//         title: doc.title,
//         content: `# ${doc.title}\n${buffer}`,
//         url: `/docs/${slug}`,
//       });
//     }
//   }

//   return chunks;
// }


// scripts/chunk.ts
import { docs } from "@/lib/docs-data";

export function chunkDocs() {
  const chunks: any[] = [];

  for (const slug in docs) {
    const doc = docs[slug];
    const sections = doc.content.split("## ");

    sections.forEach((section) => {
      const [titleLine, ...rest] = section.split("\n");
      const content = rest.join("\n").trim();
      if (!content) return;

      const cleanContent = content.slice(0, 600);

      // ✅ Primary chunk
      chunks.push({
        title: `${doc.title} - ${titleLine}`,
        content: cleanContent,
        url: `/docs/${slug}`,
        section: doc.title,
        tags: generateTags(titleLine, content),
      });

      // ✅ Only create QA for important sections
      if (cleanContent.length > 150) {
        chunks.push({
          title: `Why ${titleLine}?`,
          content: `Question: Why ${titleLine}?\nAnswer:\n${cleanContent}`,
          url: `/docs/${slug}`,
          section: doc.title,
          tags: ["question", ...generateTags(titleLine, content)],
        });
      }
    });
  }

  return chunks;
}

function generateTags(title: string, content: string) {
  const text = (title + " " + content).toLowerCase();

  const tags = [];

  if (text.includes("block")) tags.push("block");
  if (text.includes("signup")) tags.push("signup");
  if (text.includes("ip")) tags.push("ip");
  if (text.includes("device")) tags.push("device");
  if (text.includes("email")) tags.push("email");
  if (text.includes("velocity")) tags.push("velocity");
  if (text.includes("bot")) tags.push("bot");

  return tags;
}

function createQA(title: string, content: string) {
  return `This explains ${title}. 

${content}

Summary: ${content.slice(0, 200)}...`;
}