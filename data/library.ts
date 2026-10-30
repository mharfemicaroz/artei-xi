export interface LibraryItem {
  type: 'PDF' | 'Article' | 'Slides'
  title: string
  author: string
  date: string
  summary: string
  tag: string
  pages?: string
}

export interface ResourceCollection {
  slug: string
  eyebrow: string
  title: string
  intro: string
  items: LibraryItem[]
}

export const resourceCollections: Record<string, ResourceCollection> = {
  'research-papers': {
    slug: 'research-papers',
    eyebrow: 'Regional research shelf',
    title: 'Research papers',
    intro: 'A working collection for studies, action research, and inquiry from teacher education institutions in Region XI.',
    items: [
      { type: 'PDF', title: 'Beginning Teachers and the First Year of Practice', author: 'Sample faculty research team', date: '2026', summary: 'A demonstration record examining mentoring, workload, and adjustment during the transition from preparation to classroom practice.', tag: 'Teacher development', pages: '18 pages' },
      { type: 'PDF', title: 'Local Contexts in Pre-service Science Teaching', author: 'Sample institutional study', date: '2025', summary: 'Placeholder study on the use of community examples and local environmental concerns in lesson planning.', tag: 'Science education', pages: '24 pages' },
      { type: 'PDF', title: 'Student Teachers’ Experiences of Flexible Learning', author: 'Sample collaborative paper', date: '2025', summary: 'A demo qualitative paper organized around access, participation, feedback, and learning routines.', tag: 'Learning design', pages: '15 pages' },
      { type: 'PDF', title: 'Reading Support Practices in Partner Schools', author: 'Sample extension research group', date: '2024', summary: 'Placeholder documentation of small-group reading activities developed with cooperating schools.', tag: 'Literacy', pages: '21 pages' },
    ],
  },
  articles: {
    slug: 'articles',
    eyebrow: 'Ideas in practice',
    title: 'Articles',
    intro: 'Short reads for deans, program heads, faculty members, and future teachers—written for use, discussion, and reflection.',
    items: [
      { type: 'Article', title: 'What Makes a Useful Post-observation Conversation?', author: 'ARTEI XI editorial desk', date: 'October 2026', summary: 'A practical note on asking focused questions, using evidence from the lesson, and agreeing on one realistic next step.', tag: 'Mentoring' },
      { type: 'Article', title: 'Making Space for Local Knowledge in the Classroom', author: 'Guest contributor', date: 'September 2026', summary: 'Five grounded ways to connect course outcomes with the communities students already know.', tag: 'Curriculum' },
      { type: 'Article', title: 'A Better Faculty Learning Session Starts with a Real Problem', author: 'ARTEI XI editorial desk', date: 'August 2026', summary: 'A brief planning guide for professional learning that begins with classroom evidence instead of a broad theme.', tag: 'Professional learning' },
      { type: 'Article', title: 'From Research Poster to Useful Conversation', author: 'Guest contributor', date: 'July 2026', summary: 'Simple editorial choices that help conference audiences understand the question, method, and practical value of a study.', tag: 'Research communication' },
    ],
  },
  presentations: {
    slug: 'presentations',
    eyebrow: 'Conference materials',
    title: 'Presentations',
    intro: 'Selected slide decks and session materials from demonstration forums, assemblies, and faculty development activities.',
    items: [
      { type: 'Slides', title: 'Reframing Teacher Preparation for Changing Classrooms', author: 'Sample plenary presentation', date: '2026 Forum', summary: 'Demo slides on program coherence, field experience, and the capabilities expected of new teachers.', tag: 'Plenary', pages: '32 slides' },
      { type: 'Slides', title: 'Designing Small, Credible Action Research', author: 'Sample workshop deck', date: '2026 Workshop', summary: 'A placeholder workshop presentation covering scope, evidence, ethics, and sharing findings with colleagues.', tag: 'Workshop', pages: '28 slides' },
      { type: 'Slides', title: 'Partnerships That Support Cooperating Teachers', author: 'Sample panel presentation', date: '2025 Assembly', summary: 'Demo session notes on communication, role clarity, recognition, and feedback across partner institutions.', tag: 'Partnerships', pages: '20 slides' },
      { type: 'Slides', title: 'Building a Culture of Program Evidence', author: 'Sample leadership session', date: '2025 Forum', summary: 'A concise presentation on collecting useful evidence without adding unnecessary reporting work.', tag: 'Quality assurance', pages: '24 slides' },
    ],
  },
}

export const journalIssues = [
  { volume: 'Volume 1, Issue 2', date: 'December 2026', theme: 'Teacher learning, partnerships, and practice', count: 6 },
  { volume: 'Volume 1, Issue 1', date: 'June 2026', theme: 'Regional perspectives on teacher preparation', count: 5 },
  { volume: 'Preview Issue', date: 'December 2025', theme: 'Selected papers from the regional research forum', count: 4 },
]
