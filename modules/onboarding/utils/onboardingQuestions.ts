// src/features/onboarding/utils/onboardingQuestions.ts
const onboardingQuestions = [
  {
    id: "goals",
    text: "What would you like to achieve?",
    type: "chips",
    options: [
      "Reduce Stress",
      "Improve Focus",
      "Better Sleep",
      "Build Habits",
      "Social Connection",
    ],
  },
  {
    id: "activities",
    text: "What activities interest you?",
    type: "chips",
    options: [
      "Meditation",
      "Exercise",
      "Reading",
      "Social Events",
      "Creative Arts",
    ],
  },
  {
    id: "community",
    text: "Would you like to join community activities?",
    type: "toggle",
  },
];

export default onboardingQuestions;
