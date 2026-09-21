import { Guide } from '@/content/types';

export const guideHeicToPdf: Guide = {
  slug: 'how-to-convert-heic-to-pdf',
  metaTitle: 'How to Convert HEIC to PDF (One Photo or Many)',
  metaDescription:
    'Convert HEIC photos to PDF in your browser, or with Preview on Mac, Microsoft Print to PDF on Windows and the Files app on iPhone. Combine several photos into one PDF.',
  h1: 'How to convert HEIC to PDF',
  lead:
    'Turn one HEIC photo – or a whole set – into a PDF. The browser tool below works on any device; built-in options for Mac, Windows and iPhone follow.',
  published: '2026-09-21',
  updated: '2026-09-21',
  embedConverter: 'pdf',
  tools: ['/heic-to-pdf', '/heic-to-jpg', '/batch-heic-converter'],
  guides: ['how-to-convert-heic-to-jpg', 'how-to-open-heic-files-on-windows'],
  sources: [
    { label: 'Apple Support – Using HEIF or HEVC media on Apple devices', url: 'https://support.apple.com/HT207022' }
  ],
  sections: [
    {
      id: 'browser',
      h2: 'Method 1: the HEIC to PDF converter (any device)',
      blocks: [
        {
          t: 'ol',
          items: [
            'Add your HEIC photos to the converter above. The format is already PDF.',
            'Switch on **Combine all photos into one PDF** to get a single file with one photo per page.',
            'Choose a page size – A4, Letter or same as the photo.',
            'Press **Convert all** and download the PDF.'
          ]
        },
        {
          t: 'p',
          text: 'The PDF is built in your browser, so the photos are not uploaded. See the dedicated [HEIC to PDF page](/heic-to-pdf) for options and file-size tips.'
        }
      ]
    },
    {
      id: 'mac',
      h2: 'Method 2: Preview on a Mac',
      blocks: [
        {
          t: 'ol',
          items: [
            'Open the HEIC photo in **Preview**.',
            'Choose **File > Export as PDF** and save.'
          ]
        },
        {
          t: 'p',
          text: 'For several photos, open them together in Preview, choose **File > Print**, open the **PDF** menu at the bottom left of the print dialog and select **Save as PDF**.'
        }
      ]
    },
    {
      id: 'windows',
      h2: 'Method 3: Microsoft Print to PDF on Windows',
      blocks: [
        {
          t: 'ol',
          items: [
            'Make sure Windows can open HEIC (see [how to open HEIC files on Windows](/guides/how-to-open-heic-files-on-windows)).',
            'Open the photo, press **Ctrl+P** and choose **Microsoft Print to PDF** as the printer.',
            'Select the paper size and press **Print**, then name the PDF.'
          ]
        }
      ]
    },
    {
      id: 'iphone',
      h2: 'Method 4: Files or Photos on iPhone',
      blocks: [
        {
          t: 'p',
          text: 'On recent versions of iOS, save the photos to the **Files** app, select them, touch and hold, and choose **Create PDF**. Alternatively, in Photos choose Share > Print, then pinch outwards on the print preview to open it as a PDF and save it from the share menu.'
        }
      ]
    },
    {
      id: 'size',
      h2: 'Keeping the PDF a sensible size',
      blocks: [
        {
          t: 'ul',
          items: [
            'Full-resolution phone photos make large PDFs. Twelve photos can add up to tens of megabytes.',
            'Set a **Max size** of 2048 px and a quality of about 80–85% for a much smaller file that still looks sharp.',
            'Use A4 or Letter pages for printing; use “same as photo” for on-screen viewing.'
          ]
        }
      ]
    }
  ],
  faqs: [
    { question: 'Can I put several HEIC photos in one PDF?', answer: 'Yes. Use the combine option in the converter above, or select all photos in Preview on a Mac and save as PDF from the print dialog.' },
    { question: 'Will the PDF keep the photo quality?', answer: 'Photos are stored as JPEG images inside the PDF at the quality you choose, so a high setting looks the same at normal viewing sizes.' },
    { question: 'Can I convert HEIC to PDF without uploading photos?', answer: 'Yes. The converter on this page builds the PDF in your browser. Mac Preview and Microsoft Print to PDF also work locally.' }
  ]
};

