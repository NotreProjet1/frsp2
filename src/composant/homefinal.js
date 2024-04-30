import React from 'react';
import CardGride from './home';
import VideoPage from './vedio';
import PageCollections from './collectionMarek';
import CardGrid from './gratuisFormation';
import PageCollectionsCommerce from './collectionCommerce';
import PageCollectionsDev from './collectionDev';
import Photos from './lesimage';
import styled from 'styled-components';
import Statique from './statique'; // Utilisez le même nom utilisé lors de l'exportation

const HomeFinal = () => {
  return (
    <Container>
      <Photos /> 
      <SectionTitle>Featured Collections</SectionTitle>
    
    

      <PageCollections />
      <Statique /> {/* Utilisez le composant importé */}
      <SectionTitle>Popular Courses</SectionTitle>
      <CardGrid />
      <CardGride />

      <SectionTitle>Featured Videos</SectionTitle>
      <VideoPage />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #3498db;
  font-family: Calibre, sans-serif;
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.8em;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export default HomeFinal;
