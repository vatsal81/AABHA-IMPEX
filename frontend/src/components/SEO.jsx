import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, keywords }) => {
  const { t, i18n } = useTranslation();
  
  const siteTitle = t('seo.default_title');
  const defaultDescription = t('seo.default_description');
  const currentLang = i18n.language;

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{title ? `${title} | AABHA IMPEX` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />

      {/* Alternate Language Links for SEO */}
      {['en', 'hi', 'gu', 'ar', 'ur', 'ml', 'ta', 'bn', 'tl'].map((l) => (
        <link 
          key={l}
          rel="alternate" 
          hrefLang={l} 
          href={`${window.location.origin}/${l}${window.location.pathname.replace(/^\/(en|hi|gu|ar|ur|ml|ta|bn|tl)/, '')}`} 
        />
      ))}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": title ? "Product" : "Organization",
          "name": title ? `${title} | AABHA IMPEX` : "AABHA IMPEX",
          "description": description || defaultDescription,
          "url": window.location.href,
          "logo": `${window.location.origin}/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91 94268 68883",
            "contactType": "customer service",
            "areaServed": "Global",
            "availableLanguage": ["English", "Hindi", "Gujarati"]
          },
          "sameAs": [
            "https://www.facebook.com/aabhaimpex",
            "https://www.linkedin.com/company/aabha-impex"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
