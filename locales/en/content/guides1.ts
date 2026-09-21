import { Guide } from '@/content/types';

export const guideWhatIsHeic: Guide = {
  slug: 'what-is-a-heic-file',
  metaTitle: 'What Is a HEIC File? Format, Uses and How to Open It',
  metaDescription:
    'HEIC is the photo format iPhones use by default. Learn what a HEIC file is, why Apple chose it, how it differs from JPG, and how to open or convert it.',
  h1: 'What is a HEIC file?',
  lead:
    'A HEIC file is a photo saved in Apple’s default image format. It is smaller than a JPG of similar quality, but not every device or website can open it.',
  published: '2026-09-21',
  updated: '2026-09-21',
  tools: ['/heic-to-jpg', '/heic-to-png', '/batch-heic-converter'],
  guides: ['heic-vs-jpg', 'heic-vs-heif', 'how-to-open-heic-files-on-windows', 'how-to-convert-heic-to-jpg'],
  sources: [
    { label: 'Apple Support – Using HEIF or HEVC media on Apple devices', url: 'https://support.apple.com/HT207022' },
    { label: 'Wikipedia – High Efficiency Image File Format', url: 'https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format' }
  ],
  sections: [
    {
      id: 'short-answer',
      h2: 'The short answer',
      blocks: [
        {
          t: 'p',
          text: 'HEIC stands for High Efficiency Image Container. Files usually end in **.heic** and are what an iPhone or iPad produces when the camera is set to its default “High Efficiency” mode. Inside, the picture is compressed with HEVC (High Efficiency Video Coding, also known as H.265) and wrapped in a HEIF container.'
        },
        {
          t: 'p',
          text: 'In practice that means a HEIC photo needs less storage than a JPG that looks the same. Apple says HEIF and HEVC offer better compression than JPEG and H.264 while preserving the same visual quality. Apple made HEIC the default from iOS 11 (2017).'
        }
      ]
    },
    {
      id: 'terms',
      h2: 'HEIC, HEIF and HEVC – what is what?',
      blocks: [
        {
          t: 'table',
          head: ['Term', 'What it is'],
          rows: [
            ['HEIF', 'High Efficiency Image File Format – the container standard (ISO/IEC 23008-12) developed by MPEG.'],
            ['HEVC / H.265', 'The compression method used for the picture data inside Apple’s files.'],
            ['HEIC', 'The name Apple uses for HEIF files whose pictures are compressed with HEVC. The file extension is .heic.']
          ]
        },
        {
          t: 'p',
          text: 'The relationship is covered in more detail in [HEIC vs HEIF](/guides/heic-vs-heif).'
        }
      ]
    },
    {
      id: 'features',
      h2: 'What can a HEIC file do that a JPG cannot?',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Store more than one image** in a single file, which is how Live Photos and burst shots can be kept together.',
            '**Keep extra data** such as depth information used by Portrait mode.',
            '**Use higher bit depth** than the 8 bits per channel that JPG is limited to.',
            '**Support transparency** through an alpha channel, although ordinary camera photos do not use it.',
            '**Save edits non-destructively,** because the format can carry the original image and adjustment data.'
          ]
        }
      ]
    },
    {
      id: 'why-apple',
      h2: 'Why does the iPhone use HEIC?',
      blocks: [
        {
          t: 'p',
          text: 'Storage. Modern phone cameras produce large images, and a format that halves the space for the same visual quality lets users keep far more photos on the device and in iCloud. Apple’s support documentation describes the space saving as the reason to keep the High Efficiency setting.'
        },
        {
          t: 'p',
          text: 'Apple handles most compatibility problems for you. When you share a photo through many apps, the iPhone can send a JPEG version automatically, so recipients often never notice HEIC. Problems usually appear when you copy the original files to a computer or upload them to a website.'
        }
      ]
    },
    {
      id: 'downsides',
      h2: 'The downsides of HEIC',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Patchy support outside Apple.** Windows needs extra codecs, some Android gallery apps and older software cannot read it, and many web forms reject it.',
            '**Licensing.** HEVC is covered by patents that must be licensed, which is one reason operating systems often ship HEIC support as an optional add-on rather than by default.',
            '**Editing tools.** Some editors and print services still expect JPG or PNG.'
          ]
        }
      ]
    },
    {
      id: 'open-or-convert',
      h2: 'How to open or convert a HEIC file',
      blocks: [
        {
          t: 'ul',
          items: [
            '**On iPhone, iPad and Mac:** just open it – support is built in.',
            '**On Windows:** install the HEIF and HEVC extensions, or convert the file. See [how to open HEIC files on Windows](/guides/how-to-open-heic-files-on-windows).',
            '**On Android:** recent versions can display it; otherwise convert it. See [how to open HEIC files on Android](/guides/how-to-open-heic-files-on-android).',
            '**Anywhere:** use the [HEIC to JPG converter](/heic-to-jpg), which runs in your browser so photos are not uploaded.'
          ]
        }
      ]
    }
  ],
  faqs: [
    { question: 'Is HEIC better than JPG?', answer: 'For storage efficiency, yes: HEIC files are usually much smaller at similar visual quality. For compatibility, no: JPG opens on virtually everything. Which is better depends on whether you are storing photos or sharing them.' },
    { question: 'Is a HEIC file the same as a HEIF file?', answer: 'They are closely related. HEIF is the container standard; HEIC is the name Apple uses for HEIF files whose pictures use HEVC compression.' },
    { question: 'Can I rename .heic to .jpg?', answer: 'No. Renaming only changes the label; the data inside is still HEIC, so most programs will refuse to open it. Use a converter instead.' },
    { question: 'Does HEIC lose quality?', answer: 'HEIC is a lossy format, like JPG, but it is more efficient. The photo your iPhone saves is already compressed, and converting it to another lossy format compresses it again.' }
  ]
};