export const guideOpenOnAndroid: Guide = {
  slug: 'how-to-open-heic-files-on-android',
  metaTitle: 'How to Open HEIC Files on Android',
  metaDescription:
    'Recent Android versions can display HEIC photos, older ones cannot. See which apps open HEIC, what to do on older phones, and how to convert to JPG.',
  h1: 'How to open HEIC files on Android',
  lead:
    'Since Android 9, the system can decode HEIF images, so many phones open HEIC photos without extra apps. Older phones and some gallery apps still cannot – here is what to try.',
  published: '2026-09-21',
  updated: '2026-09-21',
  tools: ['/heic-to-jpg', '/batch-heic-converter'],
  guides: ['what-is-a-heic-file', 'how-to-convert-heic-to-jpg'],
  sources: [
    { label: 'Wikipedia – High Efficiency Image File Format', url: 'https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format' },
    { label: 'Windows Central – How to add support for HEIC and HEVC files on Windows 11 (mentions Android 9 adopting HEIF)', url: 'https://www.windowscentral.com/software-apps/windows-11/how-to-add-support-for-heic-and-hevc-files-on-windows-11' }
  ],
  sections: [
    {
      id: 'support',
      h2: 'Does Android support HEIC?',
      blocks: [
        {
          t: 'p',
          text: 'Google added support for the HEIF image format in Android 9 (Pie). On phones running Android 9 or later, the built-in image decoder can read HEIC, so most gallery apps and the Google Photos app can display these photos. Support can still vary between manufacturers’ gallery apps, and phones on Android 8 or earlier generally cannot open HEIC.'
        }
      ]
    },
    {
      id: 'try',
      h2: 'What to try first',
      blocks: [
        {
          t: 'ol',
          items: [
            'Open the photo in **Google Photos** or your phone’s default gallery.',
            'If it does not open, try another photo app – some manufacturers’ galleries handle HEIC better than others.',
            'Update the app and Android itself; HEIC support has improved over time.',
            'If it still fails, convert the file to JPG.'
          ]
        }
      ]
    },
    {
      id: 'convert',
      h2: 'Convert HEIC to JPG on Android',
      blocks: [
        {
          t: 'p',
          text: 'Open the [HEIC to JPG converter](/heic-to-jpg) in Chrome or another browser on your phone, tap **Select files**, choose the HEIC photos, convert and download the JPG copies. The conversion runs on your phone and the pictures are not uploaded. For many files, use the [batch converter](/batch-heic-converter) in small groups so the phone’s memory is not overloaded.'
        }
      ]
    },
    {
      id: 'websites',
      h2: 'Uploading HEIC photos from Android to a website',
      blocks: [
        {
          t: 'p',
          text: 'Many web forms reject HEIC even when the phone can display it. Convert to JPG before uploading, and set a **Max size** of about 2048 px if the site limits file size.'
        }
      ]
    },
    {
      id: 'why-heic',
      h2: 'Why do I have HEIC files on Android at all?',
      blocks: [
        {
          t: 'p',
          text: 'They usually come from an iPhone (shared through cloud drives, email or messaging apps that send original files), or from an Android camera app set to save in HEIF. If you would rather avoid them, look for a High Efficiency or HEIF option in your camera settings and switch it off.'
        }
      ]
    }
  ],
  faqs: [
    { question: 'Which Android version opens HEIC?', answer: 'Android 9 (Pie) and later include platform support for HEIF images. Earlier versions do not.' },
    { question: 'Why does my gallery show a blank thumbnail for HEIC?', answer: 'The gallery app may not use the system decoder. Try Google Photos, update the app, or convert the file to JPG.' },
    { question: 'Is it safe to convert photos on my phone?', answer: 'With the converter on this site the conversion happens in your phone’s browser and the photos are not uploaded.' }
  ]
};

