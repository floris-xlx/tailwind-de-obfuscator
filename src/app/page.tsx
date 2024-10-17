'use client';

import React, { useState } from 'react';

import { Input } from '@/components/ui/input';

function convertCssToTailwind(cssClass) {
  const unitPattern = '(-?\\d*(\\.\\d+)?)(px|rem|%)';
  const regexMap = [
    { regex: new RegExp(`^padding:\\s*${unitPattern};?$`), tailwind: 'p-' },
    { regex: new RegExp(`^padding-(top|bottom|left|right):\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => `p${match[1][0]}-` },
    { regex: /^margin:\s*0;?$/, tailwind: 'm-0' },
    { regex: /^padding:\s*0;?$/, tailwind: 'p-0' },
    { regex: new RegExp(`^margin:\\s*${unitPattern};?$`), tailwind: 'm-' },
    { regex: new RegExp(`^margin-(top|bottom|left|right):\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => `m${match[1][0]}-[${match[1]}${match[3]}]` },
    { regex: new RegExp(`^font-size:\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => `text-[${match[1]}${match[3]}]` },
    { regex: new RegExp(`^height:\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => match[3] === '%' && match[1] === '100' ? 'h-full' : `h-[${match[1]}${match[3]}]` },
    { regex: /^display:\s*flex;?$/, tailwind: 'flex' },
    { regex: /^display:\s*grid;?$/, tailwind: 'grid' },
    { regex: /^display:\s*block;?$/, tailwind: 'block' },
    { regex: /^justify-content:\s*center;?$/, tailwind: 'justify-center' },
    { regex: /^justify-content:\s*space-between;?$/, tailwind: 'justify-between' },
    { regex: new RegExp(`^width:\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => match[3] === '%' && match[1] === '100' ? 'w-full' : `w-[${match[1]}${match[3]}]` },
    { regex: /^align-items:\s*center;?$/, tailwind: 'items-center' },
    { regex: new RegExp(`^line-height:\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => `leading-[${match[1]}${match[3]}]` },
    { regex: /^border-radius:\s*\.375rem;?$/, tailwind: 'rounded-md' },
    { regex: /^color:\s*rgb\(107\s114\s128\/var\(--tw-text-opacity\)\);?$/, tailwind: 'color-[#000]' },
    { regex: /^text-transform:\s*uppercase;?$/, tailwind: 'uppercase' },
    { regex: /^letter-spacing:\s*\.1em;?$/, tailwind: 'tracking-wide' },
    { regex: /^font-family:\s*inherit;?$/, tailwind: 'font-inherit' },
    { regex: /^font-feature-settings:\s*inherit;?$/, tailwind: 'font-feature-settings-inherit' },
    { regex: /^font-variation-settings:\s*inherit;?$/, tailwind: 'font-variation-settings-inherit' },
    { regex: /^font-size:\s*100%;?$/, tailwind: 'text-base' },
    { regex: /^font-weight:\s*inherit;?$/, tailwind: 'font-weight-inherit' },
    { regex: /^line-height:\s*inherit;?$/, tailwind: 'leading-inherit' },
    { regex: /^align-items:\s*flex-start;?$/, tailwind: 'items-start' },
    { regex: /^letter-spacing:\s*inherit;?$/, tailwind: 'tracking-inherit' },
    { regex: /^top:\s*0;?$/, tailwind: 'top-0' },
    { regex: /^color:\s*inherit;?$/, tailwind: 'text-inherit' },
    { regex: /^left:\s*0;?$/, tailwind: 'left-0' },
    { regex: /^text-transform:\s*none;?$/, tailwind: 'normal-case' },
    { regex: /^flex:\s*none;?$/, tailwind: 'flex-none' },
    { regex: new RegExp(`^bottom:\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => `bottom-[${match[1]}${match[3]}]` },
    { regex: /^border-width:\s*1px;?$/, tailwind: 'border' },
    { regex: /^position:\s*absolute;?$/, tailwind: 'absolute' },
    { regex: /^border-radius:\s*9999px;?$/, tailwind: 'rounded-full' },
    { regex: new RegExp(`^column-gap:\\s*(0|${unitPattern});?$`), tailwind: (match: RegExpMatchArray) => `gap-${parseFloat(match[1]) * (match[3] === 'rem' ? 4 : 1)}${match[3] === 'rem' ? 'rem' : ''}` },
    { regex: /^white-space:\s*nowrap;?$/, tailwind: 'whitespace-nowrap' },
    { regex: /^cursor:\s*pointer;?$/, tailwind: 'cursor-pointer' },
    { regex: /^position:\s*relative;?$/, tailwind: 'relative' },
    { regex: /^flex-shrink:\s*0;?$/, tailwind: 'flex-shrink-0' },
    { regex: /^background-color:\s*transparent;?$/, tailwind: 'bg-transparent' },
    { regex: /^background-image:\s*none;?$/, tailwind: 'bg-none' },
    { regex: /^display:\s*inline-flex;?$/, tailwind: 'inline-flex' },
    { regex: /^justify-content:\s*flex-start;?$/, tailwind: 'justify-start' },
  ];

  for (const { regex, tailwind } of regexMap) {
    const match = cssClass.match(regex);
    if (match) {
      if (typeof tailwind === 'function') {
        return tailwind(match);
      }
      return tailwind;
    }
  }

  return '';
}

export default function Home() {
  const [cssClass, setCssClass] = useState('');
  const [tailwindClass, setTailwindClass] = useState('');

  const handleInputChange = (event) => {
    const newCssClass = event.target.value.trim();
    setCssClass(newCssClass);
    const convertedClass = convertCssToTailwind(newCssClass);
    setTailwindClass(convertedClass);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div>

          <Input type="text" placeholder="Css class" value={cssClass} onChange={handleInputChange} />

          <div className='pt-8'>
            <p>
              Tailwind class:

            </p>
            <div className='border rounded-md p-2 mt-2 w-[250px] h-[36px]'>
              {tailwindClass}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
