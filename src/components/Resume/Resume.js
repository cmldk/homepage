import React, { useEffect } from 'react';
import { useData } from '../../DataProvider';
import { useNavigate } from 'react-router-dom';

const Resume = () => {
  const { about } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (about?.resume_link) {
      window.open(about.resume_link, '_blank');
      setTimeout(() => {
        navigate('/');
      }, 1);
    } else {
      navigate('/');
    }
  }, []);

  return about?.resume_link && <></>;
};

export default Resume;
