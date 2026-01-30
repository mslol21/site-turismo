import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
}

const SEO = ({ 
  title, 
  description, 
  canonical, 
  ogType = 'website', 
  ogImage = '/logo.png',
  keywords = 'guia turístico, site para guias, agendamento online, turismo, site profissional'
}: SEOProps) => {
  useEffect(() => {
    document.title = `${title} | GuiaTur Pro`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const newKeywords = document.createElement('meta');
      newKeywords.name = 'keywords';
      newKeywords.content = keywords;
      document.head.appendChild(newKeywords);
    }

    // OG Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (ogTypeMeta) ogTypeMeta.setAttribute('content', ogType);

    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) ogImageMeta.setAttribute('content', ogImage);

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute('href', canonical);
      } else {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        linkCanonical.setAttribute('href', canonical);
        document.head.appendChild(linkCanonical);
      }
    }
  }, [title, description, canonical, ogType, ogImage, keywords]);

  return null;
};

export default SEO;
