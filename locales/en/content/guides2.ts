import { Guide } from '@/content/types';

export const guideHeicVsJpg: Guide = {
  slug: 'heic-vs-jpg',
  metaTitle: 'HEIC vs JPG: Differences, Quality and Which to Use',
  metaDescription:
    'HEIC vs JPG compared: file size, quality, compatibility, editing and features. Learn when to keep HEIC, when to switch to JPG, and how to convert between them.',
  h1: 'HEIC vs JPG: which format should you use?',
  lead:
    'HEIC is more efficient; JPG is more compatible. Here is a plain comparison, and a simple rule for choosing.',
  published: '2026-09-21',
  updated: '2026-09-21',
  tools: ['/heic-to-jpg', '/heic-to-png', '/heic-to-webp'],
  guides: ['what-is-a-heic-file', 'does-converting-heic-to-jpg-reduce-quality', 'how-to-stop-iphone-taking-heic-photos'],
  sources: [
    { label: 'Apple Support – Using HEIF or HEVC media on Apple devices', url: 'https://support.apple.com/HT207022' },
    { label: 'Wikipedia – High Efficiency Image File Format', url: 'https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format' },
    { label: 'Wikipedia – JPEG', url: 'https://en.wikipedia.org/wiki/JPEG' }
  ],
  sections: [
    {
      id: 'at-a-glance',
      h2: 'HEIC vs JPG at a glance',
      blocks: [
        {
          t: 'table',
          head: ['', 'HEIC', 'JPG'],
          rows: [
            ['File size for similar visual quality', 'Smaller – often around half', 'Larger'],
            ['Compression', 'Lossy (HEVC)', 'Lossy (DCT)'],
            ['Bit depth', 'Supports more than 8 bits per channel', '8 bits per channel'],
            ['Multiple images in one file', 'Yes (Live Photos, bursts)', 'No'],
            ['Transparency', 'Supported by the format', 'No'],
            ['Compatibility', 'Apple devices; other systems often need extra software', 'Virtually everything'],
            ['Introduced', '2017 in iOS 11 (standard from MPEG)', '1992'],
            ['Best for', 'Storing photos on an iPhone', 'Sharing, uploading, printing']
          ]
        }
      ]
    },
    {
      id: 'size',
      h2: 'File size',
      blocks: [
        {
          t: 'p',
          text: 'Apple says HEIF and HEVC provide better compression than JPEG and H.264 while preserving the same visual quality. Independent comparisons commonly find HEIC photos are around half the size of comparable JPGs, though the exact saving depends on the scene and the settings. The benefit is storage: you can keep roughly twice as many photos on a device or in iCloud.'
        }
      ]
    },
    {
      id: 'quality',
      h2: 'Image quality',
      blocks: [
        {
          t: 'p',
          text: 'Both formats are lossy, and at typical settings the difference is not visible in everyday viewing. HEIC can hold more colour information because it is not limited to 8 bits per channel, which matters mainly for editing high-dynamic-range photos. The format is more efficient, so at the same file size HEIC tends to look slightly cleaner than JPG.'
        }
      ]
    },
    {
      id: 'compatibility',
      h2: 'Compatibility',
      blocks: [
        {
          t: 'p',
          text: 'This is where JPG wins. Every browser, phone, editing program, print service and upload form accepts JPG. HEIC works natively on Apple devices, needs extensions on Windows ([details](/guides/how-to-open-heic-files-on-windows)), works on recent Android versions and is rejected by many websites.'
        }
      ]
    },
    {
      id: 'choose',
      h2: 'Which should you use?',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Keep HEIC** as the format your iPhone saves, if you mostly view photos on Apple devices and want to save storage.',
            '**Convert to JPG** when you copy photos to a Windows PC, upload them to a website, send them to someone who cannot open HEIC, or take them to a print shop.',
            '**Choose PNG** only for lossless editing copies, and **WebP** for photos you will publish on a website.',
            '**Keep the HEIC original** even after converting, so you always have the full-fidelity version.'
          ]
        }
      ]
    },
    {
      id: 'switch',
      h2: 'How to switch between them',
      blocks: [
        {
          t: 'p',
          text: 'To convert existing photos, use the [HEIC to JPG converter](/heic-to-jpg). To make the camera save JPEG, choose Settings > Camera > Formats > Most Compatible; this affects only new photos and is covered in [how to stop your iPhone taking HEIC photos](/guides/how-to-stop-iphone-taking-heic-photos).'
        }
      ]
    }
  ],
  faqs: [
    { question: 'Is HEIC higher quality than JPG?', answer: 'Not automatically. At the same file size HEIC usually looks a little better, and at the same visual quality it is usually smaller. At high quality settings the two look the same in normal viewing.' },
    { question: 'Should I change my iPhone to JPG?', answer: 'Only if you regularly hit compatibility problems. The HEIC setting saves storage, and iOS often converts photos to a compatible format when you share them.' },
    { question: 'Does WhatsApp or email send HEIC?', answer: 'Behaviour depends on the app and how you share the photo. Many apps receive a compatible version from iOS, but copying original files from the phone keeps them as HEIC.' }
  ]
};

