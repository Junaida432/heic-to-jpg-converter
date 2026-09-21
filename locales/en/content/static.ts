import { Section } from '@/content/types';
import { SITE } from '@/site';

export interface EnStaticPage {
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  summary: string;
  updated: string;
  sections: Section[];
}

export const EN_STATIC: Record<'privacy-policy' | 'terms' | 'about' | 'contact', EnStaticPage> = {
  about: {
    title: 'About HEIC2',
    metaTitle: 'About HEIC2 – A Private HEIC Converter',
    metaDescription:
      'HEIC2 is a free HEIC converter that runs in your browser. Learn who builds it, how it works, which open-source parts it uses and how we keep our guides accurate.',
    badge: 'About',
    summary:
      'HEIC2 converts iPhone HEIC photos to JPG, PNG, WebP and PDF inside your browser, so your pictures never have to be uploaded.',
    updated: SITE.contentUpdated,
    sections: [
      {
        id: 'why',
        h2: 'Why HEIC2 exists',
        blocks: [
          {
            t: 'p',
            text: 'Apple made HEIC the default photo format in iOS 11. It saves space, but the moment you copy the photos to a Windows PC or try to upload them to a website, you often hit a wall. Most online converters solve that by uploading your photos to a server. For personal pictures – family photos, ID snaps, documents – that is not something everyone is comfortable with.'
          },
          {
            t: 'p',
            text: 'HEIC2 takes the other route: the file is converted on your own device, so there is nothing to upload and nothing for us to store.'
          }
        ]
      },
      {
        id: 'who',
        h2: 'Who builds it',
        blocks: [
          {
            t: 'p',
            text: `HEIC2 is an independent project built and maintained by ${SITE.founder}. You can reach us at [${SITE.email}](mailto:${SITE.email}).`
          }
        ]
      },
      {
        id: 'how',
        h2: 'How it works',
        blocks: [
          {
            t: 'p',
            text: 'When you add a photo, your browser reads it locally. A HEIC decoder (libheif, compiled to WebAssembly) turns it into pixels in a background thread, and the browser encodes those pixels as JPG, PNG or WebP. PDFs are assembled in the page from the JPG data. Because all of this runs on your device, the speed you get depends on your device.'
          },
          {
            t: 'p',
            text: 'The converted files do not include the original metadata, such as camera model or GPS location.'
          }
        ]
      },
      {
        id: 'open-source',
        h2: 'Open-source components',
        blocks: [
          {
            t: 'ul',
            items: [
              '**libheif** (LGPL-3.0), used through the **heic-to** package, decodes HEIC/HEIF images.',
              '**JSZip** creates the ZIP downloads.',
              '**React** and **Vite** power the interface and build.'
            ]
          },
          {
            t: 'p',
            text: 'We are grateful to the maintainers of these projects.'
          }
        ]
      },
      {
        id: 'accuracy',
        h2: 'How we keep the guides accurate',
        blocks: [
          {
            t: 'p',
            text: 'Our [guides](/guides) link to the official Apple and Microsoft documentation they rely on, and we describe limits and trade-offs rather than only benefits. We do not publish made-up statistics or reviews. If you spot a mistake or something out of date, please [tell us](/contact) and we will fix it.'
          }
        ]
      }
    ]
  },

  contact: {
    title: 'Contact HEIC2',
    metaTitle: 'Contact HEIC2 – Support and Feedback',
    metaDescription:
      'Contact HEIC2 for help with a HEIC file that will not convert, to report a mistake in a guide, or to suggest a feature.',
    badge: 'Contact',
    summary: 'Email us about a file that will not convert, a mistake in a guide, or an idea for the tool.',
    updated: SITE.contentUpdated,
    sections: [
      {
        id: 'email',
        h2: 'Email',
        blocks: [
          {
            t: 'p',
            text: `Write to [${SITE.email}](mailto:${SITE.email}). We read every message; replies usually take a few working days.`
          }
        ]
      },
      {
        id: 'bug',
        h2: 'Reporting a file that will not convert',
        blocks: [
          {
            t: 'p',
            text: 'Please tell us:'
          },
          {
            t: 'ul',
            items: [
              'your browser and its version (for example Chrome 130),',
              'your operating system (Windows 11, macOS, iOS, Android),',
              'the output format and settings you chose, and',
              'what happened – an error message or a blank result.'
            ]
          },
          {
            t: 'p',
            text: 'Do not attach private photos unless we ask; a description is usually enough to start.'
          }
        ]
      },
      {
        id: 'other',
        h2: 'Corrections, feedback and partnerships',
        blocks: [
          {
            t: 'p',
            text: 'Found something wrong in a [guide](/guides)? Have a feature idea? Want to collaborate? Email us and include the page address.'
          }
        ]
      }
    ]
  },

  'privacy-policy': {
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy – HEIC2',
    metaDescription:
      'How HEIC2 handles your data: photos stay on your device, and analytics run only if you accept. What we collect, why, and how to control it.',
    badge: 'Privacy',
    summary:
      'Your photos are converted on your device and are never uploaded. Anonymous usage analytics load only if you accept them.',
    updated: SITE.contentUpdated,
    sections: [
      {
        id: 'photos',
        h2: 'Your photos stay on your device',
        blocks: [
          {
            t: 'p',
            text: 'When you convert photos with HEIC2, the files are read and processed by your browser on your own device. They are not uploaded to our servers or to any third party, and we cannot see them. Files exist in your browser’s memory while the page is open, and they are discarded when you close or reload the tab. Converted files are saved only when you choose to download them.'
          }
        ]
      },
      {
        id: 'accounts',
        h2: 'No accounts',
        blocks: [
          {
            t: 'p',
            text: 'HEIC2 has no sign-up or login, and we do not ask for your name or email address to use the converter. If you email us or use the contact form on the Contact page, we receive your email address and message and use them only to reply. The form is handled by our own server, which does not store messages – it forwards them to our inbox.'
          }
        ]
      },
      {
        id: 'analytics',
        h2: 'Analytics (only with your consent)',
        blocks: [
          {
            t: 'p',
            text: 'We use Google Analytics 4 to understand which pages are useful and to find problems. It is loaded only if you click **Accept** on the cookie notice. If you choose **Decline**, Google Analytics is not loaded and no analytics data is sent to Google.'
          },
          {
            t: 'p',
            text: 'If you accept, Google Analytics sets cookies and collects information such as the pages you view, approximate location derived from your IP address, and device and browser details. It does not receive your photos or file names, because those never leave your browser. See [Google’s privacy policy](https://policies.google.com/privacy) for how Google handles this data.'
          }
        ]
      },
      {
        id: 'storage',
        h2: 'Cookies and local storage',
        blocks: [
          {
            t: 'ul',
            items: [
              '**Your choice** about analytics is stored in your browser’s local storage so we do not ask again on every visit.',
              '**Analytics cookies** are set by Google Analytics only after you accept.',
              'HEIC2 does not use advertising cookies.'
            ]
          },
          {
            t: 'p',
            text: 'You can change your mind at any time by clearing this site’s data in your browser settings; the notice will appear again.'
          }
        ]
      },
      {
        id: 'hosting',
        h2: 'Hosting and server logs',
        blocks: [
          {
            t: 'p',
            text: 'Like any website, our hosting provider processes standard request data (such as IP address, requested address and browser type) to deliver pages and protect the site from abuse. We do not use this data to identify visitors.'
          }
        ]
      },
      {
        id: 'rights',
        h2: 'Your rights and contact',
        blocks: [
          {
            t: 'p',
            text: `If you would like to know what data we hold about you, or ask us to delete an email conversation, write to [${SITE.email}](mailto:${SITE.email}). Because we do not run accounts or store photos, in most cases there is little to hold.`
          }
        ]
      },
      {
        id: 'changes',
        h2: 'Changes to this policy',
        blocks: [
          {
            t: 'p',
            text: 'If we change how we handle data, we will update this page and the date at the top.'
          }
        ]
      }
    ]
  },

  terms: {
    title: 'Terms of Service',
    metaTitle: 'Terms of Service – HEIC2',
    metaDescription:
      'The terms for using HEIC2, a free in-browser HEIC converter: acceptable use, your responsibility for your files, and the no-warranty disclaimer.',
    badge: 'Terms',
    summary: 'HEIC2 is free to use. These terms explain what you can expect from it and what we cannot promise.',
    updated: SITE.contentUpdated,
    sections: [
      {
        id: 'acceptance',
        h2: 'Using HEIC2',
        blocks: [
          {
            t: 'p',
            text: 'By using www.heic2.tools you agree to these terms. If you do not agree, please do not use the site.'
          }
        ]
      },
      {
        id: 'permitted',
        h2: 'Permitted use',
        blocks: [
          {
            t: 'p',
            text: 'You may use the converter for personal and commercial purposes with files you own or have the right to convert. Do not use the site in a way that damages it, overloads it or breaks the law.'
          }
        ]
      },
      {
        id: 'files',
        h2: 'Your files',
        blocks: [
          {
            t: 'p',
            text: 'You keep all rights to your photos. They are processed on your device and are not sent to us. You are responsible for backing up your originals; we recommend keeping the HEIC files until you have checked the converted copies.'
          }
        ]
      },
      {
        id: 'warranty',
        h2: 'No warranty',
        blocks: [
          {
            t: 'p',
            text: 'The service is provided “as is” and “as available”, without warranties of any kind. Conversion depends on your browser and device, and we cannot guarantee that every file will convert or that results will suit every purpose.'
          }
        ]
      },
      {
        id: 'liability',
        h2: 'Limitation of liability',
        blocks: [
          {
            t: 'p',
            text: 'To the extent permitted by law, HEIC2 and its maintainers are not liable for any loss or damage arising from your use of the site, including lost or corrupted files.'
          }
        ]
      },
      {
        id: 'third-party',
        h2: 'Third-party software and links',
        blocks: [
          {
            t: 'p',
            text: 'HEIC2 uses open-source software listed on the [About page](/about) under its own licences. Our guides link to external websites; we are not responsible for their content.'
          }
        ]
      },
      {
        id: 'changes',
        h2: 'Changes',
        blocks: [
          {
            t: 'p',
            text: `We may update these terms. The date at the top shows when they last changed. Questions? Email [${SITE.email}](mailto:${SITE.email}).`
          }
        ]
      }
    ]
  }
};
