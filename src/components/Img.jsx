import { useState } from 'react';
const FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23e8f2fb'/></svg>";
export default function Img({ src, alt = '', className = '', ...rest }) {
  const [s, setS] = useState(src);
  return <img src={s} alt={alt} loading="lazy" className={className} onError={() => setS(FALLBACK)} {...rest} />;
}
