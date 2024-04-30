import React from 'react';

const LessonContent = ({ lesson }) => {
  if (!lesson) {
    return <p>Sélectionnez une leçon pour afficher le contenu.</p>;
  }

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>

      {/* Contenu de la leçon */}
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />

      {/* Autres éléments de la leçon */}
      {lesson.videos && lesson.videos.length > 0 && (
        <div>
          <h3>Vidéos</h3>
          <ul>
            {lesson.videos.map((video, index) => (
              <li key={index}>
                <iframe width="560" height="315" src={video.url} title={`Video ${index}`} frameBorder="0" allowFullScreen></iframe>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.images && lesson.images.length > 0 && (
        <div>
          <h3>Images</h3>
          <ul>
            {lesson.images.map((image, index) => (
              <li key={index}>
                <img src={image.url} alt={`Image ${index}`} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ajoutez d'autres éléments au besoin */}
    </div>
  );
};

export default LessonContent;