export const guideConvertToJpg: Guide = {
  slug: 'how-to-convert-heic-to-jpg',
  metaTitle: 'How to Convert HEIC to JPG on Windows, Mac, iPhone and Android',
  metaDescription:
    'Step-by-step ways to convert HEIC to JPG: in your browser without uploads, with Preview on Mac, with Windows tools, and by changing your iPhone camera format.',
  h1: 'How to convert HEIC to JPG',
  lead:
    'Four reliable ways to turn HEIC photos into JPG on any device – the quickest is right below, and it never uploads your pictures.',
  published: '2026-09-21',
  updated: '2026-09-21',
  embedConverter: 'jpeg',
  tools: ['/heic-to-jpg', '/batch-heic-converter', '/heic-to-png'],
  guides: ['how-to-stop-iphone-taking-heic-photos', 'does-converting-heic-to-jpg-reduce-quality', 'how-to-open-heic-files-on-windows'],
  sources: [
    { label: 'Apple Support – Using HEIF or HEVC media on Apple devices', url: 'https://support.apple.com/HT207022' }
  ],
  sections: [
    {
      id: 'browser',
      h2: 'Method 1: convert in your browser (any device)',
      blocks: [
        {
          t: 'ol',
          items: [
            'Use the converter above, or open the [HEIC to JPG converter](/heic-to-jpg).',
            'Drop your .heic files in, or tap **Select files**.',
            'Keep the format on JPG and quality at about 92%.',
            'Press **Convert all**, then download the files or one ZIP.'
          ]
        },
        {
          t: 'p',
          text: 'This works on Windows, macOS, Linux, Android, iPhone and iPad because it only needs a modern browser. The decoding happens on your device, so the photos are not uploaded. For many files, see the [batch converter](/batch-heic-converter).'
        }
      ]
    },
    {
      id: 'mac',
      h2: 'Method 2: Preview or Photos on a Mac',
      blocks: [
        {
          t: 'ol',
          items: [
            'Open the HEIC photo in **Preview**.',
            'Choose **File > Export**.',
            'Set **Format** to JPEG, adjust the quality slider and save.'
          ]
        },
        {
          t: 'p',
          text: 'For several photos, open them together in Preview, select them in the sidebar and use **File > Export Selected Images**. In the Photos app, select the photos and choose **File > Export**, then pick JPEG as the photo kind.'
        }
      ]
    },
    {
      id: 'windows',
      h2: 'Method 3: Windows',
      blocks: [
        {
          t: 'p',
          text: 'Windows cannot read HEIC on its own. Once the HEIF and HEVC extensions are installed (see [how to open HEIC files on Windows](/guides/how-to-open-heic-files-on-windows)), you can open a photo in Photos or Paint and save a copy as JPEG. That is fine for one or two pictures; for a batch, the browser converter is much faster.'
        }
      ]
    },
    {
      id: 'iphone',
      h2: 'Method 4: make the iPhone save JPG from now on',
      blocks: [
        {
          t: 'p',
          text: 'Open **Settings > Camera > Formats** and choose **Most Compatible**. New photos will then be saved as JPEG. Existing HEIC photos are not changed, so use Method 1 for those. There is also a transfer setting that converts photos when you copy them to a computer – both are explained in [how to stop your iPhone taking HEIC photos](/guides/how-to-stop-iphone-taking-heic-photos).'
        }
      ]
    },
    {
      id: 'quality',
      h2: 'Which quality setting should you use?',
      blocks: [
        {
          t: 'p',
          text: 'A quality of 90–92% is a good default. It keeps photos looking the same at normal viewing sizes without producing huge files. Use 85% for email attachments. Only choose 100% if you will edit the file again. More detail is in [does converting HEIC to JPG reduce quality?](/guides/does-converting-heic-to-jpg-reduce-quality)'
        }
      ]
    },
    {
      id: 'checklist',
      h2: 'Before you delete the originals',
      blocks: [
        {
          t: 'ul',
          items: [
            'Open a few converted files and check that they look right at full size.',
            'Confirm the number of converted files matches what you started with.',
            'Remember that converted files do not carry the original camera and location metadata.',
            'Keep the HEIC originals until you are sure.'
          ]
        }
      ]
    }
  ],
  faqs: [
    { question: 'Can I convert HEIC to JPG for free?', answer: 'Yes. The converter on this page is free, has no watermark and needs no account.' },
    { question: 'Do I need to install anything?', answer: 'No. The converter runs in your browser. On a Mac, Preview is already installed.' },
    { question: 'Is it safe to convert private photos online?', answer: 'With a converter that runs in your browser, like this one, the photos stay on your device. With upload-based converters they are sent to a server, so check the provider’s privacy policy first.' },
    { question: 'Will the JPG be the same size as the HEIC?', answer: 'Usually the JPG is larger, because HEIC compresses more efficiently. Lower the quality or set a maximum size to reduce it.' }
  ]
};