export const guideHeicVsHeif: Guide = {
  slug: 'heic-vs-heif',
  metaTitle: 'HEIC vs HEIF: What Is the Difference?',
  metaDescription:
    'HEIC and HEIF are related but not identical. Learn how the container (HEIF), the codec (HEVC) and the file extension fit together, and how AVIF fits in.',
  h1: 'HEIC vs HEIF: what is the difference?',
  lead:
    'HEIF is the container standard; HEIC is what Apple calls a HEIF file whose picture is compressed with HEVC. Most of the time you can treat them as the same thing when converting.',
  published: '2026-09-21',
  updated: '2026-09-21',
  tools: ['/heic-to-jpg', '/heic-to-png'],
  guides: ['what-is-a-heic-file', 'heic-vs-jpg'],
  sources: [
    { label: 'Wikipedia – High Efficiency Image File Format', url: 'https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format' },
    { label: 'Apple Support – Using HEIF or HEVC media on Apple devices', url: 'https://support.apple.com/HT207022' }
  ],
  sections: [
    {
      id: 'summary',
      h2: 'The difference in one table',
      blocks: [
        {
          t: 'table',
          head: ['', 'HEIF', 'HEIC'],
          rows: [
            ['What it is', 'A container format standard for images and image sequences (ISO/IEC 23008-12)', 'HEIF files whose images are compressed with HEVC'],
            ['Developed by', 'MPEG', 'Name used by Apple and others for the HEVC flavour'],
            ['Extensions you will see', '.heif (and .heic, .avif in the same family)', '.heic'],
            ['Compression codec', 'Not fixed – depends on the file', 'HEVC (H.265)'],
            ['Typical MIME type', 'image/heif', 'image/heic']
          ]
        }
      ]
    },
    {
      id: 'container-codec',
      h2: 'Container versus codec',
      blocks: [
        {
          t: 'p',
          text: 'Think of a HEIF file as a box, and the codec as the way the picture inside it was squeezed. HEIF defines the box: how images, thumbnails, depth maps and metadata are stored. The codec decides how the pixels are compressed. Apple’s photos use HEVC inside that box, and the combination is what gets the .heic extension.'
        }
      ]
    },
    {
      id: 'avif',
      h2: 'Where AVIF fits',
      blocks: [
        {
          t: 'p',
          text: 'AVIF is closely related: it stores images compressed with the AV1 codec in the same HEIF-style container. A .avif file is therefore not a HEIC file even though both belong to the same family. A converter that reads HEIC will not necessarily open AVIF, and the reverse is also true.'
        }
      ]
    },
    {
      id: 'practical',
      h2: 'What it means when you convert',
      blocks: [
        {
          t: 'ul',
          items: [
            'Files from an iPhone or iPad are HEIC, whether they end in .heic or .heif. A HEIC converter handles both.',
            'If a .heif file comes from a different device, it may use a different codec; try converting it, and if it fails the file may not be HEVC-based.',
            'The output formats are the same as for any HEIC file: JPG for compatibility, PNG for lossless copies, WebP for websites, PDF for documents.'
          ]
        },
        {
          t: 'p',
          text: 'Ready to convert? Use the [HEIC to JPG converter](/heic-to-jpg) – it accepts both .heic and .heif files.'
        }
      ]
    }
  ],
  faqs: [
    { question: 'Are HEIC and HEIF the same?', answer: 'They are closely related. HEIF is the container standard, and HEIC is HEIF with HEVC-compressed pictures. For everyday use, converting either works the same way.' },
    { question: 'Is AVIF the same as HEIC?', answer: 'No. AVIF stores AV1-compressed images in a HEIF-style container, while HEIC uses HEVC.' },
    { question: 'Why does Windows say .heif but iPhone makes .heic?', answer: 'Both extensions are used within the same family. Apple uses .heic for its photos; other software may save or label files as .heif.' }
  ]
};
