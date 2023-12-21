// Sample quiz questions for each lesson (add your own questions)
const quizzes = {
    quiz1: [
        {
            question: "What is a database?",
            options: ["A place to store money", "A structured collection of data", "A type of software"],
            answer: 1
        },
        {
            question: "Which sector does NOT typically use databases?",
            options: ["Banking", "Healthcare", "Fashion Designing"],
            answer: 2
        },
        {
            question: "What was an early form of database?",
            options: ["Relational Database", "Flat File", "NoSQL Database"],
            answer: 1
        },
        {
            question: "True or False: Databases can only store text data.",
            options: ["True", "False"],
            answer: 1
        },
        {
            question: "Which is NOT a function of a database?",
            options: ["Data storage", "Data retrieval", "Data destruction"],
            answer: 2
        }
    ],
    quiz2: [
        {
            question: "SQL stands for:",
            options: ["Structured Query Language", "Simple Quality Language", "Sequential Query List"],
            answer: 0
        },
        {
            question: "Which type of database is more flexible in handling different data formats?",
            options: ["SQL", "NoSQL"],
            answer: 1
        },
        {
            question: "True or False: NoSQL databases are not good for handling relationships between data.",
            options: ["True", "False"],
            answer: 0
        },
        {
            question: "What is a primary feature of SQL databases?",
            options: ["Flexibility", "Data integrity", "Scalability"],
            answer: 1
        },
        {
            question: "Which database type is better for handling large-scale, unstructured data?",
            options: ["SQL", "NoSQL"],
            answer: 1
        }
    ],
    quiz3: [
        {
            question: "What does the 'C' in CRUD stand for?",
            options: ["Compute", "Create", "Connect"],
            answer: 1
        },
        {
            question: "Which operation is used to retrieve data from a database?",
            options: ["Update", "Read", "Delete"],
            answer: 1
        },
        {
            question: "True or False: The 'Update' operation removes data from the database.",
            options: ["True", "False"],
            answer: 1
        },
        {
            question: "Deleting data from a database is referred to as:",
            options: ["DROP", "REMOVE", "DELETE"],
            answer: 2
        },
        {
            question: "Which operation would you use to change existing data?",
            options: ["Create", "Update", "Read"],
            answer: 1
        }
    ],
    quiz4: [
        {
            question: "What does a database schema define?",
            options: ["Database security", "Database structure", "Database size"],
            answer: 1
        },
        {
            question: "Normalization in a database is used for:",
            options: ["Improving security", "Managing relationships", "Minimizing data redundancy"],
            answer: 2
        },
        {
            question: "A one-to-many relationship in a database means:",
            options: ["One record in a table is related to multiple records in another table.", "One record in a table can only be related to one record in another table."],
            answer: 0
        },
        {
            question: "True or False: Database schemas are optional in database design.",
            options: ["True", "False"],
            answer: 1
        },
        {
            question: "Which of these is NOT a type of relationship in databases?",
            options: ["One-to-One", "Many-to-Many", "All-to-All"],
            answer: 2
        }
    ],
    quiz5: [
        {
            question: "What is the primary purpose of a transaction in a database?",
            options: ["Speed", "Security", "Data integrity"],
            answer: 2
        },
        {
            question: "Indexing in a database is used to:",
            options: ["Increase security", "Improve retrieval speed", "Reduce storage space"],
            answer: 1
        },
        {
            question: "True or False: Optimizing a database's performance can involve query tuning.",
            options: ["True", "False"],
            answer: 0
        },
        {
            question: "Which is NOT a feature of database transactions?",
            options: ["Consistency", "Isolation", "Multiplicity"],
            answer: 2
        },
        {
            question: "Performance optimization in databases is important for:",
            options: ["Improving data redundancy", "Enhancing user experience", "Increasing data storage"],
            answer: 1
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    setupQuizzes();
});

function setupQuizzes() {
    Object.entries(quizzes).forEach(([quizId, questions]) => {
        setupQuiz(quizId, questions);
    });
}

function setupQuiz(quizId, questions) {
    let quizDiv = document.getElementById(quizId);
    if (!quizDiv) {
        console.error(`Quiz div not found for: ${quizId}`);
        return;
    }

    questions.forEach((question, index) => {
        let questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        let questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionDiv.appendChild(questionText);

        let optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        question.options.forEach((option, i) => {
            let optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.id = `question_${quizId}_${index}_option_${i}`;
            optionInput.name = `question${quizId}_${index}`;
            optionInput.value = i;

            let optionLabel = document.createElement('label');
            optionLabel.htmlFor = optionInput.id;
            optionLabel.textContent = option;

            optionsDiv.appendChild(optionInput);
            optionsDiv.appendChild(optionLabel);
            optionsDiv.appendChild(document.createElement('br'));
        });

        questionDiv.appendChild(optionsDiv);
        quizDiv.appendChild(questionDiv);
    });

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', function() {
        checkAnswers(quizId, questions);
    });
    quizDiv.appendChild(submitButton);
}

function checkAnswers(quizId, questions) {
    let quizDiv = document.getElementById(quizId);
    let score = 0;

    questions.forEach((question, index) => {
        let userAnswer = document.querySelector(`input[name="question${quizId}_${index}"]:checked`);
        let correctAnswer = question.options[question.answer];
        let feedbackText = userAnswer && parseInt(userAnswer.value) === question.answer ? 'Correct!' : 'Incorrect!';
        
        if (userAnswer && parseInt(userAnswer.value) === question.answer) {
            score++;
        }

        let feedbackDiv = quizDiv.getElementsByClassName('feedback')[index] || document.createElement('div');
        feedbackDiv.className = 'feedback'; // Add or reset the class name
        feedbackDiv.textContent = `${feedbackText} The correct answer is: ${correctAnswer}.`;
        feedbackDiv.style.color = userAnswer && parseInt(userAnswer.value) === question.answer ? 'green' : 'red';

        let optionsDiv = quizDiv.querySelectorAll('.options')[index];
        if (!optionsDiv.nextSibling) {
            optionsDiv.parentNode.appendChild(feedbackDiv);
        }
    });

    alert(`Your score: ${score}/${questions.length}`);
}
window.addEventListener('scroll', () => {
    const lessonElements = document.querySelectorAll('.lesson');
    const triggerBottom = (window.innerHeight / 5) * 4;

    lessonElements.forEach(lesson => {
        const lessonTop = lesson.getBoundingClientRect().top;
        if (lessonTop < triggerBottom) {
            lesson.classList.add('active');
        } else {
            lesson.classList.remove('active');
        }
    });
});

