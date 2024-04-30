// import React, { useState } from 'react';

// import LessonContent from './LessonContent';
// import ProgressTracker from './progresstraker';
// // import CommentSection from './CommentSection';

// const FormationPage = () => {
//   const [selectedLesson, setSelectedLesson] = useState(null);

//   const selectLesson = (lesson) => {
//     setSelectedLesson(lesson);
//   };

//   const markAsCompleted = () => {
//     console.log('Leçon marquée comme terminée');
//   };

//   return (
//     <div className="formation-page">
//       <div className="lessons-section">
//         <LessonList onSelectLesson={selectLesson} />
//       </div>

//       <div className="content-section">
//         {selectedLesson ? (
//           <div>
//             <LessonContent lesson={selectedLesson} />
//             <ProgressTracker progress={selectedLesson.progress} />
//             <button onClick={markAsCompleted}>Marquer comme terminée</button>
//           </div>
//         ) : (
//           <p>Sélectionnez une leçon pour commencer</p>
//         )}

//         {/* <CommentSection lesson={selectedLesson} /> */}
//       </div>
//     </div>
//   );
// };

// export default FormationPage;
