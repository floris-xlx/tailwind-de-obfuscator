'use client';

import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function convertCssToTailwind(cssClass) {
  console.log('cssClass', cssClass);
  // Remove !important from the CSS class
  cssClass = cssClass.replace(/\s*!important\s*;?$/, '');

  const unitPattern = '(-?\\d*(\\.\\d+)?)(px|rem|%)';
  const directions = ['top', 'bottom', 'left', 'right'];
  const regexMap = [
    { regex: new RegExp(`^padding:\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => `p-[${match[1]}${match[3]}]` },
    { regex: /^margin:\s*0;?$/, tailwind: 'm-0' },
    { regex: /^padding:\s*0;?$/, tailwind: 'p-0' },
    { regex: new RegExp(`^margin:\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => `m-[${match[1]}${match[3]}]` },
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
    { regex: /^box-sizing:\s*border-box;?$/, tailwind: 'box-border' },
    { regex: /^font-weight:\s*(\d+)\s*!important;?$/, tailwind: (match: RegExpMatchArray) => `font-[${match[1]}]` },
    { regex: /^text-wrap:\s*balance;?$/, tailwind: 'text-balance' },
    { regex: /^background-color:\s*rgb\((\d+)\s(\d+)\s(\d+)\/var\(--tw-bg-opacity\)\);?$/, tailwind: (match: RegExpMatchArray) => `bg-[rgb(${match[1]},${match[2]},${match[3]}/1)]` },
    { regex: /^font-style:\s*normal;?$/, tailwind: 'not-italic' },
    {
      regex: /^border:\s*0\s*solid\s*#([0-9a-fA-F]{6});?$/,
      tailwind: (match: RegExpMatchArray) => `border-0 border-[#${match[1]}]`
    },
    {
      regex: /^transition-duration:\s*(\.\d+|\d+(\.\d+)?)s;?$/,
      tailwind: (match: RegExpMatchArray) => `duration-[${parseFloat(match[1]) * 1000}]`
    },
    {
      regex: /^margin-left:\s*calc\((\.?\d+rem)\s*\*\s*calc\(1\s*-\s*var\(--tw-space-x-reverse\)\)\);?$/,
      tailwind: (match: RegExpMatchArray) => `ml-[${parseFloat(match[1])}rem]`
    },
    {
      regex: /^padding-left:\s*calc\((\.?\d+rem)\s*\*\s*calc\(1\s*-\s*var\(--tw-space-x-reverse\)\)\);?$/,
      tailwind: (match: RegExpMatchArray) => `pl-[${parseFloat(match[1])}rem]`
    },
    {
      regex: /^padding-right:\s*calc\((\.?\d+rem)\s*\*\s*calc\(1\s*-\s*var\(--tw-space-x-reverse\)\)\);?$/,
      tailwind: (match: RegExpMatchArray) => `pr-[${parseFloat(match[1])}rem]`
    },
    {
      regex: /^padding-top:\s*calc\((\.?\d+rem)\s*\*\s*calc\(1\s*-\s*var\(--tw-space-y-reverse\)\)\);?$/,
      tailwind: (match: RegExpMatchArray) => `pt-[${parseFloat(match[1])}rem]`
    },
    {
      regex: /^padding-bottom:\s*calc\((\.?\d+rem)\s*\*\s*calc\(1\s*-\s*var\(--tw-space-y-reverse\)\)\);?$/,
      tailwind: (match: RegExpMatchArray) => `pb-[${parseFloat(match[1])}rem]`
    },
    { regex: /^margin-left:\s*auto;?$/, tailwind: 'ml-auto' },
    { regex: /^margin-right:\s*auto;?$/, tailwind: 'mr-auto' },
    { regex: /^grid-column:\s*1\s*\/\s*-1;?$/, tailwind: 'col-span-full' },
    { regex: /^grid-column-start:\s*4;?$/, tailwind: 'col-start-4' },

    {
      regex: /^color:\s*rgb\((\d+)\s(\d+)\s(\d+)\/var\(--tw-text-opacity\)\);?$/,
      tailwind: (match: RegExpMatchArray) => `text-[rgb(${match[1]},${match[2]},${match[3]}/1)]`
    },
  ];



  // Add logic for margin and padding with directions
  directions.forEach(direction => {
    regexMap.push(
      { regex: new RegExp(`^padding-${direction}:\\s*0;?$`), tailwind: `p${direction[0]}-0` },
      { regex: new RegExp(`^margin-${direction}:\\s*0;?$`), tailwind: `m${direction[0]}-0` },
      { regex: new RegExp(`^margin-${direction}:\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => `m${direction[0]}-[${match[1]}${match[3]}]` },
      { regex: new RegExp(`^padding-${direction}:\\s*${unitPattern};?$`), tailwind: (match: RegExpMatchArray) => `p${direction[0]}-[${match[1]}${match[3]}]` }
    );
  });

  for (const { regex, tailwind } of regexMap) {
    const match = cssClass.match(regex);
    if (match) {
      if (typeof tailwind === 'function') {
        console.log('match', match);
        return tailwind(match);
      }

      console.log('match', match);
      return tailwind;
    }
  }

  return '';
}

export default function Home() {
  const [cssClass, setCssClass] = useState('');
  const [tailwindClass, setTailwindClass] = useState('');
  const [styleSheet, setStyleSheet] = useState('');
  const [tailwindMap, setTailwindMap] = useState({});
  const [obfuscatedComponent, setObfuscatedComponent] = useState('');
  const [deobfuscatedComponent, setDeobfuscatedComponent] = useState('');

  const handleInputChange = (event) => {
    const newCssClass = event.target.value.trim();
    setCssClass(newCssClass);
    const convertedClass = convertCssToTailwind(newCssClass);
    setTailwindClass(convertedClass);
  };

  const handleStyleSheetChange = (event) => {
    const newStyleSheet = event.target.value;
    setStyleSheet(newStyleSheet);
    const newTailwindMap = convertStyleSheetToTailwindMap(newStyleSheet);
    setTailwindMap(newTailwindMap);
  };

  const handleObfuscatedComponentChange = (event) => {
    const newObfuscatedComponent = event.target.value;
    setObfuscatedComponent(newObfuscatedComponent);
    const deobfuscated = deobfuscateComponent(newObfuscatedComponent, tailwindMap);
    setDeobfuscatedComponent(deobfuscated);
  };

  const convertStyleSheetToTailwindMap = (styleSheet) => {
    console.log('Received styleSheet:', styleSheet);
    const lines = styleSheet.split('\n');
    console.log('Split lines:', lines);
    const map = {};
    let currentClass = '';
    let tailwindStyles = [];

    lines.forEach(line => {
      console.log('Processing line:', line);
      const classMatch = line.match(/^\.(\w+)\s*{\s*$/);
      const styleMatch = line.match(/^\s*([\w-]+:\s*[^;]+;)\s*$/);

      if (classMatch) {
        if (currentClass && tailwindStyles.length > 0) {
          map[currentClass] = tailwindStyles.join(' ');
          console.log('Updated map:', map);
        }
        currentClass = classMatch[1];
        tailwindStyles = [];
        console.log('Found class:', currentClass);
      } else if (styleMatch && currentClass) {
        const cssStyle = styleMatch[1].trim();
        console.log('Found style:', cssStyle);
        const tailwindStyle = convertCssToTailwind(cssStyle);
        console.log('Converted to Tailwind style:', tailwindStyle);
        if (tailwindStyle) {
          tailwindStyles.push(tailwindStyle);
        }
      }
    });

    if (currentClass && tailwindStyles.length > 0) {
      map[currentClass] = tailwindStyles.join(' ');
      console.log('Updated map:', map);
    }

    console.log('Final map:', map);
    return map;
  };

  const deobfuscateComponent = (component, map) => {
    let deobfuscated = component;
    for (const [key, value] of Object.entries(map)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      deobfuscated = deobfuscated.replace(regex, value);
    }
    deobfuscated = deobfuscated.replace(/class="/g, 'className="');
    deobfuscated = deobfuscated.replace(/<!--.*?-->/g, '');
    deobfuscated = deobfuscated.replace(/>/g, '>\n');
    return deobfuscated;
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

          <div className='pt-8'>
            <p>
              Styling Sheet:
            </p>
            <textarea
              className='border rounded-md p-2 mt-2 w-[550px] h-[500px] text-[11px]'
              value={styleSheet}
              onChange={handleStyleSheetChange}
              placeholder="Enter your styling sheet here"
            />
          </div>

          <div className='pt-8'>
            <p>
              Tailwind Map:
            </p>
            <pre className='border rounded-md p-2 mt-2 w-[550px] h-[200px] text-[11px] overflow-auto'>
              {JSON.stringify(tailwindMap, null, 2)}
            </pre>
          </div>

          <div className='pt-8'>
            <p>
              Obfuscated Component:
            </p>
            <textarea
              className='border rounded-md p-2 mt-2 w-[550px] h-[200px] text-[11px]'
              value={obfuscatedComponent}
              onChange={handleObfuscatedComponentChange}
              placeholder="Enter your obfuscated component here"
            />
          </div>

          <div className='pt-8'>
            <p>
              Deobfuscated Component:
            </p>
            <pre className='border rounded-md p-2 mt-2 w-[550px] h-[200px] text-[11px] overflow-auto'>
              {deobfuscatedComponent}
            </pre>
          </div>

        </div>
      </main>
    </div>
  );
}
