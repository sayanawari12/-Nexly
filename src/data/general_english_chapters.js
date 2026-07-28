/**
 * General English (BCA-104) - Semester 1
 * Complete 12-Chapter Curriculum Data & Educational Content
 */

export const ENGLISH_CHAPTERS = [
  {
    id: 1,
    slug: 'introduction-to-communication',
    title: 'Introduction to Communication',
    desc: 'Master the basics of verbal, non-verbal, and written communication for academic & career success.',
    icon: '💬',
    duration: '20 min',
    difficulty: 'Beginner'
  },
  {
    id: 2,
    slug: 'parts-of-speech',
    title: 'Parts of Speech',
    desc: 'Learn nouns, pronouns, verbs, adjectives, adverbs and their practical usage in everyday English.',
    icon: '📚',
    duration: '25 min',
    difficulty: 'Beginner'
  },
  {
    id: 3,
    slug: 'tenses',
    title: 'Tenses',
    desc: 'Understand present, past and future tenses with simple real-life examples and sentence structures.',
    icon: '⏳',
    duration: '30 min',
    difficulty: 'Beginner'
  },
  {
    id: 4,
    slug: 'articles-and-determiners',
    title: 'Articles & Determiners',
    desc: 'Master the usage of a, an, the, and determiners in professional and academic writing.',
    icon: '✍️',
    duration: '20 min',
    difficulty: 'Beginner'
  },
  {
    id: 5,
    slug: 'prepositions',
    title: 'Prepositions',
    desc: 'Understand prepositions of time, place, and direction with clear rules and common usages.',
    icon: '📍',
    duration: '20 min',
    difficulty: 'Beginner'
  },
  {
    id: 6,
    slug: 'vocabulary-building',
    title: 'Vocabulary Building',
    desc: 'Improve your word power using practical vocabulary used in technical academics and corporate interviews.',
    icon: '💡',
    duration: '25 min',
    difficulty: 'Intermediate'
  },
  {
    id: 7,
    slug: 'reading-comprehension',
    title: 'Reading Comprehension',
    desc: 'Develop techniques for skimming, scanning, and analyzing technical and literary passages accurately.',
    icon: '📖',
    duration: '30 min',
    difficulty: 'Intermediate'
  },
  {
    id: 8,
    slug: 'paragraph-writing',
    title: 'Paragraph Writing',
    desc: 'Learn topic sentences, supporting details, coherence, and structured technical paragraph building.',
    icon: '📝',
    duration: '25 min',
    difficulty: 'Intermediate'
  },
  {
    id: 9,
    slug: 'letter-and-email-writing',
    title: 'Letter & Email Writing',
    desc: 'Master formal letter writing and professional email etiquette for technical workplace communication.',
    icon: '✉️',
    duration: '30 min',
    difficulty: 'Intermediate'
  },
  {
    id: 10,
    slug: 'resume-and-cv-writing',
    title: 'Resume & CV Writing',
    desc: 'Craft high-impact resumes, cover letters, and professional profiles for software job applications.',
    icon: '📄',
    duration: '35 min',
    difficulty: 'Intermediate'
  },
  {
    id: 11,
    slug: 'interview-and-gd-skills',
    title: 'Interview & Group Discussion Skills',
    desc: 'Prepare for technical & HR interviews, body language, and effective group discussion tactics.',
    icon: '🤝',
    duration: '35 min',
    difficulty: 'Intermediate'
  },
  {
    id: 12,
    slug: 'presentation-and-public-speaking',
    title: 'Presentation & Public Speaking',
    desc: 'Overcome stage fear, structure slide decks, and deliver compelling technical presentations.',
    icon: '🎤',
    duration: '30 min',
    difficulty: 'Intermediate'
  }
];

