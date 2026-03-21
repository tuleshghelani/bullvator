import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import Aos from 'aos';

export interface ShowcaseImage {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  activeFaqItem: number | null = 0;

  /** Rotavator gallery — used for grid + lightbox */
  showcaseImages: ShowcaseImage[] = [
    {
      src: 'assets/home/1.jpeg',
      alt: 'Bullvator rotavator model 1 — agricultural rotary tiller',
      title: 'Premium build quality',
      caption: 'Heavy-duty construction and powder-coated finish for long field life.'
    },
    {
      src: 'assets/home/2.jpeg',
      alt: 'Bullvator rotavator model 2 — tractor-mounted rotary tiller',
      title: 'Tractor-ready power',
      caption: 'Matched to common tractor PTO ratings for efficient soil preparation.'
    },
    {
      src: 'assets/home/3.jpeg',
      alt: 'Bullvator rotavator model 3 — multispeed rotary tiller',
      title: 'Multispeed options',
      caption: 'Gear and chain drive configurations to suit your soil and crop cycle.'
    },
    {
      src: 'assets/home/4.jpeg',
      alt: 'Bullvator rotavator model 4 — field-ready agricultural equipment',
      title: 'Field-proven reliability',
      caption: 'Genuine parts and consistent assembly for dependable season after season.'
    }
  ];

  /** Index of image shown in full-screen lightbox; null when closed */
  lightboxIndex: number | null = null;

  faqItems = [
    {
      question: 'What products does Bullvator Agro manufacture?',
      answer:
        'We manufacture rotary tillers (rotavators) and related tractor implements, including multispeed and single-speed models for different tractor power ratings and working widths.'
    },
    {
      question: 'Where is Bullvator Agro located?',
      answer:
        'Bullvator agro pvt. ltd. is based in Rajkot, Gujarat, India — a hub for agricultural equipment manufacturing.'
    },
    {
      question: 'How can I enquire about a rotavator model?',
      answer:
        'Call us on +91 83204 36023 or email bullvator@gmail.com. Our team can guide you on model selection based on your tractor HP and field requirements.'
    },
    {
      question: 'Do you use genuine parts and in-house manufacturing?',
      answer:
        'Yes. We focus on genuine parts, CNC and VMC in-house production for critical components, powder coating, and consistent assembly quality.'
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title
  ) {
    this.setupSEO();
    this.setupStructuredData();
  }

  private setupSEO(): void {
    const pageTitle = 'Bullvator Agro Pvt. Ltd. | Rotavators & Agricultural Equipment | Rajkot, Gujarat';
    const description =
      'Bullvator Agro Pvt. Ltd. manufactures premium rotavators (rotary tillers) and tractor implements in Rajkot, Gujarat. Young Farmer Make Young India. Less maintenance, best performance, low fuel consumption, genuine parts.';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Bullvator Agro, rotavator, rotary tiller, agricultural equipment, tractor implements, multispeed rotavator, Rajkot, Gujarat, India, Bullvator'
    });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.bullvator.in/' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_IN' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'author', content: 'Bullvator agro pvt. ltd.' });
    this.meta.updateTag({ name: 'contact:email', content: 'bullvator@gmail.com' });
    this.meta.updateTag({ name: 'contact:phone_number', content: '+918320436023' });
  }

  private setupStructuredData(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Bullvator agro pvt. ltd.',
      legalName: 'Bullvator agro pvt. ltd.',
      description:
        'Manufacturer of rotavators (rotary tillers) and agricultural tractor implements based in Rajkot, Gujarat.',
      url: 'https://www.bullvator.in/',
      logo: 'https://www.bullvator.in/assets/logo/logo.png',
      slogan: 'Young Farmer Make Young India',
      email: 'bullvator@gmail.com',
      telephone: '+91-83204-36023',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rajkot',
        addressRegion: 'Gujarat',
        addressCountry: 'IN'
      },
      sameAs: [] as string[]
    };

    const faqStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };

    this.injectJsonLd(organization);
    this.injectJsonLd(faqStructuredData);
  }

  private injectJsonLd(data: object): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Aos.init({
        duration: 800,
        once: true,
        offset: 40
      });
    }
  }

  ngOnDestroy(): void {
    this.closeLightbox();
  }

  openLightbox(index: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.lightboxIndex = index;
    this.document.body.classList.add('lightbox-open');
  }

  closeLightbox(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.lightboxIndex = null;
    this.document.body.classList.remove('lightbox-open');
  }

  get activeLightboxImage(): ShowcaseImage | null {
    if (this.lightboxIndex === null) return null;
    return this.showcaseImages[this.lightboxIndex];
  }

  lightboxNext(event?: Event): void {
    event?.stopPropagation();
    if (this.lightboxIndex === null) return;
    this.lightboxIndex = (this.lightboxIndex + 1) % this.showcaseImages.length;
  }

  lightboxPrev(event?: Event): void {
    event?.stopPropagation();
    if (this.lightboxIndex === null) return;
    this.lightboxIndex =
      (this.lightboxIndex - 1 + this.showcaseImages.length) % this.showcaseImages.length;
  }

  @HostListener('document:keydown', ['$event'])
  onLightboxKeydown(event: KeyboardEvent): void {
    if (this.lightboxIndex === null) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.lightboxNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.lightboxPrev();
    }
  }

  trackByShowcaseIndex(index: number, _item: ShowcaseImage): number {
    return index;
  }

  toggleFaq(index: number): void {
    this.activeFaqItem = this.activeFaqItem === index ? null : index;
  }

  isFaqActive(index: number): boolean {
    return this.activeFaqItem === index;
  }
}