export const guideStopHeic: Guide = {
  slug: 'how-to-stop-iphone-taking-heic-photos',
  metaTitle: 'How to Stop Your iPhone Taking HEIC Photos (Save JPG Instead)',
  metaDescription:
    'Switch your iPhone camera to Most Compatible to save JPEG, and set Transfer to Mac or PC to Automatic so photos convert when copied. Includes the trade-offs.',
  h1: 'How to stop your iPhone taking HEIC photos',
  lead:
    'You can make the camera save JPEG instead of HEIC, and separately tell iOS to convert photos when you copy them to a computer. These are the steps and what you give up.',
  published: '2026-09-21',
  updated: '2026-09-21',
  tools: ['/heic-to-jpg', '/batch-heic-converter'],
  guides: ['what-is-a-heic-file', 'heic-vs-jpg', 'how-to-convert-heic-to-jpg'],
  sources: [
    { label: 'Apple Support – Using HEIF or HEVC media on Apple devices', url: 'https://support.apple.com/HT207022' }
  ],
  sections: [
    {
      id: 'camera',
      h2: 'Option 1: switch the camera to JPEG',
      blocks: [
        {
          t: 'ol',
          items: [
            'Open **Settings** and tap **Camera**.',
            'Tap **Formats**.',
            'Choose **Most Compatible**.'
          ]
        },
        {
          t: 'p',
          text: 'Apple describes this setting as making all new photos and videos use JPEG or H.264. To go back, choose **High Efficiency**. The setting only appears on iPhone and iPad models that can capture HEIF or HEVC.'
        }
      ]
    },
    {
      id: 'tradeoffs',
      h2: 'What you give up with Most Compatible',
      blocks: [
        {
          t: 'ul',
          items: [
            '**More storage per photo,** because JPEG is less efficient than HEIC. Expect to fit noticeably fewer photos on the same device and in iCloud.',
            '**Some capture modes need High Efficiency.** iOS lists that Cinematic video, 4K at 60 fps, 1080p at 240 fps and HDR video require it.',
            '**Photos you already took stay HEIC.** The setting affects new photos only.'
          ]
        }
      ]
    },
    {
      id: 'transfer',
      h2: 'Option 2: keep HEIC but convert when copying to a computer',
      blocks: [
        {
          t: 'p',
          text: 'If you like HEIC on the phone but want JPG on your PC, change how the iPhone hands photos over:'
        },
        {
          t: 'ol',
          items: [
            'Open **Settings** and tap **Photos**.',
            'Scroll to the bottom and find **Transfer to Mac or PC**.',
            'Choose **Automatic** to have iOS convert photos to a compatible format when they are transferred, or **Keep Originals** to copy the HEIC files unchanged.'
          ]
        }
      ]
    },
    {
      id: 'sharing',
      h2: 'Sharing photos',
      blocks: [
        {
          t: 'p',
          text: 'When you share a photo through many apps, AirDrop or email, iOS can send a compatible version automatically when the receiving side needs one. You mainly run into HEIC when copying the original files or uploading from a computer.'
        }
      ]
    },
    {
      id: 'existing',
      h2: 'Converting the photos you already have',
      blocks: [
        {
          t: 'p',
          text: 'Neither setting changes existing photos. To convert them, use the [HEIC to JPG converter](/heic-to-jpg) or, for hundreds of files, the [batch converter](/batch-heic-converter). Both run in your browser and do not upload your pictures.'
        }
      ]
    },
    {
      id: 'recommendation',
      h2: 'Which option is best?',
      blocks: [
        {
          t: 'table',
          head: ['Your situation', 'Suggested choice'],
          rows: [
            ['Photos stay on Apple devices', 'Keep High Efficiency'],
            ['You often copy photos to a Windows PC', 'Keep High Efficiency, set Transfer to Automatic'],
            ['You mainly upload photos to sites that reject HEIC', 'Most Compatible, or convert before uploading'],
            ['Storage is tight', 'Keep High Efficiency and convert copies only when needed']
          ]
        }
      ]
    }
  ],
  faqs: [
    { question: 'Will Most Compatible convert my old photos?', answer: 'No. It changes only new photos and videos. Old HEIC photos stay as they are until you convert them.' },
    { question: 'Why is the Formats option missing?', answer: 'It only appears on iPhones and iPads that can capture HEIF or HEVC. Very old models do not offer it because they already save JPEG.' },
    { question: 'Does Most Compatible reduce photo quality?', answer: 'The photos are saved as JPEG, which is a mature, high-quality format. The main cost is larger files rather than visibly worse images.' }
  ]
};

