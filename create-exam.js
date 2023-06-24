const fs = require("fs/promises");

if (process.argv.length !== 3) {
  console.log("Not enough params: add 'general', 'tech', or 'extra' after the command.");
  process.exit();
}

async function createExams(numExams) {
  const examName = process.argv[2];
  const questionData = require(`./${examName}-questions.json`);
  const groupData = require(`./${examName}-groups.json`)
  const usedQuestions = new Map();

  // get all the groups

  // get one question from each group
  for (let examCount = 0; examCount < numExams; examCount++) {
    const examQuestions = [];

    groupData.forEach(group => {
      const questions = questionData.filter(question => question.group === group.groupId);
      const numQuestions = questions.length;
      let found = false;

      // randomly select a question
      while (!found) {
        const q = questions[Math.floor(Math.random() * numQuestions)];
        if (!usedQuestions.has(q.id)) {
          // if the questions has not been used yet
          usedQuestions.set(q.id, true);
          examQuestions.push(q);
          found = true;
        }
      }
    });

    const fileName = `./exams/${examName}/${examName}-exam-${examCount}.json`;
    await fs.writeFile(fileName, JSON.stringify(examQuestions));
  }
}

createExams(6);