export const ENGLISH_CHAPTER_CONTENT = {

  'introduction-to-communication': {
    title: 'Introduction to Communication',
    intro: 'Communication is the process of sharing information, ideas, feelings, and messages between two or more people. In the software industry and academic world, technical competence alone is not enough; effective communication determines how well you present your ideas and work in a team.',
    theory: `Communication is a two-way process consisting of a Sender, Message, Encoding, Channel, Receiver, Decoding, and Feedback.

Types of Communication:
1. Verbal Communication: Using spoken words to communicate in meetings, presentations, and phone calls.
2. Non-Verbal Communication: Using body language, gestures, eye contact, posture, and facial expressions. Over 65% of human communication is non-verbal.
3. Written Communication: Emails, project documentation, technical specification sheets, and Slack/Teams messages.
4. Visual Communication: Diagrams, charts, flowcharts, and slide presentations.

The 7 Cs of Effective Communication:
- Clear: Express your goal simply and directly.
- Concise: Stick to the point and avoid wordiness.
- Concrete: Use specific facts, data, and examples.
- Correct: Ensure proper grammar, spelling, and technical accuracy.
- Coherent: Flow logically from one sentence to the next.
- Complete: Include all necessary information so the receiver can act.
- Courteous: Maintain a respectful, friendly tone.`,
    examples: [
      {
        scenario: 'Informal vs Professional Message',
        bad: 'Hey I cant finish the code today cuz I am busy with something else.',
        good: 'Hi Team, I am currently debugging an issue with the authentication API. I expect to complete the task by tomorrow 11:00 AM.'
      }
    ],
    exercises: [
      'Identify whether a job interview is verbal, non-verbal, or both.',
      'Rewrite a vague 5-line status message into 2 clear, concise sentences using the 7 Cs.'
    ],
    mistakes: [
      'Speaking too fast or using confusing filler words like "um", "like", or "you know".',
      'Ignoring non-verbal cues such as arm-crossing or lack of eye contact during presentations.'
    ],
    tips: [
      'Always listen actively before forming your response.',
      'In written emails, state the main purpose in the very first sentence.'
    ],
    summary: 'Mastering the 7 Cs of communication ensures that your ideas are conveyed clearly, professionally, and persuasively in both academic and corporate environments.',
    quiz: [
      { q: 'What percentage of communication is estimated to be non-verbal?', a: 'Over 65%' },
      { q: 'Which of the 7 Cs emphasizes sticking to the point without wordiness?', a: 'Concise' }
    ]
  },

  'parts-of-speech': {
    title: 'Parts of Speech',
    intro: 'The English language relies on 8 fundamental building blocks known as the Parts of Speech. Understanding them enables you to construct grammatically sound, clear, and professional sentences.',
    theory: `The 8 Parts of Speech in English:

1. Noun: A word that names a person, place, thing, or idea (e.g., Sayan, Server, Compiler, Efficiency).
2. Pronoun: A word used in place of a noun to avoid repetition (e.g., he, she, it, they, which).
3. Verb: A word that expresses an action, state, or occurrence (e.g., write, execute, debug, compile).
4. Adjective: A word that describes or modifies a noun or pronoun (e.g., fast algorithm, clean code, responsive UI).
5. Adverb: A word that modifies a verb, adjective, or another adverb, usually ending in -ly (e.g., runs smoothly, executes quickly).
6. Preposition: A word that shows location, direction, or time relationship (e.g., in, on, at, under, through).
7. Conjunction: A word that connects words, phrases, or clauses (e.g., and, but, because, although).
8. Interjection: A word expressing strong emotion or exclamation (e.g., Wow!, Aha!, Oops!).`,
    examples: [
      {
        scenario: 'Sentence Breakdown',
        bad: 'The quick developer fixed the server error fastly.',
        good: 'The skilled developer quickly resolved the critical server error.'
      }
    ],
    exercises: [
      'Identify the parts of speech for every word in: "The python script compiled successfully."',
      'Replace vague adjectives like "good code" with precise technical adjectives like "optimized code".'
    ],
    mistakes: [
      'Confusing adverbs and adjectives (e.g., "he writes good" vs "he writes well").',
      'Misusing pronouns without a clear antecedent.'
    ],
    tips: [
      'Use strong action verbs in your resume rather than passive descriptions.',
      'Keep adverbs minimal when a strong verb already conveys the speed or intensity.'
    ],
    summary: 'Knowing how each part of speech functions allows you to edit and refine technical documentation and emails for maximum impact.',
    quiz: [
      { q: 'Which part of speech describes or modifies a verb?', a: 'Adverb' },
      { q: 'What part of speech is the word "because"?', a: 'Conjunction' }
    ]
  },

  'tenses': {
    title: 'Tenses',
    intro: 'Tenses specify the time at which an action takes place — past, present, or future. Using correct tenses ensures your technical documentation, status updates, and reports are chronologically accurate.',
    theory: `The 3 Primary Time Periods with 4 Aspects Each (12 Tenses Total):

1. Present Tenses:
   - Simple Present: Habitual actions & general truths. (e.g., "The server logs errors.")
   - Present Continuous: Action happening right now. (e.g., "The compiler is building the project.")
   - Present Perfect: Completed action with relevance to the present. (e.g., "We have deployed the new release.")
   - Present Perfect Continuous: Action started in the past and still continuing. (e.g., "She has been coding for 3 hours.")

2. Past Tenses:
   - Simple Past: Completed past action. (e.g., "The developer fixed the bug yesterday.")
   - Past Continuous: Action in progress at a past moment. (e.g., "I was testing the API when the power failed.")
   - Past Perfect: Action completed before another past action. (e.g., "The server had crashed before we backed up data.")

3. Future Tenses:
   - Simple Future: Future actions. (e.g., "We will publish the report tomorrow.")
   - Future Continuous: Action in progress in the future. (e.g., "At 10 AM, I will be presenting the demo.")`,
    examples: [
      {
        scenario: 'Daily Standup Report Status',
        bad: 'Yesterday I finish the database migration and now I working on frontend.',
        good: 'Yesterday I finished the database migration, and currently I am working on the frontend integration.'
      }
    ],
    exercises: [
      'Convert: "I write C programs" into Present Continuous, Present Perfect, and Simple Past.',
      'Choose the correct tense: "By next month, our team (will complete / completed) the project."'
    ],
    mistakes: [
      'Mixing past and present tenses within the same sentence or paragraph.',
      'Using simple past when Present Perfect is required for recent actions.'
    ],
    tips: [
      'Use Past Tense when listing accomplishments on your Resume.',
      'Use Simple Present when describing how a software algorithm works.'
    ],
    summary: 'Mastering tenses allows you to communicate project milestones, timelines, and technical documentation accurately.',
    quiz: [
      { q: 'Which tense is used for habitual actions and general scientific truths?', a: 'Simple Present Tense' },
      { q: 'Correct the sentence: "I have saw the error message."', a: '"I have seen the error message."' }
    ]
  },

  'articles-and-determiners': {
    title: 'Articles & Determiners',
    intro: 'Articles (A, An, The) and Determiners modify nouns to specify whether a noun refers to something general or something specific. Incorrect article usage is one of the most common errors in non-native English writing.',
    theory: `1. Indefinite Articles (A / An):
   - Used before non-specific, singular countable nouns.
   - Use "A" before consonant sounds: a computer, a user, a university (starts with 'y' sound).
   - Use "An" before vowel sounds: an algorithm, an hour (silent 'h'), an array.

2. Definite Article (The):
   - Used before specific nouns known to the reader.
   - Used before unique objects: the internet, the sun, the CPU.
   - Used with superlative adjectives: the fastest algorithm, the most efficient code.

3. Determiners:
   - Demonstratives: this, that, these, those.
   - Possessives: my, your, his, her, its, our, their.
   - Quantifiers: many, much, few, little, several, some, any, each, every.`,
    examples: [
      {
        scenario: 'Technical Error Log Report',
        bad: 'Developer found a bug in an database server.',
        good: 'The developer found a critical bug in the database server.'
      }
    ],
    exercises: [
      'Fill in the blanks: "___ C programming language is ___ efficient tool for ___ engineer."',
      'Correct: "He is an honest developer who built a unique application."'
    ],
    mistakes: [
      'Using "an" based on spelling rather than pronunciation (e.g., "an university" is wrong; it should be "a university").',
      'Omitting "the" before specific singular technical components.'
    ],
    tips: [
      'Focus on the sound, not just the starting letter when choosing between "a" and "an".',
      'Do not use articles before proper nouns or uncountable abstract concepts unless specifying.'
    ],
    summary: 'Correct article and determiner usage refines your sentences, giving your technical documentation a polished, professional tone.',
    quiz: [
      { q: 'Which article should be used before the word "hour"?', a: 'An (because "hour" starts with a silent h vowel sound)' },
      { q: 'Is "a honest mistake" correct?', a: 'No, it should be "an honest mistake".' }
    ]
  },

  'prepositions': {
    title: 'Prepositions',
    intro: 'Prepositions show the relationship between nouns, pronouns, and other words in a sentence regarding time, location, direction, and spatial connections.',
    theory: `Common Preposition Categories:

1. Prepositions of Time:
   - AT: Specific times (at 9:00 AM, at noon, at midnight).
   - ON: Days and dates (on Monday, on 15th August).
   - IN: Months, years, centuries, long periods (in July, in 2026, in the morning).

2. Prepositions of Place & Location:
   - AT: Specific points or addresses (at the office, at the desk).
   - ON: Surfaces (on the screen, on page 42).
   - IN: Enclosed spaces or general areas (in the server room, in India).

3. Prepositions of Direction & Movement:
   - TO: Movement towards a destination (navigate to the dashboard).
   - INTO: Entering a container or changing state (compiled into machine code).
   - THROUGH: Passing within a medium (transmitted through the network).`,
    examples: [
      {
        scenario: 'Project Deadline Notification',
        bad: 'The meeting is in 10:00 AM at Monday.',
        good: 'The meeting is at 10:00 AM on Monday.'
      }
    ],
    exercises: [
      'Insert correct prepositions: "The data was stored ___ the database ___ July 2026."',
      'Correct: "He specializes on web development."'
    ],
    mistakes: [
      'Confusing "in time" (with time to spare) and "on time" (punctual at the exact scheduled time).',
      'Using "discuss about" — "discuss" already implies "about" (use "discuss the plan" instead of "discuss about the plan").'
    ],
    tips: [
      'Remember: "at" for specific times, "on" for days, "in" for months/years.',
      'Prepositions always take an object (noun or pronoun).'
    ],
    summary: 'Accurate prepositions clarify instructions, deadlines, and technical specifications in professional communications.',
    quiz: [
      { q: 'Which preposition is used for specific times of day?', a: 'At (e.g., at 5:00 PM)' },
      { q: 'Is "discuss about the issue" grammatically preferred?', a: 'No, "discuss the issue" is preferred.' }
    ]
  },

  'vocabulary-building': {
    title: 'Vocabulary Building',
    intro: 'A strong vocabulary enhances your ability to express complex technical concepts with precision and clarity. Expanding your word power is vital for academic exams, technical documentation, and job interviews.',
    theory: `Strategies for Effective Vocabulary Enhancement:

1. Root Words, Prefixes & Suffixes:
   - Prefix "Auto-" (self): Autonomous, Automated.
   - Prefix "Synchronous" (together in time) vs "Asynchronous" (not in time).
   - Root "Graph" (write/draw): Diagram, Cryptography, Graphic.

2. Academic & Corporate English Vocabulary:
   - Optimize: To make something as effective or functional as possible.
   - Scalable: Capable of being expanded or upgraded easily.
   - Robust: Strong, healthy, and unlikely to break or crash under load.
   - Intuitive: Easy to understand without explicit instruction.
   - Paradigm: A typical pattern or model of something.

3. Synonyms & Precision:
   - Instead of "bad code" -> "suboptimal / inefficient code".
   - Instead of "fix problem" -> "resolve issue / debug error".
   - Instead of "big dataset" -> "extensive / voluminous dataset".`,
    examples: [
      {
        scenario: 'Interview Self-Introduction',
        bad: 'I write good code that works very fast and doesn\'t break.',
        good: 'I build robust, scalable applications focused on performance and clean architecture.'
      }
    ],
    exercises: [
      'Find professional synonyms for: "change", "try", "make better", "problem".',
      'Use the word "asynchronous" in a technical IT sentence.'
    ],
    mistakes: [
      'Using overly fancy words incorrectly when a simpler, precise word is available.',
      'Confusing homophones like "effect" (noun) and "affect" (verb).'
    ],
    tips: [
      'Read technical blogs (Vercel, GitHub, Medium) daily to learn modern industry terminology.',
      'Maintain a personal vocabulary log of 3 new words learned every week.'
    ],
    summary: 'A rich vocabulary empowers you to articulate software solutions clearly and project confidence during technical discussions.',
    quiz: [
      { q: 'What is the meaning of "Robust" in software engineering?', a: 'Strong, reliable, and capable of handling errors without crashing.' },
      { q: 'Distinguish between "Affect" and "Effect".', a: '"Affect" is usually a verb (to influence); "Effect" is usually a noun (the result).' }
    ]
  },

  'reading-comprehension': {
    title: 'Reading Comprehension',
    intro: 'Reading comprehension is the ability to read text, process it, and understand its meaning. In computer science, developers constantly read technical documentation, APIs, and research papers.',
    theory: `Core Strategies for Reading Comprehension:

1. Skimming:
   - Rapidly reading titles, headings, first sentences of paragraphs, and bullet points to get a high-level overview of the document.

2. Scanning:
   - Searching specifically for particular facts, keywords, dates, code snippets, or error numbers without reading every word.

3. Active Reading & Annotation:
   - Highlighting key terms, identifying the author's central thesis, and taking concise marginal notes.

4. Deciphering Technical Context:
   - Inferring unknown words from surrounding technical context.
   - Identifying cause-and-effect relationships in processes.`,
    examples: [
      {
        scenario: 'Reading API Documentation',
        bad: 'Reading line-by-line 100 pages of documentation before trying a single code sample.',
        good: 'Skimming the overview, scanning for the endpoint URL, and referring to example request payloads.'
      }
    ],
    exercises: [
      'Skim a 1-page article on Cloud Computing and write down the 3 main takeaways in under 60 seconds.',
      'Scan a sample C documentation page for the parameter details of the `scanf()` function.'
    ],
    mistakes: [
      'Reading word-for-word at the same slow speed regardless of text difficulty or purpose.',
      'Ignoring diagrams, flowcharts, and bold keywords in technical manuals.'
    ],
    tips: [
      'Always read the questions first before attempting a comprehension passage in exams.',
      'Summarize each paragraph in 3-5 words in the margin.'
    ],
    summary: 'Mastering skimming and scanning allows you to process vast amounts of technical literature quickly and accurately.',
    quiz: [
      { q: 'Which technique is used to locate a specific keyword or date in a text quickly?', a: 'Scanning' },
      { q: 'What is Skimming used for?', a: 'Getting a fast overall main-idea overview of a passage.' }
    ]
  },

  'paragraph-writing': {
    title: 'Paragraph Writing',
    intro: 'A paragraph is a group of related sentences focused on a single central topic. Writing well-structured paragraphs is crucial for project reports, technical blogs, and exam answers.',
    theory: `The Structure of a Perfect Paragraph:

1. Topic Sentence (The Lead):
   - The opening sentence that states the main idea clearly.

2. Supporting Sentences (The Body):
   - 3 to 5 sentences providing evidence, statistics, code examples, or detailed explanations supporting the topic sentence.

3. Concluding / Transition Sentence (The Wrap-up):
   - Summarizes the point or smoothly transitions to the next paragraph.

Key Principles of Good Paragraph Writing:
- Unity: Every sentence must relate directly to the single main topic.
- Coherence: Use transition words (Furthermore, Consequently, However, In addition) so thoughts flow logically.
- Completeness: Fully explain the idea without leaving unanswered gaps.`,
    examples: [
      {
        scenario: 'Technical Paragraph Example',
        bad: 'C is a language. It is fast. Python is also good. I like coding in C because Dennis Ritchie made it.',
        good: 'C remains a foundational language in computer science due to its close hardware interaction and raw execution speed. Developed by Dennis Ritchie in 1972, it provides low-level memory control via pointers. Consequently, modern operating systems like Linux and Windows continue to rely on C for core kernel development.'
      }
    ],
    exercises: [
      'Write a 4-sentence coherent paragraph explaining "Why Version Control (Git) is essential for developers."',
      'Identify and remove the off-topic sentence in a given draft paragraph.'
    ],
    mistakes: [
      'Introducing multiple unrelated ideas in one long chaotic paragraph.',
      'Writing short, choppy sentences without transitional connectors.'
    ],
    tips: [
      'Keep technical paragraphs between 75 and 150 words for optimal screen readability.',
      'Use bullet points when presenting lists of 3 or more items.'
    ],
    summary: 'Structuring paragraphs around a clear topic sentence ensures your written communication is professional, readable, and logical.',
    quiz: [
      { q: 'What is the purpose of a Topic Sentence?', a: 'To state the main central idea of the paragraph clearly.' },
      { q: 'Name two common transition words used for coherence.', a: 'However, Furthermore, Consequently, In addition' }
    ]
  },

  'letter-and-email-writing': {
    title: 'Letter & Email Writing',
    intro: 'In the modern workplace, email is the primary channel of official communication. Writing professional, concise, and polite emails is an essential career skill for software engineers and BCA graduates.',
    theory: `Anatomy of a Professional Technical Email:

1. Subject Line:
   - Clear, specific, and informative (e.g., "[BCA Sem 1] Leave Application - Sayan Awari" or "Bug Report: Authentication API Failure #402").

2. Salutation:
   - Formal: "Dear Professor Awari," or "Dear Hiring Manager,".
   - Professional Informal: "Hi Alex," (for teammates).

3. Opening Line:
   - State the purpose directly (e.g., "I am writing to request a 2-day leave of absence due to illness.").

4. Body Paragraphs:
   - 1-2 concise paragraphs providing necessary details or action items.

5. Call to Action / Closing:
   - Clear next steps (e.g., "Please let me know if you require further documentation.").

6. Sign-off & Signature:
   - "Best regards," or "Sincerely," followed by Full Name, Roll No / Title, and Contact Info.`,
    examples: [
      {
        scenario: 'Submitting Project Request via Email',
        bad: 'Subject: project\nHey sir check my project file attachment thanks.',
        good: 'Subject: Project Submission: BCA-101 C Programming Assignment\n\nDear Prof. Awari,\n\nPlease find attached my final source code submission for the C Programming assignment. The repository link and documentation are included in the PDF.\n\nThank you for your guidance.\n\nSincerely,\nSayan Awari\nBCA Semester 1 | Roll No: 2026-BCA-042'
      }
    ],
    exercises: [
      'Draft a formal email requesting a 3-day extension for a software project deadline.',
      'Write a professional follow-up email after a technical job interview.'
    ],
    mistakes: [
      'Leaving the Subject line blank or writing vague subjects like "urgent" or "help".',
      'Using SMS abbreviations (u, r, thx, bcz) in professional communications.'
    ],
    tips: [
      'Always proofread your email before hitting Send.',
      'Double-check attachments and recipient addresses.'
    ],
    summary: 'A well-crafted email displays professionalism, respect, and technical clarity, leaving a positive impression on professors and employers.',
    quiz: [
      { q: 'What constitutes an effective email subject line?', a: 'A clear, specific summary of the email\'s core topic (e.g., "Leave Application - Sayan Awari").' },
      { q: 'Is SMS jargon acceptable in professional workplace emails?', a: 'No, professional emails require standard English and full sentences.' }
    ]
  },

  'resume-and-cv-writing': {
    title: 'Resume & CV Writing',
    intro: 'Your resume is your personal marketing document. For BCA students and software job seekers, a clean, ATS-friendly, outcome-focused resume is key to securing interview callbacks.',
    theory: `Essential Sections of a High-Impact Tech Resume:

1. Contact Header:
   - Full Name, Professional Email, Phone, City, GitHub URL, LinkedIn URL.

2. Professional Summary / Target Role:
   - 2-line summary highlighting your skills and career focus (e.g., "BCA Student specializing in Full-Stack Web Development & C/C++ Systems Programming").

3. Technical Skills Matrix:
   - Languages: C, C++, Python, JavaScript.
   - Frameworks & Tools: React, Node.js, Git, VS Code, MySQL.

4. Projects (The Core Focus for Freshers):
   - Highlight 2-3 real-world projects. Use the Action Verb + Impact formula:
     * "Developed a real-time code compiler backend in Node.js, serving 500+ requests with 99.9% uptime."

5. Education:
   - Bachelor of Computer Applications (BCA), Graduation Year, CGPA.

6. Certifications & Achievements:
   - Hackathon participation, coding platform ranks, official certifications.`,
    examples: [
      {
        scenario: 'Bullet Point Formulation',
        bad: 'Made a website using React for BCA department.',
        good: 'Architected and built a responsive BCA Department Web Platform using React and TailwindCSS, improving student navigation speed by 40%.'
      }
    ],
    exercises: [
      'Convert 3 of your college projects into bullet points using the Action Verb + Result formula.',
      'Format a clean 1-page single-column Markdown/PDF resume structure.'
    ],
    mistakes: [
      'Using multi-column fancy graphic templates that fail Applicant Tracking Systems (ATS).',
      'Including spelling mistakes or outdated contact information.'
    ],
    tips: [
      'Keep your fresher resume strictly to 1 page.',
      'Always link live project demos and GitHub repositories.'
    ],
    summary: 'An ATS-optimized, project-centric resume showcasing concrete technical achievements maximizes your chances of landing interviews.',
    quiz: [
      { q: 'What is the recommended resume length for fresh BCA graduates?', a: '1 Page' },
      { q: 'What formula should be used for bullet points describing projects?', a: 'Action Verb + Technical Skill + Quantifiable Impact/Result' }
    ]
  },

  'interview-and-gd-skills': {
    title: 'Interview & Group Discussion Skills',
    intro: 'Interviews and Group Discussions (GD) evaluate not just your technical knowledge, but your interpersonal skills, confidence, problem-solving mindset, and teamwork capability.',
    theory: `1. Group Discussion (GD) Tactics:
   - Objective: Evaluate leadership, listening, reasoning, and teamwork.
   - Strategy:
     * Initiate if you have solid facts, or listen and build upon others' points.
     * Use constructive phrases: "I agree with Sayan's point, and to add to that...", "That is a valid perspective, however...".
     * Never shout, interrupt aggressively, or dominate the discussion.

2. The STAR Method for Behavioral Interview Questions:
   - Situation: Set the scene and context.
   - Task: Explain your responsibility or challenge.
   - Action: Describe the exact steps YOU took to address it.
   - Result: Share the positive outcome and quantifiable metrics achieved.

3. Non-Verbal Professionalism:
   - Maintain eye contact, adopt an open posture, smile naturally, and give a firm handshake.`,
    examples: [
      {
        scenario: 'Answering "Tell Me About Yourself"',
        bad: 'My name is Rahul, I am 20, I like playing games and watching movies.',
        good: 'Hi, I am Rahul, a 1st-year BCA student passionate about software engineering. I have built several projects in C and React, and I enjoy solving algorithmic challenges. I am excited to apply my skills to full-stack development.'
      }
    ],
    exercises: [
      'Prepare a 90-second elevator pitch answering "Tell me about yourself".',
      'Practice using the STAR method for: "Describe a time you faced a difficult technical bug."'
    ],
    mistakes: [
      'Faking technical answers when you don\'t know — it is better to admit honestly: "I am not familiar with X, but I am eager to learn it."',
      'Speaking over peers during a Group Discussion.'
    ],
    tips: [
      'Research the company\'s products and tech stack before the interview.',
      'Prepare 2 thoughtful questions to ask the interviewer at the end.'
    ],
    summary: 'Combining sound technical knowledge with polished interview delivery and collaborative GD manners sets you apart from other candidates.',
    quiz: [
      { q: 'What does the acronym STAR stand for in interview preparation?', a: 'Situation, Task, Action, Result' },
      { q: 'Is it appropriate to interrupt someone aggressively during a Group Discussion?', a: 'No, active listening and courteous additions are preferred.' }
    ]
  },

  'presentation-and-public-speaking': {
    title: 'Presentation & Public Speaking',
    intro: 'Public speaking and technical presentation skills allow software engineers to present architecture proposals, sprint demos, project defenses, and conference talks with poise.',
    theory: `The 3 Pillars of Effective Presentations:

1. Preparation & Structure (The 10-20-30 Rule):
   - No more than 10 slides.
   - Speak for no more than 20 minutes.
   - Use font size no smaller than 30pt.
   - Structure: Hook/Opening -> Problem Statement -> Proposed Solution -> Live Demo / Data -> Conclusion & Q&A.

2. Visual Slide Design:
   - High contrast dark backgrounds, minimal text per slide (use bullet points), high-resolution diagrams.
   - Never read text directly off slides word-for-word.

3. Vocal & Body Language Delivery:
   - Pitch & Pace: Vary your tone to keep the audience engaged; pause strategically.
   - Eye Contact: Scan across the room, connecting with audience members in different sections.
   - Stance: Stand tall, keep hands open, and avoid pacing nervously across the stage.`,
    examples: [
      {
        scenario: 'Opening a Presentation',
        bad: 'Hello, my presentation is about database indexes. Today I will talk about B-Trees.',
        good: 'Imagine searching through a 10-million-row database without an index — it would take minutes. Today, we will explore how B-Tree indexes execute queries in under 5 milliseconds.'
      }
    ],
    exercises: [
      'Create a 3-slide presentation introducing a topic you learned in BCA.',
      'Practice delivering a 2-minute talk in front of a mirror focusing on eye contact and hand gestures.'
    ],
    mistakes: [
      'Packing slides with paragraphs of tiny text.',
      'Turning your back to the audience to read your slides.'
    ],
    tips: [
      'Rehearse your presentation at least 3 times out loud before the actual event.',
      'Anticipate 3 common audience Q&A questions beforehand.'
    ],
    summary: 'Public speaking confidence comes from thorough preparation, clear slide visual design, and energetic vocal delivery.',
    quiz: [
      { q: 'What is Guy Kawasaki\'s 10-20-30 rule for slide presentations?', a: '10 slides, 20 minutes, 30pt minimum font size.' },
      { q: 'Should you read paragraphs of text directly off your slides?', a: 'No, slides should feature bullet points and visual diagrams while you explain.' }
    ]
  }

};
