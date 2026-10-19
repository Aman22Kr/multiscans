import { useLocalStorage, isArray } from './useLocalStorage';

export function useSaved() {
  const [saved, setSaved] = useLocalStorage('saved', [], isArray);
  const key = (i) => `${i.type}/${i.slug}`;
  return {
    saved,
    isSaved: (i) => saved.includes(key(i)),
    toggle: (i) => setSaved(saved.includes(key(i)) ? saved.filter((k) => k !== key(i)) : [...saved, key(i)]),
  };
}
