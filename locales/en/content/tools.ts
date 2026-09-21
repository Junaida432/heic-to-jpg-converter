import { ToolLongForm } from '@/content/types';

/**
 * Long-form English copy for each converter page. Every page has its own angle so that
 * the pages support each other instead of competing for the same query.
 */
export const TOOL_LONG_FORM: Record<string, ToolLongForm> = {
  '/': {
    guides: ['what-is-a-heic-file', 'how-to-convert-heic-to-jpg', 'heic-vs-jpg', 'how-to-open-heic-files-on-windows'],
    tools: ['/heic-to-jpg', '/heic-to-png', '/heic-to-webp', '/heic-to-pdf', '/batch-heic-converter'],
    sections: [
      {
        id: 'how-it-works',
        h2: 'A HEIC converter that never sees your photos',
        blocks: [
          {
            t: 'p',
            text: 'HEIC is the photo format iPhones and iPads use by default. It saves storage space, but many Windows PCs, Android phones, websites and print services still cannot open it. HEIC2 converts those files to JPG, PNG, WebP or PDF so they work wherever you need them.'
          },
          {
            t: 'p',
            text: 'The conversion runs inside your browser tab. When you add a photo, a HEIC decoder (libheif, compiled to WebAssembly) reads the file on your device in a background thread, and your browser encodes the pixels in the format you picked. The photo is never sent to a server, so there is nothing to upload, no queue to wait in and nothing stored on our side.'
          },
          {
            t: 'p',
            text: 'You can check this yourself. Open your browser’s developer tools, switch to the Network tab and convert a photo: you will see the page and its scripts load, but you will not see your photo leave your computer.'
          }
        ]
      },
      {
        id: 'choose-a-format',
        h2: 'Which output format should you choose?',
        blocks: [
          {
            t: 'table',
            head: ['Format', 'Choose it when', 'Trade-off'],
            rows: [
              ['JPG', 'You want the photo to open anywhere: email, messaging apps, social networks, Windows, print shops.', 'Lossy, so each save discards a little detail. At 90–92% quality the difference is hard to see.'],
              ['PNG', 'You will keep editing the image, or you need a lossless copy of the decoded pixels.', 'Files are often several times larger than the same photo as JPG.'],
              ['WebP', 'You are publishing photos on a website or blog and want smaller files.', 'Some older apps and print services cannot open it, and some browsers cannot save it.'],
              ['PDF', 'You need to send, print or upload photos as a document.', 'The photos are placed as images; the PDF is not text-searchable.']
            ]
          },
          {
            t: 'p',
            text: 'Not sure? Pick JPG. If the photos are going on a website, read [HEIC vs JPG](/guides/heic-vs-jpg) and try the [HEIC to WebP converter](/heic-to-webp). If you need everything in a single document, use [HEIC to PDF](/heic-to-pdf).'
          }
        ]
      },
      {
        id: 'compare-methods',
        h2: 'How converting in your browser compares with other methods',
        blocks: [
          {
            t: 'table',
            head: ['Method', 'What happens to your photos', 'Good for', 'Limits'],
            rows: [
              ['Upload-based online converters', 'Files are sent to the provider’s servers and converted there.', 'Very large files or devices with little memory.', 'Photos leave your device, and some services limit file size or count unless you pay.'],
              ['In-browser converters (HEIC2)', 'Photos are converted on your device. Nothing is uploaded.', 'Private photos, ID or document snaps, and quick batches with nothing to install.', 'Speed and memory depend on your device.'],
              ['Built-in tools (Preview on Mac, Photos export)', 'Converted locally by the operating system.', 'Occasional conversions on a Mac.', 'Manual, one dialog at a time; nothing equivalent on Windows or Android.'],
              ['Desktop software', 'Converted locally by an installed program.', 'Huge batches and workflows that need metadata control.', 'Installation, updates and sometimes a licence fee.']
            ]
          }
        ]
      },
      {
        id: 'best-results',
        h2: 'Getting the best quality from a conversion',
        blocks: [
          {
            t: 'ul',
            items: [
              '**Start from the original HEIC.** A copy that was already shared through a chat app has usually been compressed once already.',
              '**Use 90–92% for JPG.** Going to 100% makes files much larger with little visible difference at normal viewing sizes.',
              '**Use Max size for smaller files.** 2048 px on the long side is plenty for email and most web pages.',
              '**Expect no metadata in the result.** The converted files do not carry the original camera details or GPS location. That protects your privacy; keep the HEIC if you need that information.',
              '**Live Photos become still images.** Only the still frame is converted, not the short video.',
              '**Keep your originals until you have checked the converted files.**'
            ]
          }
        ]
      },
      {
        id: 'if-it-fails',
        h2: 'If a photo will not convert',
        blocks: [
          {
            t: 'ol',
            items: [
              'Try a current version of Chrome, Edge or Firefox.',
              'Convert fewer photos at once, or set a smaller Max size – very large photos can exceed a phone’s memory.',
              'Check that the file really is a HEIC. A file renamed from another format, or a partly copied file, will be rejected.',
              'Copy the photo from your iPhone again – a file that was only partly transferred is a common cause – and convert the fresh copy.',
              'If it still fails, [contact us](/contact) with your browser and operating system and we will look into it.'
            ]
          }
        ]
      }
    ]
  },

  '/heic-to-jpg': {
    guides: ['how-to-convert-heic-to-jpg', 'how-to-stop-iphone-taking-heic-photos', 'does-converting-heic-to-jpg-reduce-quality', 'heic-vs-jpg'],
    tools: ['/heic-to-png', '/heic-to-webp', '/heic-to-pdf', '/batch-heic-converter'],
    sections: [
      {
        id: 'why-convert',
        h2: 'Why convert HEIC to JPG?',
        blocks: [
          {
            t: 'p',
            text: 'JPG has been the default photo format for three decades, so almost everything can open it. HEIC is newer and more efficient, but support outside Apple’s ecosystem is patchy. Converting to JPG is the quickest way to make a photo work everywhere.'
          },
          {
            t: 'ul',
            items: [
              '**Windows** needs extra codecs before File Explorer and Photos can show HEIC – see [how to open HEIC files on Windows](/guides/how-to-open-heic-files-on-windows).',
              '**Websites and forms** such as job portals, marketplaces and government sites often accept only JPG or PNG.',
              '**Editing and print** software, older photo apps and print kiosks may not read HEIC.',
              '**Sharing** with people on other platforms is simpler when you send a JPG.'
            ]
          }
        ]
      },
      {
        id: 'how-to',
        h2: 'How to convert HEIC to JPG',
        blocks: [
          {
            t: 'ol',
            items: [
              'Drag your .heic or .heif files into the box above, or tap **Select files**.',
              'Leave the format on **JPG**. Keep quality at 92%, or lower it for smaller files.',
              'Optional: pick a **Max size** if you want smaller dimensions as well.',
              'Press **Convert all**, then download each file or use **Download all (ZIP)**.'
            ]
          },
          {
            t: 'note',
            title: 'On a phone',
            text: 'The converter works in mobile browsers too. On iPhone and Android, tap Select files, choose your photos from the library and download the results to Files or your gallery.'
          }
        ]
      },
      {
        id: 'quality',
        h2: 'Choosing a JPG quality setting',
        blocks: [
          {
            t: 'table',
            head: ['Quality', 'Good for', 'Notes'],
            rows: [
              ['100%', 'Files you will edit further', 'Largest files; the gain over 92% is rarely visible.'],
              ['92% (default)', 'Everyday sharing and storage', 'A safe balance of quality and size.'],
              ['85%', 'Email and messaging', 'Noticeably smaller and still clean at normal size.'],
              ['70–75%', 'Thumbnails and previews', 'Artefacts can show when you zoom in.']
            ]
          }
        ]
      },
      {
        id: 'what-changes',
        h2: 'What changes when HEIC becomes JPG',
        blocks: [
          {
            t: 'ul',
            items: [
              '**File size usually grows.** HEIC compresses more efficiently, so a JPG of similar visual quality tends to be larger.',
              '**Colour depth is limited to 8 bits per channel,** which is what JPG supports.',
              '**Metadata is not carried over.** Camera details and GPS location are dropped in the converted file.',
              '**Live Photo motion and depth data are not included.** You get the still image.',
              '**It is a one-way trip.** Keep the original HEIC if you may want the full-fidelity version later.'
            ]
          },
          {
            t: 'p',
            text: 'For a deeper look, read [does converting HEIC to JPG reduce quality?](/guides/does-converting-heic-to-jpg-reduce-quality)'
          }
        ]
      },
      {
        id: 'stop-heic',
        h2: 'Want your iPhone to save JPG in the first place?',
        blocks: [
          {
            t: 'p',
            text: 'Go to Settings > Camera > Formats and choose **Most Compatible**. New photos will be saved as JPEG. The trade-off is larger files, so you will use more storage. Our guide on [how to stop your iPhone taking HEIC photos](/guides/how-to-stop-iphone-taking-heic-photos) covers the options, including the transfer setting that converts photos when you copy them to a computer.'
          }
        ]
      }
    ]
  },

  '/heic-to-png': {
    guides: ['heic-vs-jpg', 'what-is-a-heic-file', 'does-converting-heic-to-jpg-reduce-quality'],
    tools: ['/heic-to-jpg', '/heic-to-webp', '/heic-to-pdf', '/batch-heic-converter'],
    sections: [
      {
        id: 'when-png',
        h2: 'When PNG is the right choice',
        blocks: [
          {
            t: 'p',
            text: 'PNG is a lossless format: it stores the decoded pixels exactly and never degrades when you re-save the file. That makes it a good working format even though it is a poor choice for sharing photos.'
          },
          {
            t: 'ul',
            items: [
              '**Repeated editing.** JPG loses a little detail on every save; PNG does not.',
              '**Design and layout work.** Figma, Canva, Photoshop and similar tools handle PNG smoothly.',
              '**Screenshots and graphics** with sharp edges and flat colour, where JPG artefacts are visible.',
              '**Workflows that specify PNG,** such as some upload forms and documentation tools.'
            ]
          },
          {
            t: 'p',
            text: 'If you only want to share or store photos, [JPG](/heic-to-jpg) is smaller and just as compatible.'
          }
        ]
      },
      {
        id: 'how-to',
        h2: 'How to convert HEIC to PNG',
        blocks: [
          {
            t: 'ol',
            items: [
              'Add your .heic or .heif photos to the box above.',
              'Make sure **PNG** is selected. There is no quality slider because PNG is lossless.',
              'Optional: choose a **Max size** to shrink very large photos.',
              'Press **Convert all** and download the files, or grab a ZIP.'
            ]
          }
        ]
      },
      {
        id: 'file-size',
        h2: 'PNG file sizes: what to expect',
        blocks: [
          {
            t: 'p',
            text: 'Photographs contain fine, noisy detail that lossless compression cannot shrink much. A PNG made from a HEIC photo is therefore often several times larger than the original HEIC or a JPG of the same picture. A 12-megapixel photo can easily become a multi-megabyte PNG.'
          },
          {
            t: 'p',
            text: 'If a PNG is too heavy, set a smaller **Max size**, or switch to [JPG](/heic-to-jpg) or [WebP](/heic-to-webp) for the copies you share.'
          }
        ]
      },
      {
        id: 'transparency',
        h2: 'PNG and transparency',
        blocks: [
          {
            t: 'p',
            text: 'PNG supports transparency, but ordinary iPhone photos have no transparent areas, so converting one to PNG does not add any. Portrait mode depth data and cut-out stickers made on the phone are stored separately and are not converted into transparency by this tool.'
          }
        ]
      },
      {
        id: 'lossless-note',
        h2: 'Lossless is not the same as “better than the original”',
        blocks: [
          {
            t: 'p',
            text: 'Your iPhone already compressed the photo when it saved the HEIC. Converting to PNG preserves everything that is in the HEIC exactly, but it cannot recover detail that was thrown away at capture time. The advantage of PNG is that no further loss happens after this point.'
          },
          {
            t: 'table',
            head: ['', 'HEIC', 'JPG', 'PNG'],
            rows: [
              ['Compression', 'Lossy, very efficient', 'Lossy', 'Lossless'],
              ['Typical size for a photo', 'Smallest', 'Small–medium', 'Largest'],
              ['Loses detail when re-saved', 'Yes', 'Yes', 'No'],
              ['Opens everywhere', 'No', 'Yes', 'Yes']
            ]
          }
        ]
      }
    ]
  },

  '/heic-to-webp': {
    guides: ['heic-vs-jpg', 'how-to-convert-heic-to-jpg'],
    tools: ['/heic-to-jpg', '/heic-to-png', '/heic-to-pdf', '/batch-heic-converter'],
    sections: [
      {
        id: 'why-webp',
        h2: 'Why use WebP for photos on a website?',
        blocks: [
          {
            t: 'p',
            text: 'WebP is an image format Google created for the web. Google’s own comparison reports that lossy WebP files are 25–34% smaller than comparable JPEGs at the same quality. Smaller images download faster, which helps pages load quickly – something search engines take into account through Core Web Vitals.'
          },
          {
            t: 'p',
            text: 'iPhone photos are a common source of oversized web images: a straight-from-the-camera photo is often several megabytes, far more than a blog or shop page needs. Converting to WebP and scaling down can cut that dramatically.'
          }
        ]
      },
      {
        id: 'how-to',
        h2: 'How to convert HEIC to WebP',
        blocks: [
          {
            t: 'ol',
            items: [
              'Add your HEIC photos to the box above.',
              'Choose **WebP**. Set quality to about 80% for web photos.',
              'Set **Max size** to 1600 or 2048 px for most page layouts.',
              'Press **Convert all** and download the files or a ZIP.'
            ]
          },
          {
            t: 'note',
            title: 'If you see “This browser cannot save WebP”',
            text: 'Encoding WebP depends on the browser. Chrome, Edge and Firefox can do it; some browsers, notably Safari, may not. Rather than give you a PNG disguised as WebP, the converter shows a message. Use another browser, or pick JPG.'
          }
        ]
      },
      {
        id: 'support',
        h2: 'Where WebP works – and where it does not',
        blocks: [
          {
            t: 'table',
            head: ['Where', 'WebP support'],
            rows: [
              ['Current Chrome, Edge, Firefox, Safari', 'Displays WebP'],
              ['CMS platforms and website builders', 'Most current ones accept WebP uploads'],
              ['Email clients', 'Mixed – use JPG for email'],
              ['Print shops, older editors, some marketplaces', 'Often not accepted – use JPG']
            ]
          },
          {
            t: 'p',
            text: 'When a photo has to work everywhere, keep a JPG copy alongside the WebP.'
          }
        ]
      },
      {
        id: 'picture-element',
        h2: 'Serving WebP with a JPG fallback',
        blocks: [
          {
            t: 'p',
            text: 'If you run a website, the HTML <picture> element lets browsers choose the best format they support:'
          },
          {
            t: 'code',
            label: 'HTML',
            text: '<picture>\n  <source srcset="photo.webp" type="image/webp">\n  <img src="photo.jpg" alt="Describe the photo" width="1600" height="1067">\n</picture>'
          }
        ]
      },
      {
        id: 'quality',
        h2: 'Picking a WebP quality',
        blocks: [
          {
            t: 'ul',
            items: [
              '**75–85%** is a common range for web photos.',
              '**Below 70%** is fine for thumbnails but shows artefacts on large images.',
              '**Above 90%** rarely looks different but makes files bigger.'
            ]
          },
          {
            t: 'p',
            text: 'This converter creates lossy WebP. For a lossless copy, use [PNG](/heic-to-png).'
          }
        ]
      }
    ]
  },

  '/batch-heic-converter': {
    guides: ['how-to-stop-iphone-taking-heic-photos', 'how-to-open-heic-files-on-windows', 'how-to-convert-heic-to-jpg'],
    tools: ['/heic-to-jpg', '/heic-to-png', '/heic-to-webp', '/heic-to-pdf'],
    sections: [
      {
        id: 'whole-camera-roll',
        h2: 'Converting a whole folder of HEIC photos',
        blocks: [
          {
            t: 'p',
            text: 'Copying photos from an iPhone to a PC often leaves you with hundreds of .heic files. Opening them one by one in a converter is painful, so this page is built for batches: add them all, choose a format once, and download one ZIP.'
          },
          {
            t: 'ol',
            items: [
              'Copy the HEIC photos from your iPhone to a folder on your computer, or open the photo library in your phone’s browser.',
              'Click **Select files**, open the folder and press Ctrl+A (⌘+A on Mac) to select everything. You can also drag the selected files onto the box.',
              'Choose the output format, quality and optional Max size. These settings apply to the whole batch.',
              'Press **Convert all**. Each file shows its own status.',
              'Use **Download all (ZIP)** to save everything in one archive.'
            ]
          }
        ]
      },
      {
        id: 'how-it-works',
        h2: 'How batch conversion works here',
        blocks: [
          {
            t: 'ul',
            items: [
              '**A queue, not a stampede.** Photos are converted one after another. Decoding a 12–48 megapixel photo uses a lot of memory, and a queue keeps your browser responsive.',
              '**Errors are isolated.** If one file cannot be converted, it is marked and the rest carry on.',
              '**Duplicate names are handled.** In the ZIP, a second file with the same name gets (2) added, so nothing is overwritten.',
              '**Nothing is uploaded.** The whole queue runs on your device.'
            ]
          }
        ]
      },
      {
        id: 'batch-size',
        h2: 'How big a batch is sensible?',
        blocks: [
          {
            t: 'p',
            text: 'There is no limit built into the page – your device’s memory is the limit. These are rules of thumb rather than hard numbers:'
          },
          {
            t: 'table',
            head: ['Device', 'Comfortable batch', 'If it struggles'],
            rows: [
              ['Recent laptop or desktop', 'Hundreds of photos', 'Convert in groups of 100–200 and download a ZIP for each.'],
              ['Older computer', 'Tens of photos', 'Set Max size to 2048 px and convert in smaller groups.'],
              ['Phone or tablet', '20–50 photos', 'Keep the screen on, use a Max size, and avoid PNG for large batches.']
            ]
          }
        ]
      },
      {
        id: 'tips',
        h2: 'Tips for large batches',
        blocks: [
          {
            t: 'ul',
            items: [
              'Set a **Max size** of 2048 px if you do not need full resolution – it speeds up encoding and shrinks the ZIP.',
              'Close other heavy tabs before you start.',
              'Prefer JPG for big batches: PNG output is much larger and slower to zip.',
              'After downloading, compare the number of files in the ZIP with the number you added.',
              'Keep the original HEIC files until you have checked the results.'
            ]
          }
        ]
      },
      {
        id: 'avoid-heic',
        h2: 'Avoid the problem next time',
        blocks: [
          {
            t: 'p',
            text: 'On your iPhone, Settings > Photos > Transfer to Mac or PC lets you choose Automatic, which converts photos to a compatible format when they are copied to a computer, or Keep Originals. See [how to stop your iPhone taking HEIC photos](/guides/how-to-stop-iphone-taking-heic-photos) for details.'
          }
        ]
      }
    ]
  },

  '/heic-to-pdf': {
    guides: ['how-to-convert-heic-to-pdf', 'how-to-convert-heic-to-jpg'],
    tools: ['/heic-to-jpg', '/heic-to-png', '/batch-heic-converter'],
    sections: [
      {
        id: 'why-pdf',
        h2: 'Why turn HEIC photos into a PDF?',
        blocks: [
          {
            t: 'ul',
            items: [
              '**Forms and applications** that accept only PDF, such as rental, visa, insurance and school paperwork.',
              '**Several photos in one file:** receipts, pages of a document or a set of product photos.',
              '**Printing.** A PDF with A4 or Letter pages prints predictably.',
              '**Sending a single attachment** instead of ten separate images.'
            ]
          }
        ]
      },
      {
        id: 'how-to',
        h2: 'How to convert HEIC to PDF',
        blocks: [
          {
            t: 'ol',
            items: [
              'Add your HEIC photos to the box above. The format is already set to **PDF**.',
              'Switch on **Combine all photos into one PDF** for a single file, or leave it off to get one PDF per photo.',
              'Choose a **Page size**: A4, Letter or same as the photo.',
              'Press **Convert all**, then download the PDF.'
            ]
          }
        ]
      },
      {
        id: 'one-or-many',
        h2: 'One PDF or one per photo?',
        blocks: [
          {
            t: 'p',
            text: 'A combined PDF puts each photo on its own page in the order shown in the list. To change the order, remove the files and add them again in the order you want. With combining switched off, each photo becomes its own PDF and you can download them together as a ZIP.'
          }
        ]
      },
      {
        id: 'page-size',
        h2: 'Page size options',
        blocks: [
          {
            t: 'table',
            head: ['Option', 'What it does', 'Use it for'],
            rows: [
              ['A4', 'Fits the photo on an A4 page with a small margin. Wide photos get a landscape page.', 'Printing and sharing outside the US'],
              ['Letter', 'The same, on US Letter pages.', 'Printing and sharing in the US and Canada'],
              ['Same as photo', 'The page takes the photo’s own proportions, with no margins.', 'On-screen viewing and full-bleed images']
            ]
          }
        ]
      },
      {
        id: 'size-quality',
        h2: 'PDF quality and file size',
        blocks: [
          {
            t: 'p',
            text: 'Each photo is stored inside the PDF as a JPEG at the quality you choose (92% by default). Twelve full-resolution photos can make a PDF of tens of megabytes. To make it smaller, lower the quality to about 80–85% or set a **Max size** of 2048 px – that is still sharp on screen and fine for most printing.'
          }
        ]
      },
      {
        id: 'limits',
        h2: 'What this tool does not do',
        blocks: [
          {
            t: 'ul',
            items: [
              'It does not recognise text (no OCR), so the PDF is not searchable.',
              'It does not add passwords, watermarks or page numbers.',
              'It does not reorder pages after conversion – set the order by adding files in the order you want.'
            ]
          }
        ]
      }
    ]
  }
};
