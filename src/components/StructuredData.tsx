"use client";

import React from 'react';

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Chemico Innovations Bangladesh Ltd.",
    "image": "https://www.chemico.com.bd/images/factory.png",
    "@id": "https://www.chemico.com.bd",
    "url": "https://www.chemico.com.bd",
    "telephone": "+8801700000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Uttara Sector 7",
      "addressLocality": "Dhaka",
      "postalCode": "1230",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.8759,
      "longitude": 90.3795
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/chemicoinnovations",
      "https://www.linkedin.com/company/chemico-innovations"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
