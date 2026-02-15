import React from 'react';
import { Head, usePage } from '@inertiajs/react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: 'website' | 'article';
    twitterCard?: string;
    image?: string;
    canonical?: string;
    robots?: string;
    children?: React.ReactNode;
    schema?: object;
    breadcrumbs?: { label: string; url: string }[];
}

export default function SEO({ 
    title, 
    description, 
    keywords, 
    ogTitle, 
    ogDescription, 
    ogType = 'website',
    twitterCard,
    image,
    canonical,
    robots,
    children,
    schema,
    breadcrumbs
}: SEOProps) {
    const { settings, url } = usePage().props as any;
    const pageUrl = usePage().url;

    const siteName = settings?.site_name || 'Arpon Blog';
    const defaultDescription = settings?.site_description || settings?.app_description || '';
    const defaultKeywords = settings?.site_keywords || '';
    const defaultOgTitle = settings?.og_title || title || siteName;
    const defaultOgDescription = settings?.og_description || description || defaultDescription;
    const defaultTwitterCard = settings?.twitter_card || 'summary_large_image';
    const siteUrl = window.location.origin;
    const fullCanonical = canonical || `${siteUrl}${pageUrl}`;
    const defaultOgImage = settings?.og_image || settings?.site_logo || '';

    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    const isHomePage = pageUrl === '/' || pageUrl === '';

    const globalSchema = isHomePage ? {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "url": siteUrl,
                "name": siteName,
                "description": defaultDescription,
                "potentialAction": [
                    {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": `${siteUrl}/search?search={search_term_string}`
                        },
                        "query-input": "required name=search_term_string"
                    }
                ],
                "inLanguage": settings?.site_language || "en"
            },
            {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                "name": siteName,
                "url": siteUrl,
                "logo": {
                    "@type": "ImageObject",
                    "inLanguage": settings?.site_language || "en",
                    "@id": `${siteUrl}/#logo`,
                    "url": settings?.site_logo || `${siteUrl}/favicon.ico`,
                    "contentUrl": settings?.site_logo || `${siteUrl}/favicon.ico`,
                    "width": 512,
                    "height": 512,
                    "caption": siteName
                },
                "image": {
                    "@id": `${siteUrl}/#logo`
                }
            }
        ]
    } : null;

    const breadcrumbSchema = breadcrumbs ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
            },
            ...breadcrumbs.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
            }))
        ]
    } : null;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {(keywords || defaultKeywords) && <meta name="keywords" content={keywords || defaultKeywords} />}
            <link rel="canonical" href={fullCanonical} />
            {robots && <meta name="robots" content={robots} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={ogTitle || defaultOgTitle} />
            <meta property="og:description" content={ogDescription || defaultOgDescription} />
            <meta property="og:url" content={fullCanonical} />
            {(image || defaultOgImage) && <meta property="og:image" content={image || defaultOgImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard || defaultTwitterCard} />
            <meta name="twitter:title" content={ogTitle || defaultOgTitle} />
            <meta name="twitter:description" content={ogDescription || defaultOgDescription} />
            {(image || defaultOgImage) && <meta name="twitter:image" content={image || defaultOgImage} />}

            {/* Structured Data */}
            {globalSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(globalSchema)}
                </script>
            )}

            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}

            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}

            {settings?.search_console_id && <meta name="google-site-verification" content={settings.search_console_id} />}

            {/* Google Analytics */}
            {settings?.google_analytics_id && (
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`} />
            )}
            {settings?.google_analytics_id && (
                <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${settings.google_analytics_id}');
                    `
                }} />
            )}
            {children}
        </Head>
    );
}
