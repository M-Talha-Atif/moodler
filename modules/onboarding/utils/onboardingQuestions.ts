// src/features/onboarding/utils/onboardingQuestions.ts
const onboardingQuestions = [
{
  id: "goals",
  text: "What personal goals matter most to you right now?",
  type: "chips",
  options: [
    "Reduce Stress",
    "Improve Focus",
    "Sleep Better",
    "Build Healthy Habits",
    "Feel More Confident",
    "Better Work–Life Balance"
  ],
}
,
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
  id: "interests",
  text: "What activities do you enjoy or want to try?",
  type: "chips",
  options: [
    "Meditation",
    "Exercise & Gym",
    "Reading Books",
    "Cooking",
    "Social Activities",
    "Creative Hobbies",
    "Travel & Outdoors"
  ],
}
,

{
  id: "daily_challenges",
  text: "What challenges do you face in daily life?",
  type: "chips",
  options: [
    "Work Pressure",
    "Studies Stress",
    "Family Responsibilities",
    "Lack of Motivation",
    "Health Issues",
    "Money & Financial Stress",
  ],
}
,


];

export default onboardingQuestions;