export const guideQuality: Guide = {
  slug: 'does-converting-heic-to-jpg-reduce-quality',
  metaTitle: 'Does Converting HEIC to JPG Reduce Quality?',
  metaDescription:
    'Converting HEIC to JPG re-compresses the photo. Learn what is lost, how much it matters, which quality setting to use, and when PNG is the better choice.',
  h1: 'Does converting HEIC to JPG reduce quality?',
  lead:
    'Technically yes – JPG is lossy, so the photo is compressed a second time. In practice, at 90–92% quality the difference is very hard to see. Here is what actually changes.',
  published: '2026-09-21',
  updated: '2026-09-21',
  tools: ['/heic-to-jpg', '/heic-to-png'],
  guides: ['heic-vs-jpg', 'how-to-convert-heic-to-jpg'],
  sources: [
    { label: 'Wikipedia – JPEG', url: 'https://en.wikipedia.org/wiki/JPEG' },
    { label: 'Apple Support – Using HEIF or HEVC media on Apple devices', url: 'https://support.apple.com/HT207022' }
  ],
  sections: [
    {
      id: 'why',
      h2: 'Why there is some loss',
      blocks: [
        {
          t: 'p',
          text: 'Both HEIC and JPG discard information the eye is unlikely to miss. Your iPhone did that once when it saved the HEIC. Converting to JPG decodes that photo to pixels and compresses them again with a different method. Each lossy step can remove a little more fine detail or introduce faint artefacts, especially around sharp edges and in smooth gradients.'
        }
      ]
    },
    {
      id: 'how-much',
      h2: 'How much does it matter?',
      blocks: [
        {
          t: 'ul',
          items: [
            '**At 90–92% quality,** differences are hard to spot on a screen or in prints of normal size.',
            '**At 100%,** the file gets much larger without a visible improvement.',
            '**Below about 75%,** artefacts start to show when you zoom in.',
            '**Colour depth** is limited to 8 bits per channel in JPG. This matters mostly if you plan heavy editing of HDR photos.'
          ]
        }
      ]
    },
    {
      id: 'other-changes',
      h2: 'Other things that change, besides sharpness',
      blocks: [
        {
          t: 'ul',
          items: [
            '**File size** usually increases, because HEIC is more efficient.',
            '**Metadata** such as camera details and GPS location is not carried over by this converter.',
            '**Live Photo motion and depth data** are not included – you get a still image.'
          ]
        }
      ]
    },
    {
      id: 'test',
      h2: 'How to check for yourself',
      blocks: [
        {
          t: 'ol',
          items: [
            'Convert one photo at 92% quality.',
            'Open the original and the JPG at 100% zoom, side by side.',
            'Compare an area with fine detail – hair, foliage, text – and a smooth area such as sky.'
          ]
        },
        {
          t: 'p',
          text: 'If you cannot tell the difference, the setting is fine for that kind of photo.'
        }
      ]
    },
    {
      id: 'protect',
      h2: 'How to lose as little as possible',
      blocks: [
        {
          t: 'ul',
          items: [
            'Convert from the **original HEIC,** not from a copy that was already compressed by a messaging app.',
            'Convert **once,** and keep working from that file rather than converting again and again.',
            'For editing, choose **[PNG](/heic-to-png)** so later saves lose nothing more.',
            '**Keep the HEIC original** as your master copy.'
          ]
        }
      ]
    }
  ],
  faqs: [
    { question: 'Is PNG better than JPG for converted HEIC photos?', answer: 'PNG avoids adding further loss, but files are much larger and it cannot restore detail already discarded. Use PNG for editing copies and JPG for sharing.' },
    { question: 'What is the best JPG quality for photos?', answer: 'About 90–92% for general use, 85% for email, and 100% only for files you will edit again.' },
    { question: 'Can I convert JPG back to HEIC to recover quality?', answer: 'No. Once detail is discarded it cannot be recovered. Always keep the original HEIC.' }
  ]
};
