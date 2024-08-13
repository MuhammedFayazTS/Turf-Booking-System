import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const usePageMeta = (initialTitle, initialMeta = []) => {
  const [title, setTitle] = useState(initialTitle);
  const [meta, setMeta] = useState(initialMeta);

  const updateTitle = (newTitle) => {
    setTitle(newTitle);
  };

  const updateMeta = (newMeta) => {
    setMeta(newMeta);
  };

  useEffect(() => {
    document.title = title; // Fallback for non-Helmet environments
  }, [title]);

  return {
    updateTitle,
    updateMeta,
    MetaComponent: () => (
      <Helmet>
        <title>{title}</title>
        {meta.map(({ name, content }, index) => (
          <meta key={index} name={name} content={content} />
        ))}
      </Helmet>
    ),
  };
};

export default usePageMeta;
