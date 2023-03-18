import { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { REVALIDATE_TIME } from './helper/constants';
import { fetchMainTable } from './api/api';
import { parseISO } from 'date-fns';
import { slugify, slugValidation } from './helper/helper';

const DataContext = createContext();

let firstRender = true;

const DataProvider = ({ children, pathName }) => {
  const { i18n, t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [revalidate, setRevalidate] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [header, setHeader] = useState();
  const [social, setSocial] = useState();
  const [about, setAbout] = useState();
  const [bookmarks, setBookmarks] = useState();
  const [articles, setArticles] = useState();
  const [projects, setProjects] = useState();
  const [skills, setSkills] = useState();
  const [suggestion, setSuggestion] = useState();

  useEffect(() => {
    // edit document title
    if (about && i18n && i18n?.languages?.length > 0) {
      document.title = `${t(pathName)} - ${about.name} ${about.surname}`;
    }
  }, [t, pathName, about]);

  useEffect(() => {
    setLoading(true);
    if (firstRender) {
      fetchMainTable(handleTableResponse);
      firstRender = false;
      // localStorage.removeItem('postbox');
    }

    const interval = setInterval(() => {
      fetchMainTable(handleTableResponse, setRevalidate);
    }, REVALIDATE_TIME);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // set preferred language only first fetch
    if (!revalidate && about) {
      let preferredLang = about.start_language;
      if (preferredLang && languages.includes(preferredLang)) {
        i18n.changeLanguage(preferredLang);
      } else if (languages.length && i18n.language !== languages[0]) {
        i18n.changeLanguage(languages[0]);
      }
    }
  }, [languages, about]);

  const _setAbout = (data) => {
    setAbout(data[0]);
  };

  const _setSocial = (data) => {
    setSocial(data.filter((row) => row.display));
  };

  const _setHeader = (data) => {
    setHeader(data.filter((row) => row.display).map((row) => row.key));
  };

  const setResources = async (data) => {
    // get languages
    const initialLanguages = Object.keys(data[0]).filter(
      (key) => key !== 'key' && key !== 'row_id'
    );

    // generate dictionary object
    let dictionary = {};
    initialLanguages.forEach((language) => {
      dictionary[language] = {};
      data.forEach((row) => {
        dictionary[language][row.key] = row[language];
      });

      // set language to i18n
      i18n.addResourceBundle(language, 'translation', dictionary[language]);
    });

    setLanguages(initialLanguages);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const _setBookmarks = (data) => {
    setBookmarks(data);
  };

  const _setArticles = (data) => {
    const sortedData = data
      .map((a) => {
        if (a.display && a.title && a.content && a.published_at) {
          a.slug = slugify(a.title);
          delete a.images;
          return a;
        }
        return null;
      })
      .filter((a) => a !== null)
      .sort(
        (a, b) =>
          parseISO(b.published_at).getTime() -
          parseISO(a.published_at).getTime()
      );
    setArticles(sortedData);
  };

  const _setProjects = (data) => {
    setProjects(data.filter((row) => row.display));
  };

  const _setSkills = (data) => {
    setSkills(data.filter((row) => row.display));
  };

  const _setSuggestion = (data) => {
    setSuggestion(data[0]);
  };

  const handleTableResponse = {
    about: _setAbout,
    social: _setSocial,
    header: _setHeader,
    translation: setResources,
    bookmarks: _setBookmarks,
    suggestion: _setSuggestion,
    articles: _setArticles,
    projects: _setProjects,
    skills: _setSkills,
  };

  const setLoading = (value) => {
    setIsLoading(value);
  };

  return (
    <DataContext.Provider
      value={{
        social,
        about,
        header,
        isLoading,
        bookmarks,
        languages,
        suggestion,
        articles,
        projects,
        skills,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const {
    social,
    about,
    isLoading,
    header,
    bookmarks,
    languages,
    articles,
    suggestion,
    projects,
    skills,
  } = useContext(DataContext);
  return {
    social,
    about,
    header,
    bookmarks,
    isLoading,
    languages,
    suggestion,
    articles,
    projects,
    skills,
  };
};

export { DataProvider, useData };
