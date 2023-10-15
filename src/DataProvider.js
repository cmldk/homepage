import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { fetchBookmarks, fetchMainTable } from './api/api';
import { parseISO } from 'date-fns';
import { slugify } from './lib/helper';

const DataContext = createContext();

const DataProvider = ({ children, pathName }) => {
  const { i18n, t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [header, setHeader] = useState();
  const [social, setSocial] = useState();
  const [about, setAbout] = useState();
  const [bookmarks, setBookmarks] = useState();
  const [posts, setPosts] = useState();
  const [projects, setProjects] = useState();
  const [skills, setSkills] = useState();
  const [suggestion, setSuggestion] = useState();

  useEffect(() => {
    // edit document title
    if (about && i18n && i18n?.languages?.length > 0) {
      document.title = `${t(pathName)} - ${about.name} ${about.surname}`;
    }
  }, [t, pathName, about, i18n]);

  useEffect(() => {
    // set preferred language only first fetch
    if (about) {
      let preferredLang = about.start_language;
      if (preferredLang && languages.includes(preferredLang)) {
        i18n.changeLanguage(preferredLang);
      } else if (languages.length && i18n.language !== languages[0]) {
        i18n.changeLanguage(languages[0]);
      }
    }
  }, [languages, about, i18n]);

  const _setAbout = (data) => {
    setAbout(data[0]?.fields);
  };

  const _setSocial = (data) => {
    setSocial(
      data.filter((row) => row.fields?.display).map((row) => row.fields)
    );
  };

  const _setHeader = (data) => {
    setHeader(
      data.filter((row) => row.fields?.display).map((row) => row.fields.key)
    );
  };

  const setResources = useCallback(
    async (data) => {
      // get languages
      const initialLanguages = Object.keys(data[0]?.fields).filter(
        (key) => key !== 'key'
      );

      // generate dictionary object
      let dictionary = {};
      initialLanguages.forEach((language) => {
        dictionary[language] = {};
        data.forEach((row) => {
          dictionary[language][row.fields.key] = row.fields[language];
        });

        // set language to i18n
        i18n.addResourceBundle(language, 'translation', dictionary[language]);
      });

      setLanguages(initialLanguages);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
    [i18n]
  );

  const _setBookmarks = (data) => {
    setBookmarks(data);
  };

  const _setPosts = (data) => {
    const sortedData = data
      .map((a) => {
        if (
          a.fields.display &&
          a.fields.title &&
          a.fields.content &&
          a.fields.published_at
        ) {
          a.fields.slug = slugify(a.fields.title);
          a.fields.published_at = parseISO(a.fields.published_at);
          delete a.fields.images;
          return a.fields;
        }
        return null;
      })
      .filter((a) => a !== null)
      .sort(
        (a, b) =>
          parseISO(b.published_at).getTime() -
          parseISO(a.published_at).getTime()
      );
    setPosts(sortedData);
  };

  const _setProjects = (data) => {
    setProjects(
      data.filter((row) => row.fields.display).map((row) => row.fields)
    );
  };

  const _setSkills = (data) => {
    setSkills(
      data.filter((row) => row.fields.display).map((row) => row.fields)
    );
  };

  const _setSuggestion = (data) => {
    setSuggestion(data[0]?.fields);
  };

  const handleTableResponse = useCallback(
    (key) => {
      const setState = {
        about: _setAbout,
        social: _setSocial,
        header: _setHeader,
        translation: setResources,
        suggestion: _setSuggestion,
        blog: _setPosts,
        projects: _setProjects,
        skills: _setSkills,
      };
      return setState[key];
    },
    [setResources]
  );

  useEffect(() => {
    setLoading(true);
    fetchMainTable(handleTableResponse);
    fetchBookmarks(_setBookmarks);
    // localStorage.removeItem('postbox');
  }, [handleTableResponse]);

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
        posts,
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
    posts,
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
    posts,
    projects,
    skills,
  };
};

export { DataProvider, useData };
