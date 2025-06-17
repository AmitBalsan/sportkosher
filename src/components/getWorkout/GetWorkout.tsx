import { useState } from "react";
import "./getWorkout.scss";

interface FormAddWorkout {
  trainingTypeSelected: string;
  timeSelected: string;
}

function GetWorkout() {
  const [formWorkoutData, setFormWorkoutData] = useState<FormAddWorkout>({
    trainingTypeSelected: "",
    timeSelected: "",
  });

  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState<any>(null);

  const workouts = [
    {
      type: "אימון משקל גוף",
      exercises: [
        "חזה - שכיבות שמיכה",
        "גב - מתח",
        "רגליים - סקוואטים",
        "כתפיים - שכיבות שמיכה של כתפיים",
        "יד קדמית - מתח אחיזה הפוכה",
        "יד אחורית - מקבילים",
        "בטן - כפיפות בטן",
      ],
      largeMuscleSets: [2, 3, 4],
      smallMuscleSets: [1, 2, 3],
    },
    {
      type: "אימון עם משקולות/חדר כושר",
      exercises: [
        "חזה - לחיצת חזה",
        "גב - פולי עליון",
        "רגליים - לחיצת רגליים במכונה / סקוואט עם משקל",
        "כתפיים - הרחקת ידיים לצדדים",
        "יד אחורית - משקולת מאחורי הראש כל יד",
        "יד קדמית - כפיפות מרפקים עם משקולות יד",
        "בטן - כפיפות בטן",
      ],
      largeMuscleSets: [2, 3, 4],
      smallMuscleSets: [1, 2, 3],
    },
  ];

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormWorkoutData({ ...formWorkoutData, [name]: value });
  }

  function handleSubmitWorkout() {
    console.log("clicked Get Workout");

    if (formWorkoutData.trainingTypeSelected && formWorkoutData.timeSelected) {
      const selectedWorkoutType = formWorkoutData.trainingTypeSelected;
      const selectedTime = parseInt(formWorkoutData.timeSelected);

      const selectedWorkout = workouts.find(
        (workout) => workout.type === selectedWorkoutType
      );

      if (selectedWorkout) {
        const numberOfLargeMuscleSets =
          selectedWorkout.largeMuscleSets[selectedTime / 15 - 1];
        const numberOfSmallMuscleSets =
          selectedWorkout.smallMuscleSets[selectedTime / 15 - 1];

        const workoutPlan = (
          <div className="card" key={selectedWorkoutType}>
            <h3>{selectedWorkoutType}</h3>
            <ul>
              <li>מספר סטים לשרירים גדולים: {numberOfLargeMuscleSets}</li>
              <li>מספר סטים לשרירים קטנים: {numberOfSmallMuscleSets}</li>
              <li>
                <strong>תרגילים:</strong>
                <ul>
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <li key={index}>{exercise}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        );
        setSelectedWorkoutPlan(workoutPlan);
      }
    }
  }
  if (selectedWorkoutPlan == null) {
    return (
      <div className="addWorkout">
        <h2>קבל תוכנית אימון</h2>
        <form onSubmit={handleSubmitWorkout}>
          <select
            name="trainingTypeSelected"
            value={formWorkoutData.trainingTypeSelected}
            onChange={handleSelectChange}
          >
            <option value="">בחר סוג אימון</option>
            {workouts.map((workout, index) => (
              <option key={index} value={workout.type}>
                {workout.type}
              </option>
            ))}
          </select>

          <select
            name="timeSelected"
            value={formWorkoutData.timeSelected}
            onChange={handleSelectChange}
          >
            <option value="">בחר זמן אימון</option>
            <option value="15">15 דקות</option>
            <option value="30">30 דקות</option>
            <option value="45">45 דקות</option>
          </select>
          <button type="submit">Get Your Workout</button>
        </form>
      </div>
    );
  } else if (selectedWorkoutPlan !== null) {
    return <>{selectedWorkoutPlan}</>;
  }
}

export default GetWorkout;
