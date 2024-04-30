// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PageCollectionsDev = () => {
//   const [formations, setFormations] = useState([]);

//   useEffect(() => {
//     const fetchFormations = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/formationP/lister');
//         setFormations(response.data.liste); // Assurez-vous de récupérer la propriété 'liste' de la réponse
//       } catch (error) {
//         console.error('Error fetching formations:', error);
//       }
//     };

//     fetchFormations();
//   }, []);

//   return (
//     <>
//       <div className="bg-gray-100">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
//             <h2 className="text-2xl font-bold text-gray-900">mmmmmmmmmmmmmggggggggggggggggg</h2>
//             <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
//               {Array.isArray(formations) && formations.map((formation, index) => ( 
//                 <div className="group relative" key={index}>
//                   <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
//                     <img
//                       src={formation.imageUrl}
//                       alt={formation.title}
//                       className="h-full w-full object-cover object-center"
//                     />
//                   </div>
//                   <h3 className="mt-6 text-sm text-gray-500">{formation.title}</h3>
//                   <p className="text-base font-semibold text-gray-900">{formation.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PageCollectionsDev;
