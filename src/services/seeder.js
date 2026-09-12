import { createSemester } from '../repositories/semesterRepository';
import { createSubject } from '../repositories/subjectRepository';
import { createUnit } from '../repositories/unitRepository';
import { createLesson } from '../repositories/lessonRepository';

// Import C Lessons
import { C_LESSONS } from '../data/cData';
// Import Syllabus Data
import { SYLLABUS_DATA } from '../pages/SyllabusData';

export const seedDatabase = async () => {
  console.log('Starting automated database seeding...');
  try {
    // 1. Seed Semester 2
    const semesterId = 'semester-2';
    await createSemester(semesterId, {
      title: 'Semester 2',
      order: 2,
      createdAt: new Date().toISOString()
    });
    console.log('Seeded semester-2 successfully.');

    // 2. Seed Subjects
    const subjects = [
      { id: 'c-programming', title: 'C Programming', icon: 'Code', order: 1 },
      { id: 'cpp-oop', title: 'Object Oriented Programming using C++', icon: 'Cpu', order: 2 },
      { id: 'data-structures', title: 'Data Structures', icon: 'Database', order: 3 }
    ];

    for (const sub of subjects) {
      await createSubject(sub.id, {
        semesterId,
        title: sub.title,
        icon: sub.icon,
        order: sub.order,
        createdAt: new Date().toISOString()
      });
    }
    console.log('Seeded subjects successfully.');

    // 3. Seed C Programming Units and Lessons
    const cUnits = [
      { id: 'c-unit-1', title: 'Unit 1: Fundamentals of C', order: 1 },
      { id: 'c-unit-2', title: 'Unit 2: Control Flow & Loops', order: 2 },
      { id: 'c-unit-3', title: 'Unit 3: Functions & Arrays', order: 3 },
      { id: 'c-unit-4', title: 'Unit 4: Pointers & Memory', order: 4 },
      { id: 'c-unit-5', title: 'Unit 5: Advanced C & Files', order: 5 }
    ];

    for (const unit of cUnits) {
      await createUnit(unit.id, {
        subjectId: 'c-programming',
        title: unit.title,
        order: unit.order,
        createdAt: new Date().toISOString()
      });
    }

    for (const lesson of C_LESSONS) {
      let unitId = 'c-unit-1';
      const idNum = Number(lesson.id);
      if (idNum >= 7 && idNum <= 8) unitId = 'c-unit-2';
      else if (idNum >= 9 && idNum <= 11) unitId = 'c-unit-3';
      else if (idNum >= 12 && idNum <= 16) unitId = 'c-unit-4';
      else if (idNum >= 17 && idNum <= 20) unitId = 'c-unit-5';

      await createLesson(`c-lesson-${lesson.id}`, {
        unitId,
        title: lesson.title,
        difficulty: lesson.diff || 'Easy',
        estimatedTime: lesson.time || '15 mins',
        xp: 100,
        order: idNum,
        isPublished: true,
        content: lesson.theory || '',
        code: lesson.code || '',
        output: lesson.output || '',
        note: lesson.note || '',
        warning: lesson.warning || '',
        tip: lesson.tip || '',
        interviewTip: lesson.interviewTip || '',
        mistakes: lesson.mistakes || [],
        summary: lesson.summary || '',
        createdAt: new Date().toISOString()
      });
    }
    console.log('Seeded C programming hierarchy successfully.');

    // 4. Seed C++ OOP Units and Lessons
    const cppSyllabus = SYLLABUS_DATA['cpp-oop']?.syllabus || [];
    for (const unitObj of cppSyllabus) {
      const unitId = `cpp-unit-${unitObj.unit}`;
      await createUnit(unitId, {
        subjectId: 'cpp-oop',
        title: unitObj.title,
        order: unitObj.unit,
        createdAt: new Date().toISOString()
      });

      let lessonOrderIndex = 1;
      for (const ch of unitObj.chapters) {
        await createLesson(`cpp-lesson-${ch.id}`, {
          unitId,
          title: ch.title,
          difficulty: 'Medium',
          estimatedTime: '30 mins',
          xp: 100,
          order: lessonOrderIndex++,
          isPublished: true,
          content: `### Overview of ${ch.title}\nIn this section, we study the core programming concepts related to **${ch.title}** as per the university syllabus. Topics include:\n\n` +
            ch.topics.map(t => `- **${t}**`).join('\n') +
            `\n\nMake sure to review the chapters and practical implementations in your IDE.`,
          code: `// C++ Sample Code for ${ch.title}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Learning: ${ch.title}" << endl;\n    return 0;\n}`,
          output: `Learning: ${ch.title}`,
          note: `Ensure compilation supports the modern C++ standard.`,
          warning: `Always compile with warnings enabled (-Wall) to catch potential bugs.`,
          tip: `Try modifying the code template to practice variable scopes and functions.`,
          interviewTip: `Be prepared to define key concepts from ${ch.title} during technical screenings.`,
          mistakes: ['Incorrect namespaces', 'Syntax errors in declarations'],
          summary: `Understood key components of ${ch.title}.`,
          createdAt: new Date().toISOString()
        });
      }
    }
    console.log('Seeded C++ OOP hierarchy successfully.');

    // 5. Seed Data Structures Units and Lessons
    const dsSyllabus = SYLLABUS_DATA['data-structures']?.syllabus || [];
    for (const unitObj of dsSyllabus) {
      const unitId = `ds-unit-${unitObj.unit}`;
      await createUnit(unitId, {
        subjectId: 'data-structures',
        title: unitObj.title,
        order: unitObj.unit,
        createdAt: new Date().toISOString()
      });

      let lessonOrderIndex = 1;
      for (const ch of unitObj.chapters) {
        await createLesson(`ds-lesson-${ch.id}`, {
          unitId,
          title: ch.title,
          difficulty: 'Hard',
          estimatedTime: '45 mins',
          xp: 120,
          order: lessonOrderIndex++,
          isPublished: true,
          content: `### Overview of ${ch.title}\nIn this section, we study the core algorithms and memory allocations for **${ch.title}**.\n\nKey Topics covered:\n` +
            ch.topics.map(t => `- **${t}**`).join('\n') +
            `\n\nAlgorithms should be optimized for both time and space complexity.`,
          code: `// C++ Data Structures Sample for ${ch.title}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Implementing: ${ch.title}" << endl;\n    return 0;\n}`,
          output: `Implementing: ${ch.title}`,
          note: `Pointers are heavily used here to represent complex linkages.`,
          warning: `Check for null pointers to avoid segmentation faults.`,
          tip: `Always draw the nodes on paper before writing insertion or deletion codes.`,
          interviewTip: `Complexity matters: state the Big-O notations for worst, average, and best cases.`,
          mistakes: ['Memory leaks due to lost node linkages', 'Off-by-one pointer errors'],
          summary: `Mastered the structural behaviors and complexities of ${ch.title}.`,
          createdAt: new Date().toISOString()
        });
      }
    }
    console.log('Seeded Data Structures hierarchy successfully.');
    console.log('Automated database seeding finished successfully.');
  } catch (err) {
    console.error('Error during automated database seeding:', err);
  }
};