export const guideOpenOnWindows: Guide = {
  slug: 'how-to-open-heic-files-on-windows',
  metaTitle: 'How to Open HEIC Files on Windows 10 and 11',
  metaDescription:
    'Windows cannot open HEIC photos out of the box. Here is how to install the HEIF and HEVC extensions, what to do when they do not work, and the fastest alternatives.',
  h1: 'How to open HEIC files on Windows 10 and 11',
  lead:
    'Windows does not open iPhone HEIC photos by default. You can add support with two Microsoft Store extensions, use a viewer that includes its own decoder, or convert the files.',
  published: '2026-09-21',
  updated: '2026-09-21',
  tools: ['/heic-to-jpg', '/batch-heic-converter'],
  guides: ['what-is-a-heic-file', 'how-to-stop-iphone-taking-heic-photos', 'how-to-convert-heic-to-jpg'],
  sources: [
    { label: 'Microsoft Store – HEIF Image Extensions', url: 'https://apps.microsoft.com/detail/9pmmsr1cgpwg' },
    { label: 'Microsoft Store – HEVC Video Extensions', url: 'https://apps.microsoft.com/detail/9nmzlz57r3t7' },
    { label: 'Windows Central – How to add support for HEIC and HEVC files on Windows 11', url: 'https://www.windowscentral.com/software-apps/windows-11/how-to-add-support-for-heic-and-hevc-files-on-windows-11' }
  ],
  sections: [
    {
      id: 'why',
      h2: 'Why Windows cannot open HEIC by default',
      blocks: [
        {
          t: 'p',
          text: 'HEIC photos are stored in the HEIF container and compressed with HEVC. Windows treats support for both as optional components that you install from the Microsoft Store. Until they are added, File Explorer shows blank thumbnails and Photos reports that the format is not supported.'
        }
      ]
    },
    {
      id: 'extensions',
      h2: 'Method 1: install the HEIF and HEVC extensions',
      blocks: [
        {
          t: 'ol',
          items: [
            'Open the Microsoft Store and install **HEIF Image Extensions** (published by Microsoft, free).',
            'Also install **HEVC Video Extensions**. This one is usually a paid add-on of around a dollar, and the price varies by region. Many guides note that iPhone HEIC files need it because the picture data is HEVC-compressed.',
            'Restart your PC if Windows asks, then double-click a .heic file. It should open in Photos, and thumbnails should appear in File Explorer.'
          ]
        },
        {
          t: 'note',
          title: 'Which do I actually need?',
          text: 'Reports differ by Windows version and by how the photo was encoded. If a HEIC file still will not open after installing only the HEIF extension, install the HEVC extension as well.'
        }
      ]
    },
    {
      id: 'not-working',
      h2: 'If the extensions are installed but photos still will not open',
      blocks: [
        {
          t: 'ul',
          items: [
            'Restart the PC and try again.',
            'Reinstall both extensions from the Microsoft Store.',
            'Repair or reset the Photos app from Settings > Apps > Installed apps > Photos > Advanced options.',
            'Open the file with another program (see below) to check whether the file itself is damaged.',
            'If none of this helps, converting is often quicker than troubleshooting.'
          ]
        }
      ]
    },
    {
      id: 'viewers',
      h2: 'Method 2: use a viewer with its own HEIC decoder',
      blocks: [
        {
          t: 'p',
          text: 'Some third-party image viewers, such as XnView MP, can open HEIC without Microsoft’s extensions. This can be a convenient choice if you would rather not use the Store. Check the current feature list of any viewer before installing.'
        }
      ]
    },
    {
      id: 'convert',
      h2: 'Method 3: convert the photos',
      blocks: [
        {
          t: 'p',
          text: 'If you need the photos to work in every program, or you are sending them to someone else, convert them to JPG. The [HEIC to JPG converter](/heic-to-jpg) runs in your browser and does not upload your pictures; for a whole folder use the [batch converter](/batch-heic-converter).'
        }
      ]
    },
    {
      id: 'prevent',
      h2: 'Method 4: stop getting HEIC files from your iPhone',
      blocks: [
        {
          t: 'p',
          text: 'On your iPhone, set Settings > Photos > Transfer to Mac or PC to **Automatic** so photos are converted to a compatible format when copied to your PC, or set the camera to Most Compatible. See [how to stop your iPhone taking HEIC photos](/guides/how-to-stop-iphone-taking-heic-photos).'
        }
      ]
    }
  ],
  faqs: [
    { question: 'Are the Windows HEIC extensions free?', answer: 'The HEIF Image Extensions are free from Microsoft. HEVC Video Extensions are typically a small paid add-on, though some PCs include a free version from the manufacturer. Prices and availability vary.' },
    { question: 'Does Windows 11 open HEIC files natively?', answer: 'Not without help. Windows 11 Photos can display HEIC once the required extensions are installed from the Microsoft Store.' },
    { question: 'Why do I see a thumbnail but cannot open the photo?', answer: 'This usually means one of the two extensions is missing, or the Photos app needs repairing. Install both extensions and restart.' },
    { question: 'What is the quickest fix for one photo?', answer: 'Convert it to JPG with the browser converter. It takes seconds and needs no installation.' }
  ]
};
