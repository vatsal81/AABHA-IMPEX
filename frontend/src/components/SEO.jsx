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
      <link rel="alternate" hrefLang="en" href={`${window.location.origin}/en${window.location.pathname.replace(/^\/(en|hi|gu)/, '')}`} />
      <link rel="alternate" hrefLang="hi" href={`${window.location.origin}/hi${window.location.pathname.replace(/^\/(en|hi|gu)/, '')}`} />
      <link rel="alternate" hrefLang="gu" href={`${window.location.origin}/gu${window.location.pathname.replace(/^\/(en|hi|gu)/, '')}`} />
    </Helmet>
  );
};

export default SEO;
