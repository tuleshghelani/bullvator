import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import Aos from 'aos';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  // Core Values Data
  coreValues = [
    {
      title: 'Excellence',
      description: 'We strive for perfection in every product we design and manufacture, ensuring the highest standards of quality and performance.',
      icon: 'fa-star'
    },
    {
      title: 'Innovation',
      description: 'Continuously advancing surgical care through cutting-edge technology and innovative design solutions.',
      icon: 'fa-lightbulb'
    },
    {
      title: 'Integrity',
      description: 'Maintaining the highest ethical standards in all our business practices and relationships.',
      icon: 'fa-handshake'
    },
    {
      title: 'Quality',
      description: 'Uncompromising commitment to quality assurance and patient safety in every instrument we produce.',
      icon: 'fa-certificate'
    },
    {
      title: 'Collaboration',
      description: 'Working closely with healthcare professionals to understand their needs and deliver tailored solutions.',
      icon: 'fa-users'
    },
    {
      title: 'Reliability',
      description: 'Consistent performance and dependable support that healthcare professionals can trust.',
      icon: 'fa-shield-alt'
    }
  ];

  // Quality Features Data
  qualityFeatures = [
    {
      title: 'ISO 13485 Certification',
      description: 'Our quality management system is certified to ISO 13485 standards, ensuring consistent quality and regulatory compliance.',
      icon: 'fa-certificate'
    },
    {
      title: 'Rigorous Testing',
      description: 'Every instrument undergoes comprehensive testing including mechanical, functional, and visual inspections.',
      icon: 'fa-microscope'
    },
    {
      title: 'Material Excellence',
      description: 'We use only the highest grade materials that meet international standards for surgical applications.',
      icon: 'fa-gem'
    },
    {
      title: 'Traceability',
      description: 'Complete traceability from raw materials to finished products ensures accountability and quality control.',
      icon: 'fa-search'
    },
    {
      title: 'Continuous Improvement',
      description: 'Regular process optimization and feedback integration to enhance product quality and performance.',
      icon: 'fa-chart-line'
    }
  ];

  // Team Members Data
  teamMembers = [
    {
      name: 'Jigar P. Manwar',
      position: 'Director',
      image: 'assets/logo/logo.png',
      email: 'info@medonixsurgitech.com'
    },
    {
      name: 'Hiten M. Viramgama',
      position: 'Director',
      image: 'assets/logo/logo.png',
      email: 'info@medonixsurgitech.com'
    }
  ];

  // Certifications Data
  certifications = [
    {
      name: 'ISO 13485:2016',
      description: 'Medical Device Quality Management System',
      icon: 'fa-certificate'
    },
    {
      name: 'CE Marking',
      description: 'European Conformity for Medical Devices',
      icon: 'fa-check-circle'
    },
    {
      name: 'FDA Registration',
      description: 'US Food and Drug Administration Approval',
      icon: 'fa-shield-alt'
    },
    {
      name: 'ISO 9001:2015',
      description: 'Quality Management System Standard',
      icon: 'fa-award'
    },
    {
      name: 'GMP Compliance',
      description: 'Good Manufacturing Practice Standards',
      icon: 'fa-cogs'
    },
    {
      name: 'Environmental ISO 14001',
      description: 'Environmental Management System',
      icon: 'fa-leaf'
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title
  ) {
    this.setupSEO();
    this.setupStructuredData();
  }

  private setupSEO() {
    this.title.setTitle('About Bullvator Surgitech | Surgical Instrument Manufacturing Excellence | Rajkot');
    this.meta.addTags([
      { name: 'description', content: 'Learn about Bullvator Surgitech Pvt Ltd - a leading manufacturer of premium surgical instruments. Discover our mission, vision, core values, and commitment to excellence in healthcare.' },
      { name: 'keywords', content: 'about bullvator surgitech, surgical instrument manufacturer, medical device company, quality assurance, ISO certified, Rajkot, India' },
      { property: 'og:title', content: 'About Bullvator Surgitech | Surgical Instrument Manufacturing Excellence' },
      { property: 'og:description', content: 'Discover our commitment to excellence in surgical instrument manufacturing, quality assurance, and innovation in healthcare technology.' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Bullvator Surgitech Pvt Ltd' },
      { name: 'contact:email', content: 'info@medonixsurgitech.com' },
      { name: 'contact:phone_number', content: '+91 12345 67890' }
    ]);
  }

  private setupStructuredData() {
    if (isPlatformBrowser(this.platformId)) {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Bullvator Surgitech Pvt Ltd',
        description: 'Leading manufacturer of premium surgical instruments committed to excellence, innovation, and quality in healthcare technology.',
        url: window.location.origin + '/about',
        logo: window.location.origin + '/assets/logo/logo.png',
        foundingDate: '2025',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rajkot',
          addressCountry: 'IN'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-12345-67890',
          contactType: 'customer service',
          email: 'info@medonixsurgitech.com'
        },
        sameAs: [
          'https://www.linkedin.com/company/bullvator-surgitech',
          'https://www.facebook.com/medonixsurgitech'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Surgical Instruments',
          description: 'Premium surgical instruments for General Surgery, Orthopedic, and ENT & Microsurgery'
        },
        knowsAbout: [
          'Surgical Instruments',
          'Medical Device Manufacturing',
          'Quality Assurance',
          'Healthcare Technology',
          'ISO 13485',
          'Medical Device Regulations'
        ]
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      Aos.init({
        duration: 1000,
        once: true,
        offset: 100
      });
    }
  }
}